import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxStaticAll.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxStaticAllContent — shape of the settled display content passed in from the parent
// ---------------------------------------------------------------------------

export interface FouxStaticAllContent {
  logoLetter: string;
  ratingScore: string;
  ratingCount: string;
  favoriteButton: string;
  favoritedButton: string;
  categoryLabel: string;
  restaurantName: string;
  description: string;
  viewMenuButton: string;
  openNowText: string;
  distanceInfo: string;
}

// ---------------------------------------------------------------------------
// FouxStaticAllHeroImage — gradient hero panel with logo letter, rating badge, favourite button, and open-now badge
// ---------------------------------------------------------------------------

interface FouxStaticAllHeroImageProps {
  content: FouxStaticAllContent;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

function FouxStaticAllHeroImage({
  content,
  isFavorite,
  onFavoriteClick,
}: FouxStaticAllHeroImageProps): React.ReactNode {
  return (
    <div className={styles.heroImage}>
      <span className={styles.logoLetter}>{content.logoLetter}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingScore}>{content.ratingScore}</span>
        <span className={styles.ratingCount}>{content.ratingCount}</span>
      </div>

      <button
        aria-label="Add to favourites"
        className={`${originalStyles.heartButton} ${styles.favoriteButton} ${
          isFavorite ? originalStyles.favorited : ''
        }`}
        onClick={onFavoriteClick}
      >
        {isFavorite ? content.favoritedButton : content.favoriteButton}
      </button>

      {/* FOUX_TODO: replace open-now badge with real open/closed status driven by live hours data */}
      <div className={styles.openNowBadge}>
        <span className={styles.openNowDot}></span>
        <span className={styles.openNowText}>{content.openNowText}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxStaticAllContentArea — text content, divider, and footer row with distance and View Menu button
// ---------------------------------------------------------------------------

interface FouxStaticAllContentAreaProps {
  content: FouxStaticAllContent;
  onViewMenuClick: () => void;
}

function FouxStaticAllContentArea({
  content,
  onViewMenuClick,
}: FouxStaticAllContentAreaProps): React.ReactNode {
  return (
    <div className={styles.contentArea}>
      <span className={styles.categoryLabel}>{content.categoryLabel}</span>
      <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
        {content.restaurantName}
      </h3>
      <p className={styles.description}>{content.description}</p>
      <hr className={styles.divider} />
      <div className={styles.footerRow}>
        {/* FOUX_TODO: replace distance info with real distance and travel time driven by user location */}
        <span className={styles.distanceInfo}>{content.distanceInfo}</span>
        <button
          className={`${originalStyles.menuButton} ${styles.viewMenuButton}`}
          onClick={onViewMenuClick}
        >
          {content.viewMenuButton}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxStaticAll — new restaurant card design with gradient hero, rating badge, and pill CTA
// ---------------------------------------------------------------------------

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
      <FouxStaticAllHeroImage
        content={content}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
      />
      <FouxStaticAllContentArea
        content={content}
        onViewMenuClick={handleViewMenuClick}
      />
    </div>
  );
}
