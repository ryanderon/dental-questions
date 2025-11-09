// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hoverable = false,
  onClick
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-sm border border-slate-200 p-6
        ${hoverable ? 'cursor-pointer hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;
