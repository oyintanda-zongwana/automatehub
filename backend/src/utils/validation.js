// Validate workflow data
export const validateWorkflow = (data) => {
  const errors = [];

  // Validate name
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Workflow name is required');
  }

  // Validate trigger
  if (!data.trigger || !data.trigger.type) {
    errors.push('Workflow trigger type is required');
  } else {
    // Validate trigger type
    const validTriggerTypes = ['webhook', 'schedule', 'event'];
    if (!validTriggerTypes.includes(data.trigger.type)) {
      errors.push('Invalid trigger type');
    }

    // Validate trigger config based on type
    if (data.trigger.type === 'schedule' && !data.trigger.config?.schedule) {
      errors.push('Schedule expression is required for schedule triggers');
    }
    if (data.trigger.type === 'event' && !data.trigger.config?.eventType) {
      errors.push('Event type is required for event triggers');
    }
  }

  // Validate actions
  if (!data.actions || !Array.isArray(data.actions) || data.actions.length === 0) {
    errors.push('At least one action is required');
  } else {
    data.actions.forEach((action, index) => {
      if (!action.type) {
        errors.push(`Action ${index + 1}: Type is required`);
      } else {
        // Validate action type
        const validActionTypes = ['http', 'email', 'ai'];
        if (!validActionTypes.includes(action.type)) {
          errors.push(`Action ${index + 1}: Invalid action type`);
        }

        // Validate action config based on type
        if (!action.config) {
          errors.push(`Action ${index + 1}: Configuration is required`);
        } else {
          switch (action.type) {
            case 'http':
              if (!action.config.url) {
                errors.push(`Action ${index + 1}: URL is required for HTTP actions`);
              }
              if (!action.config.method) {
                errors.push(`Action ${index + 1}: Method is required for HTTP actions`);
              }
              break;
            case 'email':
              if (!action.config.to) {
                errors.push(`Action ${index + 1}: Recipient is required for email actions`);
              }
              if (!action.config.subject) {
                errors.push(`Action ${index + 1}: Subject is required for email actions`);
              }
              break;
            case 'ai':
              if (!action.config.prompt) {
                errors.push(`Action ${index + 1}: Prompt is required for AI actions`);
              }
              break;
          }
        }
      }
    });
  }

  return errors.length > 0 ? errors : null;
}; 