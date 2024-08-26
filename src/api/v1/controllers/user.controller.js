import UserService from "../services/user.service.js";

export const createUserController = async (req, res) => {
  try {
    const { username, email, password, dob, bio, profilePic } = req.body;
    const user = await UserService.createUser({
      username,
      email,
      password,
      dob,
      bio,
      profilePic,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error, "gg");
    if (
      error.message.includes("Password") ||
      error.message.includes("Date of birth") ||
      error.message.includes("years old")
    ) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await UserService.updateUser({ ...req.body, id });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
