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
          { value: 'GET', label: 'GET' }
        ]
      },
      {
        name: 'path',
        label: 'Webhook Path',
        type: 'text',
        helperText: 'The path will be generated automatically'
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
          { value: 'system_event', label: 'System Event' }
        ]
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
          { value: 'system', label: 'System-based' }
        ]
      },
      {
        name: 'value',
        label: 'Condition Value',
        type: 'text',
        helperText: 'Enter the condition value'
      }
    ]
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

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">
            Create New Workflow
          </Typography>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={handlePreview}
            disabled={loading}
          >
            Preview
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Workflow Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
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

          <Typography variant="h6" gutterBottom>
            Automation Steps
          </Typography>

          <Box sx={{ mb: 3 }}>
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
                <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                      {index + 1}. {automation?.title}
                    </Typography>
                    <Box>
                      <Tooltip title="Configure">
                        <IconButton
                          size="small"
                          onClick={() => openConfigDialog(step, index)}
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
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
      >
        <DialogTitle>Configure Step</DialogTitle>
        <DialogContent>
          {renderStepConfig()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfigDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveConfig} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Workflow Preview</DialogTitle>
        <DialogContent>
          {previewData && (
            <Box>
              <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                <Tab label="Overview" />
                <Tab label="Success Rate" />
                <Tab label="Execution Time" />
              </Tabs>
              <Box sx={{ mt: 2 }}>
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Workflow Overview</Typography>
                    <Typography>Name: {previewData.name}</Typography>
                    <Typography>Trigger: {previewData.trigger.type}</Typography>
                    <Typography>Steps: {previewData.steps.length}</Typography>
                  </Box>
                )}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Success Rate Analysis</Typography>
                    <Typography>Overall Success Rate: {previewData.successRate}%</Typography>
                    <Typography>Step-by-step Success Rate:</Typography>
                    {previewData.stepSuccessRates.map((rate, index) => (
                      <Typography key={index}>
                        Step {index + 1}: {rate}%
                      </Typography>
                    ))}
                  </Box>
                )}
                {activeTab === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Execution Time Analysis</Typography>
                    <Typography>Estimated Total Time: {previewData.estimatedTime}ms</Typography>
                    <Typography>Step-by-step Time:</Typography>
                    {previewData.stepTimes.map((time, index) => (
                      <Typography key={index}>
                        Step {index + 1}: {time}ms
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateWorkflow; 