import { useState, useMemo } from 'react';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const useQuiz = (questions) => {
  // Shuffle questions once when the quiz initializes
  const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [markedQuestions, setMarkedQuestions] = useState(new Set());

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const selectAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
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
    setMarkedQuestions(new Set());
  };

  const toggleMarkQuestion = (questionId) => {
    setMarkedQuestions(prev => {
      const newMarked = new Set(prev);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return newMarked;
    });
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < shuffledQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const getMarkedQuestionsList = () => {
    return shuffledQuestions
      .map((question, index) => ({ ...question, index }))
      .filter(question => markedQuestions.has(question.id));
  };

  const getResults = () => {
    let correctCount = 0;
    const wrongAnswers = [];

    shuffledQuestions.forEach((question, index) => {
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
      total: shuffledQuestions.length,
      percentage: (correctCount / shuffledQuestions.length) * 100,
      wrongAnswers
    };
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedAnswer: answers[currentQuestion?.id],
    totalQuestions: shuffledQuestions.length,
    isCompleted,
    markedQuestions,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    submitQuiz,
    resetQuiz,
    getResults,
    toggleMarkQuestion,
    goToQuestion,
    getMarkedQuestionsList
  };
};

export default useQuiz;
