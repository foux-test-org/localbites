import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './FouxDropAccCallbacksB.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section entry
// ---------------------------------------------------------------------------
export interface AccordionSectionControl {
  id: string;
  label: string;
  ariaLabel: string;
  onPress: () => void;
}

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
  controls?: AccordionSectionControl[];
}

// ---------------------------------------------------------------------------
// DropAccAccordionMulti — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface DropAccAccordionMultiProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function DropAccAccordionMulti({ sections, onToggle }: DropAccAccordionMultiProps): React.ReactNode {
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
    <div className={styles.accordion}>
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          {i > 0 && <div className={styles.divider} />}
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={`${styles.sectionHeader} ${open.has(i) ? styles.isSelected : ''}`}
          >
            <span className={styles.sectionHeaderText}>{section.title}</span>
            <span className={styles.sectionChevron}>⌄</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionRegion} ${open.has(i) ? styles.isVisible : ''}`}
          >
            <div>
              <div className={styles.sectionInner}>
                <p className={styles.sectionBody}>{section.body}</p>
                {section.controls && section.controls.length > 0 && (
                  <div className={styles.buttonRow}>
                    {section.controls.map((action) => {
                      const isCancel = action.id === 'cancel';
                      return (
                        <button
                          key={action.id}
                          type="button"
                          aria-label={action.ariaLabel}
                          className={isCancel ? styles.cancelBtn : styles.agreeBtn}
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccCallbacksB — dropdown that reveals a multi-open accordion with optional action buttons
// ---------------------------------------------------------------------------
export interface FouxDropAccCallbacksBProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Accordion sections to render inside the dropdown panel */
  sections: AccordionSection[];
  /** Called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccCallbacksB({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccCallbacksBProps): React.ReactNode {
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
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.menuPanel} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <DropAccAccordionMulti sections={sections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
