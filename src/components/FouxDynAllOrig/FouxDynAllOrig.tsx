import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxDynAllOrig.module.css';
import origStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxDynAllOrigCard — inner card component rendering a single restaurant entry
// ---------------------------------------------------------------------------

interface FouxDynAllOrigCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCount: string;
  distanceInfo: string;
}

function FouxDynAllOrigCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceInfo,
}: FouxDynAllOrigCardProps): React.ReactNode {
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

        <div className={styles.ratingBadge}>
          <span className={styles.ratingStar}>★</span>
          <span className={styles.ratingScore}>{restaurant.rating}</span>
          <span className={styles.ratingCount}>{ratingCount}</span>
        </div>

        <button
          aria-label="Add to favourites"
          className={`${origStyles.heartButton} ${styles.favoriteButton} ${isFavorite ? origStyles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span className={styles.statusText}>Open now</span>
        </div>
      </div>

      <div className={styles.contentArea}>
        <span className={styles.categoryLabel}>
          {restaurant.cuisine} · {restaurant.priceRange}
        </span>
        <h3 className={`${origStyles.name} ${styles.restaurantName}`}>
          {restaurant.name}
        </h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footerRow}>
          <span className={styles.distanceInfo}>{distanceInfo}</span>
          <button
            className={`${origStyles.menuButton} ${styles.ctaButton}`}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDynAllOrig — main export; maps a list of restaurants to FouxDynAllOrigCard
// ---------------------------------------------------------------------------

// FOUX_TODO: replace with the real restaurant list type if it changes shape
export interface FouxDynAllOrigProps {
  restaurants: Restaurant[];
  isFavorite: (id: string) => boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  ratingCounts: string[];
  distanceInfos: string[];
}

export function FouxDynAllOrig({
  restaurants,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCounts,
  distanceInfos,
}: FouxDynAllOrigProps): React.ReactNode {
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <FouxDynAllOrigCard
          key={restaurant.id}
          restaurant={restaurant}
          isFavorite={isFavorite(restaurant.id)}
          onFavorite={onFavorite}
          onViewMenu={onViewMenu}
          ratingCount={ratingCounts[index % ratingCounts.length]}
          distanceInfo={distanceInfos[index % distanceInfos.length]}
        />
      ))}
    </>
  );
}
