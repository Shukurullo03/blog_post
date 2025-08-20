import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js"; 
import router from "./routes/index.routes.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();
app.use(cors({
  origin: "http://localhost:4000", 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);
const PORT = process.env.PORT;
const initApp = async () => {
  try {
    await import("./config/database.js");
    console.log("Database connected");
    app.listen(PORT, () => {
    console.log("Server is running port", PORT);
    });
  } catch (error) {
    console.error(error.message);
  }
};
initApp();
