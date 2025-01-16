import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

function ListProperties() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Función para obtener las propiedades
  const fetchProperties = async () => {
    try {
      const response = await fetch('http://100.29.91.166:8080/roomly-services/api/v1/properties/admin/list');
      if (!response.ok) {
        throw new Error('Error al cargar las propiedades');
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Error al cargar las propiedades. Por favor, intente nuevamente.');
      toast.error('Error al cargar las propiedades');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDeleteClick = (property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        const response = await fetch(`http://100.29.91.166:8080/roomly-services/api/v1/properties/${propertyToDelete.id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la propiedad');
        }

        // Actualizar la lista de propiedades
        setProperties(properties.filter(p => p.id !== propertyToDelete.id));
        toast.success('Propiedad eliminada exitosamente');
      } catch (error) {
        console.error('Error deleting property:', error);
        toast.error('Error al eliminar la propiedad');
      } finally {
        setShowDeleteModal(false);
        setPropertyToDelete(null);
      }
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/administration/edit-product/${propertyId}`);
  };

  // Modal de confirmación de eliminación
  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
        <p className="mb-6">
          ¿Estás seguro de que deseas eliminar "{propertyToDelete?.name}"? Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchProperties}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio por Noche
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Habitaciones
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={property.mainPhotoUrl}
                    alt={property.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{property.name}</td>
                <td className="px-6 py-4">
                  {property.description.length > 100
                    ? `${property.description.substring(0, 100)}...`
                    : property.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${Number(property.pricePerNight).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.maxCapacity} personas
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {property.numRooms} habitaciones
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleEdit(property.id)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(property)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDeleteModal && <DeleteConfirmationModal />}
    </>
  );
}

export default ListProperties;
