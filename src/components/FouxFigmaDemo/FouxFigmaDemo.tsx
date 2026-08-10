import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxFigmaDemo.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxFigmaDemoCard — single card child component rendering one restaurant item
// ---------------------------------------------------------------------------

interface FouxFigmaDemoCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  count: string;
  distance: string;
}

function FouxFigmaDemoCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  count,
  distance,
}: FouxFigmaDemoCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.media}
        style={{ ['--foux-item-color' as string]: restaurant.image }}
      >
        <div className={styles.topRow}>
          <div className={styles.ratingPill}>
            <span className={styles.star}>★</span>
            <span className={styles.value}>{restaurant.rating}</span>
            <span className={styles.count}>{count}</span>
          </div>
          <button
            aria-label="Add to favourites"
            className={`${styles.heartButton} ${originalStyles.heartButton} ${isFavorite ? originalStyles.favorited : ''}`}
            onClick={handleFavoriteClick}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
        <span className={styles.monogram}>{restaurant.name[0]}</span>
        <div className={styles.statusPill}>
          <div className={styles.dot}></div>
          <span className={styles.label}>Open now</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.textBlock}>
          <span className={styles.meta}>{restaurant.cuisine} · {restaurant.priceRange}</span>
          <h3 className={`${styles.name} ${originalStyles.name}`}>{restaurant.name}</h3>
          <p className={styles.description}>{restaurant.description}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.footer}>
          <span className={styles.distance}>{distance}</span>
          <button
            aria-label="View Menu"
            className={`${styles.cta} ${originalStyles.menuButton}`}
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
// FouxFigmaDemo — main exported component; renders a FouxFigmaDemoCard
// ---------------------------------------------------------------------------

export interface FouxFigmaDemoProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  count: string;
  distance: string;
}

export function FouxFigmaDemo({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  count,
  distance,
}: FouxFigmaDemoProps): React.ReactNode {
  return (
    <FouxFigmaDemoCard
      restaurant={restaurant}
      isFavorite={isFavorite}
      onFavorite={onFavorite}
      onViewMenu={onViewMenu}
      count={count}
      distance={distance}
    />
  );
}
