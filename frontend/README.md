# NorthStar Sports Frontend

## Overview
This is the Next.js frontend for NorthStar Sports, featuring a modern, responsive UI, robust state management, and a pluggable data layer for both mock and production data sources.

## Features
- App Router with three-panel layout
- Zustand state management (user, bet slip, navigation, bets)
- Service abstraction layer for data (mock or Prisma)
- TypeScript for type safety
- Jest & React Testing Library for unit/component tests
- TailwindCSS for styling
- CI/CD integration via GitHub Actions

## Directory Structure
```
frontend/
├── src/
│   ├── components/   # React components
│   ├── store/        # Zustand stores
│   ├── services/     # ApiService, MockApiService, PrismaApiService
│   ├── lib/          # Utility libraries
│   ├── types/        # TypeScript types
│   ├── mock/         # Mock data files
│   └── ...
├── public/           # Static assets
├── jest.config.js    # Jest configuration
├── jest.setup.js     # Jest setup
├── package.json      # Project scripts and dependencies
└── README.md         # This file
```

## Getting Started
### Install dependencies
```sh
npm install
```

### Development
```sh
npm run dev
```

### Testing
```sh
npm run test
```

### Environment Variables
- `NEXT_PUBLIC_DATA_SOURCE`: `mock` (default) or `prisma`
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL

## Data Layer
Switch between mock and production data using the service abstraction layer and environment variable.

## Contributing
- Fork and branch from `main`
- Add features and tests
- Run lint and tests before PR

## License
MIT
