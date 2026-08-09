import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestStaticAllCard — single card child rendered per restaurant item
// ---------------------------------------------------------------------------

const LABEL_VIEW_MENU = 'View Menu';
const LABEL_ADD_FAVOURITES = 'Add to favourites';
const LABEL_OPEN_NOW = 'Open now';

interface FouxOptTestStaticAllCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingNumber: string;
  ratingCount: string;
  distanceTime: string;
}

function FouxOptTestStaticAllCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingNumber,
  ratingCount,
  distanceTime,
}: FouxOptTestStaticAllCardProps): React.ReactNode {
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

        // FOUX_TODO: open/closed status is driven by live hours data — replace the static "Open now" badge below with a real data-bound indicator
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.initial}>{restaurant.name[0]}</span>

        <div className={styles.heroTop}>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingStar}>★</span>
            <span className={styles.ratingNumber}>{ratingNumber}</span>
            <span className={styles.ratingCount}>{ratingCount}</span>
          </div>
          <button
            aria-label={LABEL_ADD_FAVOURITES}
            className={`${originalStyles.heartButton} ${styles.heart} ${isFavorite ? originalStyles.favorited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <div className={styles.heroBottom}>
          {/* FOUX_TODO: replace static open badge with real open/closed status driven by live hours data */}
          <div className={styles.openBadge}>
            <span className={styles.greenDot}></span>
            <span className={styles.openText}>{LABEL_OPEN_NOW}</span>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.cuisineRow}>
          <span className={styles.cuisineLabel}>{cuisineLabel}</span>
        </div>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.bottomRow}>
          {/* FOUX_TODO: replace static distanceTime string with real distance and travel-time values fetched from a location service */}
          <span className={styles.distanceTime}>{distanceTime}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.menuBtn}`}
            onClick={handleViewMenuClick}
          >
            {LABEL_VIEW_MENU}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxOptTestStaticAll — mapped list wrapper; renders one FouxOptTestStaticAllCard per restaurant
// ---------------------------------------------------------------------------

// FOUX_TODO: FouxOptTestStaticAll is reusable across other listing pages — extract to a shared location when needed

interface FouxOptTestStaticAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingNumber: string;
  ratingCount: string;
  distanceTime: string;
}

export function FouxOptTestStaticAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingNumber,
  ratingCount,
  distanceTime,
}: FouxOptTestStaticAllProps): React.ReactNode {
  return (
    <FouxOptTestStaticAllCard
      restaurant={restaurant}
      isFavorite={isFavorite}
      onFavorite={onFavorite}
      onViewMenu={onViewMenu}
      ratingNumber={ratingNumber}
      ratingCount={ratingCount}
      distanceTime={distanceTime}
    />
  );
}
