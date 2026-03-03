import React from 'react';
import { MenuItemData } from '../../data/restaurants';
import styles from './OrderSummary.module.css';

interface OrderItem {
  item: MenuItemData;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  onPlaceOrder: () => void;
}

export function OrderSummary({ items, onPlaceOrder }: OrderSummaryProps): React.ReactNode {
  const total = items.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  function handlePlaceOrderClick(): void {
    onPlaceOrder();
  }

  return (
    <div className={styles.orderSummary}>
      <h4 className={styles.heading}>Your Order</h4>
      {items.length > 0 ? (
        <>
          <ul className={styles.itemList}>
            {items.map((entry) => (
              <li key={entry.item.name} className={styles.orderItem}>
                <span className={styles.itemName}>
                  {entry.item.name} x{entry.quantity}
                </span>
                <span className={styles.itemPrice}>
                  ${(entry.item.price * entry.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Total</span>
            <span className={styles.totalPrice}>${total.toFixed(2)}</span>
          </div>
          <button className={styles.placeOrderButton} onClick={handlePlaceOrderClick}>
            Place Order
          </button>
        </>
      ) : (
        <p className={styles.empty}>No items yet. Add something from the menu!</p>
      )}
    </div>
  );
}

export type { OrderItem };
