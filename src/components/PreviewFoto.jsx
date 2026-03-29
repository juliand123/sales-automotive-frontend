```jsx
import React, { useState } from 'react';

const PreviewFoto = ({ foto, onEliminar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="relative group">
      <div className="h-32 bg-gray-100 rounded-lg overflow-hidden">
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        )}
        
        {error ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <svg className="h-8 w-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs">Archivo</span>
          </div>
        ) : (
          foto.preview && (
            <img
              src={foto.preview}
              alt={`Preview ${foto.tipo}`}
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: isLoading ? 'none' : 'block' }}
            />
          )
        )}
      </div>

      {/* Overlay con información */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
        <button
          onClick={onEliminar}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Info del archivo */}
      <div className="mt-1 text-xs text-gray-600 text-center">
        <p className="truncate">{foto.file.name}</p>
        <p className="text-gray-400">{formatFileSize(foto.file.size)}</p>
      </div>

      {/* Indicador de éxito */}
      <div className="absolute -top-2 -right-2">
        <div className="bg-green-500 text-white rounded-full p-1">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PreviewFoto;
```