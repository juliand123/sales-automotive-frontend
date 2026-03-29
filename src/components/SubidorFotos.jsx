```jsx
import React from 'react';
import { useSubidorFotos } from '../hooks/useSubidorFotos';
import PreviewFoto from './PreviewFoto';

const SubidorFotos = ({ fotos, onChange, error }) => {
  const {
    isDragging,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    eliminarFoto
  } = useSubidorFotos(onChange);

  const tiposFotos = [
    { id: 'frontal', label: 'FOTO FRONTAL' },
    { id: 'lateral', label: 'FOTO LATERAL' },
    { id: 'trasera', label: 'FOTO TRASERA' },
    { id: 'documentos', label: 'FOTO DOCUMENTOS' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiposFotos.map((tipo) => {
          const fotoExistente = fotos.find(f => f.tipo === tipo.id);
          
          return (
            <div key={tipo.id} className="space-y-2">
              <label className="block text-xs font-medium text-gray-600 text-center">
                {tipo.label}
              </label>
              
              {fotoExistente ? (
                <PreviewFoto
                  foto={fotoExistente}
                  onEliminar={() => eliminarFoto(fotoExistente.id)}
                />
              ) : (
                <div
                  className={`
                    relative h-32 border-2 border-dashed rounded-lg
                    flex flex-col items-center justify-center cursor-pointer
                    transition-colors duration-200
                    ${isDragging 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                    }
                    ${error ? 'border-red-400 bg-red-50' : ''}
                  `}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, tipo.id)}
                  onClick={() => document.getElementById(`file-${tipo.id}`).click()}
                >
                  <div className="text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-1 text-xs text-gray-600">
                      <span className="font-medium text-blue-600">Click</span> o arrastra
                    </p>
                  </div>
                  
                  <input
                    id={`file-${tipo.id}`}
                    type="file"
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileSelect(e, tipo.id)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500">
        * Formatos permitidos: JPG, PNG, PDF. Tamaño máximo: 5MB por archivo.
      </div>
    </div>
  );
};

export default SubidorFotos;
```