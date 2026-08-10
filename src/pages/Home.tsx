import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxRestaurantCard } from "../components/FouxRestaurantCard/FouxRestaurantCard";

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
    // FOUX_TODO: replace with the real rating count values per restaurant card
    const fouxRatingCounts = ["(214)", "(229)", "(178)", "(257)", "(205)", "(154)", "(233)", "(182)"];

    // FOUX_TODO: replace with the real distance info values per restaurant card
    const fouxDistanceInfos = ["12 min · 0.4 mi", "13 min · 0.4 mi", "10 min · 0.3 mi", "14 min · 0.5 mi", "12 min · 0.4 mi", "9 min · 0.3 mi", "13 min · 0.4 mi", "10 min · 0.3 mi"];

    // FOUX_TODO: replace with the real open/closed status text for each restaurant card
    const fouxStatusText = "Open now";
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
                <FouxRestaurantCard
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      ratingCount={fouxRatingCounts[index % fouxRatingCounts.length]}
                                      distanceInfo={fouxDistanceInfos[index % fouxDistanceInfos.length]}
                                      statusText={fouxStatusText}
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
