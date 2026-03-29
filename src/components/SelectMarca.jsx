```jsx
import React, { useState, useRef, useEffect } from 'react';
import { marcasMotos } from '../data/marcasMotos';
import MensajeError from './MensajeError';

const SelectMarca = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);

  const filteredMarcas = marcasMotos.filter(marca =>
    marca.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMarca = marcasMotos.find(marca => marca.id === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (marca) => {
    onChange(marca.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={selectRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Marca *
      </label>
      
      <div
        className={`
          relative w-full px-3 py-2 border rounded-md shadow-sm cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-400' : 'border-gray-300'}
          ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedMarca ? 'text-gray-900' : 'text-gray-500'}>
            {selectedMarca ? selectedMarca.nombre : 'Seleccionar marca'}
          </span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Buscador */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Buscar marca..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Lista de marcas */}
          <div className="max-h-48 overflow-y-auto">
            {filteredMarcas.length > 0 ? (
              filteredMarcas.map((marca) => (
                <div
                  key={marca.id}
                  className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center"
                  onClick={() => handleSelect(marca)}
                >
                  <img
                    src={marca.logo}
                    alt={marca.nombre}
                    className="h-6 w-6 mr-3 object-contain"
                  />
                  <span className="text-gray-900">{marca.nombre}</span>
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No se encontraron marcas
              </div>
            )}
          </div>
        </div>
      )}

      {error && <MensajeError mensaje={error} />}
    </div>
  );
};

export default SelectMarca;
```