import PostService from "../services/post.service.js";
import { dataSource } from "../config/database.js";
const postRepository = dataSource.getRepository("Post");
const Post = postRepository
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
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const post = await this.postService.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: "Maqola topilmadi" });
    }


    if (req.user.id !== post.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Ruxsat yo‘q" });
    }

    const updatedPost = await this.postService.updatePost(postId, {
      title,
      content,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async deletePost(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const post = await this.postService.getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post topilmadi" });
    }

    if (req.user.id !== post.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Ruxsat yo‘q" });
    }

    await this.postService.deletePost(postId);

    res.status(200).json({ message: "Post o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async likePost(req,res){
const post = await Post.findOneBy({ id: req.params.id });
  if (!post) return res.status(404).json({ message: "Post topilmadi" });

  post.likes += 1;
  await Post.save(post);

  res.json({ message: "Like qo‘shildi", likes: post.likes });
}
async viewPost (req,res){
    const post = await Post.findOneBy({ id: req.params.id });
  if (!post) return res.status(404).json({ message: "Post topilmadi" });

  post.views += 1;
  await Post.save(post);

  res.json({ message: "Ko‘rildi", views: post.views });
}
}
export default PostController;
