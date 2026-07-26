import React, { useId, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

export interface AccordionSection {
  title: string;
  body: string;
  cancelLabel?: string;
  agreeLabel?: string;
}

interface AccordionMultiProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel?: () => void;
  onAgree?: () => void;
}

export function AccordionMulti({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: AccordionMultiProps): React.ReactNode {
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
      {sections.map((section, i) => {
        const isActionSection = i === 2;
        const isExpanded = open.has(i);
        return (
          <div key={`${section.title}-${i}`}>
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
              <span className={styles.panelTitle}>{section.title}</span>
              <span className={styles.chevron} aria-hidden="true">⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelBody} ${isExpanded ? styles.isVisible : ''}`}
            >
              <p className={styles.bodyText}>{section.body}</p>
              {isActionSection && (
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    aria-label={section.cancelLabel ?? 'Cancel'}
                    className={styles.cancelBtn}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                      });
                      onCancel?.();
                    }}
                  >
                    {section.cancelLabel ?? 'CANCEL'}
                  </button>
                  <button
                    type="button"
                    aria-label={section.agreeLabel ?? 'Agree'}
                    className={styles.agreeBtn}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                      });
                      onAgree?.();
                    }}
                  >
                    {section.agreeLabel ?? 'AGREE'}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
