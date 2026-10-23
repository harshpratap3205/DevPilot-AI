import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../config/logger";
import { ApiErrorResponse } from "@devpilot/contracts";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR" | "CONFLICT" | "RATE_LIMITED" | "INTERNAL_SERVER_ERROR",
    message: string,
    public details?: Array<Record<string, unknown>>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const requestId = req.id || `req_unknown`;
  const timestamp = new Date().toISOString();

  if (err instanceof ZodError) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
          code: e.code,
        })),
      },
      meta: {
        requestId,
        timestamp,
      },
    };
    logger.warn({ requestId, err: errorResponse }, "Validation error");
    return res.status(422).json(errorResponse);
  }

  if (err instanceof AppError) {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      meta: {
        requestId,
        timestamp,
      },
    };
    logger.warn({ requestId, err: errorResponse }, "Application error");
    return res.status(err.statusCode).json(errorResponse);
  }

  const errorResponse: ApiErrorResponse = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected internal server error occurred",
    },
    meta: {
      requestId,
      timestamp,
    },
  };

  logger.error({ requestId, err }, "Unhandled server error");
  return res.status(500).json(errorResponse);
}
