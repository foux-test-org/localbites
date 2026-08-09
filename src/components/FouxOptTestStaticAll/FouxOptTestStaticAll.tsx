import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestStaticAll — redesigned restaurant card with hero image overlay, rating badge, open-now badge, and pill View Menu button
// ---------------------------------------------------------------------------

const LABELS = {
  viewMenu: 'View Menu →',
  openNow: 'Open now',
  addToFavourites: 'Add to favourites',
  favourited: '♥',
  unfavourited: '♡',
} as const;

interface FouxOptTestStaticAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  distanceInfo?: string;
}

export function FouxOptTestStaticAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
}: FouxOptTestStaticAllProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const categoryLabel = `${restaurant.cuisine.toUpperCase()} · ${restaurant.priceRange}`;

  return (
    <div className={styles.container}>
      <div
        className={styles.heroImage}
        style={{ background: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>

        <div className={styles.heroOverlaysTop}>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingStar}>★</span>
            <span className={styles.ratingScore}>{restaurant.rating.toFixed(1)}</span>
            <span className={styles.ratingCount}>({restaurant.reviewCount ?? 0})</span>
          </div>
          <button
            aria-label={LABELS.addToFavourites}
            className={`${styles.favoriteButton} ${originalStyles.heartButton} ${isFavorite ? originalStyles.favorited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? LABELS.favourited : LABELS.unfavourited}
          </button>
        </div>

        <div className={styles.heroOverlaysBottom}>
          <div className={styles.openNowBadge}>
            <span className={styles.openNowDot}></span>
            <span className={styles.openNowText}>{LABELS.openNow}</span>
          </div>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>{categoryLabel}</span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.footerRow}>
          <span className={styles.distanceInfo}>{distanceInfo ?? ''}</span>
          <button
            className={`${styles.viewMenuButton} ${originalStyles.menuButton}`}
            onClick={handleViewMenuClick}
          >
            {LABELS.viewMenu}
          </button>
        </div>
      </div>
    </div>
  );
}
