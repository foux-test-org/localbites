import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxDaopen } from "../components/FouxDaopen/FouxDaopen";

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
    // FOUX_TODO: replace with the real trigger label for the dropdown menu
    const fouxDaopenTriggerLabel = 'Menu';

    // FOUX_TODO: replace with the real accordion sections — each needs id, title, bodyText, startsOpen, and optional actions array (each action: id, label, variant 'cancel'|'agree', onPress handler)
    const fouxDaopenSections: import('../components/FouxDaopen/FouxDaopen').AccordionSectionItem[] = [
      {
        id: 'section-1',
        title: 'Section 1',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        startsOpen: false,
      },
      {
        id: 'section-2',
        title: 'Section 2',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        startsOpen: true,
      },
      {
        id: 'section-actions',
        title: 'Actions',
        bodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        startsOpen: true,
        actions: [
          {
            id: 'cancel',
            label: 'CANCEL',
            variant: 'cancel',
            onPress: () => {},
          },
          {
            id: 'agree',
            label: 'AGREE',
            variant: 'agree',

            // FOUX_TODO: wire up what the Agree button should do when clicked — close the panel and send an action
            onPress: () => {},
          },
        ],
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
      <FouxDaopen triggerLabel={fouxDaopenTriggerLabel} sections={fouxDaopenSections} />

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
