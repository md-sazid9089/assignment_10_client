import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false,
  variant = 'default',
  ...props 
}) => {
  const animations = {
    default: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
    },
    icon: {
      whileHover: { scale: 1.1, rotate: 5 },
      whileTap: { scale: 0.9 },
    },
    bounce: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95, y: 0 },
    }
  };

  const selectedAnimation = animations[variant] || animations.default;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      {...selectedAnimation}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
