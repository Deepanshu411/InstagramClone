import express from "express";
import {
  createUserController,
  getUserByIdController,
} from "../controllers/user.controller.js";
import {
    authenticateToken
    } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users/:id", authenticateToken, getUserByIdController);

export default router;
