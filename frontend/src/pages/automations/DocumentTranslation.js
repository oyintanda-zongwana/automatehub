import React from 'react';
import axios from 'axios';
import AutomationForm from '../../components/AutomationForm';

const DocumentTranslation = () => {
  const handleSubmit = async (formData) => {
    const response = await axios.post('/api/automations/translate', formData);
    return response.data;
  };

  const fields = [
    {
      name: 'document',
      label: 'Document Text',
      required: true,
      multiline: true,
      rows: 6,
      helperText: 'Enter the text you want to translate'
    },
    {
      name: 'targetLanguage',
      label: 'Target Language',
      required: true,
      helperText: 'Enter the language code (e.g., es for Spanish, fr for French)'
    }
  ];

  return (
    <AutomationForm
      title="Document Translation"
      description="Translate your documents between different languages using AI-powered translation."
      fields={fields}
      onSubmit={handleSubmit}
      submitButtonText="Translate Document"
    />
  );
};

export default DocumentTranslation; 