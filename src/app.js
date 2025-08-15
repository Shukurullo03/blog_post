import express from "express";
import "dotenv/config";
import Routes from "./routes/routes.js";
const app = express();
app.use(express.json());
app.use("/api", Routes());
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
