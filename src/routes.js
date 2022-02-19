import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Exchange from './pages/Exchange';
import DashboardApp from './pages/DashboardApp';
import ViewSafes from './pages/ViewSafes';
import Farming from './pages/Farming';
import Safes from './pages/Safes';
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
        { path: 'safes', element: <Safes /> },
        { path: 'view', element: <ViewSafes /> },
        { path: 'farming', element: <Farming /> },
        { path: 'exchange', element: <Exchange/>},
        { path: '/', element: <Navigate to="/dashboard/app" /> },
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}