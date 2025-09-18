import "dotenv/config";
import logger, { logInfo, logError } from "./utils/logger.js";
import app from "./app.js";
import type { Server } from "http";

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST || "localhost";

class AppServer {
  private server: Server | null = null;

  async start(): Promise<void> {
    try {
      logInfo("🚀 Starting NorthStar Sports Backend Server...", {
        port: PORT,
        host: HOST,
        nodeEnv: process.env.NODE_ENV || "development",
      });

      // Start the Express server
      this.server = app.listen(PORT, HOST, () => {
        logInfo("✅ Backend server running successfully", {
          url: `http://${HOST}:${PORT}`,
          health: `http://${HOST}:${PORT}/api/v1/health`,
        });
      });

      // Handle server errors
      this.server.on("error", this.handleServerError.bind(this));

      // Setup graceful shutdown handlers
      this.setupGracefulShutdown();
    } catch (error) {
      logError("💥 Failed to start server", error as Error);
      process.exit(1);
    }
  }

  private handleServerError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") {
      throw error;
    }

    const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

    switch (error.code) {
      case "EACCES":
        logError(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        logError(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  private setupGracefulShutdown(): void {
    const signals = ["SIGTERM", "SIGINT"] as const;

    signals.forEach((signal) => {
      process.on(signal, async () => {
        logInfo(`📡 Received ${signal}, initiating graceful shutdown...`);
        await this.shutdown();
      });
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      logError("💥 Uncaught Exception", error);
      this.shutdown().then(() => process.exit(1));
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any) => {
      logError("💥 Unhandled Rejection", new Error(String(reason)));
      this.shutdown().then(() => process.exit(1));
    });
  }

  private async shutdown(): Promise<void> {
    if (!this.server) return;

    return new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        logError("⚠️  Forced shutdown after timeout");
        process.exit(1);
      }, 10000);

      this.server!.close(() => {
        clearTimeout(timeout);
        logInfo("✅ Server closed successfully");
        resolve();
      });
    });
  }
}

// Start the server
const appServer = new AppServer();
appServer.start().catch((error) => {
  logError("💥 Failed to start application", error);
  process.exit(1);
});
