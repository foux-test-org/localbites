import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDemoT.module.css';

// ---------------------------------------------------------------------------
// FouxDemoTHero — hero image area with initial, rating badge, heart, open-now badge
// ---------------------------------------------------------------------------

interface FouxDemoTHeroProps {
  initial: string;
  heroBackground: string;
  rating: number;
  ratingCount: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  isOpenNow: boolean;
  openNowLabel: string;
}

function FouxDemoTHero({
  initial,
  heroBackground,
  rating,
  ratingCount,
  isFavorite,
  onFavoriteClick,
  isOpenNow,
  openNowLabel,
}: FouxDemoTHeroProps): React.ReactNode {
  return (
    <div
      className={styles.hero}
      style={{ background: heroBackground }}
    >
      <span className={styles.initial}>{initial}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingNumber}>{rating}</span>
        <span className={styles.ratingCount}>{ratingCount}</span>
      </div>

      <button
        type="button"
        aria-label="Add to favourites"
        className={`${styles.heart} ${isFavorite ? styles.isSelected : ''}`}
        onClick={onFavoriteClick}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {isOpenNow && (
        <div className={styles.openNowBadge}>
          <span className={styles.openNowDot}>●</span>
          <span className={styles.openNowText}>{openNowLabel}</span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoTBody — card body with cuisine label, name, description, divider, bottom bar
// ---------------------------------------------------------------------------

interface FouxDemoTBodyProps {
  cuisineLabel: string;
  restaurantName: string;
  description: string;
  distanceInfo: string;
  onViewMenuClick: () => void;
}

function FouxDemoTBody({
  cuisineLabel,
  restaurantName,
  description,
  distanceInfo,
  onViewMenuClick,
}: FouxDemoTBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <span className={styles.cuisineLabel}>{cuisineLabel}</span>
      <h3 className={styles.restaurantName}>{restaurantName}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.bottomBar}>
        <span className={styles.distanceInfo}>{distanceInfo}</span>
        <button
          type="button"
          aria-label="View Menu"
          className={styles.viewMenu}
          onClick={onViewMenuClick}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDemoT — new restaurant card design with hero initial, badges, and bottom bar
// ---------------------------------------------------------------------------

// FOUX_TODO: replace with the real open-now / distance data shape — { isOpenNow: boolean, openNowLabel: string, ratingCount: string, distanceInfo: string }
export interface FouxDemoTCardMeta {
  isOpenNow: boolean;
  openNowLabel: string;
  ratingCount: string;
  distanceInfo: string;
}

export interface FouxDemoTProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  cardMeta: FouxDemoTCardMeta;
}

export function FouxDemoT({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  cardMeta,
}: FouxDemoTProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  const cuisineLabel = `${restaurant.cuisine} · ${restaurant.priceRange}`;

  return (
    <div className={styles.container}>
      <FouxDemoTHero
        initial={restaurant.name[0]}
        heroBackground={restaurant.image}
        rating={restaurant.rating}
        ratingCount={cardMeta.ratingCount}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
        isOpenNow={cardMeta.isOpenNow}
        openNowLabel={cardMeta.openNowLabel}
      />
      <FouxDemoTBody
        cuisineLabel={cuisineLabel}
        restaurantName={restaurant.name}
        description={restaurant.description}
        distanceInfo={cardMeta.distanceInfo}
        onViewMenuClick={handleViewMenuClick}
      />
    </div>
  );
}
