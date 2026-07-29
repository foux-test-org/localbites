import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxTabsTest } from "../components/FouxTabsTest/FouxTabsTest";

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
    // FOUX_TODO: replace with real tab data
    const fouxTabsTestTabs: import('../components/FouxTabsTest/FouxTabsTest').FouxTabsTestTab[] = [
      {
        label: 'Overview',
        panelTitle: 'Overview',
        panelBodies: [
          'View your key metrics and recent project activity. Track progress across all your active projects.',
          'You have 12 active projects and 3 pending tasks.',
        ],
      },
      {
        label: 'Analytics',
        panelTitle: 'Analytics',
        panelBodies: [
          'Explore detailed analytics and performance data for your projects.',
          'Track trends, conversions, and engagement metrics in real time.',
        ],
      },
      {
        label: 'Reports',
        panelTitle: 'Reports',
        panelBodies: [
          'Generate and review comprehensive reports for your team.',
          'Export data and share insights with stakeholders.',
        ],
      },
      {
        label: 'Settings',
        panelTitle: 'Settings',
        panelBodies: [
          'Configure your workspace preferences and account settings.',
          'Manage integrations, notifications, and team permissions.',
        ],
      },
    ];
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
      <FouxTabsTest tabs={fouxTabsTestTabs} />

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
