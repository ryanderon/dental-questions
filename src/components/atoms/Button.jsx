// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200';
  
  const variants = {
    primary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md',
    secondary: 'bg-white hover:bg-slate-50 text-slate-900 shadow-sm hover:shadow-md border border-slate-200',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md',
    outline: 'bg-transparent border border-slate-300 hover:bg-slate-50 text-slate-700'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed';
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
