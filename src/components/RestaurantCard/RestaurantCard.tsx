import React from 'react';
import { Restaurant } from '../../data/restaurants';
import { StarRating } from '../StarRating/StarRating';
import styles from './RestaurantCard.module.css';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
}

export function RestaurantCard({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
}: RestaurantCardProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundColor: restaurant.image }}
      >
        <span className={styles.initial}>{restaurant.name[0]}</span>
        <button
          className={`${styles.heartButton} ${isFavorite ? styles.favorited : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.name}>{restaurant.name}</h3>
          <span className={styles.price}>{restaurant.priceRange}</span>
        </div>
        <span className={styles.cuisineBadge}>{restaurant.cuisine}</span>
        <StarRating rating={restaurant.rating} />
        <p className={styles.description}>{restaurant.description}</p>
        <button className={styles.menuButton} onClick={handleViewMenuClick}>
          View Menu
        </button>
      </div>
    </div>
  );
}
