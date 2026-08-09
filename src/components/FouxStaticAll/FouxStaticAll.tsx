import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxStaticAll — new restaurant card with hero image, rating badge, status badge, and footer row
// ---------------------------------------------------------------------------

export interface FouxStaticAllContent {
  logoLetter: string;
  favoriteButton: string;
  favoritedButton: string;
  ratingStar: string;
  ratingNumber: string;
  ratingCount: string;
  title: string;
  categoryLabel: string;
  description: string;
  ctaButton: string;
  statusText: string;
  distanceInfo: string;
}

interface FouxStaticAllProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  content: FouxStaticAllContent;
}

export function FouxStaticAll({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  content,
}: FouxStaticAllProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div className={styles.heroImage}>
        <div
          aria-label={`Rating: ${content.ratingNumber} out of 5, ${content.ratingCount} reviews`}
          className={styles.ratingBadge}
        >
          <span className={styles.ratingStar}>{content.ratingStar}</span>
          <span className={styles.ratingNumber}>{content.ratingNumber}</span>
          <span className={styles.ratingCount}>{content.ratingCount}</span>
        </div>
        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? content.favoritedButton : content.favoriteButton}
        </button>
        <span className={styles.logoLetter}>{content.logoLetter}</span>
        {/* FOUX_TODO: replace with the real open/closed status — live open/closed status from restaurant data */}
        <div aria-label={content.statusText} className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>{content.statusText}</span>
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.headerRow}>
          <span className={styles.categoryLabel}>{content.categoryLabel}</span>
        </div>
        <h3 className={styles.title}>{content.title}</h3>
        <p className={styles.description}>{content.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          {/* FOUX_TODO: replace with the real distance and travel time — live distance and travel time from location data */}
          <span className={styles.distanceInfo}>{content.distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            {content.ctaButton}
          </button>
        </div>
      </div>
    </div>
  );
}
