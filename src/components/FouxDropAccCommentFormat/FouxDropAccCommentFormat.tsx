import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccCommentFormat.module.css';
import { DropAccordion } from './DropAccordion';

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccCommentFormatProps {
  menuLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function FouxDropAccCommentFormat({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: FouxDropAccCommentFormatProps): React.ReactNode {
  const baseId = useId();
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
  }, [isOpen, onOpenChange]);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper} ref={ref}>
        <button
          type="button"
          id={`${baseId}-trigger`}
          aria-controls={`${baseId}-menu`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.menuDropdown} ${isOpen ? styles.isOpen : ''}`}
        >
          <span>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>

        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.dropdownPanel} ${isOpen ? styles.isOpen : ''}`}
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
