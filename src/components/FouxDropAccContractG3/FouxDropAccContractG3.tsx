import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractG3.module.css';

// ─── Accordion (nested disclosure inside the dropdown) ───────────────────────

interface AccordionSection {
  title: string;
  body: string;
}

interface AccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

function DropAccordion({ sections, onToggle, onCancel, onAgree }: AccordionProps): React.ReactNode {
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
      {sections.map((section, i) => {
        const isLast = i === sections.length - 1;
        const isExpanded = open.has(i);
        const isActionsSection = i === 2;

        return (
          <React.Fragment key={`${section.title}-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isExpanded ? styles.isExpanded : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBodyRegion} ${isExpanded ? styles.isOpen : ''}`}
            >
              <div className={styles.clip}>
                {isActionsSection ? (
                  <div className={`${styles.sectionInner} ${styles.actionsInner}`}>
                    <p className={styles.bodyText}>{section.body}</p>
                    <div className={styles.actionsFooter}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        aria-label="Cancel"
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
                          onCancel();
                        }}
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        className={styles.agreeBtn}
                        aria-label="Agree"
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
                          onAgree();
                        }}
                      >
                        AGREE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.sectionInner}>
                    <p className={styles.bodyText}>{section.body}</p>
                  </div>
                )}
              </div>
            </div>

            {!isLast && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── Root component ──────────────────────────────────────────────────────────

export interface FouxDropAccContractG3Props {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** The three accordion sections rendered inside the dropdown */
  sections: AccordionSection[];
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Optional: notified whenever an accordion section is toggled */
  onToggle?: (index: number) => void;
  /** Called when the Cancel button inside the Actions panel is clicked */
  onCancel: () => void;
  /** Called when the Agree button inside the Actions panel is clicked */
  onAgree: () => void;
}

export function FouxDropAccContractG3({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
  onCancel,
  onAgree,
}: FouxDropAccContractG3Props): React.ReactNode {
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
          className={`${styles.menuDropdown} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>

        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccordion
            sections={sections}
            onToggle={onToggle}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
