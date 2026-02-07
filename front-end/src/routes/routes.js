import { ComponentePrueba } from 'components/ui/ComponentePrueba/ComponentePrueba';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import DashboardHome from 'features/dashboard/pages/DashboardHome';
import EnviosPage from 'features/dashboard/pages/EnviosPage';
import ReclamosPage from 'features/dashboard/pages/ReclamosPage';
import LibroReclamos from 'features/reclamos_karsil/LibroReclamaciones';
import ConsultaReclamo from 'features/visualizar_reclamo/ConsultaReclamo';
import { lazy } from 'react';

// El navegador solo descargará estos archivos cuando el usuario entre a la ruta
const HomePage = lazy(() => import('../pages/HomePage'));
const CotizacionPage = lazy(() => import('../pages/CotizacionPage'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const publicRoutes = [
  {
    path: "/",
    element: HomePage,
    title: "Inicio"
  },
  {
    path: "/cotizar",
    element: CotizacionPage,
    title: "Calculadora de Envío"
  },
  {
    path: "/libro-de-reclamaciones",
    element: LibroReclamos,
    title: "Reclamaciones"
  },
  {
    path: "/consultar-reclamo", 
    element: ConsultaReclamo,
    title: "Consultar Reclamo"
  },
  {
    path: "/login",
    element: Login,
    title: "Consultar Reclamo"
  },
  {
    path: "/register",
    element: Register,
    title: "Consultar Reclamo"
  },
  {
    path: "/prueba",
    element: ComponentePrueba,
    title: "Testing"
  },
  {
    path: "*",
    element: NotFound,
    title: "404 - No encontrado"
  },
  
];

// Dashboard routes (sin NavBar y Footer, dentro de DashboardLayout)
export const dashboardRoutes = [
  {
    path: '/dashboard',
    element: DashboardHome,
    protected: true,
    roles: ['admin', 'trabajador'],
  },
  {
    path: '/dashboard/envios',
    element: EnviosPage,
    protected: true,
    roles: ['admin', 'trabajador'],
  },
  {
    path: '/dashboard/reclamos',
    element: ReclamosPage,
    protected: true,
    roles: ['admin', 'trabajador'],
    permissions: ['USER_READ'],
  },
];
