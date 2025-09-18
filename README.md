# NorthStar Sports - Sports Betting Platform

A modern, full-stack sports betting application built with React, TypeScript, Node.js, and Redis.

## 🏗️ Architecture Overview

```
NorthStar Sports/
├── backend/          # Node.js/Express API server
├── frontend/         # React/TypeScript client
├── scripts/          # Development and deployment scripts
├── docs/             # Project documentation
└── docker-compose.yml  # Development environment
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Redis** (cloud instance or local)
- **Git**

### Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/elliotttmiller/NorthStarSports.git
   cd NorthStarSports
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend && npm install && cd ..

   # Install frontend dependencies
   cd frontend && npm install && cd ..
   ```

3. **Environment Configuration**

   ```bash
   # Copy environment templates
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

   # Configure your environment variables
   ```

4. **Start Development Servers**

   ```bash
   # Using Python orchestrator (recommended)
   python scripts/dev-start.py

   # Or manually:
   # Terminal 1: Backend
   cd backend && npm run dev

   # Terminal 2: Frontend
   cd frontend && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - API Documentation: http://localhost:4000/api-docs

## 🛠️ Technology Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **Radix UI** component library
- **React Query** for data fetching
- **React Router** for navigation

### Backend

- **Node.js** with TypeScript
- **Express.js** web framework
- **Redis** for data storage and caching
- **Joi** for data validation
- **Pino** for structured logging
- **JWT** for authentication
- **Rate limiting** and security middleware

### DevOps

- **Docker** containerization
- **GitHub Actions** CI/CD
- **ESLint** & **Prettier** for code quality
- **Jest** for testing

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── tests/              # Test suites
└── dist/               # Compiled output

frontend/
├── src/
│   ├── components/     # React components
│   ├── context/        # React contexts
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utility libraries
│   ├── pages/          # Route components
│   ├── services/       # API services
│   └── types/          # TypeScript types
└── dist/               # Build output
```

## 🎯 Key Features

### ✅ Completed

- Modern responsive UI design
- Real-time sports odds display
- Interactive bet slip functionality
- Mobile-first responsive design
- Professional game card layouts
- Smooth animations and transitions
- Type-safe API layer
- Redis-based data storage
- Comprehensive error handling

### 🚧 In Development

- User authentication system
- Live betting features
- Advanced statistics
- Payment integration
- Admin dashboard

## 📚 Available Scripts

### Root Level

```bash
npm run dev:all        # Start both frontend and backend
npm run build:all      # Build both applications
npm run test:all       # Run all tests
npm run lint:all       # Lint all code
```

### Backend Scripts

```bash
npm run dev            # Development server with hot reload
npm run build          # Build for production
npm run start          # Start production server
npm run test           # Run test suite
npm run lint           # Lint TypeScript code
```

### Frontend Scripts

```bash
npm run dev            # Vite development server
npm run build          # Build for production
npm run preview        # Preview production build
npm run test           # Run Jest tests
npm run lint           # Lint React/TypeScript code
```

## 🔧 Development Guidelines

### Code Style

- **TypeScript** for type safety
- **ESLint** + **Prettier** for formatting
- **Conventional Commits** for git messages
- **Component-driven** development

### Git Workflow

1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and tests locally
4. Create pull request with description
5. Code review and merge

### Testing Strategy

- **Unit tests** for utilities and services
- **Integration tests** for API endpoints
- **Component tests** for React components
- **E2E tests** for critical user flows

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Frontend Guide](frontend/README.md)
- [Backend Guide](backend/README.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## 🚀 Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment

```bash
# Build applications
npm run build:all

# Start production servers
cd backend && npm start &
cd frontend && npm run preview &
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:

- Code of conduct
- Development setup
- Pull request process
- Coding standards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: Elliott Miller
- **Frontend Specialist**: React/TypeScript Expert
- **Backend Architect**: Node.js/Redis Specialist

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/elliotttmiller/NorthStarSports/issues)
- **Discussions**: [GitHub Discussions](https://github.com/elliotttmiller/NorthStarSports/discussions)
- **Email**: support@northstarsports.dev

---

## 📊 Project Stats

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)
![React](https://img.shields.io/badge/React-19+-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

**Built with ❤️ for the sports betting community**
