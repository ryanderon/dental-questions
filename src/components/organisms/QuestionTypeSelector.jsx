// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { GraduationCapIcon, SparkleIcon } from "@phosphor-icons/react";
import QuestionTypeCard from "../molecules/QuestionTypeCard";

const QuestionTypeSelector = ({ questionSets, onSelectType }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-24">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="inline-flex items-center justify-center bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-[2rem] p-8 mb-8 shadow-2xl border-2 border-white/20"
          >
            <div className="relative">
              <GraduationCapIcon
                size={96}
                weight="duotone"
                className="text-white drop-shadow-2xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2"
              >
                <SparkleIcon
                  size={32}
                  weight="fill"
                  className="text-yellow-300 drop-shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
            Pilih Tipe Soal
          </h1>

          <p className="text-xl md:text-2xl text-white/95 font-semibold max-w-3xl mx-auto drop-shadow-lg">
            Pilih paket soal yang ingin Anda kerjakan dan mulai belajar
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questionSets.map((set, index) => (
            <QuestionTypeCard
              key={set.type}
              type={set.type}
              questionCount={set.questions.length}
              onSelect={() => onSelectType(set)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTypeSelector;
