import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

declare global {
  namespace Express {
    interface Request {
      id: string;
      startTime: number;
    }
  }
}

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existingId = req.header("X-Request-ID");
  const requestId = existingId && /^[a-zA-Z0-9_-]{8,64}$/.test(existingId)
    ? existingId
    : `req_${crypto.randomUUID()}`;

  req.id = requestId;
  req.startTime = Date.now();
  res.setHeader("X-Request-ID", requestId);
  next();
}
