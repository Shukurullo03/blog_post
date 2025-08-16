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
  async registerUsers(userData) {
    try {
      await this.Joi.validateUserData(userData);
      const existingUser = await this.userRepository.findOneBy({
        email: userData.email,
      });
      if (existingUser) {
        throw new Error("Email allaqachon ro'yxatdan o'tgan");
      }
      userData.password = await this.bcrypt.hash(userData.password, 10);
      const newUser = this.userRepository.create(userData);
      const saveUser = await this.userRepository.save(newUser);
      const token = this.jwt.generatToken(saveUser.id);
      return {
        user: saveUser,
        token: token,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getAllUser() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      throw new Error("Foydalanuvchi olishda xatolik");
    }
  }
  async userId(Id) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Id },
      });
      if (!user) {
        throw new Error("Foydalanuvchi topilmadi");
      }
      return user;
    } catch (error) {
      throw new Error("Foydalanuvchi topishda xatolik sodir boldi");
    }
  }
  async updateUser(Id, updateData) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: Id },
      });
      if (!user) {
        return null;
      }
      Object.assign(user, updateData);
      return await this.userRepository.save(user);
    } catch (error) {
      console.error("Update error:", error.message);
    }
  }
  async deleteUser(id) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error("Foydalanuvchi topilmadi");
      }

      await this.userRepository.remove(user); 

      return { message: "Foydalanuvchi muvaffaqiyatli o'chirildi" };
    } catch (error) {
      console.error("Delete error:", error.message);
      throw new Error("Foydalanuvchini o'chirishda xatolik");
    }
  }
}
export default userService;
