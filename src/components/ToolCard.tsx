import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import React from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  key?: any;
}

export default function ToolCard({ title, description, icon: Icon, path, color }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
    >
      <Link to={path} className="p-6 flex flex-col h-full">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Try it now →
        </div>
      </Link>
    </motion.div>
  );
}
