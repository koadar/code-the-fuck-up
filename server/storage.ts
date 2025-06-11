import { 
  User, InsertUser, 
  Post, InsertPost, 
  Comment, InsertComment, 
  GalleryItem, InsertGalleryItem,
  Category, InsertCategory
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): User | undefined;
  getUserByUsername(username: string): User | undefined;
  getUserByEmail(email: string): User | undefined;
  createUser(user: InsertUser): User;
  
  // Post methods
  getPost(id: number): Post | undefined;
  getPostBySlug(slug: string): Post | undefined;
  getPosts(limit?: number, offset?: number): Post[];
  getPostsByCategory(categoryId: number, limit?: number, offset?: number): Post[];
  getHotPosts(limit?: number): Post[];
  createPost(post: InsertPost): Post;
  updatePost(id: number, post: Partial<InsertPost>): Post;
  deletePost(id: number): boolean;
  incrementHeatCount(id: number): boolean;
  
  // Comment methods
  getComment(id: number): Comment | undefined;
  getCommentsByPost(postId: number): Comment[];
  createComment(comment: InsertComment): Comment;
  deleteComment(id: number): boolean;
  
  // Gallery methods
  getGalleryItem(id: number): GalleryItem | undefined;
  getGalleryItems(limit?: number, offset?: number): GalleryItem[];
  createGalleryItem(item: InsertGalleryItem): GalleryItem;
  
  // Category methods
  getCategory(id: number): Category | undefined;
  getCategoryBySlug(slug: string): Category | undefined;
  getCategories(): Category[];
  createCategory(category: InsertCategory): Category;
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
  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  getUserByUsername(username: string): User | undefined {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  getUserByEmail(email: string): User | undefined {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  createUser(insertUser: InsertUser): User {
    const id = this.userIdCounter++;
    const now = new Date();
    const user = { ...insertUser, id, created_at: now };
    this.users.set(id, user);
    return user;
  }
  
  // Post methods
  getPost(id: number): Post | undefined {
    return this.posts.get(id);
  }
  
  getPostBySlug(slug: string): Post | undefined {
    return Array.from(this.posts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  getPosts(limit = 10, offset = 0): Post[] {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  getPostsByCategory(categoryId: number, limit = 10, offset = 0): Post[] {
    return Array.from(this.posts.values())
      .filter(post => post.published && post.category_id === categoryId)
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  getHotPosts(limit = 10): Post[] {
    return Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.heat_count - a.heat_count)
      .slice(0, limit);
  }
  
  createPost(insertPost: InsertPost): Post {
    const id = this.postIdCounter++;
    const now = new Date();
    const post = { ...insertPost, id, created_at: now, heat_count: 0 };
    this.posts.set(id, post);
    return post;
  }
  
  updatePost(id: number, postUpdate: Partial<InsertPost>): Post {
    const post = this.getPost(id);
    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }
    
    const updatedPost = { ...post, ...postUpdate };
    this.posts.set(id, updatedPost);
    return updatedPost;
  }
  
  deletePost(id: number): boolean {
    return this.posts.delete(id);
  }
  
  incrementHeatCount(id: number): boolean {
    const post = this.getPost(id);
    if (!post) {
      return false;
    }
    
    post.heat_count += 1;
    this.posts.set(id, post);
    return true;
  }
  
  // Comment methods
  getComment(id: number): Comment | undefined {
    return this.comments.get(id);
  }
  
  getCommentsByPost(postId: number): Comment[] {
    return Array.from(this.comments.values())
      .filter(comment => comment.post_id === postId)
      .sort((a, b) => a.created_at.getTime() - b.created_at.getTime());
  }
  
  createComment(insertComment: InsertComment): Comment {
    const id = this.commentIdCounter++;
    const now = new Date();
    const comment = { ...insertComment, id, created_at: now };
    this.comments.set(id, comment);
    return comment;
  }
  
  deleteComment(id: number): boolean {
    return this.comments.delete(id);
  }
  
  // Gallery methods
  getGalleryItem(id: number): GalleryItem | undefined {
    return this.galleryItems.get(id);
  }
  
  getGalleryItems(limit = 10, offset = 0): GalleryItem[] {
    return Array.from(this.galleryItems.values())
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(offset, offset + limit);
  }
  
  createGalleryItem(insertItem: InsertGalleryItem): GalleryItem {
    const id = this.galleryIdCounter++;
    const now = new Date();
    const item = { ...insertItem, id, created_at: now };
    this.galleryItems.set(id, item);
    return item;
  }
  
  // Category methods
  getCategory(id: number): Category | undefined {
    return this.categories.get(id);
  }
  
  getCategoryBySlug(slug: string): Category | undefined {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }
  
  getCategories(): Category[] {
    return Array.from(this.categories.values());
  }
  
  createCategory(insertCategory: InsertCategory): Category {
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

    
    defaultCategories.forEach((cat) => {
      this.createCategory(cat);
    });
  }
}

export const storage = new MemStorage();
