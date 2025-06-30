
import type { Article } from "@/types/article"
import { User } from "@/types/user"

export const users: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
    title: "Senior Full Stack Developer",
    bio: "Passionate about creating beautiful, functional web applications. I love sharing knowledge about React, Node.js, and modern web development practices. Always learning and exploring new technologies.",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    joinedDate: "2022-03-15",
    verified: true,
    badge: "Pro",
    social: {
      twitter: "sarahchen_dev",
      github: "sarahchen",
      linkedin: "sarah-chen-dev",
    },
    stats: {
      articles: 24,
      followers: 1250,
      following: 180,
    },
  },
]

export const userArticles: Record<string, Article[]> = {
  "1": [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      slug: "future-web-development-2024",
      excerpt:
        "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.",
      content: "Web development is evolving at an unprecedented pace...",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
        role: "Senior Developer",
      },
      publishedDate: "2024-01-15",
      readTime: 8,
      category: "technology",
      tags: ["Web Development", "JavaScript", "AI", "Frameworks"],
      status: "published",
      views: 2340,
      likes: 156,
      comments: 23,
    },
    {
      id: "2",
      title: "Building Scalable React Applications",
      slug: "building-scalable-react-applications",
      excerpt:
        "Learn the best practices for building React applications that can scale from small projects to enterprise-level solutions.",
      content: "Scalability is crucial when building React applications...",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
        role: "Senior Developer",
      },
      publishedDate: "2024-01-10",
      readTime: 12,
      category: "technology",
      tags: ["React", "JavaScript", "Architecture", "Best Practices"],
      status: "published",
      views: 1890,
      likes: 134,
      comments: 18,
    },
    {
      id: "3",
      title: "Understanding TypeScript Generics",
      slug: "understanding-typescript-generics",
      excerpt:
        "A comprehensive guide to TypeScript generics and how they can make your code more flexible and type-safe.",
      content: "TypeScript generics are a powerful feature...",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2028&auto=format&fit=crop",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
        role: "Senior Developer",
      },
      publishedDate: "2024-01-05",
      readTime: 10,
      category: "technology",
      tags: ["TypeScript", "Programming", "Type Safety"],
      status: "draft",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ],
}

export async function getUserProfile(userId: string): Promise<User | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users.find((user) => user.id === userId) || null
}

export async function getCurrentUser(): Promise<User | null> {
  // Simulate getting current user (in real app, this would check auth)
  await new Promise((resolve) => setTimeout(resolve, 200))
  return users[0] // Return first user as current user for demo
}

export function getUserArticles(userId: string): Article[] {
  return userArticles[userId] || []
}

export function getArticleById(articleId: string): Article | null {
  for (const articles of Object.values(userArticles)) {
    const article = articles.find((a) => a.id === articleId)
    if (article) return article
  }
  return null
}
