import React, { useState } from 'react';
import styles from './Newsletter.module.css';

interface NewsletterProps {
  onSubscribe: (message: string) => void;
}

export function Newsletter({ onSubscribe }: NewsletterProps): React.ReactNode {
  const [email, setEmail] = useState('');

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (email.trim()) {
      const existing = JSON.parse(localStorage.getItem('localbites-newsletter') || '[]');
      existing.push(email.trim());
      localStorage.setItem('localbites-newsletter', JSON.stringify(existing));
      onSubscribe('Thanks for subscribing!');
      setEmail('');
    }
  }

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Stay in the Loop</h2>
        <p className={styles.description}>
          Get weekly updates on new restaurants and exclusive deals in your area.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            className={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
