import userService from "../services/user.service.js";

class userController {
  constructor() {
    this.userService = new userService();
  }
  async registerUsersController(req, res) {
    try {
      const body = req.body;
      const token = await this.userService.registerUsers(body);
      res.status(201).json({
        token,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async getAllUserController(req, res) {
    try {
      const users = await this.userService.getAllUser();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async userIdController(req, res) {
    try {
      const { Id } = parseInt(req.params);
      const user = await this.userService.userId(Id);
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Foydalanuvchi topilmadi",
        });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
async updateUserController(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (req.user.id !== id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Ruxsat yo‘q" });
    }

    const updateData = req.body;
    const userUpdate = await this.userService.updateUser(id, updateData);

    res.status(200).json({
      status: "success",
      message: "Foydalanuvchi muvaffaqiyatli yangilandi",
      user: userUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async deleteUserController(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Faqat admin o‘chira oladi" });
    }

    const result = await this.userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


}
export default userController;
