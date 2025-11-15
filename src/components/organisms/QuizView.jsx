import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  BookmarkIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react";
import QuestionCard from "../molecules/QuestionCard";
import OptionButton from "../molecules/OptionButton";
import Button from "../atoms/Button";
import ProgressBar from "../atoms/ProgressBar";

const QuizView = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrevious,
  onSubmit,
  markedQuestions,
  onToggleMark,
  onGoToQuestion,
  markedQuestionsList,
}) => {
  const [showMarkedList, setShowMarkedList] = useState(false);
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFirstQuestion = currentIndex === 0;
  const isMarked = markedQuestions?.has(question?.id);

  return (
    <div className="min-h-screen py-8 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Progress Bar and Marked Questions Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <ProgressBar current={currentIndex + 1} total={totalQuestions} />
            </div>
            {markedQuestionsList?.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMarkedList(!showMarkedList)}
                className="whitespace-nowrap"
              >
                <span className="flex items-center gap-2">
                  <BookmarkIcon size={18} weight="fill" />
                  Marked ({markedQuestionsList.length})
                </span>
              </Button>
            )}
          </div>

          {/* Marked Questions List Dropdown */}
          <AnimatePresence>
            {showMarkedList && markedQuestionsList?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <ListIcon size={20} weight="bold" />
                      Marked Questions
                    </h3>
                    <button
                      onClick={() => setShowMarkedList(false)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <XIcon size={20} weight="bold" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {markedQuestionsList.map((markedQ) => (
                      <button
                        key={markedQ.id}
                        onClick={() => {
                          onGoToQuestion(markedQ.index);
                          setShowMarkedList(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md ${
                          markedQ.index === currentIndex
                            ? "bg-sky-50 border-sky-300 shadow-sm"
                            : "bg-slate-50 border-slate-200 hover:border-sky-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="shrink-0 font-bold text-sky-600">
                            #{markedQ.index + 1}
                          </span>
                          <p className="text-sm text-slate-700 line-clamp-2">
                            {markedQ.question}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <QuestionCard
              question={question.question}
              number={currentIndex + 1}
              total={totalQuestions}
              isMarked={isMarked}
              onToggleMark={() => onToggleMark(question.id)}
            >
              {question.options.map((option, index) => (
                <OptionButton
                  key={index}
                  option={option}
                  index={index}
                  selected={selectedAnswer === option}
                  onSelect={onSelectAnswer}
                />
              ))}
            </QuestionCard>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4"
        >
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className={isFirstQuestion ? "invisible" : ""}
          >
            <span className="flex items-center gap-2">
              <CaretLeftIcon size={20} weight="bold" />
              Sebelumnya
            </span>
          </Button>

          <div className="flex gap-4">
            {isLastQuestion ? (
              <Button
                variant="success"
                onClick={onSubmit}
                size="lg"
                disabled={!selectedAnswer}
              >
                <span className="flex items-center gap-2">
                  <span>Selesai & Lihat Hasil</span>
                  <CheckCircleIcon size={24} weight="bold" />
                </span>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={onNext}
                disabled={!selectedAnswer}
                size="lg"
              >
                <span className="flex items-center gap-2">
                  <span>Selanjutnya</span>
                  <CaretRightIcon size={20} weight="bold" />
                </span>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizView;
