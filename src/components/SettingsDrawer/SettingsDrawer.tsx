import React, { useState, useEffect } from 'react';
import { restaurants } from '../../data/restaurants';
import styles from './SettingsDrawer.module.css';

interface SettingsDrawerProps {
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
  onSaved: (message: string) => void;
}

interface ProfileData {
  name: string;
  email: string;
  emailNotifications: boolean;
  darkMode: boolean;
  dietary: string[];
}

const STORAGE_KEY = 'localbites-profile';

function loadProfile(): ProfileData {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        name: '',
        email: '',
        emailNotifications: false,
        darkMode: false,
        dietary: [],
      };
}

export function SettingsDrawer({
  onClose,
  favorites,
  onRemoveFavorite,
  onSaved,
}: SettingsDrawerProps): React.ReactNode {
  const [profile, setProfile] = useState<ProfileData>(loadProfile);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setProfile((prev) => ({ ...prev, name: e.target.value }));
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setProfile((prev) => ({ ...prev, email: e.target.value }));
  }

  function handleEmailNotificationsToggle(): void {
    setProfile((prev) => ({ ...prev, emailNotifications: !prev.emailNotifications }));
  }

  function handleDarkModeToggle(): void {
    setProfile((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }

  function handleDietaryChange(option: string): void {
    setProfile((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter((d) => d !== option)
        : [...prev.dietary, option],
    }));
  }

  function handleSave(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    onSaved('Settings saved!');
    onClose();
  }

  function handleRemoveFavoriteClick(id: string): void {
    onRemoveFavorite(id);
  }

  const favoriteRestaurants = restaurants.filter((r) => favorites.includes(r.id));
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal'];
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Settings</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile</h3>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <span>{initials}</span>
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="settings-name">Name</label>
              <input
                id="settings-name"
                type="text"
                className={styles.input}
                value={profile.name}
                onChange={handleNameChange}
                placeholder="Your name"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="settings-email">Email</label>
              <input
                id="settings-email"
                type="email"
                className={styles.input}
                value={profile.email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
              />
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Preferences</h3>
            <div className={styles.toggleRow}>
              <span>Email notifications</span>
              <button
                className={`${styles.toggle} ${profile.emailNotifications ? styles.toggleOn : ''}`}
                onClick={handleEmailNotificationsToggle}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
            <div className={styles.toggleRow}>
              <span>Dark mode</span>
              <button
                className={`${styles.toggle} ${profile.darkMode ? styles.toggleOn : ''}`}
                onClick={handleDarkModeToggle}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
            <div className={styles.dietaryGroup}>
              <span className={styles.dietaryLabel}>Dietary preferences</span>
              {dietaryOptions.map((option) => (
                <label key={option} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={profile.dietary.includes(option)}
                    onChange={() => handleDietaryChange(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Saved Favorites</h3>
            {favoriteRestaurants.length > 0 ? (
              <ul className={styles.favoritesList}>
                {favoriteRestaurants.map((r) => (
                  <li key={r.id} className={styles.favoriteItem}>
                    <span>{r.name}</span>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveFavoriteClick(r.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyFavorites}>No favorites yet.</p>
            )}
          </section>
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
