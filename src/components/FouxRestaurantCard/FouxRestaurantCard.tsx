import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxRestaurantCard.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxRestaurantCardHero — hero image section with initial, rating badge, favourite button, status badge
// ---------------------------------------------------------------------------

interface FouxRestaurantCardHeroProps {
  image: string;
  initial: string;
  rating: number;
  ratingCount: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

function FouxRestaurantCardHero({
  image,
  initial,
  rating,
  ratingCount,
  isFavorite,
  onFavoriteClick,
}: FouxRestaurantCardHeroProps): React.ReactNode {
  return (
    <div
      className={styles.heroImage}
      style={{ ['--foux-item-color' as string]: image }}
    >
      <span className={styles.restaurantInitial}>{initial}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingScore}>{rating}</span>
        <span className={styles.ratingCount}>{ratingCount}</span>
      </div>

      <button
        aria-label="Add to favourites"
        className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
        onClick={onFavoriteClick}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {/* FOUX_TODO: replace static "Open now" with open/closed status resolved from live hours data */}
      <div className={styles.statusBadge}>
        <span className={styles.statusDot}>●</span>
        <span className={styles.statusText}>Open now</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxRestaurantCardContent — content area with category, name, description, divider, bottom row
// ---------------------------------------------------------------------------

interface FouxRestaurantCardContentProps {
  cuisine: string;
  priceRange: string;
  name: string;
  description: string;
  distanceInfo: string;
  onViewMenuClick: () => void;
}

function FouxRestaurantCardContent({
  cuisine,
  priceRange,
  name,
  description,
  distanceInfo,
  onViewMenuClick,
}: FouxRestaurantCardContentProps): React.ReactNode {
  return (
    <div className={styles.contentArea}>
      <span className={styles.categoryLabel}>
        {cuisine} · {priceRange}
      </span>
      <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <hr className={styles.divider} />
      <div className={styles.bottomRow}>
        {/* FOUX_TODO: replace static distance info with rating count and distance fetched from backend */}
        <span className={styles.distanceInfo}>{distanceInfo}</span>
        <button
          className={`${originalStyles.menuButton} ${styles.viewMenuButton}`}
          onClick={onViewMenuClick}
        >
          View Menu
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxRestaurantCard — redesigned restaurant card with gradient hero, badges, and bottom row
// ---------------------------------------------------------------------------

interface FouxRestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
}

export function FouxRestaurantCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
}: FouxRestaurantCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxRestaurantCardHero
        image={restaurant.image}
        initial={restaurant.name[0]}
        rating={restaurant.rating}
        ratingCount={ratingCount}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
      />
      <FouxRestaurantCardContent
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        name={restaurant.name}
        description={restaurant.description}
        distanceInfo={distanceInfo}
        onViewMenuClick={handleViewMenuClick}
      />
    </div>
  );
}
