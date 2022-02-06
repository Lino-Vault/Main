import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: '/dashboard/app', element: <DashboardApp /> },
        { path: 'safes', element: <User /> },
        { path: 'view', element: <Products /> },
        { path: 'farming', element: <Blog /> },
        { path: 'exchange', element: <Login/>},
        { path: '/', element: <Navigate to="/dashboard/app" /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}