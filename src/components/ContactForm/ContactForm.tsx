import React, { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit: () => void;
}

export function ContactForm({ onSubmit }: ContactFormProps): React.ReactNode {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value);
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEmail(e.target.value);
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(e.target.value);
  }

  function handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      onSubmit();
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <h3 className={styles.heading}>Get in Touch</h3>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          type="text"
          className={styles.input}
          value={name}
          onChange={handleNameChange}
          placeholder="Your name"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          className={styles.input}
          value={email}
          onChange={handleEmailChange}
          placeholder="your@email.com"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          value={message}
          onChange={handleMessageChange}
          placeholder="Tell us what's on your mind..."
          rows={5}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Send Message
      </button>
    </form>
  );
}
