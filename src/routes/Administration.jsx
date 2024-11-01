import { Route, Routes } from 'react-router-dom';
import ListProperties from '../Components/ListProperties';
import Sidebar from '../Components/SideBar';

import AddProduct from './AddProduct';
import Toast from '../Components/Toast';
import { useState, useEffect } from 'react';
import EditProduct from './EditProduct';

const Administration = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1025);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1025);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isSmallScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            ¡Acceso no disponible!
          </h1>
          <div className="text-gray-600 mb-6">
            <p className="mb-4">
              Lo sentimos, el panel de administración solo está disponible en dispositivos con pantallas más grandes (mínimo 1025px de ancho).
            </p>
            <p className="mb-4">
              Para una mejor experiencia y gestión más eficiente de los productos, te recomendamos acceder desde:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Una computadora de escritorio</li>
              <li>Una laptop</li>
              <li>Una tablet en modo horizontal (según el modelo)</li>
            </ul>
            <p className="font-semibold">
              Esta restricción existe para garantizar la mejor experiencia posible en la gestión de tu inventario y configuraciones.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              Si necesitas realizar cambios urgentes, por favor accede desde un dispositivo con una pantalla más grande.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 ml-64">
        {' '}
        <div className="p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mb-11">
                    {/* Tarjetas de estadísticas */}
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-gray-500 text-sm font-medium">
                        Total Propiedades
                      </h3>
                      <p className="text-3xl font-bold">24</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-gray-500 text-sm font-medium">
                        Visitas este mes
                      </h3>
                      <p className="text-3xl font-bold">2,451</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-gray-500 text-sm font-medium">
                        Propiedades Activas
                      </h3>
                      <p className="text-3xl font-bold">18</p>
                    </div>
                  </div>

                  <Toast />
                </div>
              }
            />
            <Route
              path="/properties"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-6">Propiedades</h1>
                  <ListProperties />
                </div>
              }
            />
            <Route path="/add-property" element={<AddProduct />} />
            <Route
              path="/users"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-6">Usuarios</h1>
                  {/* Contenido de usuarios */}
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div>
                  <h1 className="text-3xl font-bold mb-6">Configuración</h1>
                  {/* Contenido de configuración */}
                </div>
              }
            />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Administration;
