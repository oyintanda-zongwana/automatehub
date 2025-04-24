import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Automations from './pages/Automations';
import AutomationLogs from './pages/AutomationLogs';
import DocumentTranslation from './pages/automations/DocumentTranslation';
// Import other automation pages as needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/automations/logs" element={<AutomationLogs />} />
            <Route path="/automations/translate" element={<DocumentTranslation />} />
            {/* Add other automation routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 