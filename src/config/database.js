import "dotenv/config";
import { DataSource } from "typeorm";
import userSchema from "../entities/user.entity.js";
import postSchema from "../entities/post.entity.js";
import commentSchema from "../entities/comment.entity.js";

const database = new DataSource({
  type: "postgres",
  url: process.env.DB_URL,
  // host: process.env.DB_HOST,
  // port: Number(process.env.DB_PORT),
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [userSchema, postSchema, commentSchema],
});

export const dataSource = await database
  .initialize()
  .then(() => {
    console.log("📦 Database connected successfully");
    return database;
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });
