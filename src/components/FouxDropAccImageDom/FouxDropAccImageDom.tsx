import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccImageDom.module.css';

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
// DropdownAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------

interface DropdownAccordionProps {
  sections: AccordionSection[];
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
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isLast = i === sections.length - 1;
        const isExpanded = open.has(i);
        const hasActions = section.actions && section.actions.length > 0;

        return (
          <div
            key={section.id}
            className={styles.accordionRow}
          >
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader}${isExpanded ? ` ${styles.isSelected}` : ''}`}
            >
              <span className={styles.sectionHeaderText}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>

            {hasActions ? (
              <div
                id={`${baseId}-body-${i}`}
                role="region"
                aria-labelledby={`${baseId}-header-${i}`}
                className={`${styles.actionsSectionBody}${isExpanded ? ` ${styles.isVisible}` : ''}`}
              >
                <div className={styles.actionsSectionBodyClip}>
                  <div className={styles.actionsSectionBodyInner}>
                    <p className={styles.bodyText}>{section.body}</p>
                    <div className={styles.buttonRow}>
                      {section.actions!.map((action) => (
                        <button
                          key={action.id}
                          type="button"
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
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                id={`${baseId}-body-${i}`}
                role="region"
                aria-labelledby={`${baseId}-header-${i}`}
                className={`${styles.sectionBody}${isExpanded ? ` ${styles.isVisible}` : ''}`}
              >
                <div className={styles.sectionBodyClip}>
                  <div className={styles.sectionBodyInner}>
                    <p className={styles.bodyText}>{section.body}</p>
                  </div>
                </div>
              </div>
            )}

            {!isLast && <div className={styles.divider} />}
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccImageDom — dropdown trigger that reveals a multi-open accordion
// ---------------------------------------------------------------------------

export interface FouxDropAccImageDomProps {
  /** Label shown on the dropdown trigger button */
  dropdownLabel: string;
  /** Accordion sections rendered inside the dropdown panel */
  sections: AccordionSection[];
  /** Called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccImageDom({
  dropdownLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccImageDomProps): React.ReactNode {
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
      <div className={styles.container}>
        <div ref={ref} className={styles.menuWrapper}>
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
            className={`${styles.menuDropdown}${isOpen ? ` ${styles.isOpen}` : ''}`}
          >
            <span className={styles.menuLabel}>{dropdownLabel}</span>
            <span className={styles.menuArrow}>▼</span>
          </button>

          <div
            id={`${baseId}-menu`}
            role="region"
            aria-labelledby={`${baseId}-trigger`}
            className={`${styles.panel}${isOpen ? ` ${styles.isOpen}` : ''}`}
          >
            <DropdownAccordion sections={sections} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
