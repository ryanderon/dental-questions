// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BooksIcon, CaretRightIcon, FileTextIcon } from '@phosphor-icons/react';

const QuestionTypeCard = ({ type, questionCount, onSelect, index }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5, type: 'spring' }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-sky-300/30 transition-all duration-300 text-left overflow-hidden border-2 border-gray-100 hover:border-sky-200"
    >
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon Header */}
        <div className="flex items-start justify-between mb-6">
          <motion.div 
            className="bg-sky-300 rounded-xl p-4 shadow-lg"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <BooksIcon size={40} weight="fill" className="text-slate-800" />
          </motion.div>
          
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-sky-400 group-hover:text-sky-600 transition-colors"
          >
            <CaretRightIcon size={32} weight="fill" />
          </motion.div>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-sky-600 transition-colors">
          {type}
        </h3>
        
        {/* Question Count */}
        <div className="flex items-center gap-3 bg-sky-50 rounded-lg p-3 border border-sky-100">
          <FileTextIcon size={20} weight="fill" className="text-sky-600" />
          <span className="text-base font-bold text-gray-700">
            {questionCount} Soal
          </span>
        </div>
      </div>
      
      {/* Decorative Circle */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-sky-200 rounded-full opacity-20 group-hover:scale-150 group-hover:opacity-30 transition-all duration-500" />
    </motion.button>
  );
};

export default QuestionTypeCard;
