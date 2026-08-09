import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestStaticAll — redesigned restaurant card with gradient hero, rating badge, status badge, and pill CTA
// ---------------------------------------------------------------------------

interface FouxOptTestStaticAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  categoryLabel: string;
}

const VIEW_MENU_LABEL = 'View Menu \u2192';
const FAVORITE_LABEL_ADD = 'Add to favourites';
const FAVORITE_ICON_EMPTY = '\u2661';
const FAVORITE_ICON_FILLED = '\u2665';
const STATUS_TEXT = 'Open now';

export function FouxOptTestStaticAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  categoryLabel,
}: FouxOptTestStaticAllProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const logoLetter = restaurant.name[0];

  return (
    <div className={styles.container}>
      <div className={styles.heroImage}>
        <span className={styles.logoLetter}>{logoLetter}</span>

        {/* FOUX_TODO: replace with data-bound rating score — needs restaurant.rating as a formatted string */}
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>&#9733;</span>
          <span className={styles.ratingScore}>4.8</span>
          <span className={styles.ratingCount}>(214)</span>
        </div>

        <button
          aria-label={FAVORITE_LABEL_ADD}
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? FAVORITE_ICON_FILLED : FAVORITE_ICON_EMPTY}
        </button>

        {/* FOUX_TODO: replace with data-bound open/closed status — needs restaurant open hours or isOpen flag */}
        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>{STATUS_TEXT}</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>{categoryLabel}</span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          {/* FOUX_TODO: replace with data-bound distance and travel time — needs distance (mi) and estimated travel time (min) */}
          <span className={styles.distanceInfo}>12 min · 0.4 mi</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            {VIEW_MENU_LABEL}
          </button>
        </div>
      </div>
    </div>
  );
}
