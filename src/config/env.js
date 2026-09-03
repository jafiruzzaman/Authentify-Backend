/**
 * @file env.js
 * @description env file configuration
 * @copyright Apache-2.0
 * @author Mohammad-Jafiruzzaman
 * @date 3rd September 2026
 */

/* global process */

/* ============================================================= Node Modules =============================================================*/
import dotenv from "dotenv";
/* ============================================================= Custom Modules =============================================================*/
dotenv.config();

const envConfig = {
  server: {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  database: {
    mongoUri: process.env.MONGODB_URI,
  },
  jwt: {
    accessToken: {
      secret: process.env.ACCESS_SECRET,
      expiresIn: process.env.ACCESS_EXPIRES_IN,
    },
    refreshToken: {
      secret: process.env.REFRESH_SECRET,
      expiresIn: process.env.ACCESS_EXPIRES_IN,
    },
  },
  cookies: {
    secret: process.env.COOKIE_SECRET,
    secure: process.env.COOKIE_SECURE === "true",
    httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
    sameSite: process.env.COOKIE_SAME_SITE,
  },
  hashing: {
    slatRound: Number(process.env.BCRYPT_SALT_ROUND),
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
    from: process.env.EMAIL_FROM,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  ratelimit: {
    windowMS: Number(process.env.RATE_LIMIT_WINDOW_MS),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS),
  },
  log: {
    level: process.env.LOG_LEVEL,
  },
};

export const env = Object.freeze(envConfig);
