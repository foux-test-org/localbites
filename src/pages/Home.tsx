import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxTestMultiD } from "../components/FouxTestMultiD/FouxTestMultiD";

interface HomeProps {
  isFavorite: (id: string) => boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  onToast: (message: string) => void;
}

const categories = [
  { name: 'Italian', emoji: '🍝' },
  { name: 'Mexican', emoji: '🌮' },
  { name: 'Thai', emoji: '🍜' },
  { name: 'BBQ', emoji: '🍖' },
  { name: 'Sushi', emoji: '🍣' },
  { name: 'Vegan', emoji: '🥗' },
];

export function Home({ isFavorite, onFavorite, onViewMenu, onToast }: HomeProps): React.ReactNode {
    // FOUX_TODO: replace with the real review count data — number of reviews for each featured restaurant
    const placeholderReviewCount = 214;

    // FOUX_TODO: replace with real open/closed status — boolean indicating whether the restaurant is currently open
    const placeholderIsOpen = true;

    // FOUX_TODO: replace with real open status label — string shown next to the green dot (e.g. "Open now")
    const placeholderOpenLabel = 'Open now';

    // FOUX_TODO: replace with real distance and travel time — string shown in the bottom row (e.g. "12 min · 0.4 mi")
    const placeholderDistanceLabel = '12 min · 0.4 mi';
  const navigate = useNavigate();
  const featured = restaurants.slice(0, 5);

  function handleCategoryClick(category: string): void {
    navigate(`/restaurants?cuisine=${encodeURIComponent(category)}`);
  }

  function handleSubscribe(message: string): void {
    onToast(message);
  }

  return (
    <div>
      <Hero />

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Restaurants</h2>
          <div className={styles.featuredRow}>
            {featured.map((restaurant) => (
              <div key={restaurant.id} className={styles.featuredCard}>
                <FouxTestMultiD
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      reviewCount={placeholderReviewCount}
                                      isOpen={placeholderIsOpen}
                                      openLabel={placeholderOpenLabel}
                                      distanceLabel={placeholderDistanceLabel}
                                    />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Browse by Category</h2>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <CategoryTile
                key={cat.name}
                name={cat.name}
                emoji={cat.emoji}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter onSubscribe={handleSubscribe} />
    </div>
  );
}
