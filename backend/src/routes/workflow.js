import express from 'express';
import { auth } from '../middleware/auth.js';
import Workflow from '../models/workflow.js';

const router = express.Router();

// Get all workflows for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const workflows = await Workflow.find({ user: req.user._id });
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workflows' });
  }
});

// Get a specific workflow
router.get('/:id', auth, async (req, res) => {
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
    res.status(500).json({ message: 'Error fetching workflow' });
  }
});

// Create a new workflow
router.post('/', auth, async (req, res) => {
  try {
    const workflow = new Workflow({
      ...req.body,
      user: req.user._id,
      status: 'inactive',
      successCount: 0,
      failureCount: 0
    });
    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workflow' });
  }
});

// Update a workflow
router.patch('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json(workflow);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workflow' });
  }
});

// Delete a workflow
router.delete('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workflow' });
  }
});

// Execute a workflow
router.post('/:id/execute', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    
    // TODO: Implement actual workflow execution logic
    // For now, just update the last run time
    workflow.lastRun = new Date();
    await workflow.save();
    
    res.json({ message: 'Workflow execution started' });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow' });
  }
});

// Toggle workflow status
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    
    workflow.status = workflow.status === 'active' ? 'inactive' : 'active';
    await workflow.save();
    
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling workflow status' });
  }
});

export default router;