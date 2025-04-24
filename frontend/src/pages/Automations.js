import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import {
  Translate as TranslateIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  SentimentSatisfied as SentimentIcon,
  Description as DescriptionIcon,
  Search as SearchIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  LocalOffer as TagIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const automations = [
  {
    id: 'document-translation',
    title: 'Document Translation',
    description: 'Automatically translate documents between languages',
    icon: <TranslateIcon fontSize="large" />,
    path: '/automations/translate'
  },
  {
    id: 'email-summarizer',
    title: 'Email Summarizer',
    description: 'Get concise summaries of long emails',
    icon: <EmailIcon fontSize="large" />,
    path: '/automations/summarize-email'
  },
  {
    id: 'daily-planner',
    title: 'Daily Planner Generator',
    description: 'Create optimized daily schedules based on your tasks',
    icon: <ScheduleIcon fontSize="large" />,
    path: '/automations/daily-planner'
  },
  {
    id: 'content-calendar',
    title: 'Content Calendar Generator',
    description: 'Plan and organize your content creation schedule',
    icon: <CalendarIcon fontSize="large" />,
    path: '/automations/content-calendar'
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis',
    description: 'Analyze sentiment in social media posts and comments',
    icon: <SentimentIcon fontSize="large" />,
    path: '/automations/sentiment-analysis'
  },
  {
    id: 'contract-review',
    title: 'Contract Reviewer',
    description: 'Review contracts and highlight important points',
    icon: <DescriptionIcon fontSize="large" />,
    path: '/automations/contract-review'
  },
  {
    id: 'seo-score',
    title: 'SEO Score Generator',
    description: 'Analyze and improve your content\'s SEO score',
    icon: <SearchIcon fontSize="large" />,
    path: '/automations/seo-score'
  },
  {
    id: 'pdf-extraction',
    title: 'PDF Content Extractor',
    description: 'Extract text and data from PDF documents',
    icon: <PdfIcon fontSize="large" />,
    path: '/automations/pdf-extract'
  },
  {
    id: 'ocr',
    title: 'OCR from Images',
    description: 'Extract text from images using OCR technology',
    icon: <ImageIcon fontSize="large" />,
    path: '/automations/ocr'
  },
  {
    id: 'ticket-tag',
    title: 'Support Ticket Tagger',
    description: 'Automatically tag and categorize support tickets',
    icon: <TagIcon fontSize="large" />,
    path: '/automations/ticket-tag'
  }
];

const Automations = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Automations</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/automations/logs')}
        >
          View Logs
        </Button>
      </Box>

      <Grid container spacing={3}>
        {automations.map((automation) => (
          <Grid item xs={12} sm={6} md={4} key={automation.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  {automation.icon}
                  <Typography variant="h6" component="h2" ml={1}>
                    {automation.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {automation.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(automation.path)}
                >
                  Use Automation
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Automations; 