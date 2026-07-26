import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxDropAccTest.module.css';
import { AccordionMulti, AccordionSection } from './AccordionMulti';

export interface FouxDropAccTestProps {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onAgree?: () => void;
}

export function FouxDropAccTest({
  menuLabel,
  sections,
  onOpenChange,
  onCancel,
  onAgree,
}: FouxDropAccTestProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onOpenChange?.(false);
      }
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
      <div ref={ref} className={styles.inner}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Toggle menu"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={styles.menuTrigger}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuChevron} aria-hidden="true">▼</span>
        </button>

        <div
          role="menu"
          className={`${styles.accordionGroup} ${isOpen ? styles.isOpen : ''}`}
        >
          <AccordionMulti
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
