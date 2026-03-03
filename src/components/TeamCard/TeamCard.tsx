import React from 'react';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  color: string;
}

export function TeamCard({ name, role, bio, color }: TeamCardProps): React.ReactNode {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className={styles.card}>
      <div className={styles.avatar} style={{ backgroundColor: color }}>
        <span className={styles.initials}>{initials}</span>
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
      <p className={styles.bio}>{bio}</p>
    </div>
  );
}
