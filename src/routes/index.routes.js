import { Router } from "express";
import authRouter from "./auth.routes.js";
import commentRouter from "./comment.routes.js";
import postRouter from "./post.route.js";
import userRouter from "./user.route.js";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api", commentRouter); 

export default router;
