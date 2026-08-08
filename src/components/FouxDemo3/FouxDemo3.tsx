import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemo3.module.css';

// ---------------------------------------------------------------------------
// HeroBadgeRating — rating badge overlaid on the hero image
// ---------------------------------------------------------------------------

interface HeroBadgeRatingProps {
  rating: number;
  reviewCount: number;
}

function HeroBadgeRating({ rating, reviewCount }: HeroBadgeRatingProps): React.ReactNode {
  return (
    <div className={styles.ratingBadge}>
      <span className={styles.ratingStar}>★</span>
      <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
      <span className={styles.ratingCount}>({reviewCount})</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OpenBadge — "Open now" status badge overlaid on the hero image
// ---------------------------------------------------------------------------

interface OpenBadgeProps {
  label: string;
}

function OpenBadge({ label }: OpenBadgeProps): React.ReactNode {
  return (
    <div className={styles.openBadge}>
      <span className={styles.greenDot} />
      <span className={styles.openText}>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemo3 — redesigned restaurant info card with hero, badges, and footer row
// ---------------------------------------------------------------------------

export interface FouxDemo3Props {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Number of reviews shown in the rating badge */
  reviewCount: number;
  /** Open-status label shown in the bottom-left badge of the hero */
  openStatusLabel: string;
  /** Distance and time string shown in the footer row, e.g. "12 min · 0.4 mi" */
  distanceTime: string;
}

export function FouxDemo3({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  openStatusLabel,
  distanceTime,
}: FouxDemo3Props): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const combinedLabel = `${restaurant.cuisine} · ${restaurant.priceRange}`;

  return (
    <div className={styles.container}>
      <div
        className={styles.hero}
        style={{ backgroundColor: restaurant.image }}
      >
        <span className={styles.heroLetter}>{restaurant.name[0]}</span>

        <HeroBadgeRating rating={restaurant.rating} reviewCount={reviewCount} />

        <button
          type="button"
          aria-label="Add to favourites"
          className={`${styles.heartBtn} ${isFavorite ? styles.isSelected : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <OpenBadge label={openStatusLabel} />
      </div>

      <div className={styles.body}>
        <span className={styles.cuisineLabel}>{combinedLabel}</span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          <span className={styles.distanceTime}>{distanceTime}</span>
          <button
            type="button"
            className={styles.viewMenuBtn}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
