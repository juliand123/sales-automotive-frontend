```javascript
import React from 'react';
import ValidationMessage from './ValidationMessage';

const TextArea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder = '',
  required = false,
  maxLength,
  rows = 4,
  className = '' 
}) => {
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    onChange(name, newValue);
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          onBlur={() => onBlur && onBlur(name)}
          placeholder={placeholder}
          rows={rows}
          className={`w-full px-3 py-3 border rounded-lg shadow-sm transition-colors duration-200 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
        />
        
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {(value || '').length}/{maxLength}
          </div>
        )}
      </div>
      
      <ValidationMessage error={error} />
    </div>
  );
};

export default TextArea;
```