import { ComponentePrueba } from 'components/ui/ComponentePrueba/ComponentePrueba';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
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