import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDac2.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape of a single accordion section entry
// ---------------------------------------------------------------------------
export interface AccordionAction {
  id: string;
  label: string;
  onPress: () => void;
}

export interface AccordionSection {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen?: boolean;
  actions?: AccordionAction[];
}

// ---------------------------------------------------------------------------
// AccordionMulti — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
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

  const chevronClass = (i: number): string => {
    if (i === 0) return styles.section1Chevron;
    if (i === 1) return styles.section2Chevron;
    return styles.actionsChevron;
  };

  const labelClass = (i: number): string => {
    if (i === 0) return styles.section1Label;
    if (i === 1) return styles.section2Label;
    return styles.actionsLabel;
  };

  return (
    <>
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={styles.sectionRow}
          >
            <span className={labelClass(i)}>{section.title}</span>
            <span className={chevronClass(i)}>{open.has(i) ? '∧' : '∨'}</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionBody} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <div>
              <div className={styles.sectionInner}>
                {section.body}
                {section.actions && section.actions.length > 0 && (
                  <>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={styles.actionButton}
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
                  </>
                )}
              </div>
            </div>
          </div>
          {i === 0 && <div className={styles.sectionDivider1} />}
          {i === 1 && <div className={styles.sectionDivider2} />}
        </React.Fragment>
      ))}
      <div className={styles.bottomBorderLine} />
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDac2 — dropdown trigger that reveals a multi-open accordion of panels
// ---------------------------------------------------------------------------
export interface FouxDac2Props {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
}

export function FouxDac2({ menuLabel, sections, onOpenChange }: FouxDac2Props): React.ReactNode {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onOpenChange]);

  return (
    <section>
      <div className={styles.container} ref={ref}>
        <button
          type="button"
          id={`${baseId}-trigger`}
          aria-controls={`${baseId}-menu`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => { const next = !isOpen; setIsOpen(next); onOpenChange?.(next); }}
          className={`${styles.menuHeader} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuHeaderText}>{menuLabel}</span>
          <span className={styles.menuHeaderIcon}>{isOpen ? '▲' : '▼'}</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <AccordionMulti sections={sections} />
        </div>
      </div>
    </section>
  );
}
