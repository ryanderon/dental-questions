import { useState, useCallback, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon } from "@phosphor-icons/react";
import QuestionTypeSelector from "./components/organisms/QuestionTypeSelector";
import QuizView from "./components/organisms/QuizView";
import ResultsView from "./components/organisms/ResultsView";
import useQuiz from "./hooks/useQuiz";
import { PAKET_A } from "./questions/PAKET_A";
import { PAKET_B } from "./questions/PAKET_B";
import { PAKET_C } from "./questions/PAKET_C";

const VIEW_STATES = {
  SELECT_TYPE: "SELECT_TYPE",
  QUIZ: "QUIZ",
  RESULTS: "RESULTS",
};

function App() {
  const [currentView, setCurrentView] = useState(VIEW_STATES.SELECT_TYPE);
  const [selectedQuestionSet, setSelectedQuestionSet] = useState(null);

  const quiz = useQuiz(selectedQuestionSet?.questions || []);

  const questionSets = useMemo(
    () => [
      {
        type: "PAKET A",
        questions: PAKET_A,
      },
      {
        type: "PAKET B",
        questions: PAKET_B,
      },
      {
        type: "PAKET C",
        questions: PAKET_C,
      },
    ],
    []
  );

  const handleSelectType = useCallback((questionSet) => {
    setSelectedQuestionSet(questionSet);
    setCurrentView(VIEW_STATES.QUIZ);
  }, []);

  const handleNext = useCallback(() => {
    quiz.goToNextQuestion();
  }, [quiz]);

  const handlePrevious = useCallback(() => {
    quiz.goToPreviousQuestion();
  }, [quiz]);

  const handleSubmit = useCallback(() => {
    quiz.submitQuiz();
    setCurrentView(VIEW_STATES.RESULTS);
  }, [quiz]);

  const handleRestart = useCallback(() => {
    quiz.resetQuiz();
    setCurrentView(VIEW_STATES.QUIZ);
  }, [quiz]);

  const handleBackToHome = useCallback(() => {
    quiz.resetQuiz();
    setSelectedQuestionSet(null);
    setCurrentView(VIEW_STATES.SELECT_TYPE);
  }, [quiz]);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === VIEW_STATES.SELECT_TYPE && (
          <motion.div
            key="select-type"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuestionTypeSelector
              questionSets={questionSets}
              onSelectType={handleSelectType}
            />
          </motion.div>
        )}

        {currentView === VIEW_STATES.QUIZ && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizView
              question={quiz.currentQuestion}
              currentIndex={quiz.currentQuestionIndex}
              totalQuestions={quiz.totalQuestions}
              selectedAnswer={quiz.selectedAnswer}
              onSelectAnswer={quiz.selectAnswer}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
            />
          </motion.div>
        )}

        {currentView === VIEW_STATES.RESULTS && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultsView
              results={quiz.getResults()}
              onRestart={handleRestart}
              onBackToHome={handleBackToHome}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 py-4 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-300 text-sm flex items-center justify-center gap-2">
            Made with{" "}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <HeartIcon size={16} weight="fill" className="text-red-400" />
            </motion.span>{" "}
            by <span className="font-semibold text-sky-300">ryanderon</span>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
