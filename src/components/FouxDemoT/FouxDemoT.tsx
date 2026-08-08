import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// FouxDemoTHeroImage — image area with decorative initial, rating badge, heart, and open-now badge
// ---------------------------------------------------------------------------

interface FouxDemoTHeroImageProps {
  image: string;
  initial: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  isOpenNow: boolean;
  openNowLabel: string;
}

function FouxDemoTHeroImage({
  image,
  initial,
  rating,
  reviewCount,
  isFavorite,
  onFavorite,
  isOpenNow,
  openNowLabel,
}: FouxDemoTHeroImageProps): React.ReactNode {
  return (
    <div
      className={styles.image}
      style={{ background: image }}
    >
      <span className={styles.initial}>{initial}</span>

      <div className={styles.heroOverlays}>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingNumber}>{rating.toFixed(1)}</span>
          <span className={styles.ratingCount}>({reviewCount})</span>
        </div>
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className={styles.heart}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      {isOpenNow && (
        <div className={styles.heroBottom}>
          <div className={styles.openNowBadge}>
            <span className={styles.openDot} aria-hidden="true" />
            <span className={styles.openText}>{openNowLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTBody — card body with meta, name, description, divider, and footer
// ---------------------------------------------------------------------------

interface FouxDemoTBodyProps {
  name: string;
  cuisine: string;
  description: string;
  distanceTime: string;
  onViewMenu: () => void;
}

function FouxDemoTBody({
  name,
  cuisine,
  description,
  distanceTime,
  onViewMenu,
}: FouxDemoTBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <div className={styles.meta}>
        <span className={styles.categoryLabel}>{cuisine}</span>
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} aria-hidden="true" />
      <div className={styles.footer}>
        <span className={styles.distanceTime}>{distanceTime}</span>
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
// FouxDemoT — restaurant info card combining hero image and body sections
// ---------------------------------------------------------------------------

// FOUX_TODO: FouxDemoT is reusable across other listing pages — extract to a shared location when ready

export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Rating review count shown in the badge, e.g. 214 */
  reviewCount: number;
  /** Whether the restaurant is currently open */
  isOpenNow: boolean;
  /** Label shown in the open-now badge, e.g. "Open now" */
  openNowLabel: string;
  /** Distance and time string shown in the footer, e.g. "12 min · 0.4 mi" */
  distanceTime: string;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  isOpenNow,
  openNowLabel,
  distanceTime,
}: FouxDemoTProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemoTHeroImage
        image={restaurant.image}
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        reviewCount={reviewCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        isOpenNow={isOpenNow}
        openNowLabel={openNowLabel}
      />
      <FouxDemoTBody
        name={restaurant.name}
        cuisine={restaurant.cuisine}
        description={restaurant.description}
        distanceTime={distanceTime}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
