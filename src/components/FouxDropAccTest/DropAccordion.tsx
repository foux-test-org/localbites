import React, { useId, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

export interface AccordionSection {
  title: string;
  body: string;
  hasActions?: boolean;
}

interface DropAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function DropAccordion({
  sections,
  onToggle,
  onCancel,
  onAgree,
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

  return (
    <>
      {sections.map((section, i) => (
        <div
          key={`${section.title}-${i}`}
          className={styles.panel}
        >
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => {
              toggle(i);
              onToggle?.(i);
            }}
            className={`${styles.panelHeader} ${open.has(i) ? styles.isOpen : ''}`}
          >
            <span>{section.title}</span>
            <span className={styles.chevron} aria-hidden="true">
              {open.has(i) ? '⌃' : '⌄'}
            </span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            hidden={!open.has(i)}
            className={`${styles.panelBody} ${open.has(i) ? styles.isOpen : ''}`}
          >
            <p className={styles.bodyText}>{section.body}</p>
            {section.hasActions && (
              <div className={styles.actionsBar}>
                <button
                  type="button"
                  aria-label="Cancel"
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
                  aria-label="Agree"
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
      ))}
    </>
  );
}
