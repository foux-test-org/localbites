import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestDynAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestDynAll — New restaurant card with gradient hero, rating badge, status badge, and bottom-row CTA
// ---------------------------------------------------------------------------

interface FouxOptTestDynAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Number of ratings to display, e.g. "(214)" */
  ratingCount: string;
  /** Distance and time info, e.g. "12 min · 0.4 mi" */
  distanceInfo: string;
}

export function FouxOptTestDynAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
}: FouxOptTestDynAllProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.hero}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>

        <div
          className={styles.ratingBadge}
          role="img"
          aria-label={`Rating: ${restaurant.rating} out of 5, ${ratingCount} reviews`}
        >
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {/* FOUX_TODO: wire up live open/closed status — replace static "Open now" with real data when available */}
        <div className={styles.statusBadge} aria-label="Open now">
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>Open now</span>
        </div>

        <button
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className={`${originalStyles.heartButton} ${isFavorite ? originalStyles.favorited : ''} ${styles.favoriteBtn}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>

        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>

        <p className={styles.description}>{restaurant.description}</p>

        <hr className={styles.divider} role="separator" />

        <div className={styles.bottomRow}>
          {/* FOUX_TODO: replace distanceInfo with real-time distance and ETA data when available */}
          <span className={styles.distanceInfo}>{distanceInfo}</span>

          <button
            className={`${originalStyles.menuButton} ${styles.ctaBtn}`}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
