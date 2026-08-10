import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxStaticSingle.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxStaticSingle — redesigned restaurant card with gradient hero, rating badge, status badge, and pill CTA
// ---------------------------------------------------------------------------

interface FouxStaticSingleProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
}

const STATIC_CONTENT = {
  logoLetter: 'T',
  ratingScore: '4.8',
  ratingCount: '(214)',
  favoriteButton: '\u2661',
  categoryLabel: 'ITALIAN \u00b7 $$',
  restaurantName: 'Trattoria Nonna',
  description:
    'Hand-rolled pasta and wood-fired focaccia in a twelve-table room off the market square.',
  statusDot: '\u25cf',
  statusText: 'Open now',
  distanceInfo: '12 min \u00b7 0.4 mi',
  ctaButton: 'View Menu \u2192',
} as const;

export function FouxStaticSingle({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
}: FouxStaticSingleProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroImageArea}>
        <span className={styles.logoLetter}>{STATIC_CONTENT.logoLetter}</span>

        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>&#9733;</span>
          <span className={styles.ratingScore}>{STATIC_CONTENT.ratingScore}</span>
          <span className={styles.ratingCount}>{STATIC_CONTENT.ratingCount}</span>
        </div>

        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '\u2665' : STATIC_CONTENT.favoriteButton}
        </button>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}>{STATIC_CONTENT.statusDot}</span>
          <span className={styles.statusText}>{STATIC_CONTENT.statusText}</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>{STATIC_CONTENT.categoryLabel}</span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {STATIC_CONTENT.restaurantName}
        </h3>
        <p className={styles.description}>{STATIC_CONTENT.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          <span className={styles.distanceInfo}>{STATIC_CONTENT.distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            {STATIC_CONTENT.ctaButton}
          </button>
        </div>
      </div>
    </div>
  );
}
