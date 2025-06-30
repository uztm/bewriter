"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, Edit, Archive, Trash2, Eye, Calendar, Clock, Heart, MessageCircle } from "lucide-react"

// Mock data for blog posts
const mockPosts = {
  published: [
    {
      id: 1,
      title: "Getting Started with React Server Components",
      description:
        "A comprehensive guide to understanding and implementing React Server Components in your Next.js applications.",
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      likes: 42,
      comments: 12,
      views: 1250,
      tags: ["React", "Next.js", "Server Components"],
    },
    {
      id: 2,
      title: "Building Scalable APIs with Node.js",
      description: "Learn best practices for creating robust and scalable REST APIs using Node.js and Express.",
      publishedAt: "2024-01-10",
      readTime: "12 min read",
      likes: 38,
      comments: 8,
      views: 980,
      tags: ["Node.js", "API", "Backend"],
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox: When to Use What",
      description: "A detailed comparison of CSS Grid and Flexbox with practical examples and use cases.",
      publishedAt: "2024-01-05",
      readTime: "6 min read",
      likes: 56,
      comments: 15,
      views: 1680,
      tags: ["CSS", "Layout", "Frontend"],
    },
  ],
  archived: [
    {
      id: 4,
      title: "Introduction to TypeScript",
      description: "Basic concepts and benefits of using TypeScript in your JavaScript projects.",
      publishedAt: "2023-12-20",
      readTime: "10 min read",
      likes: 24,
      comments: 6,
      views: 750,
      tags: ["TypeScript", "JavaScript"],
    },
    {
      id: 5,
      title: "Docker for Beginners",
      description: "Getting started with containerization using Docker for web development.",
      publishedAt: "2023-12-15",
      readTime: "15 min read",
      likes: 31,
      comments: 9,
      views: 920,
      tags: ["Docker", "DevOps"],
    },
  ],
}

export default function Account() {
  const [activeTab, setActiveTab] = useState("published")

  const handlePostAction = (action: string, postId: number) => {
    console.log(`${action} post with ID: ${postId}`)
    // Here you would implement the actual functionality
  }

  const BlogCard = ({ post, isArchived = false }: { post: any; isArchived?: boolean }) => (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold leading-tight mb-2">{post.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">{post.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handlePostAction("view", post.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Post
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePostAction("edit", post.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {!isArchived ? (
                <DropdownMenuItem onClick={() => handlePostAction("archive", post.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Post
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => handlePostAction("unarchive", post.id)}>
                  <Archive className="mr-2 h-4 w-4" />
                  Unarchive Post
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handlePostAction("delete", post.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {post.likes}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {post.comments}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
            <AvatarFallback className="text-2xl font-semibold">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">John Doe</h1>
            <p className="text-lg text-muted-foreground mb-3">@johndoe</p>
            <p className="text-sm text-muted-foreground max-w-md">
              Full-stack developer passionate about creating amazing web experiences. Love sharing knowledge through
              writing and open source contributions.
            </p>
          </div>
        </div>

        {/* My Blogs Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Blogs</h2>
            <Button onClick={() => console.log("Add new post")} className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Post
            </Button>
          </div>

          {/* Tabs for Published/Archived */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="published" className="gap-2">
                Published ({mockPosts.published.length})
              </TabsTrigger>
              <TabsTrigger value="archived" className="gap-2">
                Archived ({mockPosts.archived.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="mt-6">
              <div className="grid gap-4">
                {mockPosts.published.length > 0 ? (
                  mockPosts.published.map((post) => <BlogCard key={post.id} post={post} />)
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No published posts yet.</p>
                    <Button className="mt-4 gap-2" onClick={() => console.log("Add new post")}>
                      <Plus className="h-4 w-4" />
                      Create Your First Post
                    </Button>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="archived" className="mt-6">
              <div className="grid gap-4">
                {mockPosts.archived.length > 0 ? (
                  mockPosts.archived.map((post) => <BlogCard key={post.id} post={post} isArchived={true} />)
                ) : (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No archived posts.</p>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
