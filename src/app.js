/**
 * @file app.js
 * @description Express app configuration
 * @copyright Apache-2.0
 * @author Mohammad-Jafiruzzaman
 * @date 3rd September 2026
 */

/* ============================================================= Node Modules ============================================================= */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

/* ============================================================= Custom Modules ============================================================= */
import { env } from "./config/env.js";

const app = express();

/* ============================================================= Security Middleware ============================================================= */

/* CORS configuration */
app.use(
  cors({
    origin: env.cors.origin,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

/* Helmet configuration */
app.use(helmet());

/* Rate limit configuration */
app.use(
  rateLimit({
    windowMs: env.rateLimit.windowMs,
    limit: env.rateLimit.max,
    message: "Too many requests from this IP. Please try again later.",
  })
);

/* ============================================================= Body Middleware ============================================================= */

/* Cookie parser configuration */
app.use(cookieParser(env.cookies.secret));

/* JSON body configuration */
app.use(
  express.json({
    limit: "1mb",
  })
);

/* URL-encoded body configuration */
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);

/* ============================================================= Logging Middleware ============================================================= */

/* Morgan configuration */
app.use(
  morgan(env.server.nodeEnv === "development" ? "dev" : "combined")
);

export { app };