import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from './Blog';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Calendar, Tag, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
                <ChevronLeft className="mr-1 h-5 w-5" /> Back to Blog
              </Link>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
                {post.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-10 pb-10 border-b border-gray-100">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            {post.category}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            5 min read
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-lg prose-blue max-w-none"
        >
          <div className="markdown-body">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </motion.div>

        {/* Footer / CTA */}
        <div className="mt-20 p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Need to edit your images?</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Try our free online tools to compress, resize, crop, and convert your images in seconds. No registration required.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 uppercase tracking-widest"
          >
            Explore All Tools
          </Link>
        </div>
      </div>
    </div>
  );
}
