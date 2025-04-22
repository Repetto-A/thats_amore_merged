import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX, Star } from 'lucide-react';
import HomePage from './components/HomePage';
import LoveLetter from './components/LoveLetter';
import PhotoGallery from './components/PhotoGallery';
import LovePlaylist from './components/LovePlaylist';
import LoveQuiz from './components/LoveQuiz';
import FinalPage from './components/FinalPage';
import { useAudioPlayer } from 'react-use-audio-player';
import homeImage from './assets/image.jpg';
const BACKGROUND_MUSIC_URL = 'https://repetto-a.github.io/testingaudio/test.m4a';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const {play, pause, load, isReady} = useAudioPlayer();

  React.useEffect(() => {
    load(BACKGROUND_MUSIC_URL);
  }, []);

  React.useEffect(() => {
    if (isReady && !musicPlaying) {
      play();
      setMusicPlaying(true);
    }
  }, [isReady]);

  const toggleMusic = () => {
    if (musicPlaying) {
      pause();
    } else {
      play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onNavigate={setCurrentSection} />;
      case 'letter':
        return <LoveLetter onNavigate={setCurrentSection} />;
      case 'gallery':
        return <PhotoGallery onNavigate={setCurrentSection} />;
      case 'playlist':
        return <LovePlaylist onNavigate={setCurrentSection} />;
      case 'quiz':
        return <LoveQuiz onComplete={() => setQuizCompleted(true)} onNavigate={setCurrentSection} />;
      case 'final':
        return quizCompleted ? <FinalPage /> : <HomePage onNavigate={setCurrentSection} />;
      default:
        return <HomePage onNavigate={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
      {/* Floating stars background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0.2, scale: 0.5 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Star className="text-yellow-400" size={8 + Math.random() * 8} />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex space-x-4 items-center">
              <button 
                onClick={() => setCurrentSection('home')}
                className="p-2 rounded-lg transition-colors"
              >
                <img src={homeImage} alt="Home" className="w-20 h-16 object-contain" />
              </button>
              {/* <NavButton active={currentSection === 'letter'} onClick={() => setCurrentSection('letter')}>
                Letter
              </NavButton>
              <NavButton active={currentSection === 'gallery'} onClick={() => setCurrentSection('gallery')}>
                Gallery
              </NavButton>
              <NavButton active={currentSection === 'playlist'} onClick={() => setCurrentSection('playlist')}>
                Playlist
              </NavButton>
              </NavButton>
              <NavButton active={currentSection === 'quiz'} onClick={() => setCurrentSection('quiz')}>
                Quiz
              </NavButton> */}
            </div>
            <button
              onClick={toggleMusic}
              className="p-2 rounded-full hover:bg-pink-100 transition-colors"
            >
              {musicPlaying ? <VolumeX className="w-5 h-5" /> : <Music className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
}

const NavButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-colors ${
      active
        ? 'bg-pink-500 text-white'
        : 'hover:bg-pink-100'
    }`}
  >
    {children}
  </button>
);

export default App;