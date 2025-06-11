import { 
  User, InsertUser, 
  Post, InsertPost, 
  Comment, InsertComment, 
  GalleryItem, InsertGalleryItem,
  Category, InsertCategory
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Post methods
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPosts(limit?: number, offset?: number): Promise<Post[]>;
  getPostsByCategory(categoryId: number, limit?: number, offset?: number): Promise<Post[]>;
  getHotPosts(limit?: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<boolean>;
  incrementHeatCount(id: number): Promise<boolean>;
  
  // Comment methods
  getComment(id: number): Promise<Comment | undefined>;
  getCommentsByPost(postId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: number): Promise<boolean>;
  
  // Gallery methods
  getGalleryItem(id: number): Promise<GalleryItem | undefined>;
  getGalleryItems(limit?: number, offset?: number): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Category methods
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private galleryItems: Map<number, GalleryItem>;
  private categories: Map<number, Category>;
  
  private userIdCounter: number;
  private postIdCounter: number;
  private commentIdCounter: number;
  private galleryIdCounter: number;
  private categoryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.galleryItems = new Map();
    this.categories = new Map();
    
    this.userIdCounter = 1;
    this.postIdCounter = 1;
    this.commentIdCounter = 1;
    this.galleryIdCounter = 1;
    this.categoryIdCounter = 1;
    
    // Initialize with some default categories
    this.seedCategories();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user = { ...insertUser, id, created_at: now };
    this.users.set(id, user);
    return user;
  }
  
  // Post methods
  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }
  
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  async getPosts(limit = 10, offset = 0): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  async getPostsByCategory(categoryId: number, limit = 10, offset = 0): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published && post.category_id === categoryId)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  async getHotPosts(limit = 10): Promise<Post[]> {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.heat_count - a.heat_count)
      .slice(0, limit);
  }
  
  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.postIdCounter++;
    const now = new Date();
    const post = { ...insertPost, id, created_at: now, heat_count: 0 };
    this.posts.set(id, post);
    return post;
  }
  
  async updatePost(id: number, postUpdate: Partial<InsertPost>): Promise<Post> {
    const post = await this.getPost(id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    
    const updatedPost = { ...post, ...postUpdate };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deletePost(id: number): Promise<boolean> {
    return this.posts.delete(id);
  }
  
  async incrementHeatCount(id: number): Promise<boolean> {
    const post = await this.getPost(id);
    if (!post) {
      return false;
    }
    
    post.heat_count += 1;
    this.posts.set(id, post);
    return true;
  }
  
  // Comment methods
  async getComment(id: number): Promise<Comment | undefined> {
    return this.comments.get(id);
  }
  
  async getCommentsByPost(postId: number): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.post_id === postId)
      .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
  }
  
  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = this.commentIdCounter++;
    const now = new Date();
    const comment = { ...insertComment, id, created_at: now };
    this.comments.set(id, comment);
    return comment;
  }
  
  async deleteComment(id: number): Promise<boolean> {
    return this.comments.delete(id);
  }
  
  // Gallery methods
  async getGalleryItem(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.get(id);
  }
  
  async getGalleryItems(limit = 10, offset = 0): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values())
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.galleryIdCounter++;
    const now = new Date();
    const item = { ...insertItem, id, created_at: now };
    this.galleryItems.set(id, item);
    return item;
  }
  
  // Category methods
  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Helper methods for seeding initial data
  private seedCategories() {
    const defaultCategories = [
      { name: "Hot Rants", slug: "hot-rants" },
      { name: "Tech Lies", slug: "tech-lies" },
      { name: "Cringe Gallery", slug: "cringe-gallery" },
      { name: "Real Devs", slug: "real-devs" },
      { name: "Build Burn Rebuild", slug: "build-burn-rebuild" },
      { name: "Anti-Guru", slug: "anti-guru" },
    ];

    for (const cat of defaultCategories) {
      const id = this.categoryIdCounter++;
      this.categories.set(id, { ...cat, id });
    }
  }
}

export const storage = new MemStorage();
