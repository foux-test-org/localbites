import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Restaurant } from './data/restaurants';
import { useFavorites } from './hooks/useFavorites';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Toast } from './components/Toast/Toast';
import { MenuDrawer } from './components/MenuDrawer/MenuDrawer';
import { SettingsDrawer } from './components/SettingsDrawer/SettingsDrawer';
import { Home } from './pages/Home';
import { Restaurants } from './pages/Restaurants';
import { About } from './pages/About';
import styles from './App.module.css';

export function App(): React.ReactNode {
  const { favorites, toggleFavorite, isFavorite, removeFavorite } = useFavorites();
  const [toastMessage, setToastMessage] = useState('');
  const [menuRestaurant, setMenuRestaurant] = useState<Restaurant | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  const handleDismissToast = useCallback(() => {
    setToastMessage('');
  }, []);

  function handleViewMenu(restaurant: Restaurant): void {
    setMenuRestaurant(restaurant);
  }

  function handleCloseMenu(): void {
    setMenuRestaurant(null);
  }

  function handleSignInClick(): void {
    setSettingsOpen(true);
  }

  function handleCloseSettings(): void {
    setSettingsOpen(false);
  }

  function handleSettingsSaved(message: string): void {
    handleToast(message);
  }

  function handleOrderPlaced(message: string): void {
    handleToast(message);
  }

  return (
    <div className={styles.app}>
      <Navbar onSignInClick={handleSignInClick} />
      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isFavorite={isFavorite}
                onFavorite={toggleFavorite}
                onViewMenu={handleViewMenu}
                onToast={handleToast}
              />
            }
          />
          <Route
            path="/restaurants"
            element={
              <Restaurants
                isFavorite={isFavorite}
                onFavorite={toggleFavorite}
                onViewMenu={handleViewMenu}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />

      {menuRestaurant ? (
        <MenuDrawer
          restaurant={menuRestaurant}
          onClose={handleCloseMenu}
          onOrderPlaced={handleOrderPlaced}
        />
      ) : null}

      {settingsOpen ? (
        <SettingsDrawer
          onClose={handleCloseSettings}
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onSaved={handleSettingsSaved}
        />
      ) : null}

      {toastMessage ? (
        <Toast message={toastMessage} onDismiss={handleDismissToast} />
      ) : null}
    </div>
  );
}
