import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemotest.module.css';

// ---------------------------------------------------------------------------
// FouxDemotestHero — hero section with gradient background, rating badge, heart button, open-now badge
// ---------------------------------------------------------------------------

const HERO_LABELS = {
  addToFavourites: 'Add to favourites',
  openNow: 'Open now',
} as const;

interface FouxDemotestHeroProps {
  initial: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
}

function FouxDemotestHero({
  initial,
  rating,
  reviewCount,
  isFavorite,
  onFavorite,
}: FouxDemotestHeroProps): React.ReactNode {
  return (
    <div className={styles.hero}>
      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        {/* FOUX_TODO: replace with live rating value (data-bound) */}
        <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
        {/* FOUX_TODO: replace with live review count (data-bound) */}
        <span className={styles.ratingCount}>({reviewCount})</span>
      </div>

      <button
        type="button"
        aria-label={HERO_LABELS.addToFavourites}
        className={`${styles.heartBtn} ${isFavorite ? styles.isSelected : ''}`}
        onClick={onFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <span className={styles.heroLetter}>{initial}</span>

      {/* FOUX_TODO: replace with real open/closed status indicator (data-bound) */}
      <div className={styles.openNowBadge}>
        <span className={styles.openDot} />
        <span className={styles.openText}>{HERO_LABELS.openNow}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemotestBody — body section with category label, name, description, separator, footer
// ---------------------------------------------------------------------------

const BODY_LABELS = {
  viewMenu: 'View Menu',
} as const;

interface FouxDemotestBodyProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distanceInfo: string;
  onViewMenu: () => void;
}

function FouxDemotestBody({
  cuisine,
  priceRange,
  name,
  description,
  distanceInfo,
  onViewMenu,
}: FouxDemotestBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.categoryLabel}>
        {cuisine.toUpperCase()} · {priceRange}
      </span>
      <h3 className={styles.restaurantName}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.separator} />
      <div className={styles.footer}>
        {/* FOUX_TODO: replace with real distance and travel time display (data-bound) */}
        <span className={styles.distanceInfo}>{distanceInfo}</span>
        <button
          type="button"
          className={styles.viewMenuBtn}
          onClick={onViewMenu}
        >
          {BODY_LABELS.viewMenu}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemotest — redesigned restaurant card composed of hero + body child components

// FOUX_TODO: if reused elsewhere, extract FouxDemotestHero and FouxDemotestBody to shared files
// ---------------------------------------------------------------------------

interface FouxDemotestProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  distanceInfo: string;
}

export function FouxDemotest({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  distanceInfo,
}: FouxDemotestProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemotestHero
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        reviewCount={214}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
      />
      <FouxDemotestBody
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
