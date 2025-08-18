import jwt from "jsonwebtoken";
class JwtService {
  constructor() {
    this.jwt = jwt;
    this.SECRET_KEY = process.env.JWT_SECRET;
  }
  generatToken(user) {
    const token = this.jwt.sign({ id: user.id, role: user.role }, this.SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  }
  verifyToken(token) {
    try {
      return this.jwt.verify(token, this.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token muddati eskirgan");
      } else {
        throw new Error("Noto‘g‘ri token yoki tasdiqlash muvaffaqiyatsiz");
      }
    }
  }
}
export default JwtService;
