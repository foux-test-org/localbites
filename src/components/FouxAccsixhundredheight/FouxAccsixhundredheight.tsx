import React, { useId, useState } from 'react';
import styles from './FouxAccsixhundredheight.module.css';

interface AccordionSection {
  title: string;
  bodyText: string;
}

interface FouxAccsixhundredheightProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxAccsixhundredheight({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: FouxAccsixhundredheightProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const ACTIONS_INDEX = 2;

  return (
    <section className={styles.container}>
      <div className={styles.accordionStack}>
        {sections.map((section, i) => {
          const isOpen = open.has(i);
          const isActionsPanel = i === ACTIONS_INDEX;

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
                className={styles.header}
              >
                <span className={styles.title}>{section.title}</span>
                <span className={styles.chevron}>&#8964;</span>
              </button>
              <div
                id={`${baseId}-body-${i}`}
                role="region"
                aria-labelledby={`${baseId}-header-${i}`}
                className={`${styles.region}${isOpen ? ` ${styles.isVisible}` : ''}`}
              >
                <div>
                  <div className={styles.body}>
                    <p className={styles.bodyText}>{section.bodyText}</p>
                    {isActionsPanel && (
                      <div className={styles.actions}>
                        <button
                          type="button"
                          aria-label="Cancel"
                          className={styles.btn}
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
                          className={styles.btn}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
