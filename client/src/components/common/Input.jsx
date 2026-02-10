import React from 'react';

const Input = ({ 
  label, 
  error, 
  icon,
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          className={`
            input-field 
            ${icon ? 'pl-12' : ''}
            ${error ? 'input-error' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-accent-red">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;