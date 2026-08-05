import React, { useId, useState } from 'react';
import styles from './FouxAccRefactor.module.css';

// ---------------------------------------------------------------------------
// AccordionMulti — multi-open accordion; several panels may be open at once
// ---------------------------------------------------------------------------

interface AccordionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

interface AccordionSection {
  id: string;
  title: string;
  body: string;
  bordered?: boolean;
  startsOpen?: boolean;
  actions?: AccordionAction[];
}

interface AccordionMultiProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function AccordionMulti({ sections, onToggle }: AccordionMultiProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(sections.flatMap((s, i) => (s.startsOpen ? [i] : []))),
  );

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ul className={styles.list}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-header-${i}`;
        const regionId = `${baseId}-body-${i}`;

        return (
          <li
            key={section.id}
            className={`${styles.panel}${section.bordered ? ` ${styles.panelBordered}` : ''}`}
          >
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={regionId}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.header}
            >
              <span className={styles.label}>{section.title}</span>
              <span aria-hidden="true" className={styles.chevron}>⌄</span>
            </button>
            <div
              id={regionId}
              role="region"
              aria-labelledby={headerId}
              className={`${styles.accSection}${isOpen ? ` ${styles.isVisible}` : ''}`}
            >
              <div>
                <div className={styles.body}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {section.actions && section.actions.length > 0 && (
                    <div className={styles.actions}>
                      {section.actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          className={
                            action.variant === 'cancel'
                              ? styles.btnCancel
                              : styles.btnAgree
                          }
                          onClick={() => {
                            setOpen((prev) => {
                              const next = new Set(prev);
                              next.delete(i);
                              return next;
                            });
                            action.onPress();
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// FouxAccRefactor — disclosure wrapper that renders the accordion-multi inside
// ---------------------------------------------------------------------------

interface FouxAccRefactorProps {
  heading: string;
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onAgree: () => void;
}

export function FouxAccRefactor({
  heading,
  sections,
  onToggle,
}: FouxAccRefactorProps): React.ReactNode {
  return (
    <h2 className={styles.container}>
      {heading}
      <AccordionMulti sections={sections} onToggle={onToggle} />
    </h2>
  );
}
