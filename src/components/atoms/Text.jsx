const Text = ({ 
  children, 
  variant = 'body',
  className = '',
  as = 'p'
}) => {
  const Component = as;
  
  const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-black',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-bold',
    h4: 'text-xl md:text-2xl font-semibold',
    body: 'text-base md:text-lg',
    small: 'text-sm',
    xs: 'text-xs'
  };
  
  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Text;
