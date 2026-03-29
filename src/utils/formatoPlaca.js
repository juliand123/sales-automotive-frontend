```javascript
// Utilidad para formatear automáticamente la placa
export const formatearPlaca = (valor) => {
  // Remover caracteres no válidos
  let limpio = valor.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  // Aplicar formato ABC-123
  if (limpio.length > 3) {
    limpio = limpio.slice(0, 3) + '-' + limpio.slice(3, 6);
  }
  
  return limpio;
};

// Generar años desde 1990 hasta año actual
export const generarAños = () => {
  const añoActual = new Date().getFullYear();
  const años = [];
  
  for (let año = añoActual; año >= 1990; año--) {
    años.push({ value: año.toString(), label: año.toString() });
  }
  
  return años;
};
```