const express = require('express');
const router = express.Router();
const connectionTestService = require('../services/connectionTestService');

// Test email connection
router.post('/test-email-connection', async (req, res) => {
  try {
    const result = await connectionTestService.testEmailConnection(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test GitHub connection
router.post('/test-github-connection', async (req, res) => {
  try {
    const result = await connectionTestService.testGitHubConnection(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test Slack connection
router.post('/test-slack-connection', async (req, res) => {
  try {
    const result = await connectionTestService.testSlackConnection(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test Jira connection
router.post('/test-jira-connection', async (req, res) => {
  try {
    const result = await connectionTestService.testJiraConnection(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test webhook endpoint
router.post('/test-webhook-endpoint', async (req, res) => {
  try {
    const result = await connectionTestService.testWebhookEndpoint(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Test API endpoint
router.post('/test-api-endpoint', async (req, res) => {
  try {
    const result = await connectionTestService.testApiEndpoint(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router; 