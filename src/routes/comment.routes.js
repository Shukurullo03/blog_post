import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js";
import CommentController from "../controller/comment.controller.js";

const commentRouter = Router();
const controller = new CommentController();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Postga izohlar (commentlar) bilan ishlash
 */

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   post:
 *     summary: Postga izoh qo‘shish (faqat user yoki admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Izoh yaratildi
 */
commentRouter.post(
  "/posts/:postId/comments",
  authMiddleware(["user", "admin"]),
  (req, res) => controller.create(req, res)
);

/**
 * @swagger
 * /api/posts/{postId}/comments:
 *   get:
 *     summary: Postga tegishli barcha izohlarni olish
 *     tags: [Comments]
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Izohlar ro'yxati
 */
commentRouter.get("/posts/:postId/comments", (req, res) =>
  controller.getByPost(req, res)
);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Izohni o‘chirish (user yoki admin)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Izoh ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Izoh o‘chirildi
 */
commentRouter.delete("/comments/:id", authMiddleware(["user", "admin"]), (req, res) =>
  controller.delete(req, res)
);

export default commentRouter;
