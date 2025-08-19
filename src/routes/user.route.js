import { Router } from "express";
import userController from "../controller/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const userRouter = Router();
const controller = new userController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Foydalanuvchilar bilan bog‘liq API'lar
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish (admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro'yxati
 */
userRouter.get("/users", authMiddleware(["admin"]), (req, res) =>
  controller.getAllUserController(req, res)
);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Foydalanuvchini ID orqali olish (admin, user)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Foydalanuvchi IDsi
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari
 */
userRouter.get("/users/:id", authMiddleware(["admin", "user"]), (req, res) =>
  controller.userIdController(req, res)
);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash (admin, user)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Foydalanuvchi IDsi
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foydalanuvchi yangilandi
 */
userRouter.put("/users/:id", authMiddleware(["admin", "user"]), (req, res) =>
  controller.updateUserController(req, res)
);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish (faqat admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Foydalanuvchi IDsi
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Foydalanuvchi o‘chirildi
 */
userRouter.delete("/users/:id", authMiddleware(["admin"]), (req, res) =>
  controller.deleteUserController(req, res)
);

export default userRouter;
