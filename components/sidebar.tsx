import Image from "next/image"
import Link from "next/link"
import { relatedArticles } from "@/data/related-articles"

export default function Sidebar() {
  return (
    <div className="space-y-8">
      {/* Author Bio */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">About the Author</h3>
        <div className="flex items-start space-x-3">
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Jane Doe"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h4 className="font-medium">Jane Doe</h4>
            <p className="text-sm text-gray-600 mt-1">
              Nature enthusiast, travel writer, and advocate for sustainable tourism.
            </p>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              href={article.slug}
              className="block group hover:bg-gray-50 rounded-lg p-3 -m-3 transition-colors"
            >
              <div className="flex space-x-3">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={80}
                  height={60}
                  className="rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["Travel", "Nature", "Pacific Northwest", "Hiking", "Photography", "Adventure"].map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(" ", "-")}`}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-sm text-gray-600 mb-4">Get the latest travel stories and tips delivered to your inbox.</p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
