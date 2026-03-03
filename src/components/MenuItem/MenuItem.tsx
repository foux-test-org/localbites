import React from 'react';
import { MenuItemData } from '../../data/restaurants';
import styles from './MenuItem.module.css';

interface MenuItemProps {
  item: MenuItemData;
  onAddToOrder: (item: MenuItemData) => void;
}

export function MenuItem({ item, onAddToOrder }: MenuItemProps): React.ReactNode {
  function handleAddClick(): void {
    onAddToOrder(item);
  }

  return (
    <div className={styles.menuItem}>
      <div className={styles.info}>
        <h4 className={styles.name}>{item.name}</h4>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.right}>
        <span className={styles.price}>${item.price.toFixed(2)}</span>
        <button className={styles.addButton} onClick={handleAddClick}>
          Add to Order
        </button>
      </div>
    </div>
  );
}
