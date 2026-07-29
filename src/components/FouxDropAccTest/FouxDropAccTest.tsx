import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ─── Accordion (nested inside the dropdown menu) ───────────────────────────

interface AccordionSection {
  title: string;
  body: string;
}

interface DropAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

function DropAccordion({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: DropAccordionProps): React.ReactNode {
  const baseId = useId();
  // Initially open: indices 1 and 2 (0-based: Section 2 = index 1, Actions = index 2)
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
        const isActions = i === sections.length - 1;
        const isExpanded = open.has(i);

        return (
          <div key={`${section.title}-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.panelHeader} ${isExpanded ? styles.isSelected : ''}`}
            >
              <span>{section.title}</span>
              <span className={styles.chevron} aria-hidden="true">⌄</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelRegion} ${isExpanded ? styles.isVisible : ''}`}
            >
              {isActions ? (
                <div className={`${styles.panelBody} ${styles.panelBodyActions}`}>
                  <p>{section.body}</p>
                  <div className={styles.btnRow}>
                    <button
                      type="button"
                      className={`${styles.btn} ${styles.btnCancel}`}
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
                <div className={styles.panelBody}>
                  <p>{section.body}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

// ─── FouxDropAccTest (outer dropdown) ──────────────────────────────────────

export interface FouxDropAccTestProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** Accordion sections rendered inside the dropdown menu */
  sections: AccordionSection[];
  /** Called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when the accordion section toggle fires */
  onSectionToggle?: (index: number) => void;
  /** Called when the Cancel button inside the Actions panel is clicked */
  onCancel: () => void;
  /** Called when the Agree button inside the Actions panel is clicked */
  onAgree: () => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onOpenChange,
  onSectionToggle,
  onCancel,
  onAgree,
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
      <div className={styles.wrapper} ref={ref}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={triggerLabel}
          onClick={() => {
            setIsOpen((v) => !v);
            onOpenChange?.(!isOpen);
          }}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <span className={styles.triggerCaret} aria-hidden="true">▼</span>
        </button>

        <div
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccordion
            sections={sections}
            onToggle={onSectionToggle}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
