// database.js
import "dotenv/config"; // .env ni avtomatik o‘qish uchun
import { DataSource } from "typeorm";
import userSchema from "../entities/user.entity.js";
import postSchema from "../entities/post.entity.js";

const database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // port raqam bo‘lishi kerak
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true, // faqat dev uchun — productionda ishlatish tavsiya etilmaydi
  entities: [userSchema, postSchema],
});

export const dataSource = await database.initialize()
  .then(() => {
    console.log("📦 Database connected successfully");
    return database;
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  });
