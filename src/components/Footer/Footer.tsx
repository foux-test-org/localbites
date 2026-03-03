import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export function Footer(): React.ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>LocalBites</span>
          <p className={styles.tagline}>Discover local flavors in your neighborhood.</p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Follow Us</h4>
            <div className={styles.socials}>
              <span className={styles.socialIcon}>f</span>
              <span className={styles.socialIcon}>t</span>
              <span className={styles.socialIcon}>ig</span>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} LocalBites. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
