```javascript
// Validaciones para el formulario de moto
export const validaciones = {
  // Validar formato de placa ABC-123
  placa: (valor) => {
    const regex = /^[A-Z]{3}-[0-9]{3}$/;
    if (!valor) return { valido: false, mensaje: 'La placa es requerida' };
    if (!regex.test(valor)) return { valido: false, mensaje: 'Formato inválido. Debe ser ABC-123' };
    return { valido: true, mensaje: '' };
  },

  // Validar modelo
  modelo: (valor) => {
    if (!valor) return { valido: false, mensaje: 'El modelo es requerido' };
    if (valor.length < 2) return { valido: false, mensaje: 'Mínimo 2 caracteres' };
    if (valor.length > 50) return { valido: false, mensaje: 'Máximo 50 caracteres' };
    if (!/^[a-zA-Z0-9\s-]+$/.test(valor)) return { valido: false, mensaje: 'Solo letras, números, espacios y guiones' };
    return { valido: true, mensaje: '' };
  },

  // Validar color
  color: (valor) => {
    if (!valor) return { valido: false, mensaje: 'El color es requerido' };
    if (valor.length < 3) return { valido: false, mensaje: 'Mínimo 3 caracteres' };
    if (valor.length > 30) return { valido: false, mensaje: 'Máximo 30 caracteres' };
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return { valido: false, mensaje: 'Solo letras y espacios' };
    return { valido: true, mensaje: '' };
  },

  // Validar número de motor
  numeroMotor: (valor) => {
    if (!valor) return { valido: false, mensaje: 'El número de motor es requerido' };
    if (valor.length < 5) return { valido: false, mensaje: 'Mínimo 5 caracteres' };
    if (valor.length > 30) return { valido: false, mensaje: 'Máximo 30 caracteres' };
    if (!/^[a-zA-Z0-9]+$/.test(valor)) return { valido: false, mensaje: 'Solo letras y números' };
    return { valido: true, mensaje: '' };
  },

  // Validar número de chasis
  numeroChasis: (valor) => {
    if (!valor) return { valido: false, mensaje: 'El número de chasis es requerido' };
    if (valor.length < 5) return { valido: false, mensaje: 'Mínimo 5 caracteres' };
    if (valor.length > 30) return { valido: false, mensaje: 'Máximo 30 caracteres' };
    if (!/^[a-zA-Z0-9]+$/.test(valor)) return { valido: false, mensaje: 'Solo letras y números' };
    return { valido: true, mensaje: '' };
  },

  // Validar observaciones
  observaciones: (valor) => {
    if (valor && valor.length > 500) return { valido: false, mensaje: 'Máximo 500 caracteres' };
    return { valido: true, mensaje: '' };
  },

  // Validar campos select requeridos
  requerido: (valor, nombre) => {
    if (!valor) return { valido: false, mensaje: `${nombre} es requerido` };
    return { valido: true, mensaje: '' };
  },

  // Validar archivos
  archivos: (archivos) => {
    if (!archivos || archivos.length < 3) {
      return { valido: false, mensaje: 'Se requieren mínimo 3 fotos' };
    }
    
    const tiposPermitidos = ['image/jpeg', 'image/png', 'application/pdf'];
    const tamañoMaximo = 5 * 1024 * 1024; // 5MB
    
    for (let archivo of archivos) {
      if (!tiposPermitidos.includes(archivo.type)) {
        return { valido: false, mensaje: 'Solo se permiten archivos JPG, PNG o PDF' };
      }
      if (archivo.size > tamañoMaximo) {
        return { valido: false, mensaje: 'Tamaño máximo por archivo: 5MB' };
      }
    }
    
    return { valido: true, mensaje: '' };
  }
};
```