```javascript
import React from 'react';
import ValidationMessage from './ValidationMessage';

const Select = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  options, 
  error, 
  required = false,
  placeholder = 'Seleccionar...',
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          onBlur={() => onBlur && onBlur(name)}
          className={`w-full px-3 py-3 border rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${
            error 
              ? 'border-red-300 focus:border-red-500' 
              : 'border-gray-300 focus:border-blue-500'
          }`}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        {/* Icono de dropdown personalizado */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <ValidationMessage error={error} />
    </div>
  );
};

export default Select;
```