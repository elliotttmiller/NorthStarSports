# NorthStarSports Backend

## Overview
A professional, scalable Node.js + Express + TypeScript backend for the NorthStarSports betting platform. Built with Redis for data storage, comprehensive logging with Pino, and structured for local development and production deployment.

## Features
- **RESTful API**: Complete endpoints for users, bets, games, and key-value operations
- **Redis Integration**: Production-ready Redis Cloud connection for all data operations
- **TypeScript**: Full type safety with comprehensive type definitions
- **Professional Logging**: Structured logging with Pino and pretty-printing for development
- **Modular Architecture**: Clean separation of controllers, services, routes, and middleware
- **CORS Enabled**: Configured for frontend integration
- **Production Ready**: Docker support, environment configuration, and deployment scripts

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Redis Cloud
- **Logging**: Pino with pretty-printing
- **Development**: Nodemon, ESLint, ts-node
- **Testing**: Jest (configured)

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Redis Cloud account (free tier available)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```bash
PORT=4000
REDIS_HOST=redis-19041.c228.us-central1-1.gce.redns.redis-cloud.com
REDIS_PORT=19041
REDIS_USERNAME=default
REDIS_PASSWORD=your-redis-password
```

### 3. Development Server
```bash
npm run dev
```
The backend will run on [http://localhost:4000](http://localhost:4000)

### 4. Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
- `GET /api/v1/health` — Server health status

### User Management
- `GET /api/v1/user/:id` — Get user profile
- `POST /api/v1/user/:id` — Create/update user profile

### Betting Operations  
- `GET /api/v1/bet/:id` — Get bet details
- `POST /api/v1/bet/:id` — Place a bet

### Game Data
- `GET /api/v1/game/:id` — Get game information
- `POST /api/v1/game/:id` — Update game data

### Key-Value Store
- `GET /api/v1/kv/:key` — Get value for key
- `POST /api/v1/kv/:key` — Set value for key (JSON body: `{ value: ... }`)

### Redis Operations
- `GET /api/v1/redis/:key` — Direct Redis key access
- `POST /api/v1/redis/:key` — Set Redis key-value

## Project Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   ├── userController.ts
│   │   ├── betController.ts
│   │   ├── gameController.ts
│   │   ├── kvController.ts
│   │   └── redisController.ts
│   ├── services/        # Business logic
│   │   ├── userService.ts
│   │   ├── betService.ts
│   │   ├── gameService.ts
│   │   └── kvService.ts
│   ├── routes/          # API route definitions
│   │   ├── user.ts
│   │   ├── bet.ts
│   │   ├── game.ts
│   │   ├── kv.ts
│   │   └── redis.ts
│   ├── middlewares/     # Express middleware
│   │   ├── errorHandler.ts
│   │   ├── validateRequest.ts
│   │   └── validateUser.ts
│   ├── models/          # Data models (JS legacy)
│   ├── utils/           # Utility functions
│   │   ├── logger.ts
│   │   └── responseFormatter.ts
│   ├── config/          # Configuration
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/               # Test files
├── Dockerfile          # Container configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Redis Data Model

### Key Patterns & Types

| Key Pattern                  | Type        | Purpose/Fields                                                                 |
|------------------------------|-------------|-------------------------------------------------------------------------------|
| user:{userId}                | Hash        | User profile: username, email, balance, etc.                                  |
| session:{sessionId}          | String      | UserId (for session management)                                               |
| betslip:{userId}:active      | String/JSON | Current bet slip (bets, type, totalStake, totalPayout, totalOdds)             |
| betslip:{userId}:history     | List        | List of betslip IDs (for bet history)                                         |
| bet:{betId}                  | String/JSON | Bet details: gameId, odds, stake, payout, type, selection, playerProp, status |
| game:{gameId}                | String/JSON | Game info: teams, odds, status, startTime, venue                              |
| playerprop:{propId}          | String/JSON | Player prop details: playerId, statType, line, odds, etc.                     |
| leaderboard:weekly           | Sorted Set  | userId -> score                                                               |
| leaderboard:alltime          | Sorted Set  | userId -> score                                                               |

### Usage Examples
- Set user profile: `HSET user:123 username "elliott" email "elliott@email.com" balance 1000`
- Store active bet slip: `SET betslip:123:active '{"bets":[...],"betType":"parlay",...}'`
- Add bet to history: `LPUSH betslip:123:history betslipId`
- Update leaderboard: `ZINCRBY leaderboard:weekly 100 123`

See `src/services/kvService.ts` for complete CRUD functions.

## Security Guidelines

### Development
- All secrets stored in `.env` (never commit real credentials)
- Input validation with Joi schemas in controllers
- Structured logging with Pino (no console.log in production)
- CORS configured for frontend origin

### Production
- Use HTTPS (terminate SSL at load balancer/Nginx)
- Sanitize and escape all user input
- Use helmet middleware for security headers
- Restrict CORS origins to production domains
- Keep all dependencies updated
- Run containers as non-root user
- Use PM2 or similar for process management
- Monitor logs and set up error alerts

## Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run lint` | Run ESLint code analysis |
| `npm run type-check` | Check TypeScript types without building |
| `npm test` | Run test suite (when tests are added) |

## Docker Support

Build and run with Docker:
```bash
docker build -t northstarsports-backend .
docker run -p 4000:4000 --env-file .env northstarsports-backend
```

## Contributing

1. Follow TypeScript best practices
2. Use structured logging with the provided logger
3. Add input validation for all endpoints
4. Update this README when adding new features
5. Ensure all environment variables are documented

## Deployment

The backend is ready for deployment to:
- **Cloud Platforms**: AWS, GCP, Azure
- **Container Orchestration**: Kubernetes, Docker Swarm
- **Serverless**: AWS Lambda, Vercel, Netlify Functions
- **Traditional VPS**: PM2 process management

---

**Repository**: [NorthStarSports](https://github.com/elliotttmiller/NorthStarSports)  
**Maintainer**: Elliott Miller (@elliotttmiller)  
**License**: MIT
