import React from 'react';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps): React.ReactNode {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i < rating;
    return { filled, half, key: i };
  });

  return (
    <span className={styles.starRating}>
      {stars.map((star) => (
        <span
          key={star.key}
          className={`${styles.star} ${star.filled ? styles.filled : ''} ${star.half ? styles.half : ''}`}
        >
          &#9733;
        </span>
      ))}
      <span className={styles.ratingText}>{rating.toFixed(1)}</span>
    </span>
  );
}
