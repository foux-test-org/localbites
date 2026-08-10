import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxSingleDynOrig.module.css';
import origStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxSingleDynOrig — new restaurant card design with hero image area, rating badge, status badge, and footer row
// ---------------------------------------------------------------------------

interface FouxSingleDynOrigProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;

  // FOUX_TODO: replace with the real distance/time info — { label: string }
  distanceInfo: string;
}

export function FouxSingleDynOrig({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
}: FouxSingleDynOrigProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.heroImage}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>

        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          {/* FOUX_TODO: replace with the real review count (data-bound) */}
          <span className={styles.ratingCount}>(214)</span>
        </div>

        <button
          aria-label="Add to favourites"
          className={`${styles.favoriteButton} ${origStyles.heartButton} ${isFavorite ? origStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {/* FOUX_TODO: replace with live open/closed status indicator (data-bound) */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span className={styles.statusText}>Open now</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          {/* FOUX_TODO: replace with real distance and travel time calculation (data-bound) */}
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${styles.viewMenuButton} ${origStyles.menuButton}`}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
