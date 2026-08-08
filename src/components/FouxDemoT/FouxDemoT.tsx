import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// FouxDemoTHero — hero area with large initial, rating badge, heart button, and open-now badge
// ---------------------------------------------------------------------------

interface FouxDemoTHeroProps {
  initial: string;
  rating: number;
  ratingCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  isOpen: boolean;
  openLabel: string;
}

function FouxDemoTHero({
  initial,
  rating,
  ratingCount,
  isFavorite,
  onFavorite,
  isOpen,
  openLabel,
}: FouxDemoTHeroProps): React.ReactNode {
  return (
    <div className={styles.hero}>
      <span className={styles.initial}>{initial}</span>

      <div className={styles.heroTop}>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
          <span className={styles.ratingCount}>({ratingCount})</span>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`${styles.heartBtn} ${isFavorite ? styles.isFavorited : ''}`}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.heroBottom}>
        {isOpen && (
          <div className={styles.openBadge}>
            <span className={styles.greenDot} />
            <span className={styles.openText}>{openLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTContent — content area with cuisine, name, description, divider, distance, and menu button
// ---------------------------------------------------------------------------

interface FouxDemoTContentProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distance: string;
  onViewMenu: () => void;
}

function FouxDemoTContent({
  cuisine,
  priceRange,
  name,
  description,
  distance,
  onViewMenu,
}: FouxDemoTContentProps): React.ReactNode {
  return (
    <div className={styles.content}>
      <span className={styles.cuisine}>{cuisine} · {priceRange}</span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <span className={styles.distance}>{distance}</span>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onViewMenu}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoT — new restaurant card design with hero initial, rating, open badge, and pill menu button

// FOUX_TODO: replace with the real restaurant card data — ratingCount, isOpen, openLabel, distance
// ---------------------------------------------------------------------------

export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: number;
  isOpen: boolean;
  openLabel: string;
  distance: string;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  isOpen,
  openLabel,
  distance,
}: FouxDemoTProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemoTHero
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        ratingCount={ratingCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        isOpen={isOpen}
        openLabel={openLabel}
      />
      <FouxDemoTContent
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        name={restaurant.name}
        description={restaurant.description}
        distance={distance}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
