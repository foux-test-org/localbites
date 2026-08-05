import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxAccRefactor } from "./FouxAccRefactor";

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
    // FOUX_TODO: replace with the real accordion heading text
    const fouxAccHeading = 'Featured Restaurants';

    // FOUX_TODO: replace with the real accordion sections — id, title, body, bordered, startsOpen, and optional actions array (each action: id, label, variant, onPress)
    const fouxAccSections = [
      {
        id: 'section-1',
        title: 'Accordion 1',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        bordered: false,
        startsOpen: false,
      },
      {
        id: 'section-2',
        title: 'Accordion 2',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        bordered: true,
        startsOpen: true,
      },
      {
        id: 'section-3',
        title: 'Accordion Actions',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
        bordered: true,
        startsOpen: true,
        actions: [
          { id: 'cancel', label: 'Cancel', variant: 'cancel', onPress: () => {} },
          { id: 'agree', label: 'Agree', variant: 'agree', onPress: handleAgree },
        ],
      },
    ];
    // FOUX_TODO: end
    // FOUX_TODO: wire up what the Agree button should do when clicked — it closes the panel and sends an update to the server
    const handleAgree = useCallback(() => {}, []);
  const navigate = useNavigate();

  // FOUX_TODO: possibly unused after this change
  const featured = restaurants.slice(0, 5);
  // FOUX_TODO: end

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
        <FouxAccRefactor
                        heading={fouxAccHeading}
                        sections={fouxAccSections}
                        onAgree={handleAgree}
                      />
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
