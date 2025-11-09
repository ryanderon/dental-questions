// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { memo } from "react";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";

const OptionButton = ({
  option,
  index,
  selected,
  onSelect,
  showCorrect = false,
  correctAnswer,
}) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const letter = letters[index];

  const isCorrect = showCorrect && option === correctAnswer;
  const isWrong = showCorrect && selected && option !== correctAnswer;

  let bgStyles =
    "bg-white hover:bg-sky-50 border-2 border-gray-200 hover:border-sky-300";
  let letterStyles = "bg-gray-100 text-gray-700";
  let textStyles = "text-gray-800";
  let icon = null;

  if (selected && !showCorrect) {
    bgStyles = "bg-sky-300 border-sky-400 shadow-lg shadow-sky-200/50";
    letterStyles = "bg-white text-sky-600";
    textStyles = "text-slate-800 font-bold";
  } else if (isCorrect) {
    bgStyles = "bg-green-500 border-green-600 shadow-lg shadow-green-200/50";
    letterStyles = "bg-white text-green-600";
    textStyles = "text-white font-bold";
    icon = <CheckCircleIcon size={24} weight="fill" className="text-white" />;
  } else if (isWrong) {
    bgStyles = "bg-red-500 border-red-600 shadow-lg shadow-red-200/50";
    letterStyles = "bg-white text-red-600";
    textStyles = "text-white font-bold";
    icon = <XCircleIcon size={24} weight="fill" className="text-white" />;
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: "spring" }}
      whileHover={{ scale: showCorrect ? 1 : 1.02, x: showCorrect ? 0 : 5 }}
      whileTap={{ scale: showCorrect ? 1 : 0.98 }}
      onClick={() => !showCorrect && onSelect(option)}
      disabled={showCorrect}
      className={`
        w-full p-5 rounded-xl text-left
        transition-all duration-200 shadow-md
        flex items-center gap-4
        ${bgStyles}
        ${showCorrect ? "cursor-default" : "cursor-pointer"}
      `}
    >
      <div
        className={`
        flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
        font-black text-lg shadow-sm
        transition-all duration-200
        ${letterStyles}
      `}
      >
        {letter}
      </div>

      <span className={`flex-1 text-base leading-relaxed ${textStyles}`}>
        {option}
      </span>

      {icon && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.div>
      )}
    </motion.button>
  );
};

export default memo(OptionButton);
