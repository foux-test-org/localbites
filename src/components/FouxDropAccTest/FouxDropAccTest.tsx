import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxDropAccTest.module.css';
import { DropAccordion, AccordionSection } from './DropAccordion';

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
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
          aria-controls="foux-drop-acc-menu"
          onClick={() => setIsOpen((v) => !v)}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span>{triggerLabel}</span>
          <span className={styles.triggerIcon} aria-hidden="true">▼</span>
        </button>
        <div
          id="foux-drop-acc-menu"
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccordion
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
