import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxTabsAfterGraph } from "../components/FouxTabsAfterGraph/FouxTabsAfterGraph";

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
    // FOUX_TODO: replace with the real tab list — id, label, title, description, summary, and startsSelected for the default tab
    const fouxTabsAfterGraphTabs = [
      {
        id: 'overview',
        label: 'Overview',
        title: 'Overview',
        description: 'View your key metrics and recent project activity. Track progress across all your active projects.',
        summary: 'You have 12 active projects and 3 pending tasks.',
        startsSelected: true,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        title: 'Analytics',
        description: 'View your key metrics and recent project activity. Track progress across all your active projects.',
        summary: 'You have 12 active projects and 3 pending tasks.',
      },
      {
        id: 'reports',
        label: 'Reports',
        title: 'Reports',
        description: 'View your key metrics and recent project activity. Track progress across all your active projects.',
        summary: 'You have 12 active projects and 3 pending tasks.',
      },
      {
        id: 'settings',
        label: 'Settings',
        title: 'Settings',
        description: 'View your key metrics and recent project activity. Track progress across all your active projects.',
        summary: 'You have 12 active projects and 3 pending tasks.',
      },
    ];
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
      <FouxTabsAfterGraph tabs={fouxTabsAfterGraphTabs} />

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Restaurants</h2>
          <div className={styles.featuredRow}>
            {featured.map((restaurant) => (
              <div key={restaurant.id} className={styles.featuredCard}>
                <RestaurantCard
                  restaurant={restaurant}
                  isFavorite={isFavorite(restaurant.id)}
                  onFavorite={onFavorite}
                  onViewMenu={onViewMenu}
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
