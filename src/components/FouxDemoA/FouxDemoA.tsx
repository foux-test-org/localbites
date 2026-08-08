import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoA.module.css';

// ---------------------------------------------------------------------------
// FouxDemoAHero — gradient image area with initial, rating badge, heart, and open-now badge
// ---------------------------------------------------------------------------

interface FouxDemoAHeroProps {
  initial: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  isOpenNow: boolean;
  openNowLabel: string;
}

function FouxDemoAHero({
  initial,
  rating,
  reviewCount,
  isFavorite,
  onFavorite,
  isOpenNow,
  openNowLabel,
}: FouxDemoAHeroProps): React.ReactNode {
  return (
    <div className={styles.hero}>
      <span className={styles.initial}>{initial}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingNumber}>{rating}</span>
        <span className={styles.ratingCount}>({reviewCount})</span>
      </div>

      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        className={styles.heart}
        onClick={onFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {isOpenNow && (
        <div className={styles.openNowBadge}>
          <span className={styles.greenDot} />
          <span className={styles.openNowText}>{openNowLabel}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoABody — card body with category label, name, description, divider, and bottom bar
// ---------------------------------------------------------------------------

interface FouxDemoABodyProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distanceInfo: string;
  onViewMenu: () => void;
}

function FouxDemoABody({
  cuisine,
  priceRange,
  name,
  description,
  distanceInfo,
  onViewMenu,
}: FouxDemoABodyProps): React.ReactNode {
  const categoryLabel = `${cuisine.toUpperCase()} · ${priceRange}`;

  return (
    <div className={styles.body}>
      <span className={styles.categoryLabel}>{categoryLabel}</span>
      <h3 className={styles.restaurantName}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.divider} />
      <div className={styles.bottomBar}>
        <span className={styles.distanceInfo}>{distanceInfo}</span>
        <button
          type="button"
          className={styles.viewMenu}
          onClick={onViewMenu}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoA — restaurant image card with gradient hero and detail body
// ---------------------------------------------------------------------------

export interface FouxDemoAProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Number of reviews shown in the rating badge */
  reviewCount: number;
  /** Whether the restaurant is currently open */
  isOpenNow: boolean;
  /** Label shown in the open-now badge, e.g. "Open now" */
  openNowLabel: string;
  /** Distance/time string shown in the bottom bar, e.g. "12 min · 0.4 mi" */
  distanceInfo: string;
}

export function FouxDemoA({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  isOpenNow,
  openNowLabel,
  distanceInfo,
}: FouxDemoAProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemoAHero
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        reviewCount={reviewCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        isOpenNow={isOpenNow}
        openNowLabel={openNowLabel}
      />
      <FouxDemoABody
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        name={restaurant.name}
        description={restaurant.description}
        distanceInfo={distanceInfo}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
