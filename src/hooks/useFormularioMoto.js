```javascript
import { useState } from 'react';
import { validaciones } from '../utils/validaciones';

export const useFormularioMoto = () => {
  const [datos, setDatos] = useState({
    marca: '',
    modelo: '',
    año: '',
    cilindraje: '',
    color: '',
    placa: '',
    numeroMotor: '',
    numeroChasis: '',
    observaciones: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  // Actualizar campo y validar
  const actualizarCampo = (nombre, valor) => {
    setDatos(prev => ({ ...prev, [nombre]: valor }));
    
    // Validar campo en tiempo real
    validarCampo(nombre, valor);
  };

  // Validar un campo específico
  const validarCampo = (nombre, valor) => {
    let resultado = { valido: true, mensaje: '' };

    switch (nombre) {
      case 'marca':
        resultado = validaciones.requerido(valor, 'La marca');
        break;
      case 'modelo':
        resultado = validaciones.modelo(valor);
        break;
      case 'año':
        resultado = validaciones.requerido(valor, 'El año');
        break;
      case 'cilindraje':
        resultado = validaciones.requerido(valor, 'El cilindraje');
        break;
      case 'color':
        resultado = validaciones.color(valor);
        break;
      case 'placa':
        resultado = validaciones.placa(valor);
        break;
      case 'numeroMotor':
        resultado = validaciones.numeroMotor(valor);
        break;
      case 'numeroChasis':
        resultado = validaciones.numeroChasis(valor);
        break;
      case 'observaciones':
        resultado = validaciones.observaciones(valor);
        break;
    }

    setErrores(prev => ({
      ...prev,
      [nombre]: resultado.valido ? '' : resultado.mensaje
    }));

    return resultado.valido;
  };

  // Validar todo el formulario
  const validarFormulario = (fotos) => {
    const nuevosErrores = {};
    let formularioValido = true;

    // Validar todos los campos
    Object.keys(datos).forEach(campo => {
      const valido = validarCampo(campo, datos[campo]);
      if (!valido) formularioValido = false;
    });

    // Validar fotos
    const resultadoFotos = validaciones.archivos(fotos);
    if (!resultadoFotos.valido) {
      nuevosErrores.fotos = resultadoFotos.mensaje;
      formularioValido = false;
    }

    return formularioValido;
  };

  // Enviar formulario
  const enviarFormulario = async (fotos) => {
    if (!validarFormulario(fotos)) {
      return false;
    }

    setCargando(true);
    
    try {
      // Crear FormData para enviar archivos
      const formData = new FormData();
      
      // Agregar datos del formulario
      Object.keys(datos).forEach(key => {
        formData.append(key, datos[key]);
      });

      // Agregar fotos
      fotos.forEach((foto, index) => {
        formData.append(`foto_${index}`, foto.archivo);
      });

      // Enviar a la API
      const response = await fetch('/api/motos', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Error al guardar la moto');
      }

      const resultado = await response.json();
      setEnviado(true);
      return true;

    } catch (error) {
      console.error('Error:', error);
      setErrores(prev => ({
        ...prev,
        general: 'Error al guardar la moto. Intente nuevamente.'
      }));
      return false;
    } finally {
      setCargando(false);
    }
  };

  // Resetear formulario
  const resetearFormulario = () => {
    setDatos({
      marca: '',
      modelo: '',
      año: '',
      cilindraje: '',
      color: '',
      placa: '',
      numeroMotor: '',
      numeroChasis: '',
      observaciones: ''
    });
    setErrores({});
    setEnviado(false);
  };

  return {
    datos,
    errores,
    cargando,
    enviado,
    actualizarCampo,
    validarCampo,
    enviarFormulario,
    resetearFormulario
  };
};
```