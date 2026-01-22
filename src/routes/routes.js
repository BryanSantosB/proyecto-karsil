// src/routes/routes.js
// src/routes/routes.js
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
    path: "*",
    element: NotFound,
    title: "404 - No encontrado"
  }
];