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
  
  // Dev stories methods
  getDevStories(limit?: number): any[];
  createDevStory(story: any): any;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private comments: Map<number, Comment>;
  private galleryItems: Map<number, GalleryItem>;
  private categories: Map<number, Category>;
  private devStories: Map<number, any>;
  
  private userIdCounter: number;
  private postIdCounter: number;
  private commentIdCounter: number;
  private galleryIdCounter: number;
  private categoryIdCounter: number;
  private devStoryIdCounter: number;

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.galleryItems = new Map();
    this.categories = new Map();
    this.devStories = new Map();
    
    this.userIdCounter = 1;
    this.postIdCounter = 1;
    this.commentIdCounter = 1;
    this.galleryIdCounter = 1;
    this.categoryIdCounter = 1;
    this.devStoryIdCounter = 1;
    
    // Initialize with some default categories and stories
    this.seedCategories();
    this.seedDevStories();
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
    const user: User = { 
      ...insertUser, 
      id, 
      created_at: now,
      displayName: insertUser.displayName ?? null,
      avatar: insertUser.avatar ?? null,
      bio: insertUser.bio ?? null
    };
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
      .sort((a, b) => (b.heat_count ?? 0) - (a.heat_count ?? 0))
      .slice(0, limit);
  }
  
  createPost(insertPost: InsertPost): Post {
    const id = this.postIdCounter++;
    const now = new Date();
    const post: Post = { 
      ...insertPost, 
      id, 
      created_at: now, 
      heat_count: 0,
      excerpt: insertPost.excerpt ?? null,
      category_id: insertPost.category_id ?? null,
      is_nsfw: insertPost.is_nsfw ?? false,
      published: insertPost.published ?? false
    };
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
    
    post.heat_count = (post.heat_count ?? 0) + 1;
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
    const comment: Comment = { 
      ...insertComment, 
      id, 
      created_at: now,
      parent_id: insertComment.parent_id ?? null,
      rage_mode: insertComment.rage_mode ?? false
    };
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
  
  // Dev stories methods
  getDevStories(limit = 5): any[] {
    return Array.from(this.devStories.values())
      .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      .slice(0, limit);
  }
  
  createDevStory(insertStory: any): any {
    const id = this.devStoryIdCounter++;
    const now = new Date();
    const story = { ...insertStory, id, created_at: now };
    this.devStories.set(id, story);
    return story;
  }
  
  private seedDevStories() {
    const defaultStories = [
      {
        title: "THE DAY I LEARNED WHAT TECHNICAL DEBT REALLY MEANS",
        content: `
          <p>I inherited a codebase that looked like it was written by someone having a stroke while riding a rollercoaster.</p>
          <p>Comments like "// TODO: Fix this hack later" from 2018. Functions named 'doStuff()' and 'handleThing()'. A single file with 3,000 lines of uncommented spaghetti code.</p>
          <p>The previous dev had left detailed notes: "Good luck, you'll need it. -Dave"</p>
          <p>Six months later, I finally understood why Dave left. That codebase was a digital haunted house. Every fix broke three other things. Every feature request required archaeological excavation through layers of hacks built on hacks.</p>
          <p>I rewrote the whole thing. Took 4 months. Worth every sleepless night.</p>
        `,
        timeAgo: "1 week ago",
        likes: 523,
        comments: 67,
        author: {
          name: "Refactor Hero",
          image: "https://images.pexels.com/photos/1181267/pexels-photo-1181267.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
          username: "refactor_hero"
        }
      },
      {
        title: "I SHIPPED A BUG THAT MADE US $50K",
        content: `
          <p>Working on an e-commerce site, I accidentally removed a validation check in the checkout process.</p>
          <p>Instead of preventing multiple submissions, it started accepting them. Customers could click "Buy Now" multiple times and get charged multiple times.</p>
          <p>I discovered this at 2 AM when monitoring alerts went crazy. Panic mode: ENGAGED.</p>
          <p>Plot twist: Customers weren't complaining. They were buying gift cards for friends and family by accident, then keeping them or giving them away.</p>
          <p>Sales went up 300% that weekend. Management called it a "feature" and asked me to make it permanent.</p>
          <p>Sometimes breaking things makes things better. Still confused about that one.</p>
        `,
        timeAgo: "3 days ago", 
        likes: 891,
        comments: 134,
        author: {
          name: "Accidental Genius",
          image: "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
          username: "accident_genius"
        }
      },
      {
        title: "THE GREAT AWS BILL DISASTER OF 2024",
        content: `
          <p>Started a new job, eager to impress. CTO gives me AWS access: "Just spin up a small instance for testing."</p>
          <p>I spun up what I thought was a t2.micro. It was a p3.16xlarge. With 8 Tesla V100 GPUs. Running 24/7. For machine learning I didn't even need.</p>
          <p>Cost: $24/hour. I left it running for 3 weeks.</p>
          <p>Bill: $12,096</p>
          <p>My reaction: 💀</p>
          <p>CTO's reaction: "Well, at least you learned about AWS pricing the hard way."</p>
          <p>I spent the next month writing cost monitoring scripts. Never again.</p>
        `,
        timeAgo: "5 days ago",
        likes: 1247,
        comments: 203,
        author: {
          name: "AWS Survivor",
          image: "https://images.pexels.com/photos/3772631/pexels-photo-3772631.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
          username: "aws_survivor"
        }
      }
    ];
    
    defaultStories.forEach((story) => {
      this.createDevStory(story);
    });
  }
}

export const storage = new MemStorage();
