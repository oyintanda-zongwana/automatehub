import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';

const AutomationForm = ({
  title,
  description,
  fields,
  onSubmit,
  submitButtonText = 'Run Automation'
}) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await onSubmit(formData);
      setResult(response);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" paragraph>
        {description}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              fullWidth
              margin="normal"
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              multiline={field.multiline}
              rows={field.rows}
              helperText={field.helperText}
              error={!!error}
            />
          ))}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Automation completed successfully!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : submitButtonText}
        </Button>
      </form>

      {result && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Result
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </Paper>
        </Box>
      )}
    </Paper>
  );
};

export default AutomationForm; 