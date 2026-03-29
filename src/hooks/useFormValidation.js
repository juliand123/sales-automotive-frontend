```javascript
import { useState, useCallback } from 'react';
import { validateMoto } from '../utils/validation';

export const useFormValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const validator = validateMoto[name];
    if (validator) {
      return validator(value);
    }
    return null;
  }, []);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validateMoto).forEach(field => {
      if (field !== 'foto') { // Las fotos se validan por separado
        const error = validateField(field, values[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validateMoto).reduce((acc, key) => {
      if (key !== 'foto') acc[key] = true;
      return acc;
    }, {}));

    return isValid;
  }, [values, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.values(errors).every(error => !error)
  };
};
```