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
    const workflows = await Workflow.find({ user: req.user._id });
    res.json(workflows);
  } catch (error) {
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
    // Validate workflow data
    const validationError = validateWorkflow(req.body);
    if (validationError) {
      return res.status(400).json({ message: 'Invalid workflow data', error: validationError });
    }

    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Update schedule if needed
    if (workflow.trigger.type === 'schedule') {
      if (workflow.status === 'active') {
        scheduleWorkflow(workflow);
      } else {
        unscheduleWorkflow(workflow._id);
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
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Remove schedule if it exists
    unscheduleWorkflow(workflow._id);

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workflow', error: error.message });
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

    // Update schedule if it's a scheduled workflow
    if (workflow.trigger.type === 'schedule') {
      if (workflow.status === 'active') {
        scheduleWorkflow(workflow);
      } else {
        unscheduleWorkflow(workflow._id);
      }
    }

    await workflow.save();
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling workflow', error: error.message });
  }
};

// Execute a workflow manually
export const executeWorkflow = async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    // Execute workflow asynchronously
    executeWorkflow(workflow)
      .catch(error => console.error('Error executing workflow:', error));

    res.json({ message: 'Workflow execution started' });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow', error: error.message });
  }
};

// Handle webhook triggers
export const handleWebhook = async (req, res) => {
  try {
    const [workflowId, secret] = req.params.path.split('/');
    
    const workflow = await Workflow.findOne({
      _id: workflowId,
      'trigger.type': 'webhook',
      'trigger.config.webhook.secret': secret,
      status: 'active'
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Webhook not found or inactive' });
    }

    // Execute workflow asynchronously
    executeWorkflow(workflow, { webhookData: req.body })
      .catch(error => console.error('Error executing workflow:', error));

    res.json({ message: 'Webhook received and workflow execution started' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing webhook', error: error.message });
  }
};

// Handle event triggers
export const handleEvent = async (eventType, eventData) => {
  try {
    const workflows = await Workflow.find({
      'trigger.type': 'event',
      'trigger.config.eventType': eventType,
      status: 'active'
    });

    // Execute all matching workflows
    workflows.forEach(workflow => {
      executeWorkflow(workflow, { eventData })
        .catch(error => console.error('Error executing workflow:', error));
    });
  } catch (error) {
    console.error('Error handling event:', error);
  }
};

// Schedule a workflow
function scheduleWorkflow(workflow) {
  // Unschedule existing job if it exists
  unscheduleWorkflow(workflow._id);

  // Schedule new job
  if (workflow.trigger.type === 'schedule' && workflow.trigger.config.schedule) {
    try {
      const job = cron.schedule(workflow.trigger.config.schedule, () => {
        executeWorkflow(workflow)
          .catch(error => console.error('Error executing scheduled workflow:', error));
      });

      scheduledJobs.set(workflow._id.toString(), job);
    } catch (error) {
      console.error('Error scheduling workflow:', error);
      workflow.status = 'error';
      workflow.save().catch(error => console.error('Error saving workflow status:', error));
    }
  }
}

// Unschedule a workflow
function unscheduleWorkflow(workflowId) {
  const job = scheduledJobs.get(workflowId.toString());
  if (job) {
    job.stop();
    scheduledJobs.delete(workflowId.toString());
  }
}

// Execute a workflow
async function executeWorkflow(workflow, triggerData = {}) {
  try {
    // Update last run time
    workflow.lastRun = new Date();
    await workflow.save();

    // Execute each action in sequence
    for (const action of workflow.actions) {
      try {
        switch (action.type) {
          case 'http':
            await executeHttpAction(action.config, triggerData);
            break;
          case 'email':
            await executeEmailAction(action.config, triggerData);
            break;
          case 'ai':
            await executeAiAction(action.config, triggerData);
            break;
        }
      } catch (error) {
        console.error(`Error executing ${action.type} action:`, error);
        throw error;
      }
    }

    // Update success count
    workflow.successCount += 1;
    await workflow.save();
  } catch (error) {
    // Update failure count
    workflow.failureCount += 1;
    workflow.status = 'error';
    await workflow.save();
    throw error;
  }
}

export default {
  getWorkflows,
  getWorkflow,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  toggleWorkflow,
  executeWorkflow,
  handleWebhook,
  handleEvent
}; 