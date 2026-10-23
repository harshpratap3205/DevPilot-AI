import { z } from "zod";

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  timestamp: z.string().datetime(),
  service: z.string(),
  version: z.string(),
  uptime: z.number().nonnegative(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const ReadyResponseSchema = z.object({
  status: z.enum(["ready", "degraded", "unavailable"]),
  timestamp: z.string().datetime(),
  checks: z.object({
    database: z.boolean(),
    redis: z.boolean(),
  }),
});

export type ReadyResponse = z.infer<typeof ReadyResponseSchema>;

export const ErrorCodeSchema = z.enum([
  "UNAUTHORIZED",
  "FORBIDDEN",
  "NOT_FOUND",
  "VALIDATION_ERROR",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL_SERVER_ERROR",
]);

export type ErrorCode = z.infer<typeof ErrorCodeSchema>;

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: ErrorCodeSchema,
    message: z.string(),
    details: z.array(z.record(z.unknown())).optional(),
  }),
  meta: z.object({
    requestId: z.string(),
    timestamp: z.string().datetime(),
  }),
});

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;

export function createApiSuccessResponse<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    meta: z.object({
      requestId: z.string(),
      timestamp: z.string().datetime(),
    }),
  });
}
