// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  TrophyIcon,
  HouseIcon,
  ArrowClockwiseIcon,
} from "@phosphor-icons/react";
import ScoreCard from "../molecules/ScoreCard";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const ResultsView = ({ results, onRestart, onBackToHome }) => {
  const { score, total, percentage, wrongAnswers } = results;

  return (
    <div className="min-h-screen py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl"
          >
            <TrophyIcon
              size={80}
              weight="duotone"
              className="text-yellow-300"
            />
          </motion.div>

          <Text variant="h1" className="text-white mb-4">
            Hasil Kuis
          </Text>
          <Text variant="body" className="text-white/90 max-w-2xl mx-auto">
            Berikut adalah hasil dari kuis yang telah Anda kerjakan
          </Text>
        </motion.div>

        {/* Score Card */}
        <ScoreCard
          score={score}
          total={total}
          percentage={percentage}
          wrongAnswers={wrongAnswers}
        />

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
        >
          <Button variant="outline" onClick={onBackToHome} size="lg">
            <span className="flex items-center gap-2">
              <HouseIcon size={24} weight="bold" />
              Kembali ke Beranda
            </span>
          </Button>
          <Button variant="primary" onClick={onRestart} size="lg">
            <span className="flex items-center gap-2">
              <ArrowClockwiseIcon size={24} weight="bold" />
              Ulangi Kuis
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsView;
