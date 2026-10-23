import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";

const app = createApp();

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, nodeEnv: env.NODE_ENV }, "DevPilot Core API server started successfully");
});

function gracefulShutdown(signal: string) {
  logger.info({ signal }, "Received shutdown signal. Closing HTTP server...");
  server.close(() => {
    logger.info("HTTP server closed cleanly. Exiting process.");
    process.exit(0);
  });
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
