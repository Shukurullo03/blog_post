import CommentService from "../services/comment.service.js";

class CommentController {
  constructor() {
    this.commentService = new CommentService();
  }
  async create(req, res) {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const comment = await this.commentService.create({
        postId: parseInt(postId),
        userId: req.user.id,
        content,
      });

      if (!comment) {
        return res.status(404).json({ message: "Post topilmadi" });
      }

      res.status(201).json({ message: "Izoh yaratildi", data: comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getByPost(req, res) {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.getByPost(parseInt(postId));
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await this.commentService.delete(parseInt(id), req.user);

      if (result.status === 404)
        return res.status(404).json({ message: "Izoh topilmadi" });
      if (result.status === 403)
        return res.status(403).json({ message: "Ruxsat yo‘q" });

      res.status(200).json({ message: "Izoh o‘chirildi" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CommentController;
