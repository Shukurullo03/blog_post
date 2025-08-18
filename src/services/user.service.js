import bcrypt from "bcrypt";
import JwtService from "./jwt.service.js";
import JoiService from "./joi.service.js";
import { dataSource } from "../config/database.js";
class userService {
  constructor() {
    this.jwt = new JwtService();
    this.Joi = new JoiService();
    this.bcrypt = bcrypt;
    this.userRepository = dataSource.getRepository("User");
  }
  async getAllUser() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new Error("Foydalanuvchi olishda xatolik");
    }
  }
async userId(id) {
  try {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new Error("Foydalanuvchi topilmadi");
    }
    return user;
  } catch (error) {
    throw new Error(error.message); 
  }
}

async updateUser(id, updateData) {
  try {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    if (updateData.password) {
      updateData.password = await this.bcrypt.hash(updateData.password, 10);
    }

    Object.assign(user, updateData);
    return await this.userRepository.save(user);

  } catch (error) {
    console.error("Update error:", error.message);
    throw new Error("Foydalanuvchini yangilashda xatolik");
  }
}
async deleteUser(id) {
  try {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error("Foydalanuvchi topilmadi");
    }
    await this.userRepository.remove(user);

    return { message: "Foydalanuvchi muvaffaqiyatli o‘chirildi" };
  } catch (error) {
    console.error("Delete error:", error.message);
    throw new Error(error.message || "Foydalanuvchini o‘chirishda xatolik");
  }
}
}
export default userService;
