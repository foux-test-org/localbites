import React, { useId, useState } from 'react';
import styles from './FouxAccTest.module.css';

export interface AccordionSection {
  title: string;
  body: string;
}

export interface ActionsSection {
  title: string;
  body: string;
}

export interface FouxAccTestProps {
  sections: [AccordionSection, AccordionSection, ActionsSection];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxAccTest({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: FouxAccTestProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const [sec0, sec1, sec2] = sections;

  return (
    <section className={styles.container}>

      {/* Section 0 */}
      <button
        type="button"
        id={`${baseId}-header-0`}
        aria-expanded={open.has(0)}
        aria-controls={`${baseId}-body-0`}
        onClick={() => {
          toggle(0);
          onToggle?.(0);
        }}
        className={styles.header}
      >
        <span className={styles.headerLabel}>{sec0.title}</span>
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </button>
      <div
        id={`${baseId}-body-0`}
        role="region"
        aria-labelledby={`${baseId}-header-0`}
        className={open.has(0) ? styles.isVisible : ''}
      >
        <div>
          <div className={styles.body}>
            <p>{sec0.body}</p>
          </div>
        </div>
      </div>

      {/* Section 1 */}
      <button
        type="button"
        id={`${baseId}-header-1`}
        aria-expanded={open.has(1)}
        aria-controls={`${baseId}-body-1`}
        onClick={() => {
          toggle(1);
          onToggle?.(1);
        }}
        className={`${styles.header} ${styles.header2}`}
      >
        <span className={styles.headerLabel}>{sec1.title}</span>
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </button>
      <div
        id={`${baseId}-body-1`}
        role="region"
        aria-labelledby={`${baseId}-header-1`}
        className={open.has(1) ? styles.isVisible : ''}
      >
        <div>
          <div className={styles.body}>
            <p>{sec1.body}</p>
          </div>
        </div>
      </div>

      {/* Section 2 — Actions panel with dismiss controls */}
      <button
        type="button"
        id={`${baseId}-header-2`}
        aria-expanded={open.has(2)}
        aria-controls={`${baseId}-body-2`}
        onClick={() => {
          toggle(2);
          onToggle?.(2);
        }}
        className={`${styles.header} ${styles.headerActions}`}
      >
        <span className={styles.headerLabel}>{sec2.title}</span>
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </button>
      <div
        id={`${baseId}-body-2`}
        role="region"
        aria-labelledby={`${baseId}-header-2`}
        className={open.has(2) ? styles.isVisible : ''}
      >
        <div>
          <div className={styles.body}>
            <p>{sec2.body}</p>
            <div className={styles.actionsFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                aria-label="Cancel"
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
                className={styles.agreeBtn}
                aria-label="Agree"
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

    </section>
  );
}
