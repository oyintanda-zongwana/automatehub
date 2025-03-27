const cron = require('node-cron');

// Validate workflow data
exports.validateWorkflow = (data) => {
  // Validate required fields
  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    return 'Name is required';
  }

  // Validate trigger
  if (!data.trigger || !data.trigger.type) {
    return 'Trigger type is required';
  }

  if (!['webhook', 'schedule', 'event'].includes(data.trigger.type)) {
    return 'Invalid trigger type';
  }

  // Validate trigger configuration
  if (data.trigger.type === 'schedule') {
    if (!data.trigger.config?.schedule) {
      return 'Schedule is required for schedule trigger';
    }
    if (!cron.validate(data.trigger.config.schedule)) {
      return 'Invalid cron expression';
    }
  }

  if (data.trigger.type === 'event' && !data.trigger.config?.eventType) {
    return 'Event type is required for event trigger';
  }

  // Validate actions
  if (!Array.isArray(data.actions) || data.actions.length === 0) {
    return 'At least one action is required';
  }

  for (const action of data.actions) {
    const actionError = validateAction(action);
    if (actionError) {
      return actionError;
    }
  }

  return null;
};

// Validate action data
function validateAction(action) {
  if (!action.type) {
    return 'Action type is required';
  }

  if (!['http', 'email', 'ai'].includes(action.type)) {
    return 'Invalid action type';
  }

  if (!action.config) {
    return 'Action configuration is required';
  }

  switch (action.type) {
    case 'http':
      return validateHttpAction(action.config);
    case 'email':
      return validateEmailAction(action.config);
    case 'ai':
      return validateAiAction(action.config);
    default:
      return null;
  }
}

// Validate HTTP action configuration
function validateHttpAction(config) {
  if (!config.method) {
    return 'HTTP method is required';
  }

  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(config.method.toUpperCase())) {
    return 'Invalid HTTP method';
  }

  if (!config.url) {
    return 'URL is required';
  }

  try {
    new URL(config.url);
  } catch (error) {
    return 'Invalid URL';
  }

  if (config.body) {
    try {
      JSON.parse(config.body);
    } catch (error) {
      return 'Invalid JSON body';
    }
  }

  return null;
}

// Validate email action configuration
function validateEmailAction(config) {
  if (!config.to) {
    return 'Email recipient is required';
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(config.to)) {
    return 'Invalid email address';
  }

  if (!config.subject) {
    return 'Email subject is required';
  }

  if (!config.body) {
    return 'Email body is required';
  }

  return null;
}

// Validate AI action configuration
function validateAiAction(config) {
  if (!config.model) {
    return 'AI model is required';
  }

  if (!['gpt-4', 'gpt-3.5-turbo'].includes(config.model)) {
    return 'Invalid AI model';
  }

  if (!config.prompt) {
    return 'Prompt is required';
  }

  return null;
} 