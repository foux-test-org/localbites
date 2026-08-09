import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxCheckHeartOutlineParity.module.css';

// ---------------------------------------------------------------------------
// FouxCheckHeartOutlineParity — redesigned restaurant card with rating badge, open-now indicator, and distance info
// ---------------------------------------------------------------------------

interface FouxCheckHeartOutlineParityProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** e.g. "12 min · 0.4 mi" */
  distanceInfo: string;
  /** e.g. "(214)" */
  ratingCount: string;
  /** Whether the restaurant is currently open */
  isOpenNow: boolean;
}

export function FouxCheckHeartOutlineParity({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
  ratingCount,
  isOpenNow,
}: FouxCheckHeartOutlineParityProps): React.ReactNode {
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
        style={{ background: restaurant.image }}
      >
        <span className={styles.initial}>{restaurant.name[0]}</span>

        <div className={styles.ratingBadge}>
          <span className={styles.starIcon}>★</span>
          <span className={styles.ratingNumber}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        <button
          type="button"
          aria-label="Add to favorites"
          className={`${styles.heartBtn} ${isFavorite ? styles.isSelected : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {isOpenNow && (
          <div className={styles.openNowBadge}>
            <span className={styles.greenDot} />
            <span className={styles.openNowText}>Open now</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.divider} />
        <div className={styles.bottomRow}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
