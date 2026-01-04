import React from "react";
import { motion } from "framer-motion";

// ...existing code...
const ArtistCard = ({ rank, name, initials, avatarUrl, totalArtworks, totalLikes }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-card hover:shadow-2xl flex flex-col overflow-hidden"
    >
      <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 h-48">
        <div className="flex items-center justify-center w-full h-full">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-xl flex items-center justify-center text-4xl font-bold text-white bg-white/20">
              {initials}
            </div>
          )}
        </div>
        <span className="absolute top-4 right-4 px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-sm font-bold text-gray-900 dark:text-gray-100 shadow-lg">
          #{rank}
        </span>
      </div>
      <div className="flex-1 px-6 pt-5 pb-3 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">{name}</h3>
        <div className="mt-4 flex items-center justify-center gap-10 text-sm">
          <div>
            <p className="font-bold text-2xl text-blue-600 dark:text-indigo-400">{totalArtworks}</p>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Artworks</p>
          </div>
          <div>
            <p className="font-bold text-2xl text-cyan-600 dark:text-pink-400">{totalLikes}</p>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Likes</p>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <motion.button
          type="button"
          className="w-full px-6 py-3 rounded-xl bg-blue-600 dark:bg-indigo-600 text-white text-base font-semibold hover:bg-blue-700 dark:hover:bg-indigo-700 transition-colors shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          View Profile
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
