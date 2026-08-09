import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemotest.module.css';

// ---------------------------------------------------------------------------
// FouxDemotestHero — hero image area with rating badge, heart button, letter, and open-now badge
// ---------------------------------------------------------------------------

interface FouxDemotestHeroProps {
  restaurantName: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  openNowLabel: string;
  isOpenNow: boolean;
}

function FouxDemotestHero({
  restaurantName,
  rating,
  reviewCount,
  isFavorite,
  onFavorite,
  openNowLabel,
  isOpenNow,
}: FouxDemotestHeroProps): React.ReactNode {
  return (
    <div className={styles.hero}>
      <div className={styles.heroOverlaysTop}>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
          <span className={styles.ratingCount}>({reviewCount})</span>
        </div>
        <button
          type="button"
          aria-label="Add to favourites"
          className={`${styles.heartBtn} ${isFavorite ? styles.isSelected : ''}`}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <span className={styles.heroLetter}>{restaurantName[0]}</span>
      <div className={styles.heroOverlaysBottom}>
        {isOpenNow && (
          <div className={styles.openNowBadge}>
            <span className={styles.greenDot} />
            <span className={styles.openNowText}>{openNowLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemotestBody — card body with category label, name, description, separator, footer
// ---------------------------------------------------------------------------

interface FouxDemotestBodyProps {
  categoryLabel: string;
  restaurantName: string;
  description: string;
  distanceInfo: string;
  onViewMenu: () => void;
}

function FouxDemotestBody({
  categoryLabel,
  restaurantName,
  description,
  distanceInfo,
  onViewMenu,
}: FouxDemotestBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.categoryLabel}>{categoryLabel}</span>
      <h3 className={styles.restaurantName}>{restaurantName}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.separator} />
      <div className={styles.footer}>
        <span className={styles.distanceInfo}>{distanceInfo}</span>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onViewMenu}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemotest — new restaurant card design with gradient hero and pill badges

// FOUX_TODO: if this card design is reused elsewhere, extract to a shared component
// ---------------------------------------------------------------------------

export interface FouxDemotestProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  reviewCount: number;
  distanceInfo: string;
  openNowLabel: string;
  isOpenNow: boolean;
}

export function FouxDemotest({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  distanceInfo,
  openNowLabel,
  isOpenNow,
}: FouxDemotestProps): React.ReactNode {
  const categoryLabel = `${restaurant.cuisine.toUpperCase()} · ${restaurant.priceRange}`;

  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemotestHero
        restaurantName={restaurant.name}
        rating={restaurant.rating}
        reviewCount={reviewCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        openNowLabel={openNowLabel}
        isOpenNow={isOpenNow}
      />
      <FouxDemotestBody
        categoryLabel={categoryLabel}
        restaurantName={restaurant.name}
        description={restaurant.description}
        distanceInfo={distanceInfo}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
