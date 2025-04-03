import axios from 'axios';
import { paypalConfig } from '../config/paypal.js';

class PayPalService {
  constructor() {
    this.baseURL = 'https://api-m.sandbox.paypal.com'; // Use api-m.paypal.com for production
    this.client_id = paypalConfig.client_id;
    this.client_secret = paypalConfig.client_secret;
  }

  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64');
      const response = await axios({
        url: `${this.baseURL}/v1/oauth2/token`,
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          Authorization: `Basic ${auth}`,
        },
        data: 'grant_type=client_credentials',
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting PayPal access token:', error);
      throw new Error('Failed to get PayPal access token');
    }
  }

  async createOrder(amount, currency = 'USD', description = 'AutomateHub Subscription') {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await axios({
        url: `${this.baseURL}/v2/checkout/orders`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toString(),
              },
              description,
            },
          ],
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new Error('Failed to create PayPal order');
    }
  }

  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await axios({
        url: `${this.baseURL}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
      throw new Error('Failed to capture PayPal payment');
    }
  }
}

export default new PayPalService(); 