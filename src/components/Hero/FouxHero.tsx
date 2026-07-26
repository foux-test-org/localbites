import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxHero.module.css';
import { FouxHeroAccordion, AccordionSection } from './FouxHeroAccordion';

export interface FouxHeroProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxHero({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
}: FouxHeroProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="foux-hero-menu"
          onClick={() => setIsOpen((v) => !v)}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <span className={styles.chevron} aria-hidden="true">
            ▼
          </span>
        </button>
        <div
          id="foux-hero-menu"
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          <FouxHeroAccordion
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
