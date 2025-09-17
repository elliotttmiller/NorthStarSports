# NorthStar Sports - API Documentation

Complete API reference for the NorthStar Sports backend services.

## 🌐 Base URL
```
Development: http://localhost:4000
Production:  https://api.northstarsports.com
```

## 📋 API Conventions

### Response Format
All API responses follow this consistent format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T12:00:00Z"
}
```

### Error Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [...]
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

### Status Codes
- `200` - OK: Successful operation
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource not found
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error

## 🔐 Authentication
Currently implementing JWT-based authentication. All protected endpoints will require:
```http
Authorization: Bearer <jwt-token>
```

## 📡 API Endpoints

## User Management

### Get User Profile
```http
GET /api/v1/user/:id
```

**Parameters:**
- `id` (string, required) - User ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "balance": 1250.00,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

### Create User
```http
POST /api/v1/user
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "username": "johndoe",
    "email": "john@example.com",
    "balance": 0.00,
    "createdAt": "2024-01-15T12:00:00Z"
  },
  "message": "User created successfully"
}
```

### Update User Profile
```http
PUT /api/v1/user/:id
```

**Request Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com"
}
```

### Delete User
```http
DELETE /api/v1/user/:id
```

---

## Games & Sports

### Get All Games
```http
GET /api/v1/games
```

**Query Parameters:**
- `sport` (string, optional) - Filter by sport (nfl, nba, mlb, nhl)
- `status` (string, optional) - Filter by status (upcoming, live, finished)
- `limit` (number, optional) - Limit results (default: 50)
- `offset` (number, optional) - Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "games": [
      {
        "id": "game_123",
        "leagueId": "nfl",
        "homeTeam": {
          "id": "team_1",
          "name": "Los Angeles Lakers",
          "shortName": "LAL",
          "logo": "https://..."
        },
        "awayTeam": {
          "id": "team_2",
          "name": "Golden State Warriors",
          "shortName": "GSW",
          "logo": "https://..."
        },
        "startTime": "2024-01-15T19:00:00Z",
        "status": "upcoming",
        "odds": {
          "spread": {
            "home": { "line": -5.5, "odds": -110 },
            "away": { "line": 5.5, "odds": -110 }
          },
          "moneyline": {
            "home": { "odds": -220 },
            "away": { "odds": 180 }
          },
          "total": {
            "over": { "line": 225.5, "odds": -110 },
            "under": { "line": 225.5, "odds": -110 }
          }
        },
        "venue": "Crypto.com Arena"
      }
    ],
    "totalCount": 25,
    "hasMore": true
  }
}
```

### Get Game by ID
```http
GET /api/v1/games/:id
```

### Get Games by Sport
```http
GET /api/v1/games/sport/:sport
```

**Parameters:**
- `sport` (string, required) - Sport identifier (nfl, nba, mlb, nhl)

### Create Game (Admin Only)
```http
POST /api/v1/games
```

**Request Body:**
```json
{
  "leagueId": "nba",
  "homeTeamId": "team_1",
  "awayTeamId": "team_2",
  "startTime": "2024-01-15T19:00:00Z",
  "venue": "Arena Name",
  "odds": {
    "spread": {
      "home": { "line": -5.5, "odds": -110 },
      "away": { "line": 5.5, "odds": -110 }
    }
  }
}
```

---

## Betting System

### Get User Bets
```http
GET /api/v1/bets/:userId
```

**Query Parameters:**
- `status` (string, optional) - Filter by status
- `limit` (number, optional) - Limit results
- `offset` (number, optional) - Pagination offset

**Response:**
```json
{
  "success": true,
  "data": {
    "bets": [
      {
        "id": "bet_123",
        "userId": "user_123",
        "gameId": "game_123",
        "betType": "spread",
        "selection": "home",
        "odds": -110,
        "amount": 50.00,
        "potentialPayout": 95.45,
        "status": "pending",
        "placedAt": "2024-01-15T12:00:00Z"
      }
    ],
    "totalCount": 10,
    "totalAmount": 500.00,
    "potentialPayout": 954.50
  }
}
```

### Place Bet
```http
POST /api/v1/bets
```

**Request Body:**
```json
{
  "userId": "user_123",
  "gameId": "game_123",
  "betType": "spread",
  "selection": "home",
  "odds": -110,
  "amount": 50.00
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "bet_123",
    "userId": "user_123",
    "gameId": "game_123",
    "betType": "spread",
    "selection": "home",
    "odds": -110,
    "amount": 50.00,
    "potentialPayout": 95.45,
    "status": "pending",
    "placedAt": "2024-01-15T12:00:00Z"
  },
  "message": "Bet placed successfully"
}
```

### Cancel Bet
```http
DELETE /api/v1/bets/:id
```

---

## Key-Value Store

### Get Value
```http
GET /api/v1/kv/:key
```

**Response:**
```json
{
  "success": true,
  "data": {
    "key": "user_settings_123",
    "value": { "theme": "dark", "notifications": true },
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T13:00:00Z"
  }
}
```

### Set Value
```http
POST /api/v1/kv
```

**Request Body:**
```json
{
  "key": "user_settings_123",
  "value": { "theme": "dark", "notifications": true }
}
```

### Delete Key
```http
DELETE /api/v1/kv/:key
```

---

## System Endpoints

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "uptime": 86400,
    "services": {
      "redis": "connected",
      "database": "connected"
    }
  }
}
```

