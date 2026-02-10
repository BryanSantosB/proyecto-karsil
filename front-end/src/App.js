import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import your route configurations
import Navbar from 'components/ui/NavBar/NavBar';
import Footer from 'components/ui/Footer/Footer';
import { useGoogleMaps } from 'hooks/useGoogleMaps';
import ScrollToTop from 'components/ui/ScrollToTop/ScrollToTop';
import RouteGuard from 'components/routing/RouteGuard';
import DashboardLayout from 'features/dashboard/DashboardLayout';
import LoadingOverlay from 'components/ui/LoadingOverlay/LoadingOverlay';
import { dashboardRoutes, publicRoutes } from 'routes/routes';

// Condicional para mostrar Navbar y Footer solo en rutas específicas
const ConditionalLayout = ({ children }) => {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register"];
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  if (isDashboard || isNoLayout) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};


function App() {
  const mapsLoaded = useGoogleMaps();
  
  if (!mapsLoaded) return <p>Cargando mapas...</p>;

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <ConditionalLayout>
          <main className="flex-1">
            <Suspense fallback={<LoadingOverlay mensaje="Cargando Página..." />}>
              <Routes>
                {/* Public Routes */}
                {publicRoutes.map((route, index) => {
                  const Element = route.element;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <RouteGuard route={route}>
                          <Element />
                        </RouteGuard>
                      }
                    />
                  );
                })}

                {/* Dashboard Routes - Wrapped in DashboardLayout */}
                <Route 
                  path="/dashboard" 
                  element={<DashboardLayout />}
                >
                  {dashboardRoutes.map((route, index) => {
                    const Element = route.element;
                    // Removemos el prefijo '/dashboard' del path para las rutas hijas
                    const childPath = route.path.replace('/dashboard', '') || '/';
                    
                    return (
                      <Route
                        key={index}
                        path={childPath === '/' ? '' : childPath.substring(1)} // '' para index, 'envios' para /envios
                        element={
                          <RouteGuard route={route}>
                            <Element />
                          </RouteGuard>
                        }
                      />
                    );
                  })}
                </Route>
              </Routes>
            </Suspense>
          </main>
        </ConditionalLayout>
      </div>
    </Router>
  );
}

export default App;