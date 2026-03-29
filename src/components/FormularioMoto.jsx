```jsx
import React from 'react';
import { useFormularioMoto } from '../hooks/useFormularioMoto';
import SubidorFotos from './SubidorFotos';
import SelectMarca from './SelectMarca';
import SelectAño from './SelectAño';
import SelectCilindraje from './SelectCilindraje';
import CampoTexto from './CampoTexto';
import BotonAccion from './BotonAccion';
import MensajeError from './MensajeError';
import Loading from './Loading';

const FormularioMoto = () => {
  const {
    formData,
    errors,
    isLoading,
    isValid,
    updateField,
    updateFotos,
    handleSubmit,
    resetForm
  } = useFormularioMoto();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            REGISTRO DE MOTO
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección de Fotos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Fotos de la Moto *
            </label>
            <SubidorFotos
              fotos={formData.fotosMotor}
              onChange={updateFotos}
              error={errors.fotosMotor}
            />
            {errors.fotosMotor && (
              <MensajeError mensaje={errors.fotosMotor} />
            )}
          </div>

          {/* Información Básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectMarca
              value={formData.marca}
              onChange={(value) => updateField('marca', value)}
              error={errors.marca}
            />

            <CampoTexto
              label="Modelo *"
              name="modelo"
              value={formData.modelo}
              onChange={(value) => updateField('modelo', value)}
              placeholder="Ingrese modelo"
              error={errors.modelo}
              maxLength={50}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectAño
              value={formData.año}
              onChange={(value) => updateField('año', value)}
              error={errors.año}
            />

            <SelectCilindraje
              value={formData.cilindraje}
              onChange={(value) => updateField('cilindraje', value)}
              error={errors.cilindraje}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampoTexto
              label="Color *"
              name="color"
              value={formData.color}
              onChange={(value) => updateField('color', value)}
              placeholder="Ingrese color"
              error={errors.color}
              maxLength={30}
            />

            <CampoTexto
              label="Placa *"
              name="placa"
              value={formData.placa}
              onChange={(value) => updateField('placa', value)}
              placeholder="ABC-123"
              error={errors.placa}
              maxLength={8}
              formato="placa"
            />
          </div>

          {/* Números de Serie */}
          <div className="grid grid-cols-1 gap-6">
            <CampoTexto
              label="Número de Motor *"
              name="numeroMotor"
              value={formData.numeroMotor}
              onChange={(value) => updateField('numeroMotor', value)}
              placeholder="Ingrese número de motor"
              error={errors.numeroMotor}
              maxLength={30}
            />

            <CampoTexto
              label="Número de Chasis *"
              name="numeroChasis"
              value={formData.numeroChasis}
              onChange={(value) => updateField('numeroChasis', value)}
              placeholder="Ingrese número de chasis"
              error={errors.numeroChasis}
              maxLength={30}
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <textarea
              value={formData.observaciones}
              onChange={(e) => updateField('observaciones', e.target.value)}
              placeholder="Comentarios adicionales..."
              maxLength={500}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.observaciones.length}/500 caracteres
            </p>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <BotonAccion
              tipo="secundario"
              onClick={resetForm}
              disabled={isLoading}
            >
              CANCELAR
            </BotonAccion>

            <BotonAccion
              tipo="primario"
              type="submit"
              disabled={!isValid || isLoading}
            >
              {isLoading ? <Loading size="sm" /> : 'GUARDAR'}
            </BotonAccion>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioMoto;
```