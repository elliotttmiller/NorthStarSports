import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import logger, { logInfo, logError } from "./utils/logger.js";

// Import routes
import userRoutes from "./routes/user.js";
import betRoutes from "./routes/bet.js";
import gameRoutes from "./routes/game.js";
import kvRoutes from "./routes/kv.js";
import redisRoutes from "./routes/redis.js";

// Import middleware
import errorHandler from "./middlewares/errorHandler.js";

const app: Application = express();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.FRONTEND_URL?.split(",") || []
      : ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logInfo("HTTP Request", {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip,
    });
  });

  next();
});

// API Routes
const API_VERSION = "/api/v1";

app.use(`${API_VERSION}/user`, userRoutes);
app.use(`${API_VERSION}/bet`, betRoutes);
app.use(`${API_VERSION}/game`, gameRoutes);
app.use(`${API_VERSION}/kv`, kvRoutes);
app.use(`${API_VERSION}/redis`, redisRoutes);

// Health check endpoint
app.get(`${API_VERSION}/health`, (req: Request, res: Response) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "1.0.0",
  };

  res.status(200).json(healthCheck);
});

// API documentation endpoint
app.get(`${API_VERSION}/docs`, (req: Request, res: Response) => {
  const apiDocs = {
    name: "NorthStar Sports API",
    version: "1.0.0",
    endpoints: {
      health: "GET /api/v1/health",
      user: {
        get: "GET /api/v1/user/:id",
        create: "POST /api/v1/user/:id",
      },
      bet: {
        get: "GET /api/v1/bet/:id",
        create: "POST /api/v1/bet/:id",
      },
      game: {
        get: "GET /api/v1/game/:id",
        update: "POST /api/v1/game/:id",
      },
      kv: {
        get: "GET /api/v1/kv/:key",
        set: "POST /api/v1/kv/:key",
      },
      redis: {
        get: "GET /api/v1/redis/:key",
        set: "POST /api/v1/redis/:key",
      },
    },
  };

  res.json(apiDocs);
});

// Handle 404 for API routes
app.use("/api", (req: Request, res: Response) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.path,
    method: req.method,
  });
});

// Handle all other routes
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    message: "This endpoint does not exist",
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

logInfo("✅ Express application configured successfully", {
  environment: process.env.NODE_ENV || "development",
  apiVersion: API_VERSION,
});

export default app;
