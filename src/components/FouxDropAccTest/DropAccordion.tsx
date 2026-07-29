import React, { useId, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

export interface AccordionSection {
  title: string;
  body: string;
  hasActions?: boolean;
}

interface DropAccordionProps {
  sections: AccordionSection[];
  onCancel?: () => void;
  onAgree?: () => void;
  onToggle?: (index: number) => void;
}

export function DropAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: DropAccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <>
      {sections.map((section, i) => {
        const isExpanded = open.has(i);
        return (
          <div key={`${section.title}-${i}`} className={styles.panel}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.panelHeader}
            >
              <span>{section.title}</span>
              <span
                className={`${styles.chevron} ${isExpanded ? styles.isOpen : ''}`}
                aria-hidden="true"
              >
                {isExpanded ? '⌃' : '⌄'}
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelRegion} ${isExpanded ? styles.isOpen : ''}`}
            >
              <div className={styles.clip}>
                <div className={styles.panelInner}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {section.hasActions && (
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.btnCancel}
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
                          onCancel?.();
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
                          onAgree?.();
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
    </>
  );
}
