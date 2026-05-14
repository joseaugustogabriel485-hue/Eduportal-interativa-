import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SUBJECTS } from '../data/lessons';
import { Check, X, Trophy, RefreshCcw, ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Record<string, Question[]> = {
  matematica: [
    {
      id: 1,
      text: "Qual é o valor de x na equação 2x + 10 = 20?",
      options: ["2", "5", "10", "15"],
      correctAnswer: 1,
      explanation: "2x = 20 - 10 => 2x = 10 => x = 5"
    },
    {
      id: 2,
      text: "Qual é a raiz quadrada de 144?",
      options: ["10", "11", "12", "14"],
      correctAnswer: 2,
      explanation: "12 * 12 = 144"
    }
  ],
  fisica: [
    {
      id: 1,
      text: "Qual é a unidade de medida da força no Sistema Internacional?",
      options: ["Joule", "Pascal", "Newton", "Watt"],
      correctAnswer: 2,
      explanation: "A força é medida em Newtons (N) em homenagem a Isaac Newton."
    }
  ]
};

export default function QuizGame() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = SUBJECTS.find(s => s.id === subjectId);
  const questions = QUIZ_QUESTIONS[subjectId as string] || QUIZ_QUESTIONS.matematica;

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (!subject) return <div>Matéria não encontrada.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to={`/subjects/${subjectId}`} className="text-sm font-bold text-slate-400 hover:text-indigo-600 mb-8 inline-flex items-center gap-2">
        <ChevronLeft size={16} />
        Sair do Jogo
      </Link>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-indigo-100"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", subject.color)}>
                  <subject.icon size={24} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 tracking-tight">{subject.name}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {currentStep + 1} of {questions.length}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === currentStep ? "w-8 bg-indigo-600" : i < currentStep ? "w-3 bg-emerald-400" : "w-3 bg-slate-100"
                    )} 
                  />
                ))}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-10 tracking-tight leading-tight">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4 mb-10">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                
                let variantClass = "bg-slate-50 border-slate-100 text-slate-700 hover:border-indigo-200 hover:bg-slate-100";
                
                if (isAnswered) {
                  if (isCorrect) variantClass = "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-emerald-100";
                  else if (isSelected && !isCorrect) variantClass = "bg-rose-50 border-rose-500 text-rose-700 shadow-rose-100";
                  else variantClass = "opacity-50 grayscale";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full flex items-center justify-between p-6 rounded-3xl border-2 font-bold text-lg transition-all text-left group",
                      variantClass
                    )}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && <Check size={24} className="text-emerald-500" />}
                    {isAnswered && isSelected && !isCorrect && <X size={24} className="text-rose-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mb-10"
              >
                <p className="text-indigo-800 font-bold mb-1">💡 Explicação:</p>
                <p className="text-indigo-600 font-medium leading-relaxed">{currentQuestion.explanation}</p>
              </motion.div>
            )}

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={cn(
                "w-full py-5 rounded-3xl font-extrabold text-lg flex items-center justify-center gap-3 transition-all",
                isAnswered 
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-black hover:-translate-y-1" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              Próxima Pergunta
              <ArrowRight size={20} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-12 text-center border border-slate-100 shadow-2xl shadow-indigo-100"
          >
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-inner">
              <Trophy size={48} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4 tracking-tight">Desafio Concluído!</h2>
            <p className="text-slate-500 font-medium mb-10">Você mandou muito bem no teste de {subject.name}.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Acertos</p>
                <p className="text-3xl font-extrabold text-indigo-600">{score}/{questions.length}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">EXP Ganho</p>
                <p className="text-3xl font-extrabold text-emerald-500">+{score * 50}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={resetQuiz}
                className="flex-1 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-3xl font-extrabold hover:border-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={20} />
                Reiniciar
              </button>
              <Link to="/subjects" className="flex-1">
                <button className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-extrabold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  Continuar
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
