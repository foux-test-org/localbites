import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxPrcolorTest.module.css';

// ---------------------------------------------------------------------------
// FouxPrcolorTestHero — hero image area with letter, rating badge, favourite button, and open badge
// ---------------------------------------------------------------------------

interface FouxPrcolorTestHeroProps {
  name: string;
  image: string;
  rating: number;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  ratingCount: number;
}

function FouxPrcolorTestHero({
  name,
  image,
  rating,
  isFavorite,
  onFavoriteClick,
  ratingCount,
}: FouxPrcolorTestHeroProps): React.ReactNode {
  return (
    <div
      className={styles.hero}
      style={{ ['--foux-item-color' as string]: image }}
    >
      <span className={styles.heroLetter}>{name[0]}</span>

      <div className={styles.heroOverlaysTop}>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingNumber}>{rating}</span>
          <span className={styles.ratingCount}>({ratingCount})</span>
        </div>
        <button
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          className={styles.favoriteBtn}
          onClick={onFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.heroOverlaysBottom}>
        {/* FOUX_TODO: replace open/closed status with real data driven by live hours */}
        <div className={styles.openBadge}>
          <span className={styles.openDot}></span>
          <span className={styles.openText}>Open now</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxPrcolorTestBody — card body with cuisine label, name, description, divider, and bottom row
// ---------------------------------------------------------------------------

interface FouxPrcolorTestBodyProps {
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  onViewMenuClick: () => void;
  distanceLabel: string;
}

function FouxPrcolorTestBody({
  name,
  cuisine,
  priceRange,
  description,
  onViewMenuClick,
  distanceLabel,
}: FouxPrcolorTestBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.cuisine}>
        {cuisine.toUpperCase()} · {priceRange}
      </span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <span className={styles.distance}>{distanceLabel}</span>
        <button className={styles.menuBtn} onClick={onViewMenuClick}>
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxPrcolorTest — new restaurant card design with gradient hero and bottom-row layout
// ---------------------------------------------------------------------------

interface FouxPrcolorTestProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;

  // FOUX_TODO: replace with real rating count bound to restaurant data
  ratingCount: number;

  // FOUX_TODO: replace with real distance/time label bound to restaurant data
  distanceLabel: string;
}

export function FouxPrcolorTest({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceLabel,
}: FouxPrcolorTestProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxPrcolorTestHero
        name={restaurant.name}
        image={restaurant.image}
        rating={restaurant.rating}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
        ratingCount={ratingCount}
      />
      <FouxPrcolorTestBody
        name={restaurant.name}
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        description={restaurant.description}
        onViewMenuClick={handleViewMenuClick}
        distanceLabel={distanceLabel}
      />
    </div>
  );
}
