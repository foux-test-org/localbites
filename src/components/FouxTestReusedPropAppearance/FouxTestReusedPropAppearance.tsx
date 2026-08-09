import React from 'react';
import { Restaurant } from '../../data/restaurants';
import styles from './FouxTestReusedPropAppearance.module.css';

// ---------------------------------------------------------------------------
// FouxTestReusedPropAppearanceHero — hero area with large letter, rating badge, heart, and open-now pill
// ---------------------------------------------------------------------------

interface FouxTestReusedPropAppearanceHeroProps {
  initial: string;
  heroBackground: string;
  rating: number;
  ratingCount: string;
  isFavorite: boolean;
  onFavorite: () => void;
  openNowLabel: string;
}

function FouxTestReusedPropAppearanceHero({
  initial,
  heroBackground,
  rating,
  ratingCount,
  isFavorite,
  onFavorite,
  openNowLabel,
}: FouxTestReusedPropAppearanceHeroProps): React.ReactNode {
  return (
    <div
      className={styles.hero}
      style={{ background: heroBackground }}
    >
      <span className={styles.heroLetter}>{initial}</span>

      <div className={styles.ratingBadge}>
        <span className={styles.ratingStar}>★</span>
        <span className={styles.ratingNumber}>{rating}</span>
        <span className={styles.ratingCount}>{ratingCount}</span>
      </div>

      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`${styles.heart} ${isFavorite ? styles.isSelected : ''}`}
        onClick={onFavorite}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      {/* FOUX_TODO: open/closed status indicator is driven by live hours data — replace openNowLabel with a real data-bound value and hide/show accordingly */}
      <div className={styles.openNow}>
        <span className={styles.greenDot} />
        <span className={styles.openNowText}>{openNowLabel}</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxTestReusedPropAppearance — redesigned restaurant card with hero, body, and footer
// ---------------------------------------------------------------------------

export interface FouxTestReusedPropAppearanceProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
  /** e.g. "(214)" — review count label shown next to the numeric rating */
  ratingCount: string;
  /** e.g. "12 min · 0.4 mi" — distance/time string shown in the footer */
  distanceLabel: string;
  /** e.g. "Open now" — open status label shown in the hero pill */
  openNowLabel: string;
}

export function FouxTestReusedPropAppearance({
  restaurant,
  isFavorite,
  onFavorite,
  onViewMenu,
  ratingCount,
  distanceLabel,
  openNowLabel,
}: FouxTestReusedPropAppearanceProps): React.ReactNode {
  function handleFavoriteClick(): void {
    onFavorite(restaurant.id);
  }

  function handleViewMenuClick(): void {
    onViewMenu(restaurant);
  }

  return (
    <div className={styles.container}>
      <FouxTestReusedPropAppearanceHero
        initial={restaurant.name[0]}
        heroBackground={restaurant.image}
        rating={restaurant.rating}
        ratingCount={ratingCount}
        isFavorite={isFavorite}
        onFavorite={handleFavoriteClick}
        openNowLabel={openNowLabel}
      />

      <div className={styles.body}>
        <span className={styles.category}>
          {restaurant.cuisine.toUpperCase()} · {restaurant.priceRange}
        </span>
        <h3 className={styles.name}>{restaurant.name}</h3>
        <p className={styles.description}>{restaurant.description}</p>
        <hr className={styles.divider} />
        <div className={styles.footer}>
          <span className={styles.distance}>{distanceLabel}</span>
          <button
            type="button"
            className={styles.menuBtn}
            onClick={handleViewMenuClick}
          >
            View Menu
          </button>
        </div>
      </div>
    </div>
  );
}
