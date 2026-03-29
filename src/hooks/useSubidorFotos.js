```javascript
import { useState } from 'react';

export const useSubidorFotos = () => {
  const [fotos, setFotos] = useState([]);
  const [arrastrando, setArrastrando] = useState(false);
  const [error, setError] = useState('');

  const validarArchivo = (archivo) => {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
    const tamañoMaximo = 5 * 1024 * 1024; // 5MB

    if (!tiposPermitidos.includes(archivo.type)) {
      return 'Solo se permiten archivos JPG, PNG o PDF';
    }

    if (archivo.size > tamañoMaximo) {
      return 'El archivo excede el tamaño máximo de 5MB';
    }

    return null;
  };

  const agregarFotos = (archivos) => {
    const nuevasFotos = [];
    let errores = [];

    Array.from(archivos).forEach((archivo) => {
      const errorValidacion = validarArchivo(archivo);
      
      if (errorValidacion) {
        errores.push(`${archivo.name}: ${errorValidacion}`);
      } else {
        const foto = {
          id: Date.now() + Math.random(),
          archivo,
          nombre: archivo.name,
          tipo: archivo.type,
          tamaño: archivo.size,
          url: URL.createObjectURL(archivo)
        };
        nuevasFotos.push(foto);
      }
    });

    if (errores.length > 0) {
      setError(errores.join(', '));
    } else {
      setError('');
    }

    setFotos(prev => [...prev, ...nuevasFotos]);
    return nuevasFotos.length > 0;
  };

  const eliminarFoto = (id) => {
    setFotos(prev => {
      const foto = prev.find(f => f.id === id);
      if (foto && foto.url) {
        URL.revokeObjectURL(foto.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const limpiarFotos = () => {
    fotos.forEach(foto => {
      if (foto.url) {
        URL.revokeObjectURL(foto.url);
      }
    });
    setFotos([]);
    setError('');
  };

  const manejarDrop = (e) => {
    e.preventDefault();
    setArrastrando(false);
    
    const archivos = e.dataTransfer.files;
    agregarFotos(archivos);
  };

  const manejarDragOver = (e) => {
    e.preventDefault();
    setArrastrando(true);
  };

  const manejarDragLeave = (e) => {
    e.preventDefault();
    setArrastrando(false);
  };

  return {
    fotos,
    arrastrando,
    error,
    agregarFotos,
    eliminarFoto,
    limpiarFotos,
    manejarDrop,
    manejarDragOver,
    manejarDragLeave,
    setError
  };
};
```