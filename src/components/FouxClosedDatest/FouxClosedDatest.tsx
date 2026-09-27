import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxClosedDatest.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single collapsible panel entry
// ---------------------------------------------------------------------------

export interface AccordionAction {
  id: string;
  label: string;
  variant: 'agree' | 'cancel';
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
// DropdownAccordion — multi-open accordion rendered inside the dropdown panel
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

  // Derive per-section class names from index position in the fixed 3-section layout.
  // Index 0 -> section1, index 1 -> section2, index 2 -> actions.
  const panelClass = (i: number): string => {
    if (i === 0) return styles.accordionPanel;
    if (i === 1) return styles.section2Panel;
    return styles.actionsPanel;
  };

  const labelClass = (i: number): string => {
    if (i === 0) return styles.section1Label;
    if (i === 1) return styles.section2Label;
    return styles.actionsLabel;
  };

  const chevronClass = (i: number): string => {
    if (i === 0) return styles.section1Chevron;
    if (i === 1) return styles.section2Chevron;
    return styles.actionsChevron;
  };

  const bodyClass = (i: number): string => {
    if (i === 0) return styles.section1Body;
    if (i === 1) return styles.section2Body;
    return styles.actionsBody;
  };

  const clipClass = (i: number): string => {
    if (i === 0) return styles.section1Clip;
    if (i === 1) return styles.section2Clip;
    return styles.actionsClip;
  };

  const innerClass = (i: number): string => {
    if (i === 0) return styles.section1Inner;
    if (i === 1) return styles.section2Inner;
    return styles.actionsInner;
  };

  const contentClass = (i: number): string => {
    if (i === 0) return styles.section1Content;
    if (i === 1) return styles.section2Content;
    return '';
  };

  const buttonVariantClass = (variant: AccordionAction['variant']): string => {
    if (variant === 'agree') return styles.agreeButton;
    return styles.cancelButton;
  };

  return (
    <>
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <div className={panelClass(i)}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={open.has(i)}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => { toggle(i); onToggle?.(i); }}
              className={`${styles.sectionHeader} ${open.has(i) ? styles['isOpen'] : ''}`}
            >
              <span className={labelClass(i)}>{section.title}</span>
              <span className={`${chevronClass(i)}`}>∨</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${bodyClass(i)} ${open.has(i) ? styles['isOpen'] : ''}`}
            >
              <div className={clipClass(i)}>
                <div className={innerClass(i)}>
                  {section.actions && section.actions.length > 0 ? (
                    <div className={styles.actionsButtonRow}>
                      {section.actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          className={buttonVariantClass(action.variant)}
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
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className={contentClass(i)}>{section.body}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {i === 0 && <div className={styles.sectionDivider1} />}
          {i === 1 && <div className={styles.sectionDivider2} />}
          {i === sections.length - 1 && <div className={styles.bottomBorderLine} />}
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxClosedDatest — outer dropdown that wraps the accordion disclosure
// ---------------------------------------------------------------------------

export interface FouxClosedDatestProps {
  menuLabel: string;
  sections: AccordionSectionEntry[];
  onOpenChange?: (open: boolean) => void;
  onAgree: () => void;
}

export function FouxClosedDatest({
  menuLabel,
  sections,
  onOpenChange,
  onAgree,
}: FouxClosedDatestProps): React.ReactNode {
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

  // Inject the onAgree handler into the actions section's agree action.
  const sectionsWithHandlers: AccordionSectionEntry[] = sections.map((section) => {
    if (!section.actions) return section;
    return {
      ...section,
      actions: section.actions.map((action) =>
        action.variant === 'agree'
          ? { ...action, onPress: onAgree }
          : action,
      ),
    };
  });

  return (
    <section className={styles.container}>
      <div className={styles.container} ref={ref}>
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
          className={`${styles.menuHeader} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <span className={styles.menuHeaderLabel}>{menuLabel}</span>
          <span className={styles.menuHeaderIcon}>▲</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.dropdownPanel} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <div className={styles.dropdownInner}>
            <DropdownAccordion sections={sectionsWithHandlers} />
          </div>
        </div>
      </div>
    </section>
  );
}
