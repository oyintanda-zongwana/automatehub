import Workflow from '../models/Workflow.js';
import { executeHttpAction, executeEmailAction, executeAiAction } from '../services/actionExecutor.js';
import { validateWorkflow } from '../utils/validation.js';
import cron from 'node-cron';
import { EventEmitter } from 'events';

// Create an event emitter for workflow events
const workflowEvents = new EventEmitter();

// Store scheduled jobs
const scheduledJobs = new Map();

// Get all workflows for a user
export const getWorkflows = async (req, res) => {
  try {
    console.log('Fetching workflows for user:', req.user?._id);
    const workflows = await Workflow.find({ user: req.user._id });
    res.json(workflows);
  } catch (error) {
    console.error('Error fetching workflows:', error);
    res.status(500).json({ message: 'Error fetching workflows', error: error.message });
  }
};

// Get a single workflow
export const getWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflow', error: error.message });
  }
};

// Create a new workflow
export const createWorkflow = async (req, res) => {
  try {
    // Validate workflow data
    const validationError = validateWorkflow(req.body);
    if (validationError) {
      return res.status(400).json({ message: 'Invalid workflow data', error: validationError });
    }

    const workflow = new Workflow({
      ...req.body,
      user: req.user._id
    });

    await workflow.save();

    // Schedule the workflow if it has a schedule trigger
    if (workflow.trigger.type === 'schedule' && workflow.status === 'active') {
      scheduleWorkflow(workflow);
    }

    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workflow', error: error.message });
  }
};

// Update a workflow
export const updateWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Validate workflow data
    const validationError = validateWorkflow(req.body);
    if (validationError) {
      return res.status(400).json({ message: 'Invalid workflow data', error: validationError });
    }

    // Update workflow
    Object.assign(workflow, req.body);
    await workflow.save();

    // Reschedule if needed
    if (workflow.trigger.type === 'schedule') {
      if (scheduledJobs.has(workflow._id)) {
        scheduledJobs.get(workflow._id).stop();
      }
      if (workflow.status === 'active') {
        scheduleWorkflow(workflow);
      }
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workflow', error: error.message });
  }
};

// Delete a workflow
export const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Stop scheduled job if exists
    if (scheduledJobs.has(workflow._id)) {
      scheduledJobs.get(workflow._id).stop();
      scheduledJobs.delete(workflow._id);
    }

    await workflow.remove();
    res.json({ message: 'Workflow deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workflow', error: error.message });
  }
};

// Execute a workflow
export const executeWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Execute workflow actions
    for (const action of workflow.actions) {
      try {
        switch (action.type) {
          case 'http':
            await executeHttpAction(action.config);
            break;
          case 'email':
            await executeEmailAction(action.config);
            break;
          case 'ai':
            await executeAiAction(action.config);
            break;
        }
      } catch (error) {
        workflow.failureCount++;
        workflow.logs.push({
          level: 'error',
          message: `Action execution failed: ${error.message}`,
          details: error
        });
        await workflow.save();
        throw error;
      }
    }

    workflow.successCount++;
    workflow.lastRun = new Date();
    await workflow.save();

    res.json({ message: 'Workflow executed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow', error: error.message });
  }
};

// Toggle workflow status
export const toggleWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    workflow.status = workflow.status === 'active' ? 'inactive' : 'active';

    if (workflow.trigger.type === 'schedule') {
      if (scheduledJobs.has(workflow._id)) {
        scheduledJobs.get(workflow._id).stop();
      }
      if (workflow.status === 'active') {
        scheduleWorkflow(workflow);
      }
    }

    await workflow.save();
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling workflow', error: error.message });
  }
};

// Handle webhook
export const handleWebhook = async (req, res) => {
  try {
    const { path } = req.params;
    const workflow = await Workflow.findOne({
      'trigger.config.webhook.path': `/webhook/${path}`
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Verify webhook secret if configured
    if (workflow.trigger.config.webhook.secret) {
      const signature = req.headers['x-webhook-signature'];
      if (!signature || !verifyWebhookSignature(signature, req.body, workflow.trigger.config.webhook.secret)) {
        return res.status(401).json({ message: 'Invalid webhook signature' });
      }
    }

    // Execute workflow
    await executeWorkflow(workflow);
    res.json({ message: 'Webhook received and workflow executed' });
  } catch (error) {
    res.status(500).json({ message: 'Error handling webhook', error: error.message });
  }
};

// Helper function to schedule a workflow
const scheduleWorkflow = (workflow) => {
  if (workflow.trigger.type !== 'schedule' || !workflow.trigger.config.schedule) {
    return;
  }

  const job = cron.schedule(workflow.trigger.config.schedule, async () => {
    try {
      await executeWorkflow(workflow);
    } catch (error) {
      console.error('Scheduled workflow execution failed:', error);
    }
  });

  scheduledJobs.set(workflow._id, job);
};

// Helper function to verify webhook signature
const verifyWebhookSignature = (signature, payload, secret) => {
  // Implement webhook signature verification logic here
  // This is a placeholder - you should implement proper signature verification
  return true;
};

export default {
  getWorkflows,
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  toggleWorkflow,
  executeWorkflow,
  handleWebhook
}; 