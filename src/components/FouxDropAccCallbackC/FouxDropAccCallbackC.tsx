import React, { useState, useEffect, useRef, useId } from 'react';
import styles from './FouxDropAccCallbackC.module.css';

// ---------------------------------------------------------------------------
// SectionAction — a single action button entry within an accordion section
// ---------------------------------------------------------------------------

export interface SectionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — a single accordion section data entry
// ---------------------------------------------------------------------------

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: SectionAction[];
}

// ---------------------------------------------------------------------------
// DropAccordion — the nested disclosure/accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------

interface DropAccordionProps {
  sections: AccordionSection[];
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
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isLast = i === sections.length - 1;
        return (
          <React.Fragment key={section.id}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isOpen ? styles['isOpen'] : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.sectionArrow}>⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionRegion} ${isOpen ? styles['isOpen'] : ''}`}
            >
              <div className={styles.clip}>
                <div
                  className={`${styles.sectionInner} ${
                    section.actions && section.actions.length > 0 ? styles.actionsInner : ''
                  }`}
                >
                  <p className={styles.bodyText}>{section.body}</p>
                  {section.actions && section.actions.length > 0 && (
                    <div className={styles.actionButtons}>
                      {section.actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          aria-label={action.label}
                          className={
                            action.variant === 'cancel' ? styles.cancelBtn : styles.agreeBtn
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
            {!isLast && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccCallbackC — outer dropdown that reveals the accordion on open
// ---------------------------------------------------------------------------

export interface FouxDropAccCallbackCProps {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccCallbackC({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccCallbackCProps): React.ReactNode {
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
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.menuTrigger} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.panel} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <DropAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
