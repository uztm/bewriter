import type { Article, Category } from "@/types/article";

export const categories: Category[] = [
  { id: "technology", name: "Technology", icon: "💻", count: 24 },
  { id: "design", name: "Design", icon: "🎨", count: 18 },
  { id: "business", name: "Business", icon: "💼", count: 15 },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟", count: 12 },
  { id: "travel", name: "Travel", icon: "✈️", count: 9 },
  { id: "food", name: "Food", icon: "🍽️", count: 8 },
  { id: "health", name: "Health", icon: "🏥", count: 6 },
  { id: "education", name: "Education", icon: "📚", count: 5 },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-2024",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are shaping the future of web development, from AI integration to advanced frameworks.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
      role: "Senior Developer",
    },
    publishedDate: "2024-01-15",
    readTime: 8,
    status: "published",
    category: "technology",
    tags: ["Web Development", "JavaScript", "AI", "Frameworks"],
    featured: true,
  },
  {
    id: "2",
    title: "Mastering Minimalist Design: Less is More",
    slug: "mastering-minimalist-design",
    excerpt:
      "Discover the principles of minimalist design and how to create stunning, functional interfaces that prioritize user experience over visual clutter.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2064&auto=format&fit=crop",
    author: {
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      role: "UI/UX Designer",
    },
    status: "published",
    publishedDate: "2024-01-12",
    readTime: 6,
    category: "design",
    tags: ["Design", "Minimalism", "UI/UX", "User Experience"],
  },
  {
    id: "3",
    title: "Building Scalable SaaS Applications: A Complete Guide",
    slug: "building-scalable-saas-applications",
    excerpt:
      "Learn the essential strategies and technologies for building SaaS applications that can scale from startup to enterprise level.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    author: {
      name: "Michael Thompson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
      role: "Tech Lead",
    },
    status: "published",
    publishedDate: "2024-01-10",
    readTime: 12,
    category: "business",
    tags: ["SaaS", "Scalability", "Architecture", "Business"],
  },
  {
    id: "4",
    title: "The Art of Remote Work: Productivity Tips for Digital Nomads",
    slug: "remote-work-productivity-tips",
    excerpt:
      "Maximize your productivity while working remotely with proven strategies, tools, and mindset shifts that successful digital nomads swear by.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
    author: {
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      role: "Remote Work Consultant",
    },
    status: "published",
    publishedDate: "2024-01-08",
    readTime: 7,
    category: "lifestyle",
    tags: ["Remote Work", "Productivity", "Digital Nomad", "Work-Life Balance"],
  },
  {
    id: "5",
    title: "Exploring Japan: A Cultural Journey Through Ancient and Modern",
    slug: "exploring-japan-cultural-journey",
    excerpt:
      "Immerse yourself in Japan's rich culture, from traditional temples and tea ceremonies to cutting-edge technology and modern art.",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Yuki Tanaka",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      role: "Travel Writer",
    },
    status: "published",
    publishedDate: "2024-01-05",
    readTime: 10,
    category: "travel",
    tags: ["Japan", "Culture", "Travel", "Photography"],
    featured: true,
  },
  {
    id: "6",
    title: "Farm-to-Table: The Rise of Sustainable Dining",
    slug: "farm-to-table-sustainable-dining",
    excerpt:
      "Discover how the farm-to-table movement is revolutionizing the restaurant industry and promoting sustainable, local food systems.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Chef Marcus Brown",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
      role: "Executive Chef",
    },
    status: "published",
    publishedDate: "2024-01-03",
    readTime: 5,
    category: "food",
    tags: ["Sustainability", "Food", "Restaurants", "Local Sourcing"],
  },
  {
    id: "7",
    title: "Mental Health in the Digital Age: Finding Balance",
    slug: "mental-health-digital-age",
    excerpt:
      "Navigate the challenges of maintaining mental wellness in our hyper-connected world with practical strategies and expert insights.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2031&auto=format&fit=crop",
    author: {
      name: "Dr. Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop",
      role: "Clinical Psychologist",
    },
    status: "published",
    publishedDate: "2024-01-01",
    readTime: 9,
    category: "health",
    tags: ["Mental Health", "Digital Wellness", "Psychology", "Self Care"],
  },
  {
    id: "8",
    title: "The Evolution of Online Learning: EdTech Innovations",
    slug: "evolution-online-learning-edtech",
    excerpt:
      "Explore how educational technology is transforming learning experiences and making quality education more accessible worldwide.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop",
    author: {
      name: "Prof. David Kim",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      role: "Education Technology Researcher",
    },
    status: "published",
    publishedDate: "2023-12-28",
    readTime: 11,
    category: "education",
    tags: ["EdTech", "Online Learning", "Education", "Innovation"],
  },
  {
    id: "9",
    title: "Cryptocurrency and the Future of Finance",
    slug: "cryptocurrency-future-finance",
    excerpt:
      "Understand the impact of blockchain technology and digital currencies on traditional financial systems and global economics.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2032&auto=format&fit=crop",
    author: {
      name: "Jennifer Walsh",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=1000&auto=format&fit=crop",
      role: "Financial Analyst",
    },
    status: "published",
    publishedDate: "2023-12-25",
    readTime: 8,
    category: "business",
    tags: ["Cryptocurrency", "Blockchain", "Finance", "Technology"],
  },
  {
    id: "10",
    title: "Sustainable Fashion: Style with a Conscience",
    slug: "sustainable-fashion-style-conscience",
    excerpt:
      "Learn how to build a sustainable wardrobe that reflects your values while staying fashionable and budget-conscious.",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    author: {
      name: "Isabella Martinez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
      role: "Fashion Sustainability Expert",
    },
    status: "published",
    publishedDate: "2023-12-22",
    readTime: 6,
    category: "lifestyle",
    tags: ["Sustainable Fashion", "Environment", "Style", "Ethics"],
  },
  {
    id: "11",
    title: "AI in Healthcare: Revolutionizing Patient Care",
    slug: "ai-healthcare-patient-care",
    excerpt:
      "Discover how artificial intelligence is transforming healthcare delivery, from diagnosis to treatment and patient monitoring.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Dr. Robert Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
      role: "Medical AI Researcher",
    },
    status: "published",
    publishedDate: "2023-12-20",
    readTime: 10,
    category: "health",
    tags: ["AI", "Healthcare", "Technology", "Medicine"],
    featured: true,
  },
  {
    id: "12",
    title: "The Psychology of Color in Web Design",
    slug: "psychology-color-web-design",
    excerpt:
      "Understand how color choices impact user behavior and emotions, and learn to use color psychology effectively in your designs.",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop",
    author: {
      name: "Maya Patel",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
      role: "UX Researcher",
    },
    status: "published",
    publishedDate: "2023-12-18",
    readTime: 7,
    category: "design",
    tags: ["Color Theory", "Psychology", "Web Design", "UX"],
  },
];
