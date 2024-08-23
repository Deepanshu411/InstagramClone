import express from "express";
import "dotenv/config";

import userRoutes from "./api/v1/routes/user.routes.js";
import authRoutes from "./api/v1/routes/auth.routes.js";

import { connectDatabase } from "./config/db.config.js";

const app = express();
connectDatabase();

app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);

export default app;
