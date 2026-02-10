import React from 'react';

const Loader = ({ size = 'md', text = '' }) => {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className={`loading-spinner ${sizes[size]}`} />
      {text && (
        <p className="text-text-secondary text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;