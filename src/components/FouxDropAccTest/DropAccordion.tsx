import React, { useId, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  hasDismiss?: boolean;
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
    <div role="menu" className={`${styles.menu}`}>
      {sections.map((section, i) => (
        <div key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => {
              toggle(i);
              onToggle?.(i);
            }}
            className={`${styles.panelHeader} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <span>{section.title}</span>
            <span className={styles.panelChevron} aria-hidden="true">⌄</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.panelBody} ${open.has(i) ? styles.isVisible : ''}`}
          >
            <p className={styles.bodyText}>{section.body}</p>
            {section.hasDismiss && (
              <div className={styles.buttonRow}>
                <button
                  type="button"
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
      ))}
    </div>
  );
}
