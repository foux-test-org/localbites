import React, { useEffect, useRef, useState } from 'react';
import styles from './FouxDropAccTest.module.css';
import { DropAccordion, AccordionSection } from './DropAccordion';

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onMenuOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onAgree?: () => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onMenuOpenChange,
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
        onMenuOpenChange?.(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onMenuOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    const next = !isOpen;
    setIsOpen(next);
    onMenuOpenChange?.(next);
  };

  return (
    <section id="drop-acc-test" className={styles.container}>
      <div className={styles.wrapper}>
        <div ref={ref} className={styles.triggerWrap}>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="drop-acc-test-menu"
            onClick={handleTriggerClick}
            className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
          >
            <span>{triggerLabel}</span>
            <span className={styles.triggerArrow} aria-hidden="true">
              ▼
            </span>
          </button>
          <div
            id="drop-acc-test-menu"
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
      </div>
    </section>
  );
}
