import React from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { Hero } from '../components/Hero/Hero';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import { CategoryTile } from '../components/CategoryTile/CategoryTile';
import { Newsletter } from '../components/Newsletter/Newsletter';
import styles from './Home.module.css';
import { FouxDropAccCallbacks } from "../components/FouxDropAccCallbacks/FouxDropAccCallbacks";

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
    const fouxMenuLabel = "Menu";

    // FOUX_TODO: replace with the real accordion sections — each needs id, title, body, and optional controls array (each control needs id, label, ariaLabel, and optional onPress)
    const fouxSections = [
      {
        id: "section-1",
        title: "Section 1",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: "section-2",
        title: "Section 2",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      {
        id: "section-actions",
        title: "Actions",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        controls: [
          {
            id: "cancel",
            label: "CANCEL",
            ariaLabel: "Cancel",
            onPress: undefined,
          },
          {
            id: "agree",
            label: "AGREE",
            ariaLabel: "Agree",
            onPress: undefined,
          },
        ],
      },
    ];
    // FOUX_TODO: end
    // FOUX_TODO: wire up what the menu trigger should do when clicked — shows/hides the group
    const handleMenuTrigger = useCallback(() => {}, []);
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
      <FouxDropAccCallbacks menuLabel={fouxMenuLabel} sections={fouxSections} onMenuTrigger={handleMenuTrigger} />

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
