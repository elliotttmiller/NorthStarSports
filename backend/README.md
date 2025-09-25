# NorthStar Sports Backend

## Overview
This is the Node.js/Express backend for NorthStar Sports, featuring a Prisma ORM data layer, robust API endpoints, and seamless integration with the frontend via a pluggable service abstraction.

## Features
- Express.js REST API
- Prisma ORM for database access
- TypeScript for type safety
- Comprehensive error handling
- Environment-based config (mock or production)
- Jest for backend unit/integration tests
- CI/CD integration via GitHub Actions

## Directory Structure
```
backend/
├── src/
│   ├── controllers/   # Route handlers
│   ├── models/        # Prisma models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── config/        # App configuration
│   └── ...
├── prisma/            # Prisma schema and migrations
├── tests/             # Jest test suites
├── package.json       # Project scripts and dependencies
└── README.md          # This file
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

### Database Setup
- Configure your database in `.env`
- Run migrations:
```sh
npx prisma migrate dev
```

### Testing
```sh
npm run test
```

## Environment Variables
- `DATABASE_URL`: Connection string for your database
- Other config in `.env`

## Contributing
- Fork and branch from `main`
- Add features and tests
- Run lint and tests before PR

## License
MIT
