import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function BlogCard({ title, excerpt, date, category, imageUrl, slug }: BlogCardProps) {
  return (
    <Link to={`/blog/${slug}`} className="group h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-gray-400 text-xs font-medium mb-2">{date}</p>
          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
            {excerpt}
          </p>
          <div className="text-blue-600 font-bold text-sm flex items-center group-hover:translate-x-1 transition-transform">
            Read more <span className="ml-1">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
