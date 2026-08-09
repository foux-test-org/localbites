import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptimizeTestingStaticReplaceAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptimizeTestingStaticReplaceAll — redesigned restaurant card with gradient hero, rating badge, open-now pill, and rounded pill buttons
// ---------------------------------------------------------------------------

interface FouxOptimizeTestingStaticReplaceAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingNumber: string;
  ratingCount: string;
  distance: string;
}

const OPEN_NOW_DOT = '●';
const OPEN_NOW_TEXT = 'Open now';
const RATING_STAR = '★';
const VIEW_MENU_LABEL = 'View Menu';

export function FouxOptimizeTestingStaticReplaceAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingNumber,
  ratingCount,
  distance,
}: FouxOptimizeTestingStaticReplaceAllProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const cuisineLabel = `${restaurant.cuisine.toUpperCase()} · ${restaurant.priceRange}`;

  return (
    <div className={styles.container}>
      <div
        className={styles.hero}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.initial} aria-hidden="true">
          {restaurant.name[0]}
        </span>
        <div className={styles.heroTop}>
          <div
            className={styles.ratingBadge}
            role="img"
            aria-label={`Rating: ${ratingNumber} out of 5, ${ratingCount.replace(/[()]/g, '')} reviews`}
          >
            <span className={styles.ratingStar} aria-hidden="true">
              {RATING_STAR}
            </span>
            <span className={styles.ratingNumber}>{ratingNumber}</span>
            <span className={styles.ratingCount}>{ratingCount}</span>
          </div>
          <button
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            className={`${styles.favoriteBtn} ${originalStyles.heartButton} ${isFavorite ? originalStyles.favorited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        <div className={styles.heroBottom}>
          {/* FOUX_TODO: replace with live open/closed status — needs isOpen: boolean from restaurant data */}
          <div className={styles.openBadge} aria-label={OPEN_NOW_TEXT}>
            <span className={styles.openDot} aria-hidden="true">
              {OPEN_NOW_DOT}
            </span>
            <span className={styles.openText}>{OPEN_NOW_TEXT}</span>
          </div>
          {/* FOUX_TODO: end */}
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.cuisine}>{cuisineLabel}</span>
        <h3 className={`${styles.name} ${originalStyles.name}`}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} aria-hidden="true" />
        <div className={styles.bottomRow}>
          {/* FOUX_TODO: replace with data-bound distance/time — needs deliveryMinutes: number and distanceMiles: number from restaurant data */}
          <span className={styles.distance}>{distance}</span>
          {/* FOUX_TODO: end */}
          <button
            className={`${styles.menuBtn} ${originalStyles.menuButton}`}
            onClick={handleViewMenuClick}
          >
            {VIEW_MENU_LABEL}
          </button>
        </div>
      </div>
    </div>
  );
}
