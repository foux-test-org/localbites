import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestDynAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestDynAll — New restaurant card design with gradient hero, rating badge, status badge, and distance info
// ---------------------------------------------------------------------------

interface FouxOptTestDynAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
  statusText: string;
}

export function FouxOptTestDynAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
  statusText,
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

        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteBtn} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}>●</span>
          <span className={styles.statusText}>{statusText}</span>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footer}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.viewMenuBtn}`}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
