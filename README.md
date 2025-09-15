# NorthStarSports

A modern, full-stack sports betting application built with React, TypeScript, Node.js, Express, and Redis Cloud. This codebase is designed for real-time, persistent, and scalable sports wagering experiences, featuring a professional Redis data model, robust backend API, and a fully synchronized frontend.

---

## Table of Contents
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Redis Data Model](#redis-data-model)
- [Backend API](#backend-api)
- [Frontend Integration](#frontend-integration)
- [Context & State Management](#context--state-management)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- Real-time sports betting with persistent state
- Professional Redis Cloud integration for all entities
- Modular, RESTful backend API (Node.js/Express)
- Modern React frontend with TypeScript, Vite, and Tailwind CSS
- Robust context and hooks for user, betslip, bets, and account management
- Full CRUD for users, betslips, bets, and games
- Type-safe, scalable, and production-ready codebase

---

## Architecture Overview
- **Backend**: Node.js + Express REST API, Redis Cloud for all persistent storage
- **Frontend**: React + TypeScript, Vite, Tailwind CSS, React Context for state
- **Data Model**: Professional Redis schema (see `backend/REDIS_DATA_MODEL.md`)
- **API**: RESTful endpoints for all major entities under `/api`

---

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, node-redis v4+, dotenv
- **Database**: Redis Cloud (Hashes, Strings, Lists, Sorted Sets)
- **Other**: React Context, Custom Hooks, REST API, ESLint, Prettier

---

## Folder Structure
```
NorthStarSports/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   ├── .env
│   ├── REDIS_DATA_MODEL.md
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── ...
│   ├── CONTEXT_INTEGRATION_GUIDE.md
│   └── ...
├── README.md
└── ...
```

---

## Setup & Installation

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Redis Cloud account (free tier supported)

### 1. Clone the Repository
```sh
git clone https://github.com/elliotttmiller/NorthStarSports.git
cd NorthStarSports
```

### 2. Backend Setup
```sh
cd backend
cp .env.example .env # Fill in your Redis Cloud credentials
npm install
npm run dev
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```

### 4. Environment Variables
- See `backend/.env.example` for required variables:
  - `REDIS_URL` or `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
- Example:
```
REDIS_URL=redis://default:<password>@<host>:<port>
```

---

## Redis Data Model
- See `backend/REDIS_DATA_MODEL.md` for a full description of the Redis key structure, entity schemas, and access patterns.
- Entities: `user`, `betslip`, `bet`, `game`, `account` (balance, deposit history)
- All data is stored in Redis using professional, scalable patterns (Hashes, Lists, etc.)

---

## Backend API
- All endpoints are under `/api`
- RESTful routes for:
  - Users: `/api/user/:userId`
  - Betslips: `/api/betslip/:userId/active`, `/api/betslip/:userId/history`
  - Bets: `/api/bet/:betId`
  - Games: `/api/game/:gameId`
- See `backend/src/routes/` and `backend/src/controllers/` for details
- All endpoints are fully documented with request/response examples in code comments

---

## Frontend Integration
- Modern React app with Vite and TypeScript
- All state is managed via React Context and custom hooks
- See `frontend/CONTEXT_INTEGRATION_GUIDE.md` for usage
- All API calls are abstracted in `src/hooks/useApi.ts`
- TypeScript types for all entities in `src/types/`

---

## Context & State Management
- `UserContext`: User profile, balance, deposit history, bet history
- `BetHistoryContext`: Betslip history
- `BetsContext`: Bets CRUD and state
- All contexts are fully persistent and synchronized with backend/Redis
- See `frontend/src/context/` for implementation

---

## Development Workflow
- Use `npm run dev` in both `backend` and `frontend` for local development
- All code is linted and formatted (ESLint, Prettier)
- Modular, maintainable, and scalable codebase
- GitHub Actions or similar CI/CD can be added for deployment

---

## Testing
- Unit and integration tests can be added in both backend and frontend
- Use your preferred test runner (Jest, React Testing Library, etc.)
- Example test files can be placed in `__tests__/` or alongside modules

---

## Contributing
1. Fork the repo and create your branch
2. Commit your changes with clear messages
3. Open a pull request and describe your changes
4. All contributions are welcome!

---

## License
MIT License. See `LICENSE` file for details.

---

## Contact
For questions or support, open an issue on GitHub or contact the maintainer.
