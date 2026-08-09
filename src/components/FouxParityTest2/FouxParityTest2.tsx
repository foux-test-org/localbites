import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxParityTest2.module.css';

// ---------------------------------------------------------------------------
// RatingBadge — displays star icon, numeric rating, and review count
// ---------------------------------------------------------------------------

interface RatingBadgeProps {
  rating: number;
  reviewCount: number;
}

function RatingBadge({ rating, reviewCount }: RatingBadgeProps): React.ReactNode {
  return (
    <div className={styles.ratingBadge}>
      <span className={styles.ratingStar}>★</span>
      <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
      <span className={styles.ratingCount}>({reviewCount})</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OpenNowBadge — static open/closed status badge (data-bound stub)
// ---------------------------------------------------------------------------

function OpenNowBadge(): React.ReactNode {
  return (
    <div className={styles.openNowBadge}>
      <span className={styles.openNowDot}>●</span>
      <span className={styles.openNowText}>Open now</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxParityTest2 — new restaurant card design with gradient hero and footer row
// ---------------------------------------------------------------------------

export interface FouxParityTest2Props {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Review count shown in the rating badge */
  reviewCount: number;
  /** Distance label shown in the footer, e.g. '12 min · 0.4 mi' */
  distanceLabel: string;
}

export function FouxParityTest2({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  distanceLabel,
}: FouxParityTest2Props): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const heartClass = isFavorite
    ? `${styles.heartButton} ${styles.heartButton}`
    : styles.heartButton;

  return (
    <div className={styles.container}>
      <div
        className={styles.hero}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.initial}>{restaurant.name[0]}</span>
        <div className={styles.heroRow1}>
          <RatingBadge rating={restaurant.rating} reviewCount={reviewCount} />
          <button
            className={styles.heartButton}
            aria-label="Add to favourites"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        <div className={styles.heroRow2}>
          {/* FOUX_TODO: replace open/closed status with value resolved from live hours data */}
          <OpenNowBadge />
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          {/* FOUX_TODO: replace distanceLabel with distance and travel time calculated from user location */}
          <span className={styles.distanceInfo}>{distanceLabel}</span>
          <button className={styles.viewMenuButton} onClick={handleViewMenuClick}>
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
