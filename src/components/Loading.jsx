```javascript
import React from 'react';

const Loading = ({ mensaje = 'Cargando...' }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
      <span className="text-gray-600">{mensaje}</span>
    </div>
  );
};

export default Loading;
```