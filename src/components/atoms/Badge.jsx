// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'default',
  className = '' 
}) => {
  const variants = {
    default: 'bg-sky-100 text-sky-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    info: 'bg-blue-100 text-blue-700'
  };
  
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.span>
  );
};

export default Badge;
