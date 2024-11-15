import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaList, FaPlusCircle, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { routes } from '../utils/routes';
import {useAuthContext} from "../contexts/AuthContext.jsx";
import {userHasAccess} from "../utils/utils.js";
import { Icon } from '@mui/material';

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAuthContext();

  let menuItems = [
    {
      title: 'Dashboard',
      path: '/administration',
      icon: FaHome
    },
    {
      title: 'Todas las propiedades',
      path: '/administration/properties',
      icon: FaList,
      requiredRoles: ['ROLE_ADMIN']
    },
      /*
    {
      title: 'Mis propiedades',
      path: '/administration/my-properties',
      icon: FaList,
      requiredRoles: ['ROLE_OWNER']
    },
       */
    {
      title: 'Agregar Propiedad',
      path: '/administration/add-property',
      icon: FaPlusCircle
    },
    {
      title:'Carasteristicas',
      path:'/administration/feature',
      icon: FaList

    },
    {
      title: 'Administrar Caracteristicas',
      path: '/administration/add-feature',
      icon: FaPlusCircle
    },

    {
      title: 'Usuarios',
      path: '/administration/users',
      icon: FaUsers,
      requiredRoles: ['ROLE_ADMIN']
    },
    {
      title: 'Configuración',
      path: '/administration/settings',
      icon: FaCog
    }
  ];

  const allowedRoutes = menuItems.filter(item => {
    return userHasAccess(user, item.requiredRoles)
  });

  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 w-64">
      {/* Logo/Header del Sidebar */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Panel Admin</h2>
      </div>

      {/* Menú de navegación */}
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          {allowedRoutes.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center px-4 py-3 transition-colors rounded-lg
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="ml-3">{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer del Sidebar */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <Link
          to="/"
          className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="w-5 h-5" />
          <span className="ml-3">Salir al sitio</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
