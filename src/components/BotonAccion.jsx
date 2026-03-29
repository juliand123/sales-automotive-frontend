```javascript
import React from 'react';
import Loading from './Loading';

const BotonAccion = ({ 
  tipo = 'button', 
  variante = 'primario', 
  cargando = false, 
  deshabilitado = false,
  onClick,
  children,
  className = ''
}) => {
  const estilosBase = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center min-w-[120px]';
  
  const estilosVariante = {
    primario: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300',
    secundario: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    peligro: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300'
  };

  const clases = `${estilosBase} ${estilosVariante[variante]} ${className}`;

  return (
    <button
      type={tipo}
      onClick={onClick}
      disabled={deshabilitado || cargando}
      className={clases}
    >
      {cargando ? (
        <Loading mensaje="" />
      ) : (
        children
      )}
    </button>
  );
};

export default BotonAccion;
```