import { Router } from "express";
import PostController from "../controller/post.controller.js";

const postRouter = Router();
const controller = new PostController();

postRouter.post("/posts", (req, res) => controller.createPost(req, res));
postRouter.get("/posts", (req, res) => controller.getAllPosts(req, res));
postRouter.get("/posts/:id", (req, res) => controller.getPostById(req, res));
postRouter.put("/posts/:id", (req, res) => controller.updatePost(req, res));
postRouter.delete("/posts/:id", (req, res) => controller.deletePost(req, res));
export default postRouter;
