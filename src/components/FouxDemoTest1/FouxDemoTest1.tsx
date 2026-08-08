import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoTest1.module.css';

// ---------------------------------------------------------------------------
// FouxDemoTest1ImageHeader — image area with rating badge, initial, heart, and open badge
// ---------------------------------------------------------------------------

interface FouxDemoTest1ImageHeaderProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  ratingCount: number;
}

function FouxDemoTest1ImageHeader({
  restaurant,
  isFavorite,
  onFavorite,
  ratingCount,
}: FouxDemoTest1ImageHeaderProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  return (
    <div
      className={styles.image}
      style={{ background: restaurant.image }}
    >
      <div
        className={styles.ratingBadge}
        aria-label={`Rating: ${restaurant.rating} out of 5, ${ratingCount} reviews`}
      >
        <span className={styles.ratingStar} aria-hidden="true">★</span>
        <span className={styles.ratingValue}>{restaurant.rating}</span>
        <span className={styles.ratingCount}>({ratingCount})</span>
      </div>

      <span className={styles.initial} aria-hidden="true">
        {restaurant.name[0]}
      </span>

      <button
        type="button"
        aria-label="Add to favourites"
        className={`${styles.heart} ${isFavorite ? styles.isSelected : ''}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {/* FOUX_TODO: replace with live open/closed status indicator (data-bound) */}
      <div className={styles.openBadge} aria-label="Currently open">
        <span className={styles.openDot} aria-hidden="true" />
        <span>Open now</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTest1Body — card body with meta, name, description, divider, footer
// ---------------------------------------------------------------------------

interface FouxDemoTest1BodyProps {
  restaurant: Restaurant;
  onViewMenu: (restaurant: Restaurant) => void;
  distanceLabel: string;
}

function FouxDemoTest1Body({
  restaurant,
  onViewMenu,
  distanceLabel,
}: FouxDemoTest1BodyProps): React.ReactNode {
  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.body}>
      <div className={styles.meta}>
        <span className={styles.cuisinePrice}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
      </div>

      <h3 className={styles.name}>{restaurant.name}</h3>

      <p className={styles.description}>{restaurant.description}</p>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.footer}>
        {/* FOUX_TODO: replace with real-time distance and travel time display (data-bound) */}
        <span className={styles.distance}>{distanceLabel}</span>
        <button
          type="button"
          aria-label={`View menu for ${restaurant.name}`}
          className={styles.menuBtn}
          onClick={handleViewMenuClick}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTest1 — redesigned restaurant info card (main export)
// ---------------------------------------------------------------------------

export interface FouxDemoTest1Props {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;

  // FOUX_TODO: replace with the real review count source — number of user reviews for this restaurant
  ratingCount: number;

  // FOUX_TODO: replace with real-time distance and travel time display — e.g. '12 min · 0.4 mi'
  distanceLabel: string;
}

export function FouxDemoTest1({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceLabel,
}: FouxDemoTest1Props): React.ReactNode {
  return (
    <div className={styles.container}>
      <FouxDemoTest1ImageHeader
        restaurant={restaurant}
        isFavorite={isFavorite}
        onFavorite={onFavorite}
        ratingCount={ratingCount}
      />
      <FouxDemoTest1Body
        restaurant={restaurant}
        onViewMenu={onViewMenu}
        distanceLabel={distanceLabel}
      />
    </div>
  );
}
