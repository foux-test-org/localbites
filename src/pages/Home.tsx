import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxOptimizeTestingStaticReplaceAll } from "../components/FouxOptimizeTestingStaticReplaceAll/FouxOptimizeTestingStaticReplaceAll";

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
    // FOUX_TODO: replace with the real rating numbers — one string per restaurant slot
    const optimizeTestingStaticReplaceAllRatingNumbers = ["4.8", "5.1", "4.0", "5.8", "4.6", "3.5", "5.2", "4.1"];

    // FOUX_TODO: replace with the real review counts — one string per restaurant slot
    const optimizeTestingStaticReplaceAllRatingCounts = ["(214)", "(229)", "(178)", "(257)", "(205)", "(154)", "(233)", "(182)"];

    // FOUX_TODO: replace with the real distance/time strings — one string per restaurant slot
    const optimizeTestingStaticReplaceAllDistances = ["12 min · 0.4 mi", "13 min · 0.4 mi", "10 min · 0.3 mi", "14 min · 0.5 mi", "12 min · 0.4 mi", "9 min · 0.3 mi", "13 min · 0.4 mi", "10 min · 0.3 mi"];
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
                <FouxOptimizeTestingStaticReplaceAll
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      ratingNumber={optimizeTestingStaticReplaceAllRatingNumbers[index % optimizeTestingStaticReplaceAllRatingNumbers.length]}
                                      ratingCount={optimizeTestingStaticReplaceAllRatingCounts[index % optimizeTestingStaticReplaceAllRatingCounts.length]}
                                      distance={optimizeTestingStaticReplaceAllDistances[index % optimizeTestingStaticReplaceAllDistances.length]}
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
