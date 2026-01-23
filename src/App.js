import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import NavBar from 'components/ui/NavBar/NavBar';
import React, { Suspense } from 'react';
import Footer from 'components/ui/Footer/Footer';
import LoadingOverlay from 'components/ui/LoadingOverlay/LoadingOverlay';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <main className="flex-1">
          <Suspense fallback={<LoadingOverlay mensaje="Cargando Página..." />}>
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.element />}
                />
              ))}
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;