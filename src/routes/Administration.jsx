import { Route, Routes } from 'react-router-dom';
import ListProperties from '../Components/ListProperties';
import Sidebar from '../Components/SideBar';

import AddProduct from './AddProduct';
import Toast from '../Components/Toast';

const Administration = () => {
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Administration;
