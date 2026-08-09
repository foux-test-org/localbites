import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxOptTestStaticSingle.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxOptTestStaticSingleHero — hero panel with gradient background, logo initial, rating badge, favourite button, and status badge
// ---------------------------------------------------------------------------

interface FouxOptTestStaticSingleHeroProps {
  initial: string;
  rating: number;
  reviewCount: number;
  statusText: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
  itemColor: string;
}

function FouxOptTestStaticSingleHero({
  initial,
  rating,
  reviewCount,
  statusText,
  isFavorite,
  onFavoriteClick,
  itemColor,
}: FouxOptTestStaticSingleHeroProps): React.ReactNode {
  return (
    <div
      className={styles.hero}
      style={{ ['--foux-item-color' as string]: itemColor }}
    >
      <span className={styles.logo}>{initial}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingScore}>{rating}</span>
        <span className={styles.ratingCount}>({reviewCount})</span>
      </div>

      <button
        aria-label="Add to favourites"
        className={`${originalStyles.heartButton} ${styles.favorite} ${isFavorite ? originalStyles.favorited : ''}`}
        onClick={onFavoriteClick}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {/* FOUX_TODO: replace static status badge with open/closed status driven by live hours data */}
      <div className={styles.statusBadge}>
        <span className={styles.statusDot} />
        <span className={styles.statusText}>{statusText}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxOptTestStaticSingleBody — body panel with category, name, description, divider, distance, and View Menu CTA
// ---------------------------------------------------------------------------

interface FouxOptTestStaticSingleBodyProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distance: string;
  onViewMenuClick: () => void;
}

function FouxOptTestStaticSingleBody({
  cuisine,
  priceRange,
  name,
  description,
  distance,
  onViewMenuClick,
}: FouxOptTestStaticSingleBodyProps): React.ReactNode {
  const categoryLabel = `${cuisine.toUpperCase()} · ${priceRange}`;

  return (
    <div className={styles.body}>
      <span className={styles.category}>{categoryLabel}</span>
      <h3 className={`${originalStyles.name} ${styles.name}`}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.footer}>
        {/* FOUX_TODO: replace static distance with real distance and estimated time driven by user location */}
        <span className={styles.distance}>{distance}</span>
        <button
          className={`${originalStyles.menuButton} ${styles.cta}`}
          onClick={onViewMenuClick}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxOptTestStaticSingle — redesigned restaurant card composing hero and body panels
// ---------------------------------------------------------------------------

interface FouxOptTestStaticSingleProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  reviewCount: number;
  statusText: string;
  distance: string;
}

export function FouxOptTestStaticSingle({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  reviewCount,
  statusText,
  distance,
}: FouxOptTestStaticSingleProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxOptTestStaticSingleHero
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        reviewCount={reviewCount}
        statusText={statusText}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
        itemColor={restaurant.image}
      />
      <FouxOptTestStaticSingleBody
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        name={restaurant.name}
        description={restaurant.description}
        distance={distance}
        onViewMenuClick={handleViewMenuClick}
      />
    </div>
  );
}
