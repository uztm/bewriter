import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import { Article } from "@/types/article"


interface ArticleCardProps {
  article: Article
  viewMode: "grid" | "list"
  index: number
}

export default function ArticleCard({ article, viewMode, index }: ArticleCardProps) {
  const isGrid = viewMode === "grid"

  return (
    <article
      className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        !isGrid ? "flex" : ""
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isGrid ? "aspect-[16/10]" : "w-80 flex-shrink-0"}`}>
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-900 rounded-full">
            {article.category}
          </span>
        </div>
        {article.featured && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-3 py-1 bg-yellow-400 text-xs font-medium text-gray-900 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-6 ${!isGrid ? "flex-1" : ""}`}>
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(article.publishedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <Link href={`/articles/${article.slug}`} className="group/link">
          <h3
            className={`font-bold text-gray-900 group-hover/link:text-gray-700 transition-colors mb-3 line-clamp-2 ${
              isGrid ? "text-xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>
        </Link>

        <p className={`text-gray-600 mb-4 ${isGrid ? "line-clamp-3" : "line-clamp-2"}`}>{article.excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-md">
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-xs text-gray-600 rounded-md">
              +{article.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={article.author.avatar || "/placeholder.svg"}
              alt={article.author.name}
              width={32}
              height={32}
              className="rounded-full shrink-0 w-8 h-8 object-cover border border-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{article.author.name}</p>
              <p className="text-xs text-gray-500">{article.author.role}</p>
            </div>
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="flex items-center space-x-1 text-sm font-medium text-gray-900 hover:text-gray-700 group/arrow"
          >
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 group-hover/arrow:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}
