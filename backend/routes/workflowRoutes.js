import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import * as workflowController from '../controllers/workflowController.js';

const router = express.Router();

// Webhook route (public, no auth required)
router.post('/webhook/:path(*)', workflowController.handleWebhook);

// Protected routes (require authentication)
router.use(verifyToken);

// CRUD operations
router.get('/', workflowController.getWorkflows);
router.get('/:id', workflowController.getWorkflow);
router.post('/', workflowController.createWorkflow);
router.put('/:id', workflowController.updateWorkflow);
router.delete('/:id', workflowController.deleteWorkflow);

// Workflow actions
router.post('/:id/execute', workflowController.executeWorkflow);
router.patch('/:id/toggle', workflowController.toggleWorkflow);

export default router; 