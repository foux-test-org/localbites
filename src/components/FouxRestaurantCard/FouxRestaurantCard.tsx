import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxRestaurantCard.module.css';
import originalStyles from '../RestaurantCard/RestaurantCard.module.css';

// ---------------------------------------------------------------------------
// FouxRestaurantCardMedia — gradient media area with rating pill, heart, monogram, status pill
// ---------------------------------------------------------------------------

interface FouxRestaurantCardMediaProps {
  image: string;
  name: string;
  rating: number;
  count: string;
  isFavorite: boolean;
  onFavorite: () => void;
}

function FouxRestaurantCardMedia({
  image,
  name,
  rating,
  count,
  isFavorite,
  onFavorite,
}: FouxRestaurantCardMediaProps): React.ReactNode {
  return (
    <div
      className={styles.media}
      style={{ ['--foux-item-color' as string]: image }}
    >
      <div className={styles.topRow}>
        <div className={styles.ratingPill}>
          <span className={styles.star}>★</span>
          <span className={styles.value}>{rating}</span>
          <span className={styles.count}>{count}</span>
        </div>
        <button
          aria-label="Add to favourites"
          className={`${styles.heartButton} ${originalStyles.heartButton} ${isFavorite ? originalStyles.favorited : ''}`}
          onClick={onFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <span className={styles.monogram}>{name[0]}</span>
      <div className={styles.statusPill}>
        <span className={styles.dot}></span>
        <span className={styles.labelOpen}>Open now</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxRestaurantCardBody — text block, divider, footer with distance and CTA
// ---------------------------------------------------------------------------

interface FouxRestaurantCardBodyProps {
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  distance: string;
  onViewMenu: () => void;
}

function FouxRestaurantCardBody({
  name,
  cuisine,
  priceRange,
  description,
  distance,
  onViewMenu,
}: FouxRestaurantCardBodyProps): React.ReactNode {
  return (
    <div className={styles.body}>
      <div className={styles.textBlock}>
        <span className={styles.meta}>{cuisine} · {priceRange}</span>
        <h3 className={`${styles.name} ${originalStyles.name}`}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <span className={styles.distance}>{distance}</span>
        <div className={styles.cta}>
          <button
            aria-label="View Menu"
            className={`${styles.ctaButton} ${originalStyles.menuButton}`}
            onClick={onViewMenu}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxRestaurantCard — new restaurant card design with gradient media and footer
// ---------------------------------------------------------------------------

interface FouxRestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  count: string;
  distance: string;
}

export function FouxRestaurantCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  count,
  distance,
}: FouxRestaurantCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxRestaurantCardMedia
        image={restaurant.image}
        name={restaurant.name}
        rating={restaurant.rating}
        count={count}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
      />
      <FouxRestaurantCardBody
        name={restaurant.name}
        cuisine={restaurant.cuisine}
        priceRange={restaurant.priceRange}
        description={restaurant.description}
        distance={distance}
        onViewMenu={handleViewMenuClick}
      />
    </div>
  );
}
