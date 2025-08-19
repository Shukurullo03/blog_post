import bcrypt from "bcryptjs";
import JwtService from "./jwt.service.js";
import JoiService from "./joi.service.js";
import { dataSource } from "../config/database.js";

const userRepo = dataSource.getRepository("User");

export default class AuthService {
  constructor() {
    this.jwtService = new JwtService();
    this.joiService = new JoiService();
  }

  async register(data) {
    await this.joiService.validateUserData(data); 

    const { email, password, ...rest } = data;

    const existingUser = await userRepo.findOneBy({ email });
    if (existingUser) {
      throw new Error("Bu email allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      ...rest,
      email,
      password: hashedPassword,
    });

    await userRepo.save(newUser);
    delete newUser.password; 

    return newUser;
  }

  async login({ email, password }) {
    const user = await userRepo.findOneBy({ email });
    if (!user) throw new Error("Email noto‘g‘ri");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Parol noto‘g‘ri");

    return this.jwtService.generatToken(user);
  }
}
