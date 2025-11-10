// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChartLineUpIcon, CheckIcon } from "@phosphor-icons/react";

const ProgressBar = ({ current, total, className = "" }) => {
  const percentage = (current / total) * 100;

  return (
    <div
      className={`w-full bg-white rounded-2xl p-6 shadow-xl border-2 border-sky-100 ${className}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-sky-300 rounded-lg p-2 shadow-md">
            <ChartLineUpIcon
              size={24}
              weight="fill"
              className="text-slate-800"
            />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Progress
            </p>
            <p className="text-sm font-bold text-gray-700">
              Question {current} of {total}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-sky-600">
            {percentage.toFixed(0)}%
          </p>
        </div>
      </div>

      <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden shadow-inner border-2 border-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-sky-300 rounded-full relative shadow-md"
        >
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ width: "50%" }}
          />

          {percentage > 15 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <CheckIcon
                size={16}
                weight="fill"
                className="text-white drop-shadow"
              />
            </div>
          )}
        </motion.div>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs">
        <span className="text-gray-600 font-medium">{current} Completed</span>
        <span className="text-gray-500 font-medium">
          {total - current} Remaining
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
