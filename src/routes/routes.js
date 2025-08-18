import commentRouter from "./comment.routes.js";
import postRouter from "./post.route.js";
import userRouter from "./user.route.js";
const Routes = () => [userRouter,postRouter,commentRouter];
export default Routes;
