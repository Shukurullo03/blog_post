import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import CommentController from "../controller/comment.controller.js";

const commentRouter = Router();
const controller = new CommentController();
commentRouter.post("/posts/:postId/comments", authMiddleware(["user", "admin"]), (req, res) => controller.create(req, res));

commentRouter.get("/posts/:postId/comments", (req, res) => controller.getByPost(req, res));

commentRouter.delete("/comments/:id", authMiddleware(["user", "admin"]), (req, res) => controller.delete(req, res));

export default commentRouter;
