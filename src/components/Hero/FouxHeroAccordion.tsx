import React, { useId, useState } from 'react';
import styles from './FouxHero.module.css';

export interface AccordionSection {
  title: string;
  body: string;
}

interface FouxHeroAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxHeroAccordion({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: FouxHeroAccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2, 5]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const DISMISS_SECTION_INDEX = 2;

  return (
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isDismissSection = i === DISMISS_SECTION_INDEX;

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
              <span>{section.title}</span>
              <span className={styles.panelChevron} aria-hidden="true">
                ⌄
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelBody} ${isOpen ? styles.isVisible : ''}`}
            >
              <p className={styles.bodyText}>{section.body}</p>
              {isDismissSection && (
                <div className={styles.btnRow}>
                  <button
                    type="button"
                    className={styles.btnCancel}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                      });
                      onCancel();
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="button"
                    className={styles.btnAgree}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                      });
                      onAgree();
                    }}
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
