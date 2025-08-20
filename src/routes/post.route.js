import { Router } from "express";
import PostController from "../controller/post.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const postRouter = Router();
const controller = new PostController();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Postlar bilan ishlash
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Yangi post yaratish (faqat user yoki admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               userId:
 *                 type: number

 *     responses:
 *       201:
 *         description: Post yaratildi
 */
postRouter.post("/", authMiddleware(["user", "admin"]), (req, res) =>
  controller.createPost(req, res)
);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Barcha postlarni olish
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Postlar ro‘yxati
 */
postRouter.get("/", (req, res) =>
  controller.getAllPosts(req, res)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Bitta postni ID orqali olish
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post ma'lumotlari
 */
postRouter.get("/:id", (req, res) =>
  controller.getPostById(req, res)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Postni yangilash (user yoki admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post yangilandi
 */
postRouter.put("/:id", authMiddleware(["user", "admin"]), (req, res) =>
  controller.updatePost(req, res)
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Postni o‘chirish (user yoki admin)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post o‘chirildi
 */
postRouter.delete("/:id", authMiddleware(["user", "admin"]), (req, res) =>
  controller.deletePost(req, res)
);

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Postga like bosish
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Like qo‘shildi
 */
postRouter.post("/:id/like", (req, res) =>
  controller.likePost(req, res)
);

/**
 * @swagger
 * /api/posts/{id}/view:
 *   post:
 *     summary: Post ko‘rilganligini hisoblash
 *     tags: [Posts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ko‘rilganlar soni oshirildi
 */
postRouter.post("/:id/view", (req, res) =>
  controller.viewPost(req, res)
);

export default postRouter;
