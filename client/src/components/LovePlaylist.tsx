import React from 'react';
import { motion } from 'framer-motion';
import { Music, ArrowRight } from 'lucide-react';

interface LovePlaylistProps {
  onNavigate: (section: string) => void;
}

const LovePlaylist: React.FC<LovePlaylistProps> = ({ onNavigate }) => {
  const songs = [
    {
      title: "Felicità",
      artist: "Al Bano & Romina Power",
      comment: "Se dovessi spiegare la felicità... mostrerei una foto tua",
      embedId: "7sXTcibuNYugjjYNfgf2kY"
    },
    {
        title: "Più bella cosa",
        artist: "Eros Ramazzotti",
        comment: "Perché non conosco niente di più bello che stare con te",
        embedId: "0KligwQn4Iy344p2Q5m6k6"
    },
    {
        title: "Vivo per lei",
        artist: "Andrea Bocelli & Giorgia",
        comment: "Se la vita fosse una canzone, tu saresti il mio ritornello preferito",
        embedId: "6cPLCU7hKjgjvLWzCevl7R"
    },
    {
        title: "Come un pittore",
        artist: "Modà ft. Jarabe de Palo",
        comment: "Ti dipingerei con mille colori, ma nessuno sarebbe all’altezza della tua bellezza",
        embedId: "2Qgm2mChzOTHTfB4XdJU3w"
    },
    {
        title: "Wonderwall",
        artist: "Oasis",
        comment: "You came into my life like a quiet song; one I didn’t know I needed, but now can’t imagine living without",
        embedId: "5qqabIl2vWzo9ApSC317sa"
    },
    {
        title: "Yellow",
        artist: "Coldplay",
        comment: "The stars were bright, but your light outshined them all",
        embedId: "3AJwUDP919kvQ9QcozQPxg"
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran & Andrea Bocelli",
        comment: "You're the love I dreamed of before I knew what love was",
        embedId: "3zl7j5ua8mF4JDYuxrfo01"
    },
    {
        title: "Can't Help Falling in Love",
        artist: "Elvis Presley",
        comment: "Even if I tried, I couldn't stop loving you. And I never want to",
        embedId: "44AyOl4qVkzS48vBsbNXaC"
    },
    {
        title: "You Are the Reason",
        artist: "Calum Scott",
        comment: "Without you, my world misses its rhythm",
        embedId: "69vToJ9BMbbLlFZo7k7A7B"
    }

  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-cursive text-pink-600 mb-8 text-center"
        >
          What Love Sounds Like
        </motion.h2>

        <div className="space-y-6">
          {songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Music className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{song.title}</h3>
                  <p className="text-gray-600">{song.artist}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700 italic">"{song.comment}"</p>
              <div className="mt-4 rounded-lg">
                <iframe 
                  style={{ borderRadius: "12px" }}
                  src={`https://open.spotify.com/embed/track/${song.embedId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={() => onNavigate('quiz')}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
          >
            Toca demostrar cuanto nos conocemos ;)<ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LovePlaylist;