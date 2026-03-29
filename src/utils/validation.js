```javascript
// Utilidades para validación de formularios
export const validateMoto = {
  marca: (value) => {
    if (!value) return 'La marca es requerida';
    return null;
  },

  modelo: (value) => {
    if (!value) return 'El modelo es requerido';
    if (value.length < 2) return 'El modelo debe tener al menos 2 caracteres';
    if (value.length > 50) return 'El modelo no puede exceder 50 caracteres';
    return null;
  },

  año: (value) => {
    const year = parseInt(value);
    const currentYear = new Date().getFullYear();
    if (!value) return 'El año es requerido';
    if (isNaN(year)) return 'Debe ser un año válido';
    if (year < 1950) return 'El año no puede ser menor a 1950';
    if (year > currentYear + 1) return `El año no puede ser mayor a ${currentYear + 1}`;
    return null;
  },

  color: (value) => {
    if (!value) return 'El color es requerido';
    if (value.length < 3) return 'El color debe tener al menos 3 caracteres';
    if (value.length > 30) return 'El color no puede exceder 30 caracteres';
    return null;
  },

  placa: (value) => {
    if (!value) return 'La placa es requerida';
    const placaRegex = /^[A-Z]{3}-\d{3,4}$/;
    if (!placaRegex.test(value)) return 'Formato de placa inválido (ABC-123 o ABC-1234)';
    return null;
  },

  cilindrada: (value) => {
    const cc = parseInt(value);
    if (!value) return 'La cilindrada es requerida';
    if (isNaN(cc)) return 'Debe ser un número válido';
    if (cc < 50) return 'La cilindrada mínima es 50cc';
    if (cc > 2000) return 'La cilindrada máxima es 2000cc';
    return null;
  },

  precio: (value) => {
    const price = parseFloat(value);
    if (!value) return 'El precio es requerido';
    if (isNaN(price)) return 'Debe ser un precio válido';
    if (price < 0) return 'El precio no puede ser negativo';
    if (price > 999999999) return 'El precio es demasiado alto';
    return null;
  },

  descripcion: (value) => {
    if (value && value.length > 500) return 'La descripción no puede exceder 500 caracteres';
    return null;
  },

  foto: (file) => {
    if (!file) return 'La foto es requerida';
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) return 'Solo se permiten archivos JPG, PNG y WebP';
    if (file.size > 5 * 1024 * 1024) return 'El archivo no puede exceder 5MB';
    return null;
  }
};

export const marcasDisponibles = [
  'Honda',
  'Yamaha',
  'Kawasaki',
  'Suzuki',
  'Ducati',
  'BMW',
  'KTM',
  'Harley Davidson',
  'Bajaj',
  'TVS',
  'Hero',
  'Royal Enfield',
  'Aprilia',
  'Triumph',
  'Benelli'
];
```