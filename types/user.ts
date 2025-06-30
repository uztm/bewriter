export interface User {
    id: string
    name: string
    avatar: string
    coverImage?: string
    title: string
    bio: string
    location?: string
    website?: string
    joinedDate: string
    verified: boolean
    badge?: string
    social?: {
      twitter?: string
      github?: string
      linkedin?: string
    }
    stats: {
      articles: number
      followers: number
      following: number
    }
  }
  