### Redis Health Check
```http
GET /health/redis
```

---

## Data Models

### User Model
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  balance: number;
  depositHistory: Transaction[];
  betHistory: string[]; // bet IDs
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  timezone: string;
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
  status: 'upcoming' | 'live' | 'finished';
  score?: GameScore;
  odds: GameOdds;
  venue?: string;
  weather?: WeatherConditions;
}

interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  record?: string;
}

interface GameOdds {
  spread: SpreadOdds;
  moneyline: MoneylineOdds;
  total: TotalOdds;
  lastUpdated: Date;
}
```

### Bet Model
```typescript
interface Bet {
  id: string;
  userId: string;
  gameId: string;
  betType: 'spread' | 'moneyline' | 'total';
  selection: string;
  odds: number;
  amount: number;
  potentialPayout: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled' | 'pushed';
  placedAt: Date;
  settledAt?: Date;
  result?: BetResult;
}
```

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- **General endpoints**: 100 requests per minute per IP
- **Authentication endpoints**: 10 requests per minute per IP
- **Betting endpoints**: 50 requests per minute per user

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

---

## Error Codes

### Client Errors (4xx)
- `VALIDATION_ERROR` - Invalid request data
- `AUTHENTICATION_REQUIRED` - Missing or invalid auth token
- `INSUFFICIENT_PERMISSIONS` - User lacks required permissions
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INSUFFICIENT_FUNDS` - Not enough balance for bet

### Server Errors (5xx)
- `INTERNAL_SERVER_ERROR` - Generic server error
- `DATABASE_ERROR` - Redis connection or query error
- `EXTERNAL_SERVICE_ERROR` - Third-party service failure

---

## Testing

### Using cURL
```bash
# Get all games
curl -X GET "http://localhost:4000/api/v1/games" \
  -H "Content-Type: application/json"

# Create user
curl -X POST "http://localhost:4000/api/v1/user" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Place bet
curl -X POST "http://localhost:4000/api/v1/bets" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"userId":"user_123","gameId":"game_123","betType":"spread","selection":"home","odds":-110,"amount":50.00}'
```

### Using Postman
Import the Postman collection available at `/docs/postman-collection.json`

---

## WebSocket Events (Coming Soon)

Real-time updates will be available via WebSocket connection:
- Live odds updates
- Game score updates
- Bet result notifications
- System announcements

---

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- User management endpoints
- Game and betting endpoints  
- Key-value store endpoints
- Rate limiting and security features

---

For questions or support, please open an issue or contact the development team.
