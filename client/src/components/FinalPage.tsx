import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const FinalPage: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 md:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl text-center"
      >
        {!accepted ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-cursive text-pink-600 mb-8">
              Una última pregunta, me harías el honor de ser mi compañerita por el resto de nuestras vidas?
              </h2>
              <button
                onClick={handleAccept}
                className="px-12 py-6 bg-pink-500 text-white rounded-full text-xl hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
              >
                Sí <Heart className="w-6 h-6 fill-current" />
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-cursive text-pink-600">
              💖 It's Official! 💖
            </h2>
            <p className="text-2xl text-gray-700">
              Gracias por hacerme la persona más felíz del mundo!
            </p>
            <div className="p-8 border-4 border-pink-200 rounded-lg max-w-md mx-auto">
              <h3 className="text-2xl font-cursive text-pink-600 mb-4">
                Certificate of Love
              </h3>
              <p className="text-gray-700 mb-4">
                Esto certifica que Lucesita y Phi están oficialmente en una relación
              </p>
              <p className="text-gray-500 italic">
                Date: {new Date().toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FinalPage;