import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxRestaurantCard.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxRatingBadge — small pill in the hero image showing star + score + count
// ---------------------------------------------------------------------------

interface FouxRatingBadgeProps {
  rating: number;
  ratingCount: string;
}

function FouxRatingBadge({ rating, ratingCount }: FouxRatingBadgeProps): React.ReactNode {
  return (
    <div className={styles.ratingBadge} aria-label={`Rating: ${rating}`}>
      <span className={styles.ratingStar}>★</span>
      <span className={styles.ratingScore}>{rating}</span>
      <span className={styles.ratingCount}>{ratingCount}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxStatusBadge — pill in the hero image showing open/closed status
// ---------------------------------------------------------------------------

interface FouxStatusBadgeProps {
  statusText: string;
}

function FouxStatusBadge({ statusText }: FouxStatusBadgeProps): React.ReactNode {
  return (
    <div className={styles.statusBadge} aria-label={statusText}>
      <span className={styles.statusDot}></span>
      <span className={styles.statusText}>{statusText}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxRestaurantCard — new restaurant card design with gradient hero, badges, and distance row
// ---------------------------------------------------------------------------

interface FouxRestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
  statusText: string;
}

export function FouxRestaurantCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
  statusText,
}: FouxRestaurantCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.heroImage}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <span className={styles.logoLetter}>{restaurant.name[0]}</span>
        <FouxRatingBadge rating={restaurant.rating} ratingCount={ratingCount} />
        <button
          aria-label="Add to favourites"
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <FouxStatusBadge statusText={statusText} />
      </div>
      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>{restaurant.cuisine} · {restaurant.priceRange}</span>
        <h3 className={styles.restaurantName}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.bottomRow}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
