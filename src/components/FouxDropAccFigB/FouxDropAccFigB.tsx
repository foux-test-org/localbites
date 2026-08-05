import React, { useState, useId, useRef, useEffect } from 'react';
import styles from './FouxDropAccFigB.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — data shape for a single collapsible section
// ---------------------------------------------------------------------------

export interface SectionAction {
  id: string;
  label: string;
  ariaLabel: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

export interface AccordionSectionData {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: SectionAction[];
}

// ---------------------------------------------------------------------------
// DropdownAccordion — the inner accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------

interface DropdownAccordionProps {
  sections: AccordionSectionData[];
  onToggle?: (index: number) => void;
}

function DropdownAccordion({ sections, onToggle }: DropdownAccordionProps): React.ReactNode {
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
            className={styles.sectionHeader}
          >
            <span className={styles.sectionTitle}>{section.title}</span>
            <svg
              className={styles.chevron}
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 6L7 1L13 6" stroke="#666666" strokeWidth="2" />
            </svg>
          </button>

          <div className={styles.divider} />

          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.bodyRegion} ${open.has(i) ? styles.isVisible : ''}`}
          >
            <div className={styles.clip}>
              {section.actions && section.actions.length > 0 ? (
                <div className={styles.actionsInner}>
                  <p className={styles.bodyText}>{section.body}</p>
                  <div className={styles.buttonRow}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        aria-label={action.ariaLabel}
                        className={
                          action.variant === 'cancel'
                            ? styles.cancelBtn
                            : styles.agreeBtn
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
                        <span className={styles.btnLabel}>{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.bodyInner}>
                  <p className={styles.bodyText}>{section.body}</p>
                </div>
              )}
            </div>
          </div>

          {i < sections.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFigB — outer dropdown that reveals a group of collapsible panels
// ---------------------------------------------------------------------------

export interface FouxDropAccFigBProps {
  label: string;
  sections: AccordionSectionData[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccFigB({
  label,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigBProps): React.ReactNode {
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
      <div ref={ref} className={styles.wrapper}>
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
          className={styles.menuBar}
        >
          <span className={styles.menuTitle}>{label}</span>
          <svg
            className={styles.caret}
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M1 1L8 8L15 1" stroke="#333333" strokeWidth="2" />
          </svg>
        </button>

        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordion} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropdownAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
