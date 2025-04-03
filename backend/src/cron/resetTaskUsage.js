import cron from 'node-cron';
import Subscription from '../models/Subscription.js';

// Schedule task to run at midnight on the first day of each month
export const scheduleTaskReset = () => {
  cron.schedule('0 0 1 * *', async () => {
    try {
      console.log('Running monthly task usage reset...');
      
      const subscriptions = await Subscription.find({});
      
      for (const subscription of subscriptions) {
        await subscription.resetTaskUsage();
      }
      
      console.log('Monthly task usage reset completed successfully');
    } catch (error) {
      console.error('Error resetting task usage:', error);
    }
  });
};

export default scheduleTaskReset; 