import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccFigDom.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section entry
// ---------------------------------------------------------------------------
export interface AccordionSectionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: AccordionSectionAction[];
}

// ---------------------------------------------------------------------------
// InnerAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface InnerAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function InnerAccordion({ sections, onToggle }: InnerAccordionProps): React.ReactNode {
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

  const bodyClassForIndex = (i: number): string => {
    if (i === 0) return styles.bodySection1;
    if (i === 1) return styles.bodySection2;
    return styles.bodyActions;
  };

  const clipClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1BodyClip;
    if (i === 1) return styles.section2BodyClip;
    return styles.actionsBodyClip;
  };

  const innerClassForIndex = (i: number): string => {
    if (i === 0) return styles.section1BodyInner;
    if (i === 1) return styles.section2BodyInner;
    return styles.actionsBodyInner;
  };

  return (
    <>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-header-${i}`;
        const bodyId = `${baseId}-body-${i}`;

        return (
          <React.Fragment key={section.id}>
            <button
              type="button"
              id={headerId}
              aria-controls={bodyId}
              aria-expanded={isOpen}
              onClick={() => { toggle(i); onToggle?.(i); }}
              className={headerClassForIndex(i)}
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
                <path d="M1 6L7 1L13 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <div className={styles.divider} />

            <div
              id={bodyId}
              role="region"
              aria-labelledby={headerId}
              className={`${bodyClassForIndex(i)} ${isOpen ? styles.isSelected : ''}`}
            >
              <div className={clipClassForIndex(i)}>
                <div className={innerClassForIndex(i)}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {section.actions && section.actions.length > 0 && (
                    <div className={styles.buttonRow}>
                      {section.actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          aria-label={action.label}
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

            {i < sections.length - 1 && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFigDom — dropdown that reveals a group of collapsible panels
// ---------------------------------------------------------------------------
export interface FouxDropAccFigDomProps {
  dropdownLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccFigDom({
  dropdownLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigDomProps): React.ReactNode {
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
      <div ref={ref} className={styles.containerAccordionMenu}>
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
          <span className={styles.title}>{dropdownLabel}</span>
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
          <InnerAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
