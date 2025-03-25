<template>
  <div class="pricing-page">
    <h1>Choose Your Plan</h1>
    <div class="pricing-grid">
      <div v-for="tier in tiers" :key="tier.name" class="pricing-card">
        <h2>{{ tier.name }}</h2>
        <div class="price">${{ tier.price }}/month</div>
        <ul class="features">
          <li v-for="feature in tier.features" :key="feature">{{ feature }}</li>
        </ul>
        <button
          class="cta-button"
          :class="{ 'current-plan': tier.name === currentPlan }"
          @click="selectPlan(tier)"
        >
          {{ tier.name === currentPlan ? "Current Plan" : "Get Started" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Pricing",
  setup() {
    const store = useStore();
    const currentPlan = ref("Free");

    const tiers = [
      {
        name: "Free",
        price: 0,
        features: ["10 tasks/month", "Basic workflows", "Community support"],
      },
      {
        name: "Plus",
        price: 29,
        features: [
          "100 tasks/month",
          "Priority support",
          "Slack/Email integrations",
        ],
      },
      {
        name: "Pro",
        price: 79,
        features: ["Unlimited tasks", "Advanced analytics", "Custom branding"],
      },
      {
        name: "Business",
        price: 199,
        features: [
          "Team management",
          "Activity tracking",
          "Enterprise support",
        ],
      },
    ];

    const selectPlan = async (tier) => {
      try {
        await store.dispatch("subscription/updatePlan", tier);
        // Handle successful subscription update
      } catch (error) {
        console.error("Failed to update subscription:", error);
      }
    };

    return {
      tiers,
      currentPlan,
      selectPlan,
    };
  },
};
</script>

<style scoped>
.pricing-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.pricing-card {
  border: 1px solid var(--primary);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.price {
  font-size: 2rem;
  color: var(--primary);
  margin: 1rem 0;
}

.features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.features li {
  margin: 0.5rem 0;
  color: var(--text);
}

.cta-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: var(--secondary);
}

.current-plan {
  background-color: var(--success);
}
</style>
