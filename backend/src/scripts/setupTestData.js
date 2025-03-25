require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Workflow = require('../models/Workflow');
const Execution = require('../models/Execution');

const setupTestData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Workflow.deleteMany({});
    await Execution.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@automatehub.com',
      password: 'admin123',
      company: 'AutomateHub',
      role: 'admin'
    });
    console.log('Created admin user');

    // Create regular user
    const regularUser = await User.create({
      name: 'Test User',
      email: 'test@automatehub.com',
      password: 'test123',
      company: 'Test Company',
      role: 'user'
    });
    console.log('Created test user');

    // Create sample workflows
    const workflows = await Workflow.create([
      {
        name: 'Email Notification Workflow',
        description: 'Sends email notifications when triggered',
        owner: regularUser._id,
        trigger: {
          type: 'webhook',
          config: {
            endpoint: '/api/webhooks/email-notification',
            method: 'POST'
          }
        },
        actions: [
          {
            type: 'email',
            config: {
              to: '${triggerData.email}',
              subject: 'Notification',
              body: '${triggerData.message}'
            },
            order: 1
          }
        ],
        status: 'active'
      },
      {
        name: 'Data Sync Workflow',
        description: 'Synchronizes data between systems',
        owner: regularUser._id,
        trigger: {
          type: 'schedule',
          config: {
            cron: '0 0 * * *', // Run daily at midnight
            timezone: 'UTC'
          }
        },
        actions: [
          {
            type: 'http',
            config: {
              url: 'https://api.example.com/sync',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            },
            order: 1
          }
        ],
        status: 'active'
      }
    ]);
    console.log('Created sample workflows');

    // Create sample executions
    await Execution.create([
      {
        workflow: workflows[0]._id,
        status: 'completed',
        startedAt: new Date(Date.now() - 3600000), // 1 hour ago
        completedAt: new Date(Date.now() - 3500000), // 55 minutes ago
        duration: 60000, // 1 minute
        input: {
          email: 'test@example.com',
          message: 'Test notification'
        },
        output: {
          success: true,
          message: 'Email sent successfully'
        }
      },
      {
        workflow: workflows[1]._id,
        status: 'completed',
        startedAt: new Date(Date.now() - 7200000), // 2 hours ago
        completedAt: new Date(Date.now() - 7100000), // 1 hour 55 minutes ago
        duration: 60000, // 1 minute
        input: {},
        output: {
          success: true,
          recordsSynced: 100
        }
      }
    ]);
    console.log('Created sample executions');

    console.log('Test data setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up test data:', error);
    process.exit(1);
  }
};

setupTestData(); 