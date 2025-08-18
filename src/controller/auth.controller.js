import AuthService from "../services/auth.service.js";

 class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async register(req, res) {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json({ message: "Ro‘yxatdan o‘tish muvaffaqiyatli", user: result });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const token = await this.authService.login(req.body);
      res.status(200).json({ accessToken: token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default AuthController;