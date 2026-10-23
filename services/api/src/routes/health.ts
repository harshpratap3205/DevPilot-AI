import { Router, Request, Response } from "express";
import Redis from "ioredis";
import { prisma } from "../db/prisma";
import { env } from "../config/env";
import { HealthResponse, ReadyResponse } from "@devpilot/contracts";

export const healthRouter = Router();

const startTime = Date.now();

healthRouter.get("/health", (_req: Request, res: Response) => {
  const payload: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "@devpilot/api",
    version: "0.1.0",
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };
  res.status(200).json(payload);
});

healthRouter.get("/health/ready", async (_req: Request, res: Response) => {
  let dbOk = false;
  let redisOk = false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {
    dbOk = false;
  }

  try {
    const redis = new Redis(env.REDIS_URL, { connectTimeout: 1000, lazyConnect: true });
    await redis.connect();
    const ping = await redis.ping();
    redisOk = ping === "PONG";
    await redis.quit();
  } catch {
    redisOk = false;
  }

  const isReady = dbOk && redisOk;
  const status: "ready" | "degraded" | "unavailable" = isReady
    ? "ready"
    : dbOk || redisOk
    ? "degraded"
    : "unavailable";

  const payload: ReadyResponse = {
    status,
    timestamp: new Date().toISOString(),
    checks: {
      database: dbOk,
      redis: redisOk,
    },
  };

  const statusCode = status === "ready" ? 200 : 503;
  res.status(statusCode).json(payload);
});
