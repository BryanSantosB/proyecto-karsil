import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import NavBar from 'components/ui/NavBar/NavBar';
import React, { Suspense } from 'react';
import Footer from 'components/ui/Footer/Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <Suspense fallback={<div>Cargando página...</div>}>
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
      <Footer/>
    </Router>
  );
}

export default App;