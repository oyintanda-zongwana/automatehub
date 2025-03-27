const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const workflowController = require('../controllers/workflowController');

// Protected routes (require authentication)
router.use(auth);

// CRUD operations
router.get('/', workflowController.getWorkflows);
router.get('/:id', workflowController.getWorkflow);
router.post('/', workflowController.createWorkflow);
router.put('/:id', workflowController.updateWorkflow);
router.delete('/:id', workflowController.deleteWorkflow);

// Workflow actions
router.post('/:id/execute', workflowController.executeWorkflow);
router.patch('/:id/toggle', workflowController.toggleWorkflow);

// Webhook route (public, no auth required)
router.post('/webhook/:path(*)', workflowController.handleWebhook);

module.exports = router; 