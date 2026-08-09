import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestDynSingle.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestDynSingleCard — inner card child rendering hero + body
// ---------------------------------------------------------------------------

interface FouxOptTestDynSingleCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
}

function FouxOptTestDynSingleCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
}: FouxOptTestDynSingleCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      {/* Hero */}
      <div
        className={styles.hero}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>
          {restaurant.name[0]}
        </span>

        {/* Rating badge */}
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>{restaurant.rating}</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        {/* Favourite button — placement owned here, appearance from original module */}
        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteBtn} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {/* Open-now badge — FOUX_TODO: replace static label with live open/closed status resolved from hours data */}
        <div className={styles.openNowBadge}>
          <span className={styles.openNowDot}></span>
          <span className={styles.openNowText}>Open now</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.footer}>
          {/* FOUX_TODO: replace static distanceInfo with distance and estimated travel time derived from user location */}
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          {/* View Menu button — placement owned here, appearance from original module */}
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

// ---------------------------------------------------------------------------
// FouxOptTestDynSingle — new card design variant for a single restaurant item
// ---------------------------------------------------------------------------

export interface FouxOptTestDynSingleProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
}

export function FouxOptTestDynSingle({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
}: FouxOptTestDynSingleProps): React.ReactNode {
  return (
    <FouxOptTestDynSingleCard
      restaurant={restaurant}
      isFavorite={isFavorite}
      onFavorite={onFavorite}
      onViewMenu={onViewMenu}
      ratingCount={ratingCount}
      distanceInfo={distanceInfo}
    />
  );
}
