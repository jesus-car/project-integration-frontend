import { useToast } from '../contexts/ToastContext';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

function ToastDemo() {
  const { success, error, info, warning } = useToast();

  const handleSuccess = () => {
    success('Operación completada exitosamente');
  };

  const handleError = () => {
    error('Hubo un error al completar la operación');
  };

  const handleInfo = () => {
    info('Este es un mensaje de información');
  };

  const handleWarning = () => {
    warning('Esta es una advertencia');
  };

  const cards = [
    {
      title: 'Éxito',
      description: 'Notificación de operación exitosa.',
      icon: <FaCheckCircle className="w-8 h-8 text-green-600" />,
      bgColor: 'bg-green-100',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      onClick: handleSuccess,
    },
    {
      title: 'Error',
      description: 'Notificación de error en la operación.',
      icon: <FaExclamationCircle className="w-8 h-8 text-red-600" />,
      bgColor: 'bg-red-100',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      onClick: handleError,
    },
    {
      title: 'Información',
      description: 'Mensaje informativo para el usuario.',
      icon: <FaInfoCircle className="w-8 h-8 text-blue-600" />,
      bgColor: 'bg-blue-100',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      onClick: handleInfo,
    },
    {
      title: 'Advertencia',
      description: 'Precaución sobre una acción.',
      icon: <FaExclamationTriangle className="w-8 h-8 text-yellow-600" />,
      bgColor: 'bg-yellow-100',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      onClick: handleWarning,
    },
  ];

  return (
    <div className="p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-4xl mx-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-lg p-6 ${card.bgColor} flex flex-col items-center`}
        >
          <div className="flex items-center space-x-4 mb-4">
            {card.icon}
            <h3 className="text-xl font-semibold">{card.title}</h3>
          </div>
          <p className="text-gray-700 text-center mb-4">{card.description}</p>
          <button
            onClick={card.onClick}
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${card.buttonColor} transition`}
          >
            Probar {card.title}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastDemo;
