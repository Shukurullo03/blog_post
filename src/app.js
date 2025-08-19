import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js"; 
import router from "./routes/index.routes.js";
import cors from "cors";
import express from "express";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(router);
const PORT = process.env.PORT;
// const initApp = async () => {
//   try {
//     await import("./config/database.js");
//     console.log("Database connected");
//     app.listen(PORT, () => {
//     console.log("Server is running port", PORT);
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// };
// initApp();
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });