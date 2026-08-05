import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccFigmaI.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section entry
// ---------------------------------------------------------------------------
export interface AccordionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

export interface AccordionSectionEntry {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: AccordionAction[];
}

// ---------------------------------------------------------------------------
// DropAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface DropAccordionProps {
  sections: AccordionSectionEntry[];
  onToggle?: (index: number) => void;
}

function DropAccordion({ sections, onToggle }: DropAccordionProps): React.ReactNode {
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
    <>
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={`${styles.header} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <span className={styles.sectionTitle}>{section.title}</span>
            <svg
              className={styles.chevron}
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 1L7 6L13 1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionBody} ${open.has(i) ? styles.isVisible : ''}`}
          >
            {/* bare clip wrapper — no className, no padding/border/background */}
            <div>
              <div
                className={`${styles.bodyInner} ${
                  section.actions && section.actions.length > 0 ? styles.actionsInner : ''
                }`}
              >
                <p className={styles.bodyText}>{section.body}</p>
                {section.actions && section.actions.length > 0 && (
                  <div className={styles.buttonRow}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        aria-label={action.label}
                        className={
                          action.variant === 'cancel' ? styles.btnCancel : styles.btnAgree
                        }
                        onClick={() => {
                          if (action.variant === 'cancel') {
                            setOpen((prev) => {
                              const next = new Set(prev);
                              next.delete(i);
                              return next;
                            });
                          }
                          action.onPress();
                        }}
                      >
                        <span className={styles.btnLabel}>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.divider} aria-hidden="true" />
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFigmaI — dropdown trigger that reveals a multi-open accordion panel
// ---------------------------------------------------------------------------
export interface FouxDropAccFigmaIProps {
  label: string;
  sections: AccordionSectionEntry[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccFigmaI({
  label,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigmaIProps): React.ReactNode {
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
    <section className={styles.container}>
      <div className={styles.wrapper} ref={ref}>
        <button
          type="button"
          id={`${baseId}-trigger`}
          aria-controls={`${baseId}-menu`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => {
            setIsOpen((v) => !v);
            onOpenChange?.(!isOpen);
          }}
          className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuTitle}>{label}</span>
          <svg
            className={styles.caret}
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
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
          <DropAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
