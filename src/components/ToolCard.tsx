import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import React from 'react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  isLocked?: boolean;
}

export default function ToolCard({ title, description, icon: Icon, path, color, isLocked }: ToolCardProps) {
  return (
    <motion.div
      whileHover={isLocked ? {} : { y: -5 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group relative ${
        isLocked ? 'opacity-75 grayscale-[0.5]' : 'hover:shadow-md'
      }`}
    >
      {isLocked && (
        <div className="absolute top-4 right-4 z-10 bg-gray-900/10 p-1.5 rounded-lg backdrop-blur-sm">
          <div className="bg-white p-1 rounded-md shadow-sm">
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
      )}
      <Link to={path} className="p-6 flex flex-col h-full">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${isLocked ? 'grayscale' : ''}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight flex items-center">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="mt-4 flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isLocked ? 'Sign in to use →' : 'Try it now →'}
        </div>
      </Link>
    </motion.div>
  );
}
