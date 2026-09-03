/**
 * @file database.js
 * @description database configuration
 * @copyright Apache-2.0
 * @author Mohammad-Jafiruzzaman
 * @date 3rd September 2026
 */

/* global process */

/* ============================================================= Node Modules =============================================================*/
import mongoose from "mongoose";
/* ============================================================= Custom Modules =============================================================*/
import { env } from "./env.js";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    const conn = await mongoose.connect(env.database.mongoUri, {
      appName: `MERN-Auth`,
      connectTimeoutMS: 5000,
    });
    console.log(`Connect to MongoDB successfully. ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error ${error}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }
  try {
    await mongoose.connection.close();
    console.log(`disconnect from mongodb successfully`);
  } catch (error) {
    console.log(`Error found while disconnect from mongodb: ${error}`);
    process.exit(1);
  }
};
export { connectDB, disconnectDB };
