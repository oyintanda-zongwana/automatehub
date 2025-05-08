import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as workflowController from '../controllers/workflowController.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(verifyToken);

// CRUD operations
router.get('/', workflowController.getWorkflows);
router.get('/:id', workflowController.getWorkflow);
router.post('/', workflowController.createWorkflow);
router.patch('/:id', workflowController.updateWorkflow);
router.delete('/:id', workflowController.deleteWorkflow);

// Workflow actions
router.post('/:id/execute', workflowController.executeWorkflow);
router.patch('/:id/toggle', workflowController.toggleWorkflow);

// Webhook route (public, no auth required)
router.post('/webhook/:path(*)', workflowController.handleWebhook);

export default router; 