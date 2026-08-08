import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// HeroBadgeRating — rating badge shown in the top-left of the hero
// ---------------------------------------------------------------------------

interface HeroBadgeRatingProps {
  rating: number;
  reviewCount: number;
}

function HeroBadgeRating({ rating, reviewCount }: HeroBadgeRatingProps): React.ReactNode {
  return (
    <div className={styles.ratingBadge}>
      <span className={styles.ratingStar}>★</span>
      <span className={styles.ratingNumber}>{rating}</span>
      <span className={styles.ratingCount}>({reviewCount})</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OpenBadge — "Open now" indicator shown in the bottom-left of the hero
// ---------------------------------------------------------------------------

interface OpenBadgeProps {
  label: string;
}

function OpenBadge({ label }: OpenBadgeProps): React.ReactNode {
  return (
    <div className={styles.openBadge}>
      <span className={styles.greenDot}></span>
      <span className={styles.openText}>{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoT — redesigned restaurant card with gradient hero and pill CTA
// ---------------------------------------------------------------------------

// FOUX_TODO: replace with the real review count source — { restaurantId: string, count: number }
export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  reviewCount: number;
  distanceLabel: string;
  openLabel: string;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  distanceLabel,
  openLabel,
}: FouxDemoTProps): React.ReactNode {
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
        style={{ background: restaurant.image }}
      >
        <span className={styles.largeLetter} aria-hidden="true">
          {restaurant.name[0]}
        </span>

        <div className={styles.heroTop}>
          <HeroBadgeRating rating={restaurant.rating} reviewCount={reviewCount} />
          <button
            type="button"
            aria-label="Add to favourites"
            className={`${styles.heartBtn} ${isFavorite ? styles.isSelected : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>

        <div className={styles.heroBottom}>
          <OpenBadge label={openLabel} />
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{categoryLabel}</span>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.bottomRow}>
          <span className={styles.distance}>{distanceLabel}</span>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
