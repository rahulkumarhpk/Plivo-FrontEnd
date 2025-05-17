# Status Page Frontend

A modern web application for managing system status pages and incident reports.

## Features

- Public status page showing service health
- Incident management with real-time updates
- Service status management
- Organization management
- Dashboard for administrators

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Query
- Axios
- React Router DOM

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file with:
```
VITE_API_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── api/           # API client and endpoints
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── layouts/       # Page layout components
├── pages/         # Page components
└── lib/          # Utilities and helpers
```

## API Integration

The application connects to a backend API running at `VITE_API_URL`. The following resources are available:

- `/organizations` - Organization management
- `/services` - Service status management
- `/incidents` - Incident management
- `/public/*` - Public status endpoints

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

Private and Confidential
