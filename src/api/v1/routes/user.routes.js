import express from "express";
import {
  createUserController,
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/users", createUserController);
router.get("/users/:id", authenticateToken, getUserByIdController);
router.patch("/users/:id", authenticateToken, updateUserController);
router.delete("/users/:id", authenticateToken, deleteUserController);

export default router;
