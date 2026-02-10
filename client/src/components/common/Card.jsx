import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  ...props 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-bg-secondary rounded-card p-6 shadow-lg border border-gray-800
        ${hover ? 'hover:border-accent-mint transition-colors cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;