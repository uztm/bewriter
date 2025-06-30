export interface Author {
    name: string
    avatar: string
    role: string
    bio?: string
  }
  
  export interface Article {
    id: string
    title: string
    slug: string
    excerpt: string
    content?: string
    image: string
    author: Author
    publishedDate: string
    readTime: number
    category: string
    tags: string[]
    featured?: boolean
    views?: number,
    status: 'draft' | 'published' | 'archived',
    likes?: number,
    comments?: number
  }
  
  export interface Category {
    id: string
    name: string
    icon: string
    count: number
  }
  