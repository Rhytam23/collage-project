import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { C, font, fontBody } from '../constants/theme';
import { 
  Brain, Timer, Trophy, ArrowRight, Zap, 
  ChevronRight, CircleCheck, CircleAlert, Rocket 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const QuizArenaScreen = () => {
  const navigate = useNavigate();
  const { addXP } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    {
      id: 1,
      q: "Find the partial derivative of f(x, y) = x²y + sin(xy) with respect to x.",
      options: [
        "2xy + y cos(xy)",
        "x² + cos(xy)",
        "2y + cos(x)",
        "2xy - y sin(xy)"
      ],
      correct: 0,
      insight: "Remember to use the chain rule for trigonometric functions involving multiple variables."
    },
    {
      id: 2,
      q: "In a neural network, what does backpropagation primarily calculate?",
      options: [
        "The bias of each neuron",
        "The gradient of the loss function",
        "The total number of parameters",
        "The activation function's output"
      ],
      correct: 1,
      insight: "Backpropagation is the fundamental algorithm for training neural networks by propagating the error backwards."
    },
    {
      id: 3,
      q: "Which integration technique is best suited for ∫ x eˣ dx?",
      options: [
        "Substitution Rule",
        "Partial Fractions",
        "Integration by Parts",
        "Trigonometric Substitution"
      ],
      correct: 2,
      insight: "Integration by parts (uv - ∫v du) is the standard approach for products of algebraic and exponential functions."
    },
    {
      id: 4,
      q: "What is the result of the dot product between two orthogonal vectors?",
      options: [
        "One",
        "Zero",
        "The product of their magnitudes",
        "Parallel components"
      ],
      correct: 1,
      insight: "Orthogonal vectors have a 90° angle between them, making their cosine zero, and thus their dot product zero."
    },
    {
      id: 5,
      q: "Stochastic Gradient Descent (SGD) introduces what to the optimization process?",
      options: [
        "More memory usage",
        "Randomness for noise reduction",
        "Fixed learning rates",
        "Linear convergence only"
      ],
      correct: 1,
      insight: "The 'Stochastic' part refers to the random selection of data batches, which helps the algorithm escape local minima."
    }
  ];

  useEffect(() => {
    if (timer > 0 && !isFinished && selectedAnswer === null) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && selectedAnswer === null) {
      handleAnswer(null); // Timeout as incorrect
    }
  }, [timer, isFinished, selectedAnswer]);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    const correct = index === questions[currentIndex].correct;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);

    // Wait 2 seconds before next question
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTimer(30);
      } else {
        setIsFinished(true);
        addXP(score * 150);
      }
    }, 2000);
  };

  const ProgressBanner = () => (
    <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
      {questions.map((_, i) => (
        <div key={i} style={{ 
          flex: 1, height: 4, borderRadius: 2,
          background: i < currentIndex ? C.secondary : i === currentIndex ? C.primaryC : C.surfaceHiH,
          boxShadow: i === currentIndex ? `0 0 10px ${C.primaryC}` : 'none',
          transition: 'all 0.4s'
        }} />
      ))}
    </div>
  );

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40 }}
      >
        <div style={{ 
          background: C.surface, borderRadius: 32, padding: '48px 64px', border: `1px solid ${C.outlineV}`,
          textAlign: 'center', boxShadow: `0 32px 64px rgba(0,0,0,0.4)`, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.primaryC}, ${C.secondaryC})` }} />
          <Trophy size={64} color="#FFD700" style={{ marginBottom: 24, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.4))' }} />
          <h2 style={{ fontSize: 32, fontWeight: 900, color: C.onSurface, fontFamily: font, marginBottom: 8 }}>Evolution Complete</h2>
          <p style={{ fontSize: 13, color: C.outline, fontFamily: fontBody, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 32 }}>Evaluation Metrics Synchronized</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 40 }}>
            <div style={{ background: C.surfaceLow, padding: 20, borderRadius: 20, border: `1px solid ${C.outlineV}` }}>
              <div style={{ fontSize: 10, color: C.outline, fontWeight: 800, marginBottom: 8 }}>ACCURACY</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.onSurface }}>{Math.round((score / questions.length) * 100)}%</div>
            </div>
            <div style={{ background: C.surfaceLow, padding: 20, borderRadius: 20, border: `1px solid ${C.outlineV}` }}>
              <div style={{ fontSize: 10, color: C.outline, fontWeight: 800, marginBottom: 8 }}>XP GAINED</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.secondary }}>+{score * 150}</div>
            </div>
            <div style={{ background: C.surfaceLow, padding: 20, borderRadius: 20, border: `1px solid ${C.outlineV}` }}>
              <div style={{ fontSize: 10, color: C.outline, fontWeight: 800, marginBottom: 8 }}>NEW LEVEL</div>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.primary }}>L5.8</div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            style={{ width: '100%', padding: '16px', background: `linear-gradient(135deg, ${C.primaryC}, ${C.secondaryC})`, color: '#fff', border: 'none', borderRadius: 16, fontWeight: 900, fontSize: 14, cursor: 'pointer', fontFamily: font, letterSpacing: '0.1em', boxShadow: `0 8px 32px rgba(79,70,229,0.4)` }}
          >
            RETURN TO COMMAND CENTER
          </button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '24px 32px', minWidth: 0, overflowY: 'auto', background: `radial-gradient(circle at 50% -20%, rgba(79,70,229,0.1) 0%, transparent 50%)` }}>
      <div style={{ maxWidth: 840, margin: '0 auto', width: '100%' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 44, height: 44, background: C.surfaceLow, borderRadius: 12, border: `1px solid ${C.outlineV}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Brain size={24} color={C.primary} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.onSurface, fontFamily: font }}>Test Arena: Level 5</div>
              <div style={{ fontSize: 9, fontWeight: 800, color: C.outline, fontFamily: fontBody, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Advanced Calculus Synthesis</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.surfaceLow, padding: '8px 16px', borderRadius: 12, border: `1px solid ${timer < 10 ? '#ef4444' : C.outlineV}`, transition: 'all 0.3s' }}>
              <Timer size={16} color={timer < 10 ? '#ef4444' : C.outline} />
              <span style={{ fontSize: 14, fontWeight: 900, color: timer < 10 ? '#ef4444' : C.onSurface, fontFamily: font, width: 22 }}>{timer}</span>
            </div>
            <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', color: C.outline, cursor: 'pointer', fontSize: 11, fontWeight: 700, fontFamily: fontBody }}>EXIT</button>
          </div>
        </div>

        <ProgressBanner />

        {/* QUESTION CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{ background: C.surface, borderRadius: 24, padding: 32, border: `1px solid ${C.outlineV}`, position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, padding: 20, opacity: 0.05, pointerEvents: 'none' }}>
              <Rocket size={120} color={C.onSurface} />
            </div>

            <div style={{ fontSize: 10, fontWeight: 800, color: C.primary, fontFamily: fontBody, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>QUESTION {currentIndex + 1} OF {questions.length}</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: C.onSurface, fontFamily: font, lineHeight: 1.4, marginBottom: 40, letterSpacing: '-0.01em' }}>{currentQ.q}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {currentQ.options.map((opt, i) => {
                const isThisSelected = selectedAnswer === i;
                let bg = C.surfaceLow;
                let border = C.outlineV;
                let text = C.onSurface;

                if (isThisSelected) {
                  bg = isCorrect ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)';
                  border = isCorrect ? '#22c55e' : '#ef4444';
                }

                return (
                  <button
                    key={i}
                    onClick={() => selectedAnswer === null && handleAnswer(i)}
                    disabled={selectedAnswer !== null}
                    style={{
                      padding: '24px 32px', textAlign: 'left', background: bg, border: `1px solid ${border}`,
                      borderRadius: 16, cursor: selectedAnswer === null ? 'pointer' : 'default', transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: 16
                    }}
                  >
                    <div style={{ 
                      width: 24, height: 24, borderRadius: 8, background: isThisSelected ? border : C.surfaceHi,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900,
                      color: isThisSelected ? '#fff' : C.outline, fontFamily: font
                    }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: text }}>{opt}</span>
                    {isThisSelected && (isCorrect ? <CircleCheck size={18} color="#22c55e" style={{ marginLeft: 'auto' }} /> : <CircleAlert size={18} color="#ef4444" style={{ marginLeft: 'auto' }} />)}
                  </button>
                );
              })}
            </div>

            {/* INSIGHT OVERLAY */}
            <AnimatePresence>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: 24, padding: '16px 24px', background: C.surfaceLow, borderRadius: 16, border: `1px solid ${C.primaryC}`, position: 'relative' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Zap size={14} color={C.primaryC} />
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.onSurface, fontFamily: fontBody, letterSpacing: '0.1em' }}>NEURAL INSIGHT</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.outline, fontFamily: fontBody, margin: 0, lineHeight: 1.5 }}>{currentQ.insight}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* FEEDBACK BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.secondary }}>{score * 150}</div>
              <div style={{ fontSize: 8, fontWeight: 800, color: C.outline, letterSpacing: '0.1em' }}>POTENTIAL XP</div>
            </div>
            <div style={{ width: 1, height: 32, background: C.outlineV }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: C.primary }}>+2.5x</div>
              <div style={{ fontSize: 8, fontWeight: 800, color: C.outline, letterSpacing: '0.1em' }}>NEURAL BOOST</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizArenaScreen;
