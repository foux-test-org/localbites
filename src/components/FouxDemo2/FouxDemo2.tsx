import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemo2.module.css';

// ---------------------------------------------------------------------------
// FouxDemo2 — Redesigned restaurant info card with gradient hero, rating badge, open-now badge
// ---------------------------------------------------------------------------

interface FouxDemo2Props {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  distanceInfo: string;
  openNowLabel: string;
}

export function FouxDemo2({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
  openNowLabel,
}: FouxDemo2Props): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.initial}>{restaurant.name[0]}</span>

        <div className={styles.heroOverlayTop}>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingStar}>★</span>
            <span className={styles.ratingNumber}>{restaurant.rating}</span>
            <span className={styles.ratingCount}>({restaurant.reviewCount ?? 0})</span>
          </div>
          <button
            type="button"
            aria-label="Add to favourites"
            className={`${styles.heartBtn} ${isFavorite ? styles.isFavourited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <div className={styles.heroOverlayBottom}>
          <div className={styles.openBadge}>
            <span className={styles.greenDot} />
            <span className={styles.openText}>{openNowLabel}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
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
