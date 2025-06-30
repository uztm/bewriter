import BlogContent from "@/components/blog-content";
import CommentsSection from "@/components/comments-section";
import Sidebar from "@/components/sidebar";


export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <BlogContent />
            </div>

          
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6 md:p-8">
              <CommentsSection />
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
