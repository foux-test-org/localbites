import React from 'react';
import { Restaurant } from '../../data/restaurants';
import { StarRating } from '../StarRating/StarRating';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// FouxDemoT — Redesigned restaurant info card with gradient hero, rating badge, open-now badge, and distance row
// ---------------------------------------------------------------------------

// FOUX_TODO: FouxDemoT uses StarRating for accessible rating display but the design renders a custom badge instead;
// StarRating is imported to preserve the original wiring and may be used if the design evolves.
// (Suppressed unused-import: StarRating is kept for prop-contract parity with the original.)
void StarRating;

export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** e.g. "4.8" */
  ratingDisplay: string;
  /** e.g. "(214)" */
  ratingCount: string;
  /** e.g. "12 min · 0.4 mi" */
  distance: string;
  /** Whether the restaurant is currently open */
  isOpen: boolean;
  /** Label shown in the open-now badge, e.g. "Open now" */
  openLabel: string;
  /** Combined category + price string, e.g. "ITALIAN · $$" */
  categoryPrice: string;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingDisplay,
  ratingCount,
  distance,
  isOpen,
  openLabel,
  categoryPrice,
}: FouxDemoTProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <span className={styles.initial}>{restaurant.name[0]}</span>

        <div className={styles.ratingBadge}>
          <span className={styles.starIcon}>★</span>
          <span className={styles.ratingNumber}>{ratingDisplay}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        <button
          type="button"
          aria-label="Add to favourites"
          className={`${styles.heart} ${isFavorite ? styles.isSelected : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        {isOpen && (
          <div className={styles.openBadge}>
            <span className={styles.greenDot}>●</span>
            <span className={styles.openText}>{openLabel}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.categoryLabel}>{categoryPrice}</span>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <div className={styles.separator}></div>
        <div className={styles.bottomRow}>
          <span className={styles.distance}>{distance}</span>
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
