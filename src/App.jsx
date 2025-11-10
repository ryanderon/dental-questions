import { useState, useCallback, useMemo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import QuestionTypeSelector from "./components/organisms/QuestionTypeSelector";
import QuizView from "./components/organisms/QuizView";
import ResultsView from "./components/organisms/ResultsView";
import useQuiz from "./hooks/useQuiz";
import { PAKET_A } from "./questions/PAKET_A";

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
    </div>
  );
}

export default App;
