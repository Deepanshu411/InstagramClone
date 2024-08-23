import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { validatePassword } from "../validations/password.validation.js";
import { validateUser } from "../validations/user.validation.js";

class UserService {
  static createUser = async (userData) => {
    try {
      validatePassword(userData.password);
      await validateUser(userData);

      const hashedPassword = await bcrypt.hash(userData.password, 8);
      userData.password = hashedPassword;

      const user = await User.create(userData);
      return user;
    } catch (error) {
        console.log("user services")
      throw error;
    }
  };

  static findUserById = async (id) => {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  };

  static findUserByEmail = async (email) => {
    try {
      const user = await User.scope("withPassword").findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
