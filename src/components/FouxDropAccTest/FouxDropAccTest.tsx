import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccTestProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** Accordion sections rendered inside the dropdown menu */
  sections: AccordionSection[];
  /** Called when Cancel button (last section) is clicked */
  onCancel: () => void;
  /** Called when Agree button (last section) is clicked */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
}

// ─── Inner Accordion (multi-open) ────────────────────────────────────────────

interface InnerAccordionProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function DropAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: InnerAccordionProps): React.ReactNode {
  const baseId = useId();
  // Preview shows sections 2 and 3 open (0-indexed: 1 and 2).
  // Seeded from template {1, 2, 5}; clamped to valid indices.
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const lastIndex = sections.length - 1;

  return (
    <div className={styles.menuInner}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isLast = i === lastIndex;
        const isActionsPanel = isLast;

        const headerClass = [
          styles.panelHeader,
          isLast ? styles.panelHeaderLast : '',
        ]
          .filter(Boolean)
          .join(' ');

        const regionClass = [
          styles.panelRegion,
          isOpen ? styles.isSelected : '',
        ]
          .filter(Boolean)
          .join(' ');

        const bodyClass = [
          styles.panelBody,
          isActionsPanel ? styles.panelBodyActions : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div key={`${section.title}-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={headerClass}
            >
              <span>{section.title}</span>
              <span className={styles.chevron} aria-hidden="true">
                ⌄
              </span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={regionClass}
            >
              {/* clip wrapper for grid-template-rows height animation */}
              <div>
                <div className={bodyClass}>
                  <p>{section.body}</p>

                  {isActionsPanel && (
                    <div className={styles.btnRow}>
                      <button
                        type="button"
                        className={`${styles.btn} ${styles.btnCancel}`}
                        aria-controls={`${baseId}-body-${i}`}
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
                        className={`${styles.btn} ${styles.btnAgree}`}
                        aria-controls={`${baseId}-body-${i}`}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Outer Dropdown ───────────────────────────────────────────────────────────

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: FouxDropAccTestProps): React.ReactNode {
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
  }, [isOpen]);

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Toggle menu"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <span className={styles.triggerChevron} aria-hidden="true">
            ▼
          </span>
        </button>

        <div
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          {/* clip wrapper — structural parity with preview */}
          <div>
            <DropAccordion
              sections={sections}
              onCancel={onCancel}
              onAgree={onAgree}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
