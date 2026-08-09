import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxCheckHeartOutlineParity } from "../components/FouxCheckHeartOutlineParity/FouxCheckHeartOutlineParity";

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
    // FOUX_TODO: replace with the real per-restaurant distance, rating count, and open status — fields: distanceInfo (string), ratingCount (string), isOpenNow (boolean), keyed by restaurant.id
    const featuredCardMeta: Record<string, { distanceInfo: string; ratingCount: string; isOpenNow: boolean }> = {
      [restaurants[0]?.id ?? '0']: { distanceInfo: '12 min · 0.4 mi', ratingCount: '(214)', isOpenNow: true },
      [restaurants[1]?.id ?? '1']: { distanceInfo: '8 min · 0.3 mi', ratingCount: '(189)', isOpenNow: true },
      [restaurants[2]?.id ?? '2']: { distanceInfo: '15 min · 0.7 mi', ratingCount: '(302)', isOpenNow: false },
      [restaurants[3]?.id ?? '3']: { distanceInfo: '20 min · 1.1 mi', ratingCount: '(97)', isOpenNow: true },
      [restaurants[4]?.id ?? '4']: { distanceInfo: '5 min · 0.2 mi', ratingCount: '(451)', isOpenNow: true },
    };
    // FOUX_TODO: end
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
                <FouxCheckHeartOutlineParity
                                      restaurant={restaurant}
                                      isFavorite={isFavorite(restaurant.id)}
                                      onFavorite={onFavorite}
                                      onViewMenu={onViewMenu}
                                      distanceInfo={featuredCardMeta[restaurant.id]?.distanceInfo ?? ''}
                                      ratingCount={featuredCardMeta[restaurant.id]?.ratingCount ?? ''}
                                      isOpenNow={featuredCardMeta[restaurant.id]?.isOpenNow ?? false}
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
