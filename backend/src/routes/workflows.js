import express from 'express';
import { body, validationResult } from 'express-validator';
import Workflow from '../models/workflow.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET api/workflows
// @desc    Get all workflows for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workflows = await Workflow.find({ creator: req.user._id });
    res.json(workflows);
  } catch (err) {
    console.error('Get workflows error:', err);
    res.status(500).send('Server error');
  }
});

// @route   POST api/workflows
// @desc    Create a new workflow
// @access  Private
router.post('/', [
  auth,
  body('name', 'Name is required').not().isEmpty(),
  body('steps', 'Steps array is required').isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description, steps } = req.body;

    const workflow = new Workflow({
      name,
      description,
      steps,
      creator: req.user._id
    });

    await workflow.save();
    res.json(workflow);
  } catch (err) {
    console.error('Create workflow error:', err);
    res.status(500).send('Server error');
  }
});

// @route   GET api/workflows/:id
// @desc    Get a specific workflow
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json(workflow);
  } catch (err) {
    console.error('Get workflow error:', err);
    res.status(500).send('Server error');
  }
});

// @route   PATCH api/workflows/:id
// @desc    Update a workflow
// @access  Private
router.patch('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    const updates = req.body;
    Object.keys(updates).forEach(key => {
      workflow[key] = updates[key];
    });

    await workflow.save();
    res.json(workflow);
  } catch (err) {
    console.error('Update workflow error:', err);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/workflows/:id
// @desc    Delete a workflow
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOneAndDelete({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    res.json({ message: 'Workflow deleted' });
  } catch (err) {
    console.error('Delete workflow error:', err);
    res.status(500).send('Server error');
  }
});

// @route   PATCH api/workflows/:id/toggle
// @desc    Toggle workflow status
// @access  Private
router.patch('/:id/toggle', auth, async (req, res) => {
  try {
    const workflow = await Workflow.findOne({
      _id: req.params.id,
      creator: req.user._id
    });

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }

    workflow.status = workflow.status === 'active' ? 'inactive' : 'active';
    await workflow.save();
    res.json(workflow);
  } catch (err) {
    console.error('Toggle workflow error:', err);
    res.status(500).send('Server error');
  }
});

export default router;