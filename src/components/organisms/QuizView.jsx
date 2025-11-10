// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
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
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFirstQuestion = currentIndex === 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <ProgressBar current={currentIndex + 1} total={totalQuestions} />
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
