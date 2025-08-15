import PostService from "../services/post.service.js";

class PostController {
  constructor() {
    this.postService = new PostService();
  }

  async createPost(req, res) {
    try {
      const { title, content, userId } = req.body;

      const newPost = await this.postService.createPost({
        title,
        content,
        userId,
      });

      if (!newPost) {
        return res.status(400).json({
          status: "error",
          message: "Foydalanuvchi mavjud emas",
        });
      }

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getAllPosts(req, res) {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getPostById(req, res) {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(Number(id));

      if (!post) {
        return res
          .status(404)
          .json({ status: "error", message: "Maqola topilmadi" });
      }

      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      const updatedPost = await this.postService.updatePost(Number(id), {
        title,
        content,
      });

      if (!updatedPost) {
        return res
          .status(404)
          .json({ status: "error", message: "Maqola topilmadi" });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { id } = req.params;

      const success = await this.postService.deletePost(Number(id));

      if (!success) {
        return res
          .status(404)
          .json({ status: "error", message: "Maqola topilmadi" });
      }

      res
        .status(200)
        .json({
          status: "success",
          message: "Maqola muvaffaqiyatli o'chirildi",
        });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default PostController;
