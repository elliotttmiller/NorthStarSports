# NorthStarSports Backend

## Overview
A professional, future-proof Node.js + Express backend for local development and production. Provides RESTful key-value endpoints and is structured for easy extension (database, auth, cloud deploy).

## Features
- RESTful `/kv/:key` endpoints (GET, POST)
- In-memory store (swap for DB easily)
- CORS enabled for local dev
- Modular project structure (routes, controllers, services, middleware)
- Ready for future DB/auth/cloud integration


## Getting Started

### 1. Install dependencies
```sh
cd backend
npm install
```


### 2. Configure Redis Cloud connection
Sign up for a free Redis Cloud instance at https://redis.com/try-free/ and create a database.
Copy your Redis Cloud endpoint URL (e.g. `redis://default:<password>@<host>:<port>`).

Set the `REDIS_URL` environment variable in your shell or in a `.env` file in the backend directory:
```sh
export REDIS_URL=redis://<your-cloud-redis-url>
```

### 4. Run the server (dev mode)
```sh
npm run dev
```
The backend will run on [http://localhost:4000](http://localhost:4000)

### 5. Endpoints
- `GET /kv/:key` — Get value for a key (from Redis)
- `POST /kv/:key` — Set value for a key (JSON body: `{ value: ... }`)

### 6. CORS
- Allows requests from `http://localhost:5000` (Vite frontend)


## Future Proofing
- Uses Redis (industry standard) for all key-value storage
- Add authentication middleware in `src/middleware/`
- Add more RESTful or GraphQL endpoints as needed
- Ready for cloud deploy or serverless

## Project Structure
```
backend/
  src/
    controllers/
    middleware/
    routes/
    services/
    server.js
  .eslintrc.json
  package.json
  README.md
```

---

**Contact:** elliotttmiller (repo owner)
