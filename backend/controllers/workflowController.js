const Workflow = require('../models/Workflow');
const { executeHttpAction, executeEmailAction, executeAiAction } = require('../services/actionExecutor');
const { validateWorkflow } = require('../utils/validation');
const cron = require('node-cron');
const EventEmitter = require('events');

// Create an event emitter for workflow events
const workflowEvents = new EventEmitter();

// Store scheduled jobs
const scheduledJobs = new Map();

// Get all workflows for a user
exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await Workflow.find({ user: req.user._id });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows', error: error.message });
  }
};

// Get a single workflow
exports.getWorkflow = async (req, res) => {
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
exports.createWorkflow = async (req, res) => {
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
exports.updateWorkflow = async (req, res) => {
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
exports.deleteWorkflow = async (req, res) => {
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
exports.toggleWorkflow = async (req, res) => {
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
exports.executeWorkflow = async (req, res) => {
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
exports.handleWebhook = async (req, res) => {
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
exports.handleEvent = async (eventType, eventData) => {
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

// Execute workflow actions
async function executeWorkflow(workflow, triggerData = {}) {
  try {
    workflow.lastRun = new Date();
    let success = true;

    // Execute each action in sequence
    for (const action of workflow.actions) {
      try {
        let result;
        switch (action.type) {
          case 'http':
            result = await executeHttpAction(action.config);
            break;
          case 'email':
            result = await executeEmailAction(action.config);
            break;
          case 'ai':
            result = await executeAiAction(action.config);
            break;
          default:
            throw new Error(`Unsupported action type: ${action.type}`);
        }

        // Log success
        workflow.logs.push({
          timestamp: new Date(),
          level: 'info',
          message: `Action ${action.type} executed successfully`,
          details: result
        });
      } catch (error) {
        success = false;
        // Log error
        workflow.logs.push({
          timestamp: new Date(),
          level: 'error',
          message: `Action ${action.type} failed: ${error.message}`,
          details: error
        });
        break;
      }
    }

    // Update workflow statistics
    if (success) {
      workflow.successCount++;
    } else {
      workflow.failureCount++;
    }

    // Calculate next run for scheduled workflows
    if (workflow.trigger.type === 'schedule' && workflow.status === 'active') {
      workflow.nextRun = cron.nextDate(workflow.trigger.config.schedule);
    }

    await workflow.save();

    // Emit workflow execution event
    workflowEvents.emit('workflowExecuted', {
      workflowId: workflow._id,
      success,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error executing workflow:', error);
    throw error;
  }
}

// Export event emitter for external use
exports.workflowEvents = workflowEvents; 