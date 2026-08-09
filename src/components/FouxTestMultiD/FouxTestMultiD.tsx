import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxTestMultiD.module.css';

// ---------------------------------------------------------------------------
// FouxTestMultiDHero — hero image area with initial, rating badge, heart, and open badge
// ---------------------------------------------------------------------------

interface FouxTestMultiDHeroProps {
  image: string;
  initial: string;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  isOpen: boolean;
  openLabel: string;
}

function FouxTestMultiDHero({
  image,
  initial,
  rating,
  reviewCount,
  isFavorite,
  onFavorite,
  isOpen,
  openLabel,
}: FouxTestMultiDHeroProps): React.ReactNode {
  return (
    <div className={styles.hero} style={{ background: image }}>
      <span className={styles.initial}>{initial}</span>

      <div className={styles.heroTop}>
        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingNumber}>{rating}</span>
          <span className={styles.ratingCount}>({reviewCount})</span>
        </div>
        <button
          type="button"
          aria-label="Save as favorite"
          className={`${styles.heart} ${isFavorite ? styles.isSelected : ''}`}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.heroBottom}>
        {isOpen && (
          <div className={styles.openBadge}>
            <span className={styles.greenDot}>●</span>
            <span className={styles.openText}>{openLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxTestMultiDBody — card body with category, name, description, divider, distance, and menu button
// ---------------------------------------------------------------------------

interface FouxTestMultiDBodyProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distanceLabel: string;
  onViewMenu: () => void;
}

function FouxTestMultiDBody({
  cuisine,
  priceRange,
  name,
  description,
  distanceLabel,
  onViewMenu,
}: FouxTestMultiDBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.category}>
        {cuisine.toUpperCase()} · {priceRange}
      </span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        <span className={styles.distance}>{distanceLabel}</span>
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
// FouxTestMultiD — redesigned restaurant card composing hero and body child patterns
// ---------------------------------------------------------------------------

// FOUX_TODO: REUSABLE — FouxTestMultiD could be extracted to a shared component library; leave here until a shared location is established

export interface FouxTestMultiDProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;

  // FOUX_TODO: replace with real review count data — number of reviews for this restaurant
  reviewCount: number;

  // FOUX_TODO: replace with real open/closed status — boolean indicating whether the restaurant is currently open
  isOpen: boolean;

  // FOUX_TODO: replace with real open status label — string shown next to the green dot (e.g. "Open now")
  openLabel: string;

  // FOUX_TODO: replace with real distance and travel time — string shown in the bottom row (e.g. "12 min · 0.4 mi")
  distanceLabel: string;
}

export function FouxTestMultiD({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  isOpen,
  openLabel,
  distanceLabel,
}: FouxTestMultiDProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxTestMultiDHero
        image={restaurant.image}
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        reviewCount={reviewCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        isOpen={isOpen}
        openLabel={openLabel}
      />
      <FouxTestMultiDBody
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        name={restaurant.name}
        description={restaurant.description}
        distanceLabel={distanceLabel}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
