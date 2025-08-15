import { dataSource } from "../config/database.js";

class PostService {
  constructor() {
    this.postRepository = dataSource.getRepository("Post");
    this.userRepository = dataSource.getRepository("User");
  }

  async createPost({ title, content, userId }) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      return null; 
    }
    const newPost = this.postRepository.create({
      title,
      content,
      user, 
    });
    await this.postRepository.save(newPost);
    const savedPost = await this.postRepository.findOne({
      where: { id: newPost.id },
      relations: ["user"],
    });

    return savedPost;
  }
  async getAllPosts() {
    const posts = await this.postRepository.find({
      relations: ["user"],
      order: { createdAt: "DESC" },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      user: {
        id: post.user.id,
        firstName: post.user.firstName,
        lastName: post.user.lastName,
      },
    }));
  }

  async getPostById(id) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    return post;
  }

  async updatePost(id, { title, content }) {
    const post = await this.getPostById(id);
    if (!post) return null;

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.updatedAt = new Date();

    await this.postRepository.save(post);

    return await this.getPostById(id); 
  }

  async deletePost(id) {
    const post = await this.getPostById(id);
    if (!post) return false;

    await this.postRepository.remove(post);
    return true;
  }
}

export default PostService;
