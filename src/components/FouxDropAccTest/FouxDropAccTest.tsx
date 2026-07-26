import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxDropAccTest.module.css';
import { DropAccordion, AccordionSection } from './DropAccordion';

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxDropAccTest({
  triggerLabel,
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
    <section className={styles.container} id="drop-acc-test">
      <div className={styles.inner} ref={ref}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="drop-acc-test-menu"
          onClick={() => {
            setIsOpen((v) => !v);
            onOpenChange?.(!isOpen);
          }}
          className={`${styles.menuTrigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span>{triggerLabel}</span>
          <span className={styles.chevron} aria-hidden="true">▼</span>
        </button>
        <div
          id="drop-acc-test-menu"
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
