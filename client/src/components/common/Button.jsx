import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-accent-mint text-bg-primary hover:bg-accent-teal',
    secondary: 'bg-bg-tertiary text-text-primary hover:bg-gray-700 border border-gray-700',
    danger: 'bg-accent-red text-white hover:bg-red-600',
    ghost: 'bg-transparent text-text-primary hover:bg-bg-tertiary border border-transparent hover:border-gray-700'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading && (
        <div className="loading-spinner w-5 h-5" />
      )}
      {children}
    </button>
  );
};

export default Button;