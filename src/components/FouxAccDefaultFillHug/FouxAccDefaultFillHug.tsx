import React, { useId, useState } from 'react';
import styles from './FouxAccDefaultFillHug.module.css';

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxAccDefaultFillHugProps {
  sections: [AccordionSection, AccordionSection, AccordionSection];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxAccDefaultFillHug({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: FouxAccDefaultFillHugProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const handleCancelClick = () => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(2);
      return next;
    });
    onCancel();
  };

  const handleAgreeClick = () => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(2);
      return next;
    });
    onAgree();
  };

  return (
    <section className={styles.container}>
      <div className={styles.container}>
        {sections.map((section, i) => {
          const isOpen = open.has(i);
          const isActionsPanel = i === 2;
          return (
            <div key={`${section.title}-${i}`} className={styles.accordionItem}>
              <button
                type="button"
                id={`${baseId}-header-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-body-${i}`}
                onClick={() => {
                  toggle(i);
                  onToggle?.(i);
                }}
                className={`${styles.header}${isOpen ? ` ${styles.isSelected}` : ''}`}
              >
                <span>{section.title}</span>
                <span className={styles.chevron}>⌄</span>
              </button>
              <div
                id={`${baseId}-body-${i}`}
                role="region"
                aria-labelledby={`${baseId}-header-${i}`}
                hidden={!isOpen}
                className={isOpen ? styles.isVisible : undefined}
              >
                <div className={styles.clip}>
                  <div className={styles.body}>
                    <p>{section.body}</p>
                    {isActionsPanel && (
                      <div className={styles.actions}>
                        <button
                          type="button"
                          className={styles.btn}
                          onClick={handleCancelClick}
                        >
                          CANCEL
                        </button>
                        <button
                          type="button"
                          className={styles.btn}
                          onClick={handleAgreeClick}
                        >
                          AGREE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
