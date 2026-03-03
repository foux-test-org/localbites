import React from 'react';
import styles from './CategoryTile.module.css';

interface CategoryTileProps {
  name: string;
  emoji: string;
  onClick: (category: string) => void;
}

export function CategoryTile({ name, emoji, onClick }: CategoryTileProps): React.ReactNode {
  function handleClick(): void {
    onClick(name);
  }

  return (
    <button className={styles.tile} onClick={handleClick}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{name}</span>
    </button>
  );
}
