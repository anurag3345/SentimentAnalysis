import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-white z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 font-display tracking-tight hover:opacity-80 transition-opacity">
              Sentiment Analyzer
            </Link>
          </motion.div>
          
          <div className="flex space-x-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="relative px-4 py-2 text-gray-600 font-medium font-display group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="relative px-4 py-2 text-gray-600 font-medium font-display group"
              >
                <span className="relative z-10">About Us</span>
                <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-4 py-2 text-gray-600 font-medium font-display group"
              >
                <span className="relative z-10">GitHub</span>
                <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500"></div>
    </motion.nav>
  );
};

export default Navbar; 