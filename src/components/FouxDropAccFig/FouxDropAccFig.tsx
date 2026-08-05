import React, { useState, useEffect, useRef, useId } from 'react';
import styles from './FouxDropAccFig.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section entry
// ---------------------------------------------------------------------------

export interface AccordionSectionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress?: () => void;
}

export interface AccordionSectionEntry {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen: boolean;
  actions?: AccordionSectionAction[];
}

// ---------------------------------------------------------------------------
// DropdownAccordion — multi-open accordion rendered inside the dropdown surface
// ---------------------------------------------------------------------------

interface DropdownAccordionProps {
  sections: AccordionSectionEntry[];
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

  const headerClassForIndex = (i: number): string => {
    if (i === 0) return styles.headerSection1;
    if (i === 1) return styles.headerSection2;
    return styles.headerActions;
  };

  const titleClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1Title;
    if (i === 1) return styles.section2Title;
    return styles.actionsTitle;
  };

  const bodyClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1Body;
    if (i === 1) return styles.section2Body;
    return styles.actionsBody;
  };

  const bodyClipClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1BodyClip;
    if (i === 1) return styles.section2BodyClip;
    return styles.actionsBodyClip;
  };

  const bodyInnerClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1BodyInner;
    if (i === 1) return styles.section2BodyInner;
    return styles.actionsBodyInner;
  };

  return (
    <div className={styles.accordionInner}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const headerClass = headerClassForIndex(i);
        const titleClass = titleClassForIndex(i);
        const bodyClass = bodyClassForIndex(i);
        const bodyClipClass = bodyClipClassForIndex(i);
        const bodyInnerClass = bodyInnerClassForIndex(i);

        return (
          <React.Fragment key={section.id}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => { toggle(i); onToggle?.(i); }}
              className={`${headerClass} ${isOpen ? styles.isOpen : ''}`}
            >
              <span className={titleClass}>{section.title}</span>
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
              className={`${bodyClass} ${isOpen ? styles.isOpen : ''}`}
            >
              <div className={bodyClipClass}>
                <div className={bodyInnerClass}>
                  {section.body}
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
                            action.onPress?.();
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

            {i < sections.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFig — outer dropdown that reveals the accordion on trigger click
// ---------------------------------------------------------------------------

export interface FouxDropAccFigProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Accordion sections rendered inside the dropdown surface */
  sections: AccordionSectionEntry[];
  /** Called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccFig({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigProps): React.ReactNode {
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
      <div ref={ref} className={styles.container}>
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
          <div className={styles.accordionInner}>
            <DropdownAccordion sections={sections} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
