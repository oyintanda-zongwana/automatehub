const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow');
const Execution = require('../models/Execution');
const auth = require('../middleware/auth');

// Get all workflows for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const workflows = await Workflow.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single workflow
router.get('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new workflow
router.post('/', auth, async (req, res) => {
  try {
    const workflow = new Workflow({
      ...req.body,
      owner: req.user._id
    });

    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a workflow
router.patch('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a workflow
router.delete('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute a workflow
router.post('/:id/execute', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Create execution record
    const execution = new Execution({
      workflow: workflow._id,
      input: req.body,
      status: 'pending'
    });

    await execution.save();

    // TODO: Implement actual workflow execution logic
    // This would typically involve:
    // 1. Validating the trigger conditions
    // 2. Executing each action in sequence
    // 3. Handling errors and retries
    // 4. Updating the execution record with results

    // For now, we'll just simulate a successful execution
    execution.status = 'completed';
    execution.output = { message: 'Workflow executed successfully' };
    await execution.save();

    // Update workflow last run time
    workflow.lastRun = new Date();
    await workflow.save();

    res.json(execution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get workflow executions
router.get('/:id/executions', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    const executions = await Execution.find({ workflow: workflow._id })
      .sort({ startedAt: -1 })
      .limit(10);

    res.json(executions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 