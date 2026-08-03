import React, { useId, useState } from 'react';
import styles from './FouxDropAccCommentFormat.module.css';
import { AccordionSection } from './FouxDropAccCommentFormat';

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
        const isExpanded = open.has(i);
        const isLastSection = i === lastIndex;

        return (
          <React.Fragment key={`${section.title}-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isExpanded ? styles.isOpen : ''}`}
            >
              <span>{section.title}</span>
              <span className={styles.sectionArrow}>⌄</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionRegion} ${isExpanded ? styles.isOpen : ''}`}
            >
              <div>
                <div className={styles.sectionInner}>
                  <p className={styles.sectionBodyText}>{section.body}</p>
                  {isLastSection && (
                    <div className={styles.actionsRow}>
                      <button
                        type="button"
                        aria-label="Cancel"
                        className={styles.cancelBtn}
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
                        aria-label="Agree"
                        className={styles.agreeBtn}
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
            </div>

            {!isLastSection && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}
