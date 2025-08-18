import { Router } from "express";
import AuthController from "../controller/auth.controller.js";

const authRouter = Router();
const controller = new AuthController()

authRouter.post("/register", (req, res) => controller.register(req, res));
authRouter.post("/login", (req, res) => controller.login(req, res));

export default authRouter;
