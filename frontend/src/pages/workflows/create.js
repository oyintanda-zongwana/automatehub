import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Preview as PreviewIcon,
  Settings as SettingsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

const automations = [
  {
    id: 'document-translation',
    title: 'Document Translation',
    description: 'Translate documents between languages',
    configFields: [
      {
        name: 'targetLanguage',
        label: 'Target Language',
        type: 'select',
        options: [
          { value: 'es', label: 'Spanish' },
          { value: 'fr', label: 'French' },
          { value: 'de', label: 'German' },
          { value: 'it', label: 'Italian' },
          { value: 'pt', label: 'Portuguese' }
        ]
      }
    ]
  },
  {
    id: 'email-summarizer',
    title: 'Email Summarizer',
    description: 'Summarize long emails',
    configFields: [
      {
        name: 'maxLength',
        label: 'Maximum Summary Length',
        type: 'number',
        defaultValue: 150
      }
    ]
  },
  {
    id: 'daily-planner',
    title: 'Daily Planner Generator',
    description: 'Create daily schedules',
    configFields: [
      {
        name: 'timeFormat',
        label: 'Time Format',
        type: 'select',
        options: [
          { value: '12h', label: '12-hour' },
          { value: '24h', label: '24-hour' }
        ]
      }
    ]
  },
  {
    id: 'content-calendar',
    title: 'Content Calendar Generator',
    description: 'Plan content creation',
    configFields: [
      {
        name: 'calendarType',
        label: 'Calendar Type',
        type: 'select',
        options: [
          { value: 'weekly', label: 'Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'quarterly', label: 'Quarterly' }
        ]
      }
    ]
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    description: 'Analyze sentiment in text',
    configFields: [
      {
        name: 'threshold',
        label: 'Sentiment Threshold',
        type: 'number',
        defaultValue: 0.5
      }
    ]
  },
  {
    id: 'contract-review',
    title: 'Contract Reviewer',
    description: 'Review contracts',
    configFields: [
      {
        name: 'reviewType',
        label: 'Review Type',
        type: 'select',
        options: [
          { value: 'basic', label: 'Basic Review' },
          { value: 'detailed', label: 'Detailed Review' },
          { value: 'legal', label: 'Legal Review' }
        ]
      }
    ]
  },
  {
    id: 'seo-score',
    title: 'SEO Score Generator',
    description: 'Analyze SEO scores',
    configFields: [
      {
        name: 'metrics',
        label: 'Metrics to Analyze',
        type: 'multiselect',
        options: [
          { value: 'keywords', label: 'Keywords' },
          { value: 'readability', label: 'Readability' },
          { value: 'meta', label: 'Meta Tags' }
        ]
      }
    ]
  },
  {
    id: 'pdf-extraction',
    title: 'PDF Content Extractor',
    description: 'Extract text from PDFs',
    configFields: [
      {
        name: 'extractionMode',
        label: 'Extraction Mode',
        type: 'select',
        options: [
          { value: 'text', label: 'Text Only' },
          { value: 'full', label: 'Full Content' }
        ]
      }
    ]
  },
  {
    id: 'ocr',
    title: 'OCR from Images',
    description: 'Extract text from images',
    configFields: [
      {
        name: 'language',
        label: 'Language',
        type: 'select',
        options: [
          { value: 'eng', label: 'English' },
          { value: 'fra', label: 'French' },
          { value: 'deu', label: 'German' }
        ]
      }
    ]
  },
  {
    id: 'ticket-tag',
    title: 'Support Ticket Tagger',
    description: 'Tag support tickets',
    configFields: [
      {
        name: 'tagCategories',
        label: 'Tag Categories',
        type: 'multiselect',
        options: [
          { value: 'priority', label: 'Priority' },
          { value: 'category', label: 'Category' },
          { value: 'status', label: 'Status' }
        ]
      }
    ]
  }
];

const triggerTypes = {
  schedule: {
    label: 'Schedule',
    description: 'Run the workflow at specified intervals',
    configFields: [
      {
        name: 'schedule',
        label: 'Cron Schedule',
        type: 'text',
        helperText: 'Enter a cron expression (e.g., 0 9 * * * for 9 AM daily)'
      },
      {
        name: 'timezone',
        label: 'Timezone',
        type: 'select',
        options: [
          { value: 'UTC', label: 'UTC' },
          { value: 'EST', label: 'Eastern Time' },
          { value: 'PST', label: 'Pacific Time' },
          { value: 'GMT', label: 'Greenwich Mean Time' }
        ],
        defaultValue: 'UTC'
      }
    ]
  },
  webhook: {
    label: 'Webhook',
    description: 'Trigger the workflow via HTTP request',
    configFields: [
      {
        name: 'method',
        label: 'HTTP Method',
        type: 'select',
        options: [
          { value: 'POST', label: 'POST' },
          { value: 'GET', label: 'GET' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'path',
        label: 'Webhook Path',
        type: 'text',
        helperText: 'The path will be generated automatically'
      },
      {
        name: 'authentication',
        label: 'Authentication',
        type: 'select',
        options: [
          { value: 'none', label: 'None' },
          { value: 'basic', label: 'Basic Auth' },
          { value: 'bearer', label: 'Bearer Token' },
          { value: 'api_key', label: 'API Key' }
        ]
      },
      {
        name: 'rateLimit',
        label: 'Rate Limit',
        type: 'number',
        helperText: 'Maximum requests per minute (0 for unlimited)',
        defaultValue: 0
      }
    ]
  },
  event: {
    label: 'Event',
    description: 'Trigger the workflow based on system events',
    configFields: [
      {
        name: 'eventType',
        label: 'Event Type',
        type: 'select',
        options: [
          { value: 'file_upload', label: 'File Upload' },
          { value: 'user_action', label: 'User Action' },
          { value: 'system_event', label: 'System Event' },
          { value: 'database_change', label: 'Database Change' },
          { value: 'api_call', label: 'API Call' }
        ]
      },
      {
        name: 'eventSource',
        label: 'Event Source',
        type: 'select',
        options: [
          { value: 'local', label: 'Local System' },
          { value: 'cloud', label: 'Cloud Storage' },
          { value: 'database', label: 'Database' },
          { value: 'api', label: 'External API' }
        ]
      },
      {
        name: 'filter',
        label: 'Event Filter',
        type: 'text',
        helperText: 'JSON filter to match specific events'
      }
    ]
  },
  condition: {
    label: 'Condition',
    description: 'Trigger the workflow based on conditions',
    configFields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        options: [
          { value: 'time', label: 'Time-based' },
          { value: 'data', label: 'Data-based' },
          { value: 'system', label: 'System-based' },
          { value: 'resource', label: 'Resource Usage' },
          { value: 'custom', label: 'Custom Condition' }
        ]
      },
      {
        name: 'value',
        label: 'Condition Value',
        type: 'text',
        helperText: 'Enter the condition value'
      },
      {
        name: 'operator',
        label: 'Operator',
        type: 'select',
        options: [
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
          { value: 'contains', label: 'Contains' },
          { value: 'matches', label: 'Matches Pattern' }
        ]
      }
    ]
  },
  interval: {
    label: 'Interval',
    description: 'Run the workflow at regular intervals',
    configFields: [
      {
        name: 'interval',
        label: 'Interval',
        type: 'select',
        options: [
          { value: '1m', label: 'Every Minute' },
          { value: '5m', label: 'Every 5 Minutes' },
          { value: '15m', label: 'Every 15 Minutes' },
          { value: '30m', label: 'Every 30 Minutes' },
          { value: '1h', label: 'Every Hour' },
          { value: '1d', label: 'Every Day' }
        ]
      },
      {
        name: 'startTime',
        label: 'Start Time',
        type: 'text',
        helperText: 'When to start the interval (e.g., 09:00)'
      },
      {
        name: 'endTime',
        label: 'End Time',
        type: 'text',
        helperText: 'When to end the interval (e.g., 17:00)'
      }
    ]
  },
  queue: {
    label: 'Queue',
    description: 'Trigger the workflow based on queue events',
    configFields: [
      {
        name: 'queueType',
        label: 'Queue Type',
        type: 'select',
        options: [
          { value: 'rabbitmq', label: 'RabbitMQ' },
          { value: 'kafka', label: 'Kafka' },
          { value: 'sqs', label: 'AWS SQS' },
          { value: 'redis', label: 'Redis' }
        ]
      },
      {
        name: 'queueName',
        label: 'Queue Name',
        type: 'text',
        helperText: 'Name of the queue to monitor'
      },
      {
        name: 'batchSize',
        label: 'Batch Size',
        type: 'number',
        helperText: 'Number of messages to process at once',
        defaultValue: 1
      }
    ]
  }
};

// Add custom styles
const styles = {
  container: {
    mt: 4,
    mb: 4,
    maxWidth: '1200px'
  },
  paper: {
    p: 4,
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
    pb: 2,
    borderBottom: '1px solid',
    borderColor: 'divider'
  },
  section: {
    mb: 4,
    p: 3,
    borderRadius: 1,
    backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.6)
  },
  stepCard: {
    mt: 2,
    p: 2,
    borderRadius: 1,
    border: '1px solid',
    borderColor: 'divider',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      borderColor: 'primary.main'
    }
  },
  stepHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1
  },
  stepActions: {
    display: 'flex',
    gap: 1
  },
  previewDialog: {
    '& .MuiDialog-paper': {
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    }
  },
  previewTab: {
    minHeight: '400px',
    p: 3
  },
  metricCard: {
    p: 2,
    borderRadius: 1,
    backgroundColor: (theme) => alpha(theme.palette.background.paper, 0.8),
    border: '1px solid',
    borderColor: 'divider',
    mb: 2
  },
  metricValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'primary.main'
  }
};

