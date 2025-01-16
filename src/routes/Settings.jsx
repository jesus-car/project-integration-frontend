import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { FaSave, FaBell, FaTrash, FaSync, FaCog, FaLock } from 'react-icons/fa';

const Settings = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action, successMessage, loadingMessage) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(successMessage);
    } catch (error) {
      toast.error('Ha ocurrido un error. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const settingsButtons = [
    {
      title: 'Guardar Cambios',
      description: 'Guardar todos los cambios pendientes',
      icon: FaSave,
      action: () => handleAction(
        'save',
        'Cambios guardados exitosamente',
        'Guardando cambios...'
      ),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Actualizar Sistema',
      description: 'Buscar e instalar actualizaciones',
      icon: FaSync,
      action: () => handleAction(
        'update',
        'Sistema actualizado correctamente',
        'Actualizando sistema...'
      ),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Limpiar Caché',
      description: 'Eliminar datos temporales',
      icon: FaTrash,
      action: () => handleAction(
        'clean',
        'Caché limpiado exitosamente',
        'Limpiando caché...'
      ),
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    {
      title: 'Configurar Notificaciones',
      description: 'Administrar preferencias de notificaciones',
      icon: FaBell,
      action: () => handleAction(
        'notifications',
        'Notificaciones configuradas',
        'Configurando notificaciones...'
      ),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Seguridad',
      description: 'Configurar opciones de seguridad',
      icon: FaLock,
      action: () => handleAction(
        'security',
        'Configuración de seguridad actualizada',
        'Actualizando seguridad...'
      ),
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      title: 'Configuración Avanzada',
      description: 'Opciones avanzadas del sistema',
      icon: FaCog,
      action: () => handleAction(
        'advanced',
        'Configuración avanzada actualizada',
        'Actualizando configuración...'
      ),
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
        <p className="text-gray-600 mt-1">Administra las configuraciones del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsButtons.map((button, index) => {
          const Icon = button.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`${button.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{button.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{button.description}</p>
                <button
                  onClick={button.action}
                  disabled={isLoading}
                  className={`${button.color} text-white px-4 py-2 rounded-lg w-full transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Procesando...' : 'Configurar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings; 