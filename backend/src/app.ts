import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.js";
import betRoutes from "./routes/bet.js";
import gameRoutes from "./routes/game.js";
// ...existing code...
// ...existing code...
import errorHandler from "./middlewares/errorHandler.js";
import { logInfo } from "./utils/logger";

const app = express();

// --- PROFESSIONAL DYNAMIC CORS CONFIGURATION ---
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.length === 0 || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    const msg =
      "The CORS policy for this site does not allow access from the specified Origin.";
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
app.use(cors(corsOptions));
console.log(`CORS enabled for the following origins: ${allowedOrigins.join(", ")}`);

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
      userAgent: req.headers["user-agent"],
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
// ...existing code...
// ...existing code...

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
    }
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
