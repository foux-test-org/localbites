import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptFixStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptFixStaticAllCard — child card component rendering the new design
// ---------------------------------------------------------------------------

interface FouxOptFixStaticAllCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingNumber: string;
  ratingCount: string;
  distance: string;
}

const HEART_FILLED = '\u2665';
const HEART_EMPTY = '\u2661';
const STAR_SYMBOL = '\u2605';
const OPEN_NOW_LABEL = 'Open now';
const VIEW_MENU_LABEL = 'View Menu';
const ADD_TO_FAVOURITES_LABEL = 'Add to favourites';

function FouxOptFixStaticAllCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingNumber,
  ratingCount,
  distance,
}: FouxOptFixStaticAllCardProps): React.ReactNode {
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
        className={styles.hero}

        // FOUX_TODO: replace --foux-item-color with a real color token once the design system provides per-restaurant palette values
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.largeLetter} aria-hidden="true">
          {restaurant.name[0]}
        </span>

        <div className={styles.heroBadges}>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingStar}>{STAR_SYMBOL}</span>
            <span className={styles.ratingNumber}>{ratingNumber}</span>
            <span className={styles.ratingCount}>{ratingCount}</span>
          </div>
          <button
            aria-label={ADD_TO_FAVOURITES_LABEL}
            className={`${originalStyles.heartButton} ${styles.heartBtn} ${isFavorite ? originalStyles.favorited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? HEART_FILLED : HEART_EMPTY}
          </button>
        </div>

        {/* FOUX_TODO: replace static open/closed status with data-bound live hours — needs open hours data per restaurant */}
        <div className={styles.openNowBadge}>
          <span className={styles.openDot} aria-hidden="true" />
          <span className={styles.openText}>{OPEN_NOW_LABEL}</span>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>{categoryLabel}</span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} aria-hidden="true" />
        <div className={styles.bottomRow}>
          {/* FOUX_TODO: replace static distance string with distance derived from user location — needs geolocation and restaurant coordinates */}
          <span className={styles.distance}>{distance}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.viewMenuBtn}`}
            onClick={handleViewMenuClick}
          >
            {VIEW_MENU_LABEL}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxOptFixStaticAll — main export; maps restaurant list to FouxOptFixStaticAllCard
// ---------------------------------------------------------------------------

interface FouxOptFixStaticAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingNumber: string;
  ratingCount: string;
  distance: string;
}

export function FouxOptFixStaticAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingNumber,
  ratingCount,
  distance,
}: FouxOptFixStaticAllProps): React.ReactNode {
  return (
    <FouxOptFixStaticAllCard
      restaurant={restaurant}
      isFavorite={isFavorite}
      onFavorite={onFavorite}
      onViewMenu={onViewMenu}
      ratingNumber={ratingNumber}
      ratingCount={ratingCount}
      distance={distance}
    />
  );
}
