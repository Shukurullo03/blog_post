import { Router } from "express";
import userController from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const userRouter = Router();
const controller = new userController();
userRouter.get("/users",authMiddleware(["admin"]),(req, res) =>
  controller.getAllUserController(req, res)
);
userRouter.get("/users/:id",authMiddleware(["admin", "user"]), (req, res) =>
  controller.userIdController(req, res)
);
userRouter.put("/users/:id",authMiddleware(["admin", "user"]), (req, res) =>
  controller.updateUserController(req, res)
);
userRouter.delete("/users/:id",authMiddleware(["admin"]), (req, res) =>
  controller.deleteUserController(req, res)
);
export default userRouter;
