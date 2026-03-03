import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { restaurants, Restaurant } from '../data/restaurants';
import { FilterBar } from '../components/FilterBar/FilterBar';
import { RestaurantCard } from '../components/RestaurantCard/RestaurantCard';
import styles from './Restaurants.module.css';

interface RestaurantsProps {
  isFavorite: (id: string) => boolean;
  onFavorite: (id: string) => void;
  onViewMenu: (restaurant: Restaurant) => void;
}

export function Restaurants({ isFavorite, onFavorite, onViewMenu }: RestaurantsProps): React.ReactNode {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCuisine = searchParams.get('cuisine') || '';

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState(initialCuisine);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const cuisines = useMemo(
    () => Array.from(new Set(restaurants.map((r) => r.cuisine))).sort(),
    []
  );

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (searchValue.trim()) {
      const query = searchValue.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisine.toLowerCase().includes(query)
      );
    }

    if (selectedCuisine) {
      result = result.filter((r) => r.cuisine === selectedCuisine);
    }

    if (selectedPrice) {
      result = result.filter((r) => r.priceRange === selectedPrice);
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      result.sort((a, b) => a.priceRange.length - b.priceRange.length);
    }

    return result;
  }, [searchValue, selectedCuisine, selectedPrice, sortBy]);

  function handleSearchChange(value: string): void {
    setSearchValue(value);
  }

  function handleCuisineChange(cuisine: string): void {
    setSelectedCuisine(cuisine);
  }

  function handlePriceChange(price: string): void {
    setSelectedPrice(price);
  }

  function handleSortChange(sort: string): void {
    setSortBy(sort);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Restaurants</h1>
        <FilterBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedCuisine={selectedCuisine}
          onCuisineChange={handleCuisineChange}
          selectedPrice={selectedPrice}
          onPriceChange={handlePriceChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          cuisines={cuisines}
        />
        {filteredRestaurants.length > 0 ? (
          <div className={styles.grid}>
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={isFavorite(restaurant.id)}
                onFavorite={onFavorite}
                onViewMenu={onViewMenu}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
