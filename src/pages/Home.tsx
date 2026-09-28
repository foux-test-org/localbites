import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxDac2 } from "../components/FouxDac2/FouxDac2";

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
    const fouxDac2MenuLabel = 'Menu';

    // FOUX_TODO: replace with the real accordion sections — each entry needs id, title, body (ReactNode), optional startsOpen, and optional actions array (each action: id, label, onPress)
    const fouxDac2Sections: import('../components/FouxDac2/FouxDac2').AccordionSection[] = [
      {
        id: 'section-1',
        title: 'Section 1',
        body: <p>Section 1 content</p>,
        startsOpen: false,
      },
      {
        id: 'section-2',
        title: 'Section 2',
        body: <p>Section 2 content</p>,
        startsOpen: false,
      },
      {
        id: 'actions',
        title: 'Actions',
        body: null,
        startsOpen: false,
        actions: [
          {
            id: 'submit-action',
            label: 'Submit Action',

            // FOUX_TODO: wire up what the Submit Action button should do when clicked — close its panel and send data to the server
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
      <FouxDac2 menuLabel={fouxDac2MenuLabel} sections={fouxDac2Sections} />

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
