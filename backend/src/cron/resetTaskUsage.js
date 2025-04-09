import cron from 'node-cron';
import User from '../models/User.js';

// Function to reset task usage for all users
const resetAllUsersTaskUsage = async () => {
  try {
    // Reset taskUsage to 0 for all users
    await User.updateMany({}, { $set: { taskUsage: 0 } });
    console.log('Task usage reset completed successfully');
  } catch (error) {
    console.error('Error resetting task usage:', error);
  }
};

// Schedule task to run at midnight (00:00) on the first day of each month
const scheduleTaskReset = () => {
  // '0 0 1 * *' = At 00:00 on day-of-month 1
  cron.schedule('0 0 1 * *', async () => {
    console.log('Running monthly task usage reset...');
    await resetAllUsersTaskUsage();
  });
  
  console.log('Task usage reset scheduler initialized');
};

export default scheduleTaskReset; 