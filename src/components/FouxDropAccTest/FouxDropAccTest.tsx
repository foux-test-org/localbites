import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxDropAccTest.module.css';
import { DropAccordion, AccordionSection } from './DropAccordion';

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
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
    <section className={styles.container} id="drop-acc-test">
      <div ref={ref} className={styles.wrapper}>
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
          className={`${styles.trigger} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <span className={styles.chevron} aria-hidden="true">▼</span>
        </button>

        <div
          role="menu"
          className={`${styles.menu} ${isOpen ? styles['isOpen'] : ''}`}
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
