import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccFigRefined.module.css';

// ---------------------------------------------------------------------------
// SectionAction — a single action button inside an accordion section panel
// ---------------------------------------------------------------------------

interface SectionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress?: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — data shape for one accordion section
// ---------------------------------------------------------------------------

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: SectionAction[];
}

// ---------------------------------------------------------------------------
// DisclosureAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------

interface DisclosureAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

const headerClassMap: Record<number, string> = {
  0: styles.headerSection1,
  1: styles.headerSection2,
  2: styles.headerActions,
};

const titleClassMap: Record<number, string> = {
  0: styles.section1Title,
  1: styles.section2Title,
  2: styles.actionsTitle,
};

const bodyClassMap: Record<number, string> = {
  0: styles.section1Body,
  1: styles.section2Body,
  2: styles.actionsBody,
};

const bodyClipClassMap: Record<number, string> = {
  0: styles.section1BodyClip,
  1: styles.section2BodyClip,
  2: styles.actionsBodyClip,
};

const bodyInnerClassMap: Record<number, string> = {
  0: styles.section1BodyInner,
  1: styles.section2BodyInner,
  2: styles.actionsBodyInner,
};

const bodyTextClassMap: Record<number, string> = {
  0: styles.bodyText,
  1: styles.bodyText,
  2: styles.actionsBodyText,
};

function DisclosureAccordion({ sections, onToggle }: DisclosureAccordionProps): React.ReactNode {
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
      {sections.map((section, i) => {
        const isExpanded = open.has(i);
        const headerClass = headerClassMap[i] ?? styles.headerSection1;
        const titleClass = titleClassMap[i] ?? styles.section1Title;
        const bodyClass = bodyClassMap[i] ?? styles.section1Body;
        const bodyClipClass = bodyClipClassMap[i] ?? styles.section1BodyClip;
        const bodyInnerClass = bodyInnerClassMap[i] ?? styles.section1BodyInner;
        const bodyTextClass = bodyTextClassMap[i] ?? styles.bodyText;

        return (
          <React.Fragment key={section.id}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => { toggle(i); onToggle?.(i); }}
              className={headerClass}
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
                <path d="M1 6L7 1L13 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <div className={styles.divider} />

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${bodyClass} ${isExpanded ? styles.isOpen : ''}`}
            >
              <div className={bodyClipClass}>
                <div className={bodyInnerClass}>
                  <p className={bodyTextClass}>{section.body}</p>
                  {section.actions && section.actions.length > 0 && (
                    <div className={styles.buttonRow}>
                      {section.actions.map((action) => {
                        const isCancelVariant = action.variant === 'cancel';
                        const btnClass = isCancelVariant ? styles.cancel : styles.agree;
                        const labelClass = isCancelVariant ? styles.cancelLabel : styles.agreeLabel;
                        return (
                          <button
                            key={action.id}
                            type="button"
                            className={btnClass}
                            onClick={() => {
                              setOpen((prev) => {
                                const next = new Set(prev);
                                next.delete(i);
                                return next;
                              });

                              // FOUX_TODO: submitting panel data to the server on action button press (data-bound) — wire action.onPress to a real server call
                              action.onPress?.();
                            }}
                          >
                            <span className={labelClass}>{action.label}</span>
                          </button>
                        );
                      })}
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
// FouxDropAccFigRefined — outer dropdown that reveals the accordion on click
// ---------------------------------------------------------------------------

export interface FouxDropAccFigRefinedProps {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccFigRefined({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigRefinedProps): React.ReactNode {
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
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuBarTitle}>{menuLabel}</span>
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
          <DisclosureAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
