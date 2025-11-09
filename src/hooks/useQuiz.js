import { useState } from 'react';

const useQuiz = (questions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const selectAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitQuiz = () => {
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const getResults = () => {
    let correctCount = 0;
    const wrongAnswers = [];

    questions.forEach((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correct_answer;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongAnswers.push({
          id: question.id,
          number: index + 1,
          question: question.question,
          userAnswer: userAnswer || null,
          correctAnswer: question.correct_answer
        });
      }
    });

    return {
      score: correctCount,
      total: questions.length,
      percentage: (correctCount / questions.length) * 100,
      wrongAnswers
    };
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer: answers[currentQuestion?.id],
    totalQuestions: questions.length,
    isCompleted,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuiz,
    resetQuiz,
    getResults
  };
};

export default useQuiz;
