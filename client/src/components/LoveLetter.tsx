import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LoveLetterProps {
  onNavigate: (section: string) => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-cursive text-pink-600 mb-8 text-center">
            Querida Foquito
          </h2>
          
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-pink"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
              Me volvés completamente loco. Cada vez que te veo, siento el dilema más grande de todos: una parte de mí quiere viajar en el tiempo para revivir cómo empezó todo, y la otra no quiere perderse ni un solo segundo de esta hermosa relación que estamos construyendo 🥰
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-pink"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
              Me hacés muy feliz y me llena de alegría saber que vas a ser mi compañerita para toda la vida. Con vos encontré todo; genuinamente siento que no me entra un rayito más de emoción, de alegría, de luz💡💘
              </p>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-pink"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
              Con vos siempre sé que todo va a estar bien. Ya sea tomando café con limonada, haciéndonos mimitos o dándonos un beso bajo la lluvia… con vos sé que quiero todo. Te amo a más no poder, Phi 🥺
              </p>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="prose prose-pink"
            >
              <p className="text-lg text-gray-700 leading-relaxed">
              Pero más que nada, amo la idea de enamorarnos día tras día, de estar siempre el uno para el otro, y de dar lo mejor de nosotros. Quiero cuidarte (y que me cuides) por el resto de nuestras vidas. Quiero que seas la madre de mis hijos, y quiero ser tu amorcito por el resto de nuestras vidas 💗
              </p>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center"
          >
            <button
              onClick={() => onNavigate('gallery')}
              className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
            >
              Pedacitos de nuestra historia <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveLetter;