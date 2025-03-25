# AutomateHub

A modern SaaS platform for workflow automation with enterprise-grade features and monetization infrastructure.

## Project Structure

```
automatehub/
├── frontend/           # Vue.js frontend
│   ├── src/
│   │   ├── api/       # API services
│   │   ├── store/     # State management
│   │   ├── views/     # Page components
│   │   └── styles/    # Theme and styling
├── backend/           # Node.js backend
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── config/        # Configuration
│   └── utils/         # Utilities
└── .github/
    └── workflows/     # CI/CD pipelines
```

## Features

- **Pricing Tiers**

  - Free: Basic workflows, 10 tasks/month
  - Plus ($29): Slack/Email integrations, 100 tasks/month
  - Pro ($79): Unlimited tasks, Advanced analytics
  - Business ($199): Team management, Enterprise support

- **Enterprise Security**

  - Rate limiting
  - CORS configuration
  - Security headers
  - JWT authentication

- **Workspace Management**
  - Team collaboration
  - Role-based access
  - Activity tracking

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run serve
```

### Backend Development

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

### Frontend (.env.development)

```
VUE_APP_API_URL=http://localhost:5000
VUE_APP_ENV=development
```

### Backend (.env)

```
MONGO_URI=your_mongodb_uri
NODE_ENV=development
```

## Deployment

- Frontend: Deployed to Vercel
- Backend: Deployed to AWS ECS
- CI/CD: GitHub Actions

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
