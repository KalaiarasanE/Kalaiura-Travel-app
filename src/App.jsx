/* ==============================================================================
   AERORA — ROOT APPLICATION COMPONENT
   ============================================================================== */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';
import './styles/responsive.css';

import { LocationProvider } from './context/LocationContext';
import { JourneyProvider } from './context/JourneyContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LocationSelector } from './components/LocationSelector';
import { JourneyPanel } from './components/JourneyPanel';

import { Home } from './pages/Home';
import { Destinations } from './pages/Destinations';
import { DestinationPage } from './pages/DestinationPage';
import { PlacesPage } from './pages/PlacesPage';
import { Planner } from './pages/Planner';
import { GuidePage } from './pages/GuidePage';

// ScrollToTop resets scroll position on route transitions
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <LocationProvider>
        <JourneyProvider>
          <div
            className="app-wrapper"
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundColor: 'var(--color-bg)'
            }}
          >
            <ScrollToTop />
            <Navbar />

            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destination/:id" element={<DestinationPage />} />
                <Route path="/places" element={<PlacesPage />} />
                <Route path="/planner" element={<Planner />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>

            {/* Global Modals & Drawers */}
            <LocationSelector />
            <JourneyPanel />
            <Footer />
          </div>
        </JourneyProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}
