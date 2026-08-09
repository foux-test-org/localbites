import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxPrcolorTest } from "../components/FouxPrcolorTest/FouxPrcolorTest";

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
    // FOUX_TODO: replace with the real rating counts bound to restaurant data — { [restaurantId: string]: number }
    const fouxRatingCounts: Record<string, number> = {
      '1': 214,
      '2': 98,
      '3': 312,
      '4': 57,
      '5': 183,
    };

    // FOUX_TODO: replace with the real distance/time labels bound to restaurant data — { [restaurantId: string]: string }
    const fouxDistanceLabels: Record<string, string> = {
      '1': '12 min · 0.4 mi',
      '2': '8 min · 0.2 mi',
      '3': '20 min · 1.1 mi',
      '4': '5 min · 0.1 mi',
      '5': '15 min · 0.7 mi',
    };
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
                <FouxPrcolorTest
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      ratingCount={fouxRatingCounts[restaurant.id] ?? 0}
                                      distanceLabel={fouxDistanceLabels[restaurant.id] ?? ''}
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
