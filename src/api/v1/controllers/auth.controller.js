import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserService from "../services/user.service.js";

export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Incorrect password" });
      }
  
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};