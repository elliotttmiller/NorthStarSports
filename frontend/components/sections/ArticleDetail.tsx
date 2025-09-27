interface ArticleDetailProps {
  article: {
    title: string
    content: string
    author: string
    publishedAt: string
    category: string
  }
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <div className="max-w-4xl mx-auto py-fluid-2xl px-fluid-lg">
      {/* Article Header */}
      <div className="mb-fluid-xl">
        <div className="flex items-center gap-2 mb-fluid-base">
          <span className="text-fluid-sm font-medium text-ns-blue bg-ns-blue/20 px-3 py-1 rounded">
            {article.category}
          </span>
        </div>
        
        <h1 className="text-fluid-5xl font-bold mb-fluid-base">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-fluid-base text-ns-muted">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Article Content - Full @tailwindcss/typography implementation */}
      <div 
        className="prose prose-lg prose-invert max-w-none
                   prose-headings:text-white prose-headings:font-bold
                   prose-h2:text-fluid-3xl prose-h2:mt-fluid-xl prose-h2:mb-fluid-base
                   prose-h3:text-fluid-2xl prose-h3:mt-fluid-lg prose-h3:mb-fluid-sm
                   prose-p:text-fluid-lg prose-p:leading-relaxed prose-p:mb-fluid-base
                   prose-a:text-ns-blue prose-a:no-underline hover:prose-a:underline
                   prose-blockquote:border-l-4 prose-blockquote:border-ns-blue
                   prose-blockquote:bg-ns-blue/10 prose-blockquote:py-fluid-sm
                   prose-blockquote:px-fluid-base prose-blockquote:italic
                   prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                   prose-li:text-fluid-base prose-li:leading-relaxed
                   prose-strong:text-white prose-strong:font-semibold"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      
      {/* Article Footer */}
      <div className="mt-fluid-2xl pt-fluid-xl border-t border-ns-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-fluid-base font-medium">Share this article:</span>
            <div className="flex gap-2">
              {/* Social sharing buttons would go here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}