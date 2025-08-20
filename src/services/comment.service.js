import { dataSource } from "../config/database.js";
export default class CommentService {
  constructor() {
    this.commentRepo = dataSource.getRepository("Comment");
    this.postRepo = dataSource.getRepository("Post");
    this.userRepo = dataSource.getRepository("User");
  }

  async create({ postId, userId, content }) {
    const post = await this.postRepo.findOne({ where: { id: Number(postId) } });
    const user = await this.userRepo.findOne({ where: { id:  Number(userId) } });

    if (!post || !user) return null;

    const comment = this.commentRepo.create({
      content,
      post,
      user,
    });

    return await this.commentRepo.save(comment);
  }

  async getByPost(postId) {
    return await this.commentRepo.find({
      where: { post: { id: postId } },
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }

  async delete(id, user) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!comment) return { status: 404 };

    if (comment.user.id !== user.id && user.role !== "admin") {
      return { status: 403 };
    }

    await this.commentRepo.remove(comment);
    return { status: 200 };
  }
}
