"use client"
import React from 'react'
import { motion } from "framer-motion";
import { FolderIcon } from "lucide-react"; // Icon representing an empty state

const EmptyGridSection = () => {
  return (
    <motion.div
      className="mt-10 max-w-md mx-auto p-6 shadow-lg  rounded-md bg-gradient-to-r from-[#180e13] to-[#14151c]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FolderIcon className="w-16 h-16 text-white mx-auto" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white mt-4 text-xl font-bold"
          >
            You haven't created any rooms yet.
          </motion.p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 mb-4"
        >
          Create Room
        </motion.button>
      </div>
    </motion.div>
  );
}

export default EmptyGridSection;
