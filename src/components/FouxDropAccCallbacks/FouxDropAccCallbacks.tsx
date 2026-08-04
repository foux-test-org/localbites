import React, { useId, useRef, useState, useEffect } from 'react';
import styles from './FouxDropAccCallbacks.module.css';

// ---------------------------------------------------------------------------
// SectionAction — a single in-panel action button descriptor
// ---------------------------------------------------------------------------
export interface SectionAction {
  id: string;
  label: string;
  ariaLabel: string;

  // FOUX_TODO: wire up what each action button (e.g. Cancel, Agree) should do when clicked
  onPress?: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — one entry in the accordion sections list
// ---------------------------------------------------------------------------
export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  controls?: SectionAction[];
}

// ---------------------------------------------------------------------------
// DropAccMultiAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface DropAccMultiAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function DropAccMultiAccordion({ sections, onToggle }: DropAccMultiAccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

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
          {i > 0 && <div className={styles.divider} />}
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={styles.sectionHeader}
          >
            <span className={styles.sectionTitle}>{section.title}</span>
            <span className={styles.chevron}>⌄</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionRegion} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <div className={styles.clip}>
              <div className={styles.sectionInner}>
                <p className={styles.bodyText}>{section.body}</p>
                {section.controls && section.controls.length > 0 && (
                  <div className={styles.actionButtons}>
                    {section.controls.map((action) => {
                      const isLast =
                        section.controls !== undefined &&
                        section.controls.indexOf(action) === section.controls.length - 1;
                      return (
                        <button
                          key={action.id}
                          type="button"
                          aria-label={action.ariaLabel}
                          className={isLast ? styles.agreeBtn : styles.cancelBtn}
                          onClick={() => {
                            setOpen((prev) => {
                              const next = new Set(prev);
                              next.delete(i);
                              return next;
                            });
                            action.onPress?.();
                          }}
                        >
                          {action.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccCallbacks — dropdown trigger that reveals a multi-open accordion
// ---------------------------------------------------------------------------
export interface FouxDropAccCallbacksProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Accordion sections rendered inside the dropdown panel */
  sections: AccordionSection[];
  /** Called whenever the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called whenever an accordion section is toggled */
  onToggle?: (index: number) => void;
  /** Required: called when the menu trigger is clicked — shows/hides the group */
  onMenuTrigger: () => void;
}

export function FouxDropAccCallbacks({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
  onMenuTrigger,
}: FouxDropAccCallbacksProps): React.ReactNode {
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

  const handleTriggerClick = () => {
    const next = !isOpen;
    setIsOpen(next);
    onOpenChange?.(next);
    onMenuTrigger();
  };

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          id={`${baseId}-trigger`}
          aria-controls={`${baseId}-menu`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={handleTriggerClick}
          className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccMultiAccordion sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
