import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "*.accessTokenEncrypted",
      "*.refreshTokenEncrypted",
      "*.tokenHash",
      "*.secret",
      "*.password",
    ],
    remove: true,
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
