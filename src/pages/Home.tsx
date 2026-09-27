import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxClosedDatest } from "../components/FouxClosedDatest/FouxClosedDatest";

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
    // FOUX_TODO: replace with the real menu trigger label
    const fouxMenuLabel = 'Menu';

    // FOUX_TODO: replace with the real collapsible panel list — each entry needs id, title, body, startsOpen, and optional actions array (each action: id, label, variant 'agree'|'cancel', onPress)
    const fouxSections = [
      { id: 'section-1', title: 'Section 1', body: 'Section 1 content', startsOpen: false },
      { id: 'section-2', title: 'Section 2', body: 'Section 2 content', startsOpen: false },
      {
        id: 'actions',
        title: 'Actions',
        body: '',
        startsOpen: false,
        actions: [
          { id: 'agree', label: 'Agree', variant: 'agree' as const, onPress: () => {} },
          { id: 'cancel', label: 'Cancel', variant: 'cancel' as const, onPress: () => {} },
        ],
      },
    ];
    // FOUX_TODO: end
    // FOUX_TODO: wire up what the Agree button should do when clicked — send data to server
    const handleAgree = useCallback(() => {}, []);
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
      <FouxClosedDatest menuLabel={fouxMenuLabel} sections={fouxSections} onAgree={handleAgree} />

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
