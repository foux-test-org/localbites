import React from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCuisine: string;
  onCuisineChange: (cuisine: string) => void;
  selectedPrice: string;
  onPriceChange: (price: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  cuisines: string[];
}

export function FilterBar({
  searchValue,
  onSearchChange,
  selectedCuisine,
  onCuisineChange,
  selectedPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  cuisines,
}: FilterBarProps): React.ReactNode {
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onSearchChange(e.target.value);
  }

  function handleCuisineChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    onCuisineChange(e.target.value);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    onSortChange(e.target.value);
  }

  function handlePriceClick(price: string): void {
    onPriceChange(selectedPrice === price ? '' : price);
  }

  return (
    <div className={styles.filterBar}>
      <select
        className={styles.select}
        value={selectedCuisine}
        onChange={handleCuisineChange}
      >
        <option value="">All Cuisines</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <div className={styles.priceButtons}>
        {['$', '$$', '$$$'].map((price) => (
          <button
            key={price}
            className={`${styles.priceButton} ${selectedPrice === price ? styles.active : ''}`}
            onClick={() => handlePriceClick(price)}
          >
            {price}
          </button>
        ))}
      </div>

      <select
        className={styles.select}
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="rating">Rating</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search restaurants..."
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
}
