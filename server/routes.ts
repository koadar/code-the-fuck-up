import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPostSchema, 
  insertCommentSchema,
  insertGalleryItemSchema,
  insertCategorySchema
} from "@shared/schema";
import { z } from "zod";

function isValidInteger(value: string | undefined): boolean {
  return typeof value === "string" && /^-?\d+$/.test(value);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Categories routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  // Posts/Rants routes
  app.get("/api/posts", async (req, res) => {
    try {
      const limitParam = req.query.limit as string | undefined;
      if (limitParam !== undefined && !isValidInteger(limitParam)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }
      const offsetParam = req.query.offset as string | undefined;
      if (offsetParam !== undefined && !isValidInteger(offsetParam)) {
        return res.status(400).json({ message: "Invalid offset parameter" });
      }

      const limit = limitParam ? parseInt(limitParam, 10) : 10;
      const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
      const posts = await storage.getPosts(limit, offset);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });
  
  app.get("/api/posts/hot", async (req, res) => {
    try {
      const limitParam = req.query.limit as string | undefined;
      if (limitParam !== undefined && !isValidInteger(limitParam)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }

      const limit = limitParam ? parseInt(limitParam, 10) : 10;
      const hotPosts = await storage.getHotPosts(limit);
      res.json(hotPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch hot posts" });
    }
  });
  
  app.get("/api/categories/:slug/posts", async (req, res) => {
    try {
      const { slug } = req.params;
      const limitParam = req.query.limit as string | undefined;
      if (limitParam !== undefined && !isValidInteger(limitParam)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }
      const offsetParam = req.query.offset as string | undefined;
      if (offsetParam !== undefined && !isValidInteger(offsetParam)) {
        return res.status(400).json({ message: "Invalid offset parameter" });
      }

      const limit = limitParam ? parseInt(limitParam, 10) : 10;
      const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
      
      const category = await storage.getCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      const posts = await storage.getPostsByCategory(category.id, limit, offset);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts by category" });
    }
  });
  
  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });
  
  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });
  
  app.post("/api/posts/:id/heat", async (req, res) => {
    try {
      const idParam = req.params.id;
      if (!isValidInteger(idParam)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const id = parseInt(idParam, 10);
      const success = await storage.incrementHeatCount(id);
      
      if (!success) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      const post = await storage.getPost(id);
      res.json({ heatCount: post?.heat_count });
    } catch (error) {
      res.status(500).json({ message: "Failed to heat post" });
    }
  });
  
  // Comments routes
  app.get("/api/posts/:postId/comments", async (req, res) => {
    try {
      const postIdParam = req.params.postId;
      if (!isValidInteger(postIdParam)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const postId = parseInt(postIdParam, 10);
      const comments = await storage.getCommentsByPost(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });
  
  app.post("/api/comments", async (req, res) => {
    try {
      const commentData = insertCommentSchema.parse(req.body);
      const comment = await storage.createComment(commentData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create comment" });
    }
  });
  
  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const limitParam = req.query.limit as string | undefined;
      if (limitParam !== undefined && !isValidInteger(limitParam)) {
        return res.status(400).json({ message: "Invalid limit parameter" });
      }
      const offsetParam = req.query.offset as string | undefined;
      if (offsetParam !== undefined && !isValidInteger(offsetParam)) {
        return res.status(400).json({ message: "Invalid offset parameter" });
      }

      const limit = limitParam ? parseInt(limitParam, 10) : 10;
      const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
      const items = await storage.getGalleryItems(limit, offset);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  
  app.post("/api/gallery", async (req, res) => {
    try {
      const itemData = insertGalleryItemSchema.parse(req.body);
      const item = await storage.createGalleryItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid gallery item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });
  
  // Feature routes
  app.post("/api/features/rage-mode", async (req, res) => {
    try {
      const { enabled } = req.body;
      // In a real app, this would be saved to user preferences
      res.json({ message: `Rage mode ${enabled ? 'enabled' : 'disabled'}`, success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to toggle rage mode" });
    }
  });

  app.get("/api/features/dev-stories", async (req, res) => {
    try {
      const limitParam = req.query.limit as string | undefined;
      const limit = limitParam ? parseInt(limitParam, 10) : 5;
      
      // Get more dev stories from storage (we'll seed some)
      const stories = await storage.getDevStories(limit);
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dev stories" });
    }
  });

  app.post("/api/features/confession", async (req, res) => {
    try {
      const { confession, anonymous } = req.body;
      
      if (!confession || confession.trim().length === 0) {
        return res.status(400).json({ message: "Confession cannot be empty" });
      }
      
      // In a real app, this would be saved to the database
      const confessionEntry = {
        id: Date.now(),
        content: confession,
        anonymous: anonymous !== false,
        timestamp: new Date(),
        category: 'dev-confession'
      };
      
      res.json({ 
        message: "Confession submitted successfully! Your sins are now part of the collective shame.", 
        success: true,
        confession: confessionEntry
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to submit confession" });
    }
  });

  app.get("/api/features/daily-fuckup", async (req, res) => {
    try {
      const fuckups = [
        {
          title: "Deleted production database on Friday at 5PM",
          story: "Thought I was on staging. I wasn't. Spent the weekend in the office with the CTO breathing down my neck.",
          author: "DeadInside_Dev",
          timestamp: "2 days ago",
          category: "database-disaster"
        },
        {
          title: "Pushed API keys to public GitHub repo",
          story: "Got 47 emails about AWS charges within the hour. Bitcoin miners love free compute apparently.",
          author: "SecurityNightmare",
          timestamp: "1 week ago", 
          category: "security-fail"
        },
        {
          title: "Deployed untested code to prod because 'it's just a small change'",
          story: "Site was down for 3 hours during Black Friday. I learned what a rollback is that day.",
          author: "ProductionWarrior",
          timestamp: "3 days ago",
          category: "deployment-disaster"
        },
        {
          title: "Told client the feature would take 2 days, took 2 months",
          story: "Turns out 'simple contact form' meant 'full CRM with AI integration and blockchain.' Who knew?",
          author: "ScopeCreepVictim",
          timestamp: "1 month ago",
          category: "estimation-fail"
        },
        {
          title: "Used git force push on main branch",
          story: "Overwrote 2 weeks of team work. Git history said goodbye. Team said goodbye to me.",
          author: "GitDestroyer",
          timestamp: "5 days ago",
          category: "git-disaster"
        }
      ];
      
      const randomFuckup = fuckups[Math.floor(Math.random() * fuckups.length)];
      res.json(randomFuckup);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate daily fuckup" });
    }
  });

  // Users routes (auth would be added in a real implementation)
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username or email already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(409).json({ message: "Email already exists" });
      }
      
      // In a real implementation, we would hash the password here
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
