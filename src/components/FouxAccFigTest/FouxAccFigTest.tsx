import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxAccFigTest.module.css';

// ---------------------------------------------------------------------------
// AccordionMulti — multi-open accordion rendered inside the dropdown menu
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
  startsOpen: boolean;
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

  const bodyClassForIndex = (i: number): string => {
    if (i === 0) return styles.bodySection1;
    if (i === 1) return styles.bodySection2;
    return styles.bodyActions;
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
            className={`${styles.sectionHeader} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <span className={styles.headerTitle}>{section.title}</span>
            <svg
              className={styles.chevron}
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 6L7 1L13 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className={styles.divider} />

          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${bodyClassForIndex(i)} ${open.has(i) ? styles.isVisible : ''}`}
          >
            <div className={styles.bodyClip}>
              <div className={styles.bodyInner}>
                <p className={styles.bodyText}>{section.body}</p>
                {section.actions && section.actions.length > 0 && (
                  <div className={styles.buttonRow}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={action.variant === 'cancel' ? styles.cancel : styles.agree}
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
                          action.onPress();
                        }}
                      >
                        <span
                          className={
                            action.variant === 'cancel' ? styles.cancelLabel : styles.agreeLabel
                          }
                        >
                          {action.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider} />
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxAccFigTest — outer dropdown component wrapping the accordion
// ---------------------------------------------------------------------------

export interface FouxAccFigTestSection {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: AccordionAction[];
}

interface FouxAccFigTestProps {
  menuLabel: string;
  sections: FouxAccFigTestSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxAccFigTest({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxAccFigTestProps): React.ReactNode {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
    <section id="acc-fig-test" className={styles.container} ref={ref}>
      <button
        type="button"
        id={`${baseId}-trigger`}
        aria-controls={`${baseId}-menu`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          onOpenChange?.(next);
        }}
        className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
      >
        <span className={styles.menuTitle}>{menuLabel}</span>
        <svg
          className={styles.caret}
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <div
        id={`${baseId}-menu`}
        role="region"
        aria-labelledby={`${baseId}-trigger`}
        className={`${styles.accordion} ${isOpen ? styles.isOpen : ''}`}
      >
        <AccordionMulti sections={sections} onToggle={onToggle} />
      </div>
    </section>
  );
}
