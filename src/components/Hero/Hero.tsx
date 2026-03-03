import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';

export function Hero(): React.ReactNode {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(e.target.value);
  }

  function handleSearchSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchValue.trim())}`);
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.headline}>Discover Local Flavors</h1>
        <p className={styles.subtitle}>
          Find the best restaurants in your neighborhood. From cozy cafes to hidden gems,
          your next favorite meal is just around the corner.
        </p>
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search restaurants, cuisines..."
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
