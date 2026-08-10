import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxSingleDynDesign.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// FOUX_TODO: replace with the real distance info — { label: string }
interface FouxSingleDynDesignProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  distanceInfo: string;
}

// ---------------------------------------------------------------------------
// FouxSingleDynDesign — new restaurant card design with gradient hero, rating badge, and status badge
// ---------------------------------------------------------------------------
export function FouxSingleDynDesign({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
}: FouxSingleDynDesignProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.heroImageArea}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>

        <div
          className={styles.ratingBadge}
          aria-label={`Rating: ${restaurant.rating} out of 5, 214 reviews`}
        >
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>(214)</span>
        </div>

        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <div
          className={styles.statusBadge}
          aria-label="Status: Open now"
        >
          <span className={styles.statusDot}>●</span>
          <span className={styles.statusText}>Open now</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine.toUpperCase()} · {restaurant.priceRange}
        </span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.contentFooter}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            View Menu →
          </button>
        </div>
      </div>
    </div>
  );
}
