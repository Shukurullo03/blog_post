import { Router } from "express";
import PostController from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.js";
const postRouter = Router();
const controller = new PostController();

postRouter.post("/posts",authMiddleware(["user", "admin"]), (req, res) => controller.createPost(req, res));
postRouter.get("/posts", (req, res) => controller.getAllPosts(req, res));
postRouter.get("/posts/:id", (req, res) => controller.getPostById(req, res));
postRouter.put("/posts/:id",authMiddleware(["user", "admin"]), (req, res) => controller.updatePost(req, res));
postRouter.delete("/posts/:id",authMiddleware(["user", "admin"]), (req, res) => controller.deletePost(req, res));
postRouter.post("/posts/:id/like", (req, res) => controller.likePost(req, res));
postRouter.post("/posts/:id/view", (req, res) => controller.viewPost(req, res));
export default postRouter;