const CreateWorkflow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: {
      type: 'schedule',
      config: {
        schedule: '0 9 * * *'
      }
    },
    steps: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTriggerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      trigger: {
        ...prev.trigger,
        [name]: value,
        config: triggerTypes[value].configFields.reduce((acc, field) => ({
          ...acc,
          [field.name]: field.defaultValue || ''
        }), {})
      }
    }));
  };

  const handleTriggerConfigChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      trigger: {
        ...prev.trigger,
        config: {
          ...prev.trigger.config,
          [name]: value
        }
      }
    }));
  };

  const addStep = (automationId) => {
    const automation = automations.find(a => a.id === automationId);
    if (!automation) return;

    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          type: automationId,
          config: automation.configFields.reduce((acc, field) => ({
            ...acc,
            [field.name]: field.defaultValue || ''
          }), {})
        }
      ]
    }));
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const openConfigDialog = (step, index) => {
    setSelectedStep({ ...step, index });
    setConfigDialogOpen(true);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setSelectedStep((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        [name]: value
      }
    }));
  };

  const saveConfig = () => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, index) =>
        index === selectedStep.index ? selectedStep : step
      )
    }));
    setConfigDialogOpen(false);
  };

  const handlePreview = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/workflows/preview', formData);
      setPreviewData(response.data);
      setPreviewOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to preview workflow');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/workflows', formData);
      navigate('/workflows');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  const renderTriggerConfig = () => {
    const triggerType = triggerTypes[formData.trigger.type];
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {triggerType.description}
        </Typography>
        {triggerType.configFields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={formData.trigger.config[field.name] || ''}
            onChange={handleTriggerConfigChange}
            margin="normal"
            helperText={field.helperText}
            select={field.type === 'select'}
          >
            {field.type === 'select' && field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
      </Box>
    );
  };

  const renderStepConfig = () => {
    if (!selectedStep) return null;
    const automation = automations.find(a => a.id === selectedStep.type);
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {automation.description}
        </Typography>
        {automation.configFields.map((field) => (
          <TextField
            key={field.name}
            fullWidth
            label={field.label}
            name={field.name}
            value={selectedStep.config[field.name] || ''}
            onChange={handleConfigChange}
            margin="normal"
            helperText={field.helperText}
            select={field.type === 'select'}
            type={field.type === 'number' ? 'number' : 'text'}
          >
            {field.type === 'select' && field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
      </Box>
    );
  };

  const renderPreviewContent = () => {
    if (!previewData) return null;

    return (
      <Box>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab label="Overview" />
          <Tab label="Success Rate" />
          <Tab label="Execution Time" />
          <Tab label="Resource Usage" />
          <Tab label="Dependencies" />
        </Tabs>
        <Box>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="medium">
                Workflow Overview
              </Typography>
              <Box sx={styles.metricCard}>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography sx={styles.metricValue}>{previewData.name}</Typography>
              </Box>
              <Box sx={styles.metricCard}>
                <Typography variant="body2" color="text.secondary">Trigger</Typography>
                <Typography sx={styles.metricValue}>{previewData.trigger.type}</Typography>
              </Box>
              <Box sx={styles.metricCard}>
                <Typography variant="body2" color="text.secondary">Steps</Typography>
                <Typography sx={styles.metricValue}>{previewData.steps.length}</Typography>
              </Box>
            </Box>
          )}
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Success Rate Analysis</Typography>
              <Typography>Overall Success Rate: {previewData.successRate}%</Typography>
              <Typography>Historical Success Rate: {previewData.historicalSuccessRate}%</Typography>
              <Typography>Step-by-step Success Rate:</Typography>
              {previewData.stepSuccessRates.map((rate, index) => (
                <Box key={index} sx={{ ml: 2, mb: 1 }}>
                  <Typography>
                    Step {index + 1}: {rate}%
                    {rate < 90 && (
                      <Chip
                        size="small"
                        color="warning"
                        label="Low Success Rate"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Common failures: {previewData.stepFailures[index]?.join(', ') || 'None'}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Execution Time Analysis</Typography>
              <Typography>Estimated Total Time: {previewData.estimatedTime}ms</Typography>
              <Typography>Average Historical Time: {previewData.averageTime}ms</Typography>
              <Typography>Step-by-step Time:</Typography>
              {previewData.stepTimes.map((time, index) => (
                <Box key={index} sx={{ ml: 2, mb: 1 }}>
                  <Typography>
                    Step {index + 1}: {time}ms
                    {time > 1000 && (
                      <Chip
                        size="small"
                        color="warning"
                        label="Slow Step"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Min: {previewData.stepTimeRanges[index]?.min}ms, 
                    Max: {previewData.stepTimeRanges[index]?.max}ms
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 3 && (
            <Box>
              <Typography variant="h6" gutterBottom>Resource Usage</Typography>
              <Typography>CPU Usage: {previewData.cpuUsage}%</Typography>
              <Typography>Memory Usage: {previewData.memoryUsage}MB</Typography>
              <Typography>Network Usage: {previewData.networkUsage}KB/s</Typography>
              <Typography>Step-by-step Resource Usage:</Typography>
              {previewData.stepResources.map((resource, index) => (
                <Box key={index} sx={{ ml: 2, mb: 1 }}>
                  <Typography>
                    Step {index + 1}:
                    {resource.cpu > 50 && (
                      <Chip
                        size="small"
                        color="warning"
                        label="High CPU"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CPU: {resource.cpu}%, Memory: {resource.memory}MB
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom>Dependencies</Typography>
              <Typography>External Services:</Typography>
              {previewData.externalServices.map((service, index) => (
                <Box key={index} sx={{ ml: 2, mb: 1 }}>
                  <Typography>
                    {service.name}
                    {!service.available && (
                      <Chip
                        size="small"
                        color="error"
                        label="Unavailable"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {service.status}, Latency: {service.latency}ms
                  </Typography>
                </Box>
              ))}
              <Typography sx={{ mt: 2 }}>Required Permissions:</Typography>
              {previewData.requiredPermissions.map((permission, index) => (
                <Box key={index} sx={{ ml: 2, mb: 1 }}>
                  <Typography>
                    {permission.name}
                    {!permission.granted && (
                      <Chip
                        size="small"
                        color="error"
                        label="Missing"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Container sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.header}>
          <Typography variant="h4" fontWeight="medium">
            Create New Workflow
          </Typography>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={handlePreview}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Preview
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={styles.section}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Basic Information
            </Typography>
            <TextField
              fullWidth
              label="Workflow Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              margin="normal"
            />
          </Box>

          <Box sx={styles.section}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Trigger Configuration
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Trigger Type</InputLabel>
              <Select
                name="type"
                value={formData.trigger.type}
                onChange={handleTriggerChange}
                label="Trigger Type"
              >
                {Object.entries(triggerTypes).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {renderTriggerConfig()}
          </Box>

          <Box sx={styles.section}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
              Automation Steps
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Add Automation</InputLabel>
              <Select
                value=""
                onChange={(e) => addStep(e.target.value)}
                label="Add Automation"
              >
                {automations.map((automation) => (
                  <MenuItem key={automation.id} value={automation.id}>
                    {automation.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {formData.steps.map((step, index) => {
              const automation = automations.find(a => a.id === step.type);
              return (
                <Box key={index} sx={styles.stepCard}>
                  <Box sx={styles.stepHeader}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {index + 1}. {automation?.title}
                    </Typography>
                    <Box sx={styles.stepActions}>
                      <Tooltip title="Configure">
                        <IconButton
                          size="small"
                          onClick={() => openConfigDialog(step, index)}
                          sx={{ color: 'primary.main' }}
                        >
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => removeStep(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography color="text.secondary" variant="body2">
                    {automation?.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={() => navigate('/workflows')}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Workflow'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Configuration Dialog */}
      <Dialog
        open={configDialogOpen}
        onClose={() => setConfigDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={styles.previewDialog}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="medium">
            Configure Step
          </Typography>
        </DialogTitle>
        <DialogContent>
          {renderStepConfig()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={saveConfig} variant="contained" sx={{ borderRadius: 2 }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        sx={styles.previewDialog}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="medium">
            Workflow Preview
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.previewTab}>
            {renderPreviewContent()}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)} sx={{ borderRadius: 2 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateWorkflow; 