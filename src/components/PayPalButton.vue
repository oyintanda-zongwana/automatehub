<template>
  <div class="paypal-button">
    <div v-if="error" class="text-red-600 mb-4">{{ error }}</div>
    <button
      @click="initiatePayment"
      :disabled="loading"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-paypal hover:bg-paypal-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-paypal"
    >
      <span v-if="loading" class="mr-2">
        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
      <span>{{ loading ? 'Processing...' : 'Pay with PayPal' }}</span>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'PayPalButton',
  props: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    description: {
      type: String,
      default: 'AutomateHub Subscription'
    }
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const error = ref(null);

    const initiatePayment = async () => {
      try {
        loading.value = true;
        error.value = null;

        // Create order
        const { data: order } = await axios.post('/api/payments/create-order', {
          amount: props.amount,
          currency: props.currency,
          description: props.description
        });

        // Open PayPal in new window
        const paypalWindow = window.open(
          `https://www.sandbox.paypal.com/checkoutnow?token=${order.id}`,
          'paypal',
          'width=1000,height=600'
        );

        // Poll for payment completion
        const checkPayment = setInterval(async () => {
          if (paypalWindow.closed) {
            clearInterval(checkPayment);
            try {
              const { data: captureData } = await axios.post(`/api/payments/capture-payment/${order.id}`);
              emit('payment-success', captureData);
            } catch (err) {
              error.value = 'Payment verification failed. Please contact support.';
              emit('payment-error', err);
            }
            loading.value = false;
          }
        }, 1000);

      } catch (err) {
        error.value = 'Failed to initiate payment. Please try again.';
        emit('payment-error', err);
        loading.value = false;
      }
    };

    return {
      loading,
      error,
      initiatePayment
    };
  }
};
</script>

<style>
.bg-paypal {
  background-color: #0070ba;
}
.bg-paypal-dark {
  background-color: #003087;
}
.focus\:ring-paypal:focus {
  --tw-ring-color: #0070ba;
}
</style>
