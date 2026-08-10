import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxValueIndexFixTest } from "../components/FouxValueIndexFixTest/FouxValueIndexFixTest";

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
    // FOUX_TODO: replace with the real review count labels per featured restaurant
    const fouxCounts = ["(214)", "(229)", "(178)", "(257)", "(205)", "(154)", "(233)", "(182)"];

    // FOUX_TODO: replace with the real distance/time labels per featured restaurant
    const fouxDistances = ["12 min · 0.4 mi", "13 min · 0.4 mi", "10 min · 0.3 mi", "14 min · 0.5 mi", "12 min · 0.4 mi", "9 min · 0.3 mi", "13 min · 0.4 mi", "10 min · 0.3 mi"];

    // FOUX_TODO: add FouxValueIndexFixTest to the import list alongside RestaurantCard
    // import { FouxValueIndexFixTest } from '../components/FouxValueIndexFixTest/FouxValueIndexFixTest';
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
            {featured.map((restaurant, index) => (
              <div key={restaurant.id} className={styles.featuredCard}>
                <FouxValueIndexFixTest
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      count={fouxCounts[index % fouxCounts.length]}
                                      distance={fouxDistances[index % fouxDistances.length]}
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
