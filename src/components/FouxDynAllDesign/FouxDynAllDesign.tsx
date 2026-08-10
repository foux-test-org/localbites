import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDynAllDesign.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxDynAllDesignCard — child card component rendering the new restaurant card design
// ---------------------------------------------------------------------------

interface FouxDynAllDesignCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingScore: string;
  ratingCount: string;
  distanceInfo: string;
}

function FouxDynAllDesignCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingScore,
  ratingCount,
  distanceInfo,
}: FouxDynAllDesignCardProps): React.ReactNode {
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

        <div
          className={styles.ratingBadge}
          aria-label={`Rating: ${ratingScore} out of 5, ${ratingCount.replace(/[()]/g, '')} reviews`}
        >
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{ratingScore}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        <button
          className={`${originalStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? originalStyles.favorited : ''}`}
          aria-label="Add to favourites"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <div
          className={styles.statusBadge}
          aria-label="Status: Open now"
        >
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>Open now</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine.toUpperCase()} · {restaurant.priceRange}
        </span>
        <h3 className={`${originalStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} role="separator" />
        <div className={styles.bottomRow}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${originalStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            View Menu →
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDynAllDesign — main exported component, renders a single restaurant card
// ---------------------------------------------------------------------------

// FOUX_TODO: replace with the real component if FouxDynAllDesignCard needs to be reused elsewhere
export interface FouxDynAllDesignProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingScore: string;
  ratingCount: string;
  distanceInfo: string;
}

export function FouxDynAllDesign(props: FouxDynAllDesignProps): React.ReactNode {
  return <FouxDynAllDesignCard {...props} />;
}
