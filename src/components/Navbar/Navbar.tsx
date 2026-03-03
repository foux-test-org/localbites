import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
  onSignInClick: () => void;
}

export function Navbar({ onSignInClick }: NavbarProps): React.ReactNode {
  function handleSignInClick(): void {
    onSignInClick();
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          LocalBites
        </Link>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/restaurants" className={styles.navLink}>Restaurants</Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>About</Link>
          </li>
        </ul>
        <button className={styles.signInButton} onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </nav>
  );
}
