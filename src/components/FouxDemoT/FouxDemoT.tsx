import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// FouxDemoTHero — hero section with initial, rating badge, heart, and open-now badge
// ---------------------------------------------------------------------------

interface FouxDemoTHeroProps {
  name: string;
  image: string;
  rating: number;
  ratingCount: number;
  isFavorite: boolean;
  onFavorite: () => void;
  isOpenNow: boolean;
  openNowLabel: string;
}

function FouxDemoTHero({
  name,
  image,
  rating,
  ratingCount,
  isFavorite,
  onFavorite,
  isOpenNow,
  openNowLabel,
}: FouxDemoTHeroProps): React.ReactNode {
  return (
    <div
      className={styles.hero}
      style={{ background: image }}
    >
      <span className={styles.initial}>{name[0]}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingScore}>{rating}</span>
        <span className={styles.ratingCount}>({ratingCount})</span>
      </div>

      <div className={styles.heartWrap}>
        <button
          type="button"
          aria-label="Add to favorites"
          className={`${styles.heart} ${isFavorite ? styles.isFavorited : ''}`}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      {isOpenNow && (
        <div className={styles.openNowBadge}>
          <span className={styles.openDot}>●</span>
          <span className={styles.openText}>{openNowLabel}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTBody — body section with category, name, description, separator, and footer
// ---------------------------------------------------------------------------

interface FouxDemoTBodyProps {
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  distance: string;
  onViewMenu: () => void;
}

function FouxDemoTBody({
  name,
  cuisine,
  priceRange,
  description,
  distance,
  onViewMenu,
}: FouxDemoTBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.category}>
        {cuisine} · <span className={styles.distance}>{priceRange}</span>
      </span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.separator} />
      <div className={styles.footer}>
        <span className={styles.distance}>{distance}</span>
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
// FouxDemoT — redesigned restaurant card (main export)
// ---------------------------------------------------------------------------

// FOUX_TODO: replace with the real restaurant extra metadata — ratingCount, isOpenNow, openNowLabel, distance
export interface FouxDemoTRestaurantMeta {
  ratingCount: number;
  isOpenNow: boolean;
  openNowLabel: string;
  distance: string;
}
// FOUX_TODO: end

export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** Extra display metadata not present on the original Restaurant type */
  meta: FouxDemoTRestaurantMeta;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  meta,
}: FouxDemoTProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxDemoTHero
        name={restaurant.name}
        image={restaurant.image}
        rating={restaurant.rating}
        ratingCount={meta.ratingCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        isOpenNow={meta.isOpenNow}
        openNowLabel={meta.openNowLabel}
      />
      <FouxDemoTBody
        name={restaurant.name}
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        description={restaurant.description}
        distance={meta.distance}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
