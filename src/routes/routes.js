import authRouter from "./auth.routes.js";
import commentRouter from "./comment.routes.js";
import postRouter from "./post.route.js";
import userRouter from "./user.route.js";
const Routes = () => [authRouter,userRouter,postRouter,commentRouter];
export default Routes;
