# NorthStar Sports - Backend API

Node.js/Express backend API for the NorthStar Sports betting platform.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Redis Cloud instance or local Redis server

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Configure your .env file with Redis credentials
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run test suite
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test user.test.js
```

## 🏗️ Architecture

### Directory Structure

```
src/
├── controllers/    # HTTP request handlers
├── middlewares/    # Express middleware functions
├── models/         # Data models and Redis schemas
├── routes/         # API route definitions
├── services/       # Business logic layer
└── utils/          # Utility functions and helpers
```

### Key Components

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and data operations
- **Models**: Define data structures and Redis operations
- **Middleware**: Authentication, validation, error handling
- **Routes**: API endpoint definitions

## 📡 API Endpoints

### User Management

```bash
GET    /api/v1/user/:id          # Get user profile
POST   /api/v1/user              # Create new user
PUT    /api/v1/user/:id          # Update user profile
DELETE /api/v1/user/:id          # Delete user account
```

### Games & Odds

```bash
GET    /api/v1/games             # Get all games
GET    /api/v1/games/:id         # Get specific game
GET    /api/v1/games/sport/:sport # Get games by sport
POST   /api/v1/games             # Create new game (admin)
```

### Betting

```bash
GET    /api/v1/bets/:userId      # Get user's bets
POST   /api/v1/bets              # Place new bet
PUT    /api/v1/bets/:id          # Update bet (if allowed)
DELETE /api/v1/bets/:id          # Cancel bet (if allowed)
```

### Key-Value Store

```bash
GET    /api/v1/kv/:key           # Get value by key
POST   /api/v1/kv                # Set key-value pair
DELETE /api/v1/kv/:key           # Delete key
```

## 💾 Data Models

### User Model

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  depositHistory: Transaction[];
  betHistory: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Game Model

```typescript
interface Game {
  id: string;
  leagueId: string;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
  status: "upcoming" | "live" | "finished";
  odds: GameOdds;
  venue?: string;
}
```

### Bet Model

```typescript
interface Bet {
  id: string;
  userId: string;
  gameId: string;
  betType: string;
  selection: string;
  odds: number;
  amount: number;
  status: "pending" | "won" | "lost" | "cancelled";
  placedAt: Date;
}
```

## 🔐 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Input Validation**: Joi schema validation
- **Error Handling**: Comprehensive error responses
- **Logging**: Structured logging with Pino

## ⚙️ Configuration

### Environment Variables

```bash
# Server Configuration
PORT=4000
NODE_ENV=development

# Redis Configuration
REDIS_HOST=your-redis-host
REDIS_PORT=12609
REDIS_PASSWORD=your-redis-password

# JWT Configuration (when implemented)
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h
```

### Redis Schema

```javascript
// User data
user:{userId} = {User Object}

// Game data
game:{gameId} = {Game Object}
games:sport:{sport} = [gameIds...]

// Bet data
bet:{betId} = {Bet Object}
user:{userId}:bets = [betIds...]

// Key-Value store
kv:{key} = value
```

## 🔧 Development Tools

### Available Scripts

```bash
npm run dev          # Start with nodemon (hot reload)
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
npm test             # Run Jest test suite
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run clean        # Remove dist directory
```

### Code Quality

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting (configured in .prettierrc)
- **Husky**: Git hooks for pre-commit checks
- **Jest**: Unit and integration testing

## 🐳 Docker Support

### Dockerfile

The backend includes a multi-stage Dockerfile for production builds:

```bash
docker build -t northstar-backend .
docker run -p 4000:4000 northstar-backend
```

### Docker Compose

Development environment with Redis:

```bash
docker-compose up backend redis
```

## 📊 Monitoring & Logging

### Structured Logging

```typescript
import logger from "../utils/logger";

// Log levels: trace, debug, info, warn, error, fatal
logger.info("User created", { userId, email });
logger.error("Database error", { error: err.message });
```

### Health Checks

```bash
GET /health          # Server health status
GET /health/redis    # Redis connection status
```

## 🚀 Deployment

### Production Deployment

1. Build the application: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`
4. Configure reverse proxy (nginx/Apache)
5. Set up SSL certificates
6. Configure monitoring and logging

### Environment-Specific Configs

- **Development**: Hot reload, detailed logging
- **Testing**: In-memory Redis, test database
- **Production**: Optimized builds, error tracking

## 🤝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Update documentation for API changes
4. Use conventional commits
5. Ensure all tests pass before submitting PRs

## 📚 Additional Resources

- [Redis Documentation](https://redis.io/documentation)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

---

For questions or support, please refer to the main project documentation or open an issue.
