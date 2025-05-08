import nodemailer from 'nodemailer';
import { Octokit } from '@octokit/rest';
import { WebClient } from '@slack/web-api';
import JiraClient from 'jira-client';
import axios from 'axios';

// Test email connection
export const testEmailConnection = async (config) => {
  try {
    const { provider, emailAddress, emailPassword, imapServer, smtpServer } = config;
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: 587,
      secure: false,
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    });

    // Verify connection
    await transporter.verify();
    return { success: true, message: 'Email connection successful' };
  } catch (error) {
    throw new Error(`Email connection failed: ${error.message}`);
  }
};

// Test GitHub connection
export const testGitHubConnection = async (config) => {
  try {
    const { token } = config;
    const octokit = new Octokit({ auth: token });
    
    // Test connection by getting user info
    await octokit.users.getAuthenticated();
    return { success: true, message: 'GitHub connection successful' };
  } catch (error) {
    throw new Error(`GitHub connection failed: ${error.message}`);
  }
};

// Test Slack connection
export const testSlackConnection = async (config) => {
  try {
    const { token } = config;
    const client = new WebClient(token);
    
    // Test connection by getting team info
    await client.team.info();
    return { success: true, message: 'Slack connection successful' };
  } catch (error) {
    throw new Error(`Slack connection failed: ${error.message}`);
  }
};

// Test Jira connection
export const testJiraConnection = async (config) => {
  try {
    const { email, token, project } = config;
    const jira = new JiraClient({
      protocol: 'https',
      host: 'your-domain.atlassian.net',
      username: email,
      password: token,
      apiVersion: '2',
      strictSSL: true
    });

    // Test connection by getting project info
    await jira.getProject(project);
    return { success: true, message: 'Jira connection successful' };
  } catch (error) {
    throw new Error(`Jira connection failed: ${error.message}`);
  }
};

// Test webhook endpoint
export const testWebhookEndpoint = async (config) => {
  try {
    const { url, method = 'POST', headers = {}, body = {} } = config;
    
    // Test webhook by sending a request
    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers,
      data: body
    });

    return { 
      success: true, 
      message: 'Webhook endpoint test successful',
      response: response.data
    };
  } catch (error) {
    throw new Error(`Webhook endpoint test failed: ${error.message}`);
  }
};

// Test API endpoint
export const testApiEndpoint = async (config) => {
  try {
    const { url, method = 'GET', headers = {}, body = {} } = config;
    
    // Test API by sending a request
    const response = await axios({
      method: method.toLowerCase(),
      url,
      headers,
      data: method !== 'GET' ? body : undefined
    });

    return { 
      success: true, 
      message: 'API endpoint test successful',
      response: response.data
    };
  } catch (error) {
    throw new Error(`API endpoint test failed: ${error.message}`);
  }
}; 