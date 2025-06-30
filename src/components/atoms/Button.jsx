import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-500";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-premium focus:ring-primary-500",
    secondary: "bg-surface-600 text-white border border-surface-500 hover:bg-surface-500 focus:ring-secondary-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    ghost: "text-gray-300 hover:text-white hover:bg-surface-600 focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading ? (
        <>
          <ApperIcon name="Loader2" className="w-4 h-4 animate-spin mr-2" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <ApperIcon name={icon} className="w-4 h-4 mr-2" />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <ApperIcon name={icon} className="w-4 h-4 ml-2" />
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;