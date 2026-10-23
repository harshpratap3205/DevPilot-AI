import { z } from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });
dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().default("postgresql://devpilot:devpilot_secret@localhost:5432/devpilot_db?schema=public"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  SESSION_SECRET: z.string().default("devpilot_default_session_secret_change_in_prod_12345"),
  CSRF_SECRET: z.string().default("devpilot_default_csrf_secret_change_in_prod_12345"),
  LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]).default("info"),
});

export const env = EnvSchema.parse(process.env);
