"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Filter, Grid, List, Calendar, User, Clock, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ArticleCard from "@/components/article-card"
import { articles, categories } from "@/data/articles-data"

type ViewMode = "grid" | "list"
type SortOption = "newest" | "oldest" | "popular" | "alphabetical"

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const articlesPerPage = 12

  // Debounced search
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.author.name.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((article) => selectedCategories.includes(article.category))
    }

    // Sort articles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        case "oldest":
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        case "popular":
          return b.readTime - a.readTime // Using readTime as popularity proxy
        case "alphabetical":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [debouncedSearchQuery, selectedCategories, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedArticles.length / articlesPerPage)
  const paginatedArticles = filteredAndSortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage,
  )

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategories, sortBy])

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSortBy("newest")
  }

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setIsLoading(true)
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCurrentPage((prev) => prev + 1)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover insights, tutorials, and stories from our community of writers and experts.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, authors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 text-base border-gray-200 focus:border-gray-400 focus:ring-gray-400 rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Categories Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Categories</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>

                {showFilters && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 min-w-64 z-10">
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryToggle(category.id)}
                            className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                          />
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-500">({category.count})</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || searchQuery) && (
                <div className="flex items-center space-x-2">
                  {selectedCategories.map((categoryId) => {
                    const category = categories.find((c) => c.id === categoryId)
                    return (
                      <span
                        key={categoryId}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-900 text-white text-xs rounded-full"
                      >
                        <span>{category?.name}</span>
                        <button
                          onClick={() => handleCategoryToggle(categoryId)}
                          className="hover:bg-gray-700 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )
                  })}
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 bg-gray-100 border-0 rounded-lg text-sm font-medium focus:ring-2 focus:ring-gray-400"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="alphabetical">A-Z</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            {filteredAndSortedArticles.length === 0
              ? "No articles found"
              : `Showing ${paginatedArticles.length} of ${filteredAndSortedArticles.length} articles`}
          </p>
          {debouncedSearchQuery && (
            <p className="text-sm text-gray-500">
              Search results for "<span className="font-medium">{debouncedSearchQuery}</span>"
            </p>
          )}
        </div>

        {/* Articles Grid/List */}
        {filteredAndSortedArticles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={clearAllFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <div
              className={`grid gap-8 mb-12 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-4xl mx-auto"
              }`}
            >
              {paginatedArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} viewMode={viewMode} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                {currentPage < totalPages && (
                  <Button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Load More Articles"
                    )}
                  </Button>
                )}
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
