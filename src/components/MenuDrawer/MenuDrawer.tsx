import React, { useState, useEffect } from 'react';
import { Restaurant, MenuItemData } from '../../data/restaurants';
import { MenuItem } from '../MenuItem/MenuItem';
import { OrderSummary, OrderItem } from '../OrderSummary/OrderSummary';
import styles from './MenuDrawer.module.css';

interface MenuDrawerProps {
  restaurant: Restaurant;
  onClose: () => void;
  onOrderPlaced: (message: string) => void;
}

export function MenuDrawer({ restaurant, onClose, onOrderPlaced }: MenuDrawerProps): React.ReactNode {
  const [order, setOrder] = useState<OrderItem[]>([]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleAddToOrder(item: MenuItemData): void {
    setOrder((prev) => {
      const existing = prev.find((entry) => entry.item.name === item.name);
      return existing
        ? prev.map((entry) =>
            entry.item.name === item.name
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry
          )
        : [...prev, { item, quantity: 1 }];
    });
  }

  function handlePlaceOrder(): void {
    onOrderPlaced(`Order placed at ${restaurant.name}! Your food is on the way.`);
    setOrder([]);
    onClose();
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{restaurant.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.menuContent}>
          {restaurant.menu.map((section) => (
            <div key={section.category} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.category}</h3>
              {section.items.map((item) => (
                <MenuItem
                  key={item.name}
                  item={item}
                  onAddToOrder={handleAddToOrder}
                />
              ))}
            </div>
          ))}
        </div>
        <OrderSummary items={order} onPlaceOrder={handlePlaceOrder} />
      </div>
    </div>
  );
}
