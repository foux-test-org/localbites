import React from 'react';
import styles from './FouxItsAtest.module.css';

// ---------------------------------------------------------------------------
// FouxItsAtestContent — inner content wrapper with centred text
// ---------------------------------------------------------------------------

const FOUX_ITS_ATEST_COPY = {
  label: 'THIS IS A TEST',
} as const;

function FouxItsAtestContent(): React.ReactNode {
  return (
    <div className={styles.content}>
      <span className={styles.text}>{FOUX_ITS_ATEST_COPY.label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxItsAtest — top-level hero replacement banner for the Home page
// ---------------------------------------------------------------------------

export function FouxItsAtest(): React.ReactNode {
  return (
    <section className={styles.container}>
      <FouxItsAtestContent />
    </section>
  );
}
