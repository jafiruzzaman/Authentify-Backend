/**
 * @file server.js
 * @description Entry Point of the application
 * @copyright Apache-2.0
 * @author Mohammad-Jafiruzzaman
 * @date 3rd September 2026
 */
/* global process */

/* ============================================================= Node Modules ============================================================= */
import { createServer } from "node:http";
/* ============================================================= Custom Modules ============================================================= */
import { connectDB, disconnectDB } from "./config/database.js";
import { app } from "./app.js";
import { env } from "./config/env.js";

let server;

const startServer = async () => {
  try {
    await connectDB();
    server = createServer(app);
    server.listen(env.server.port, () => {
      console.log(
        `Server is running at http://localhost:${env.server.port}/${env.api.prefix}`
      );
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

const shutDown = async (signal) => {
  console.log(`${signal} received. Shutting down...`);
  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      });
    }
    await disconnectDB();
    console.log("Application shutdown completed.");
    process.exit(0);
  } catch (error) {
    console.log(`server opening error ${error}`);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutDown("SIGINT"));
process.on("SIGTERM", () => shutDown("SIGTERM"));
process.on("unhandledRejection", (error) => {
  console.error("Unhandled Promise Rejection:", error);
  shutDown("unhandledRejection");
});
process.on("uncaughtException", (error) => {
  console.error("uncaught Exception:", error);
  shutDown("uncaughtException");
});
startServer();
