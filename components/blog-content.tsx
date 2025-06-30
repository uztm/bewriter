import blogArticle from "@/data/blog-article";
import Image from "next/image";

export default function BlogContent() {
  return (
    <article className="prose prose-gray max-w-none">
      {/* Header */}
      <div className="text-center mb-10 not-prose">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance mb-4">
          {blogArticle.mainTitle}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <img
              src={blogArticle.author.avatar || "/placeholder.svg"}
              alt={blogArticle.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>By {blogArticle.author.name}</span>
          </div>
          <span>•</span>
          <span>{blogArticle.publishedDate}</span>
        </div>
      </div>

      {/* Main Image */}
      <div className="mb-12 not-prose">
        <img
          src={blogArticle.mainImage || "/placeholder.svg"}
          alt="Main article image"
          width={900}
          height={500}
          className="rounded-lg w-full object-cover"
        />
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {blogArticle.sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight border-b pb-2">
              {section.title}
            </h2>
            {section.image && (
              <div className="not-prose">
                <img
                  src={section.image || "/placeholder.svg"}
                  alt={section.title}
                  width={800}
                  height={400}
                  className="rounded-md w-full object-cover my-6"
                />
              </div>
            )}
            {section.paragraphs.map((para, pIndex) => (
              <p className="leading-7 text-gray-700" key={pIndex}>
                {para}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
