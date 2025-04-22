import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LoveQuizProps {
  onComplete: () => void;
  onNavigate: (section: string) => void;
}

const LoveQuiz: React.FC<LoveQuizProps> = ({ onComplete, onNavigate }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "En qué momento sufrí más?",
      options: ["2da cita, con camisa haciendo 40 grados", "1ra convivencia, RIP labios", "Viendote llorar al hablar de tu TCA", "Siempre que me tuve que separar de mi princesita :("],
      correct: 1
    },
    {
      question: "De qué nacionalidad era la moza de la tarde en que conocí a tus nonos?",
      options: ["Argentina", "Venezolana", "Peruana", "Alemana"],
      correct: 2
    },
    {
      question: "Qué es más fácil?",
      options: ["Lograr ayudar a foquito en la cocina", "Lograr que no salgas a caminar algún día", "Ver el desfile de 7 planetas del 28/02/25 sin mojarse", "Escalar el Everest siendo cuadripléjico, con los ojos bendados y durante una tormenta de nieve"],
      correct: 3
    }
  
];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete();
      onNavigate('final');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-12 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-cursive text-pink-600 mb-8 text-center">
            Love Quiz
          </h2>

          <div className="space-y-8">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl text-gray-800 font-medium">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left rounded-lg border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoveQuiz;