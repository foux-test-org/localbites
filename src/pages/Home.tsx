import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
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
    // FOUX_TODO: replace with the real tab and panel data — id, label, panelTitle, panelDescription, panelSummary, startsSelected
    const fouxTabsTestTabs = [
      {
        id: 'overview',
        label: 'Overview',
        panelTitle: 'Overview',
        panelDescription: 'View your key metrics and recent project activity. Track progress across all your active projects.',
        panelSummary: 'You have 12 active projects and 3 pending tasks.',
        startsSelected: true,
      },
      {
        id: 'analytics',
        label: 'Analytics',
        panelTitle: 'Analytics',
        panelDescription: 'Explore detailed analytics and performance data for your projects.',
        panelSummary: 'You have 5 reports generated this week.',
      },
      {
        id: 'reports',
        label: 'Reports',
        panelTitle: 'Reports',
        panelDescription: 'Access and download your project reports and summaries.',
        panelSummary: 'You have 3 new reports available.',
      },
      {
        id: 'settings',
        label: 'Settings',
        panelTitle: 'Settings',
        panelDescription: 'Manage your account preferences and project configurations.',
        panelSummary: '2 settings require your attention.',
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
