# NorthStar Sports

## Overview
NorthStar Sports is a modern, production-ready sports wagering platform built with a robust, scalable architecture. The codebase is fully optimized for maintainability, testability, and rapid development, supporting both mock and real data sources for seamless UI and backend integration.

## Features
- **Next.js Frontend**: App Router, three-panel layout, responsive design
- **State Management**: Zustand stores for user, bet slip, navigation, and bets
- **Backend**: Node.js/Express with Prisma ORM for persistent data
- **Service Abstraction Layer**: Pluggable data source (mock or Prisma) via environment variable
- **Testing**: Jest and React Testing Library for unit and component tests
- **Type Safety**: Comprehensive TypeScript usage across frontend and backend
- **CI/CD Integration**: Automated tests and linting in GitHub Actions

## Monorepo Structure
```
NorthStarSports/
├── frontend/      # Next.js app, Zustand stores, services, tests
├── backend/       # Node.js/Express API, Prisma schema, migrations
├── scripts/       # Dev tools, automation scripts
├── docs/          # API, deployment, and integration guides
├── .github/       # CI/CD workflows
```

## Getting Started
### Prerequisites
- Node.js >= 18
- npm >= 9
- PostgreSQL (for production data)

### Installation
```sh
npm install
```

### Development
#### Frontend (Next.js)
```sh
npm run dev --workspace=@northstar/frontend
```
#### Backend (Node.js/Express)
```sh
npm run dev --workspace=@northstar/backend
```

### Testing
Run all frontend tests:
```sh
npm run test:frontend
```

### Environment Variables
- `NEXT_PUBLIC_DATA_SOURCE`: `mock` (default) or `prisma` to switch data source
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL for production

### Data Layer
- **Mock Data**: Used for rapid UI development and testing
- **Prisma Data**: Connects to a real database for production
- Switch between sources using the `NEXT_PUBLIC_DATA_SOURCE` env variable

## Service Abstraction Layer
All data operations use the PrismaApiService directly.

## Testing & CI/CD
- Jest and React Testing Library are configured for comprehensive test coverage
- GitHub Actions workflow runs lint, type-check, and tests on every push/PR

## Contributing
1. Fork the repo and create a feature branch
2. Make changes and add tests
3. Run `npm run lint` and `npm run test:frontend`
4. Submit a pull request

## License
MIT

## Maintainers
- [elliotttmiller](https://github.com/elliotttmiller)

---

For detailed API and deployment instructions, see the `docs/` folder.
