// app/(site)/my-posts/page.tsx

"use client";

import { useEffect, useState } from "react";
import { crud } from "@/app/api/apiServoce";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Post {
  id: number;
  uuid: string;
  title: string;
  cover_image: string;
  description: string;
  body: string; // stored HTML
  category: {
    id: number;
    name: string;
    emoji: string;
  };
  tags: string[];
  is_published: boolean;
  published_date: string;
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await crud.loadAll("post/my_posts/");
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts", err);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading posts...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-16">
      {posts.map((post) => (
        <article key={post.id} className="space-y-4">
          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full rounded-lg mb-4"
            />
          )}
          <header>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-muted-foreground">{post.description}</p>
            <div className="text-sm text-muted-foreground flex gap-4 mt-2">
              <span>{post.category.emoji} {post.category.name}</span>
              <span>
                {post.is_published
                  ? `Published: ${format(new Date(post.published_date), "PPPpp")}`
                  : "Draft"}
              </span>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {post.tags.map((tag, i) => (
                <Badge key={i} variant="outline">#{tag}</Badge>
              ))}
            </div>
          </header>

          {/* Render HTML body */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </article>
      ))}
    </div>
  );
}
