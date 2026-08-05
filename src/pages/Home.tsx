import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxDropAccRefactored } from "../components/FouxDropAccRefactored/FouxDropAccRefactored";

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
    // FOUX_TODO: replace with the real dropdown label text
    const dropAccLabel = 'Menu';

    // FOUX_TODO: replace with the real accordion sections — each needs id, title, body (ReactNode), startsOpen, hasDivider, and optional actions array (each action: id, label, variant 'cancel'|'agree', onPress)
    const dropAccSections: import('../components/FouxDropAccRefactored/FouxDropAccRefactored').AccordionSection[] = [
      {
        id: 'section-1',
        title: 'Section 1',
        body: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
        startsOpen: false,
        hasDivider: true,
      },
      {
        id: 'section-2',
        title: 'Section 2',
        body: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
        startsOpen: true,
        hasDivider: true,
      },
      {
        id: 'section-actions',
        title: 'Actions',
        body: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
        startsOpen: true,
        hasDivider: false,
        actions: [
          { id: 'cancel', label: 'CANCEL', variant: 'cancel', onPress: () => {} },
          { id: 'agree', label: 'AGREE', variant: 'agree', onPress: () => {} },
        ],
      },
    ];
    // FOUX_TODO: end
    // FOUX_TODO: wire up what the Cancel button should do when clicked — closes the Actions panel and performs cancellation
    const handleDropAccCancel = useCallback(() => {}, []);

    // FOUX_TODO: wire up what the Agree button should do when clicked — closes the Actions panel and performs agreement/confirmation
    const handleDropAccAgree = useCallback(() => {}, []);
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
      <FouxDropAccRefactored label={dropAccLabel} sections={dropAccSections} onCancel={handleDropAccCancel} onAgree={handleDropAccAgree} />

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
