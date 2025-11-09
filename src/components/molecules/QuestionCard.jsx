// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { QuestionIcon, HashIcon } from "@phosphor-icons/react";

const QuestionCard = ({ question, number, total, children }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 rounded-lg p-2.5">
              <QuestionIcon size={24} weight="fill" className="text-white" />
            </div>
            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">
                Question
              </span>
              <div className="flex items-center gap-2">
                <HashIcon size={20} weight="fill" className="text-slate-700" />
                <span className="text-xl font-bold text-slate-900">
                  {number}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-100 px-4 py-2 rounded-lg">
            <span className="text-sm font-bold text-slate-700">
              {number} / {total}
            </span>
          </div>
        </div>        {/* Question and Answers Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question Text - Left Side */}
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 h-fit md:sticky md:top-4">
            <p className="text-base text-slate-700 leading-relaxed">
              {question}
            </p>
          </div>

          {/* Options - Right Side */}
          <div className="space-y-3">{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionCard;
