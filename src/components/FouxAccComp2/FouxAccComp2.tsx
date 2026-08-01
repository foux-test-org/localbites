import React, { useId, useState } from 'react';
import styles from './FouxAccComp2.module.css';

export interface AccordionSection {
  title: string;
  body: string;
}

export interface AccordionActionsSection {
  title: string;
  body: string;
}

export interface FouxAccComp2Props {
  sections: [AccordionSection, AccordionSection, AccordionActionsSection];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxAccComp2({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: FouxAccComp2Props): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const [section0, section1, section2] = sections;

  return (
    <section className={styles.container}>
      <div className={styles.inner}>

        {/* Section 0 */}
        <div className={styles.section}>
          <button
            type="button"
            id={`${baseId}-header-0`}
            aria-expanded={open.has(0)}
            aria-controls={`${baseId}-body-0`}
            onClick={() => { toggle(0); onToggle?.(0); }}
            className={`${styles.header} ${open.has(0) ? styles.isOpen : ''}`}
          >
            <span className={styles.headerTitle}>{section0.title}</span>
            <span className={styles.chevron}>&#8964;</span>
          </button>
          <div
            id={`${baseId}-body-0`}
            role="region"
            aria-labelledby={`${baseId}-header-0`}
            className={`${styles.region} ${open.has(0) ? styles.isVisible : ''}`}
          >
            <div className={styles.clip}>
              <div className={styles.body}>
                <p>{section0.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1 */}
        <div className={styles.section}>
          <button
            type="button"
            id={`${baseId}-header-1`}
            aria-expanded={open.has(1)}
            aria-controls={`${baseId}-body-1`}
            onClick={() => { toggle(1); onToggle?.(1); }}
            className={`${styles.header} ${open.has(1) ? styles.isOpen : ''}`}
          >
            <span className={styles.headerTitle}>{section1.title}</span>
            <span className={styles.chevron}>&#8964;</span>
          </button>
          <div
            id={`${baseId}-body-1`}
            role="region"
            aria-labelledby={`${baseId}-header-1`}
            className={`${styles.region} ${open.has(1) ? styles.isVisible : ''}`}
          >
            <div className={styles.clip}>
              <div className={styles.body}>
                <p>{section1.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 — Actions panel */}
        <div className={styles.section}>
          <button
            type="button"
            id={`${baseId}-header-2`}
            aria-expanded={open.has(2)}
            aria-controls={`${baseId}-body-2`}
            onClick={() => { toggle(2); onToggle?.(2); }}
            className={`${styles.header} ${open.has(2) ? styles.isOpen : ''}`}
          >
            <span className={styles.headerTitle}>{section2.title}</span>
            <span className={styles.chevron}>&#8964;</span>
          </button>
          <div
            id={`${baseId}-body-2`}
            role="region"
            aria-labelledby={`${baseId}-header-2`}
            className={`${styles.region} ${open.has(2) ? styles.isVisible : ''}`}
          >
            <div className={styles.clip}>
              <div className={styles.body}>
                <p>{section2.body}</p>
                <div className={styles.actions}>
                  <button
                    type="button"
                    aria-label="Cancel"
                    className={styles.btn}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(2);
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
                        next.delete(2);
                        return next;
                      });
                      onAgree();
                    }}
                  >
                    AGREE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
