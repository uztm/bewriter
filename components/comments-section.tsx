"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  date: string
  replies?: Comment[]
}

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
    content:
      "Amazing article! I visited Mount Rainier last summer and it was absolutely breathtaking. Your description really captures the magic of those hidden trails.",
    date: "2 days ago",
    replies: [
      {
        id: "1-1",
        author: "Jane Doe",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop",
        content: "Thank you, Sarah! Mount Rainier truly is special. I'm so glad you got to experience it firsthand.",
        date: "1 day ago",
      },
    ],
  },
  {
    id: "2",
    author: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    content:
      "Great recommendations! I've been looking for some off-the-beaten-path destinations in the Pacific Northwest. Definitely adding these to my travel list.",
    date: "3 days ago",
  },
]

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !name.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: name,
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop`,
      content: newComment,
      date: "Just now",
    }

    setComments([comment, ...comments])
    setNewComment("")
    setName("")
    setEmail("")
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: "You",
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop`,
      content: replyContent,
      date: "Just now",
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyingTo(null)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-4 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold">Leave a Comment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            type="email"
            placeholder="Your email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Textarea
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          required
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Post Comment
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex space-x-4">
              <Image
                src={comment.avatar || "/placeholder.svg"}
                alt={comment.author}
                width={48}
                height={48}
                className="rounded-full flex-shrink-0"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{comment.author}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(comment.id)}
                  className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                >
                  Reply
                </Button>
              </div>
            </div>

            {/* Reply Form */}
            {replyingTo === comment.id && (
              <div className="ml-12 space-y-3 p-4 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingTo(null)
                      setReplyContent("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-4">
                    <Image
                      src={reply.avatar || "/placeholder.svg"}
                      alt={reply.author}
                      width={40}
                      height={40}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-semibold text-sm">{reply.author}</h5>
                        <span className="text-xs text-gray-500">{reply.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
