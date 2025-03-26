import express from 'express';
import { body, param } from 'express-validator';
import auth from '../middleware/auth.js';
import Workflow from '../models/Workflow.js';
import { validateRequest } from '../middleware/validate.js';

const router = express.Router();

// Get all workflows for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const workflows = await Workflow.find({ createdBy: req.user.id })
      .sort({ createdAt: -1 });
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
      createdBy: req.user.id
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
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('triggerType').isIn([
    'manual', 'schedule', 'webhook', 'event', 'file_change',
    'email_received', 'database_change', 'api_response',
    'form_submission', 'message_queue'
  ]).withMessage('Invalid trigger type'),
  body('actions').isArray().withMessage('Actions must be an array'),
  body('actions.*.type').isString().notEmpty().withMessage('Action type is required'),
  body('actions.*.config').isObject().withMessage('Action config must be an object'),
  validateRequest
], async (req, res) => {
  try {
    const workflow = new Workflow({
      ...req.body,
      createdBy: req.user.id,
      status: 'draft'
    });

    await workflow.save();
    res.status(201).json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error creating workflow' });
  }
});

// Update a workflow
router.put('/:id', [
  auth,
  param('id').isMongoId().withMessage('Invalid workflow ID'),
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('triggerType').optional().isIn([
    'manual', 'schedule', 'webhook', 'event', 'file_change',
    'email_received', 'database_change', 'api_response',
    'form_submission', 'message_queue'
  ]).withMessage('Invalid trigger type'),
  body('actions').optional().isArray().withMessage('Actions must be an array'),
  body('actions.*.type').optional().isString().notEmpty().withMessage('Action type is required'),
  body('actions.*.config').optional().isObject().withMessage('Action config must be an object'),
  validateRequest
], async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (error) {
    res.status(500).json({ message: 'Error updating workflow' });
  }
});

// Delete a workflow
router.delete('/:id', [
  auth,
  param('id').isMongoId().withMessage('Invalid workflow ID'),
  validateRequest
], async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json({ message: 'Workflow deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workflow' });
  }
});

// Execute a workflow manually
router.post('/:id/execute', [
  auth,
  param('id').isMongoId().withMessage('Invalid workflow ID'),
  validateRequest
], async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
      status: 'active'
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found or not active' });
    }

    // Here we would typically queue the workflow for execution
    // For now, we'll just update the lastRun time
    workflow.lastRun = new Date();
    await workflow.save();

    res.json({ message: 'Workflow execution started' });
  } catch (error) {
    res.status(500).json({ message: 'Error executing workflow' });
  }
});

// Toggle workflow status (activate/deactivate)
router.patch('/:id/toggle', [
  auth,
  param('id').isMongoId().withMessage('Invalid workflow ID'),
  validateRequest
], async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      createdBy: req.user.id
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