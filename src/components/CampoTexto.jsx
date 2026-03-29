```javascript
import React from 'react';
import MensajeError from './MensajeError';

const CampoTexto = ({
  label,
  tipo = 'text',
  valor,
  onChange,
  error,
  placeholder,
  requerido = false,
  maxLength,
  rows,
  onBlur,
  disabled = false
}) => {
  const estilosInput = `
    w-full px-4 py-3 border rounded-lg font-inter text-gray-900 
    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
    disabled:bg-gray-100 disabled:cursor-not-allowed
    ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
  `;

  const EsInput = tipo === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {requerido && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <EsInput
        type={tipo !== 'textarea' ? tipo : undefined}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        disabled={disabled}
        className={estilosInput}
      />
      
      {maxLength && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {valor?.length || 0}/{maxLength}
        </div>
      )}
      
      {error && <MensajeError mensaje={error} />}
    </div>
  );
};

export default CampoTexto;
```