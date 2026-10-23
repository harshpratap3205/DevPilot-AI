import { Request, Response } from "express";
import { ApiErrorResponse } from "@devpilot/contracts";

export function notFoundHandler(req: Request, res: Response) {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Cannot ${req.method} ${req.path}`,
    },
    meta: {
      requestId: req.id || `req_unknown`,
      timestamp: new Date().toISOString(),
    },
  };
  res.status(404).json(response);
}
