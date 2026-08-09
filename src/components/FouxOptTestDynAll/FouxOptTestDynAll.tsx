import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestDynAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestDynAll — new restaurant card with hero gradient, rating badge, open-now badge, distance info, and pill View Menu button
// ---------------------------------------------------------------------------

interface FouxOptTestDynAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Rating count label e.g. "(214)" */
  ratingCount: string;
  /** Distance/time info e.g. "12 min · 0.4 mi" */
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
      {/* Hero area */}
      <div
        className={styles.hero}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>

        {/* Rating badge — top-left */}
        <div className={styles.ratingBadge}>
          {/* FOUX_TODO: replace with a real star icon or StarRating sub-component when design tokens are available */}
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {/* Favourite button — top-right */}
        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteBtn} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {/* Open-now badge — bottom-left */}

        {/* FOUX_TODO: replace static "Open now" with data-bound open/closed status from restaurant data */}
        <div className={styles.openNowBadge}>
          <span className={styles.openNowDot}></span>
          <span className={styles.openNowText}>Open now</span>
        </div>
      </div>

      {/* Card body */}
      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.footerRow}>
          {/* FOUX_TODO: replace static distanceInfo prop with data-bound distance/time from restaurant data */}
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
