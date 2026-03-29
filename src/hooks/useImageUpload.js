```javascript
import { useState } from 'react';
import { createImagePreview, formatFileSize } from '../utils/imageUtils';
import { validateMoto } from '../utils/validation';

export const useImageUpload = () => {
  const [uploadStates, setUploadStates] = useState({});

  const handleFileUpload = async (file, fieldName) => {
    // Validar archivo
    const validation = validateMoto.foto(file);
    if (validation) {
      return { error: validation };
    }

    // Establecer estado de carga
    setUploadStates(prev => ({
      ...prev,
      [fieldName]: { loading: true }
    }));

    try {
      // Crear preview
      const preview = await createImagePreview(file);
      
      // Simular delay de procesamiento
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUploadStates(prev => ({
        ...prev,
        [fieldName]: {
          loading: false,
          preview,
          file,
          size: formatFileSize(file.size),
          name: file.name
        }
      }));

      return { success: true, preview, file };
    } catch (error) {
      setUploadStates(prev => ({
        ...prev,
        [fieldName]: { loading: false, error: 'Error al procesar la imagen' }
      }));
      
      return { error: 'Error al procesar la imagen' };
    }
  };

  const removeImage = (fieldName) => {
    setUploadStates(prev => {
      const newState = { ...prev };
      delete newState[fieldName];
      return newState;
    });
  };

  const getUploadState = (fieldName) => {
    return uploadStates[fieldName] || {};
  };

  return {
    handleFileUpload,
    removeImage,
    getUploadState,
    uploadStates
  };
};
```