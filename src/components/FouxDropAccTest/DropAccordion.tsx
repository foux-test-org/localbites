import React, { useId, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

export interface AccordionSection {
  title: string;
  body: string;
}

interface DropAccordionProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

export function DropAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: DropAccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const lastIndex = sections.length - 1;

  return (
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isLast = i === lastIndex;
        return (
          <div key={`${section.title}-${i}`} className={styles.panel}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.panelHeader} ${isOpen ? styles.isSelected : ''}`}
            >
              <span className={styles.panelTitle}>{section.title}</span>
              <span className={styles.panelChevron} aria-hidden="true">⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelBody} ${isOpen ? styles.isVisible : ''}`}
            >
              <p className={styles.bodyText}>{section.body}</p>
              {isLast && (
                <div className={styles.actionsRow}>
                  <button
                    type="button"
                    className={styles.btnCancel}
                    onClick={onCancel}
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    className={styles.btnAgree}
                    onClick={onAgree}
                  >
                    AGREE
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
