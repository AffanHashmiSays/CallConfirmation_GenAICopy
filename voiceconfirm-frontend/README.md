# VoiceConfirm Frontend

React.js frontend for the VoiceConfirm SaaS platform - an AI-powered voice order confirmation system for e-commerce businesses.

## Features

- **Modern React**: Built with React 18 and TypeScript
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Authentication**: JWT-based authentication with protected routes
- **Dashboard**: Comprehensive analytics and monitoring
- **Order Management**: Create, view, and manage orders
- **Call Management**: Monitor voice confirmation calls
- **Analytics**: Detailed performance insights and charts
- **Settings**: Configurable voice settings and preferences
- **Real-time Updates**: Live status updates for calls and orders

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API communication
- **Recharts** for data visualization
- **Heroicons** for icons
- **React Hook Form** for form handling

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- VoiceConfirm Backend API running

### Local Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
REACT_APP_API_URL=http://localhost:8000
```

5. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Environment Variables

Configure the following environment variables:

### Required
- `REACT_APP_API_URL`: Backend API URL

### Optional
- `REACT_APP_NAME`: Application name (default: VoiceConfirm)
- `REACT_APP_VERSION`: Application version
- `REACT_APP_ENVIRONMENT`: Environment (development/production)

## Google Cloud Run Deployment

### Prerequisites
- Google Cloud account with billing enabled
- Google Cloud CLI installed and configured
- Backend API deployed and accessible

### Build for Production

1. **Create production build**:
```bash
npm run build
```

2. **Test production build locally**:
```bash
npm install -g serve
serve -s build -l 3000
```

### Deploy to Cloud Run

1. **Create a simple server for serving static files** (create `server.js`):
```javascript
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

2. **Add express to package.json**:
```bash
npm install express
```

3. **Update package.json scripts**:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "react-scripts start",
    "build": "react-scripts build"
  }
}
```

4. **Deploy to Cloud Run**:
```bash
# Build and deploy
gcloud run deploy voiceconfirm-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars="REACT_APP_API_URL=https://your-backend-url"
```

### Alternative: Deploy to Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Initialize Firebase**:
```bash
firebase init hosting
```

3. **Build and deploy**:
```bash
npm run build
firebase deploy
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Sidebar, etc.)
│   ├── Auth/           # Authentication components
│   ├── Dashboard/      # Dashboard-specific components
│   ├── Orders/         # Order management components
│   ├── Calls/          # Call management components
│   ├── Analytics/      # Analytics components
│   ├── Settings/       # Settings components
│   └── Common/         # Common/shared components
├── pages/              # Page components
│   ├── Auth/           # Login, Register pages
│   ├── Dashboard/      # Dashboard page
│   ├── Orders/         # Orders page
│   ├── Calls/          # Calls page
│   ├── Analytics/      # Analytics page
│   └── Settings/       # Settings page
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── services/           # API services
│   └── api.ts          # API service layer
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── App.tsx             # Main App component
└── index.tsx           # Application entry point
```

## Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Automatic token refresh
- Login/logout functionality

### Dashboard
- Real-time statistics
- Recent orders and calls
- Performance metrics
- Quick action buttons

### Order Management
- Create and manage orders
- Bulk import functionality
- Advanced filtering and search
- Order status tracking

### Call Management
- Monitor voice confirmation calls
- View call transcripts and recordings
- Call outcome tracking
- Language and voice settings

### Analytics
- Performance charts and graphs
- Success rate tracking
- Call duration analytics
- Language distribution

### Settings
- Profile management
- Voice configuration
- API key management
- Notification preferences

## API Integration

The frontend communicates with the backend API using Axios. All API calls are handled through the `apiService` class which includes:

- Automatic JWT token handling
- Request/response interceptors
- Error handling
- Token refresh logic

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Built with mobile-first approach using Tailwind CSS.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Production Considerations

1. **Environment Variables**: Set production API URL
2. **Performance**: Enable gzip compression
3. **Security**: Configure CSP headers
4. **Monitoring**: Set up error tracking
5. **Analytics**: Configure usage analytics
6. **SEO**: Add meta tags and descriptions

## Deployment Checklist

- [ ] Update `REACT_APP_API_URL` to production backend
- [ ] Build production bundle (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy to Cloud Run or Firebase Hosting
- [ ] Configure custom domain (optional)
- [ ] Set up monitoring and analytics
- [ ] Test all functionality in production

## Support

For support and questions, please contact the development team.

## License

This project is licensed under the MIT License.

## Author

Built by Affan Hashmi

