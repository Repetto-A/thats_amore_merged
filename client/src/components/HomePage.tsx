import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Sparkles className="w-12 h-12 text-pink-500 mb-4" />
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
      >
        Bienvenida a nuestro nidito de amor :)
        {/* Bienvenida a nuestro rinconcito felíz :) */}
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12"
      >
        Las aventuras de una princesa que subsiste a base de suplementos, y su golden retriever personal 💞
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <button
          onClick={() => onNavigate('letter')}
          className="px-8 py-4 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
        >
          <Heart className="w-5 h-5" />
          Comenzar la odisea
        </button>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;