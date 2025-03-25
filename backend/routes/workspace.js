import express from 'express';
import { verifyToken } from './auth.js';
import Workspace from '../models/Workspace.js';

const router = express.Router();

// Get all workspaces for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      $or: [
        { ownerId: req.userId },
        { 'members.userId': req.userId }
      ]
    }).populate('members.userId', 'name email');
    
    res.json(workspaces);
  } catch (error) {
    console.error('Workspace fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new workspace
router.post('/', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    const workspace = new Workspace({
      name,
      ownerId: req.userId,
      members: [{
        userId: req.userId,
        role: 'admin'
      }]
    });

    await workspace.save();
    res.status(201).json(workspace);
  } catch (error) {
    console.error('Workspace creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single workspace
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      $or: [
        { ownerId: req.userId },
        { 'members.userId': req.userId }
      ]
    }).populate('members.userId', 'name email');

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    res.json(workspace);
  } catch (error) {
    console.error('Workspace fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update workspace
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      ownerId: req.userId
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const { name } = req.body;
    workspace.name = name;
    await workspace.save();

    res.json(workspace);
  } catch (error) {
    console.error('Workspace update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add member to workspace
router.post('/:id/members', verifyToken, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      ownerId: req.userId
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    const { userId, role } = req.body;
    workspace.members.push({ userId, role });
    await workspace.save();

    res.json(workspace);
  } catch (error) {
    console.error('Member addition error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove member from workspace
router.delete('/:id/members/:userId', verifyToken, async (req, res) => {
  try {
    const workspace = await Workspace.findOne({
      _id: req.params.id,
      ownerId: req.userId
    });

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    workspace.members = workspace.members.filter(
      member => member.userId.toString() !== req.params.userId
    );
    await workspace.save();

    res.json(workspace);
  } catch (error) {
    console.error('Member removal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 