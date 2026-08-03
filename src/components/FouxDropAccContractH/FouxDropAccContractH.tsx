import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractH.module.css';

// ─── Accordion (nested pattern) ───────────────────────────────────────────────

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
        const isOpen = open.has(i);
        const isLast = i === sections.length - 1;

        const bodyContent = isLast ? (
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{section.body}</p>
            <div className={styles.actionsFooter}>
              <button
                type="button"
                className={styles.btnCancel}
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
                className={styles.btnAgree}
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
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{section.body}</p>
          </div>
        );

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
              className={styles.sectionHeader}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBody}${isOpen ? ` ${styles.isSelected}` : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                {bodyContent}
              </div>
            </div>
            {!isLast && <div className={styles.divider} />}
          </div>
        );
      })}
    </>
  );
}

// ─── Outer dropdown (root pattern) ────────────────────────────────────────────

export interface FouxDropAccContractHProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Sections fed into the nested accordion */
  sections: AccordionSection[];
  /** Called when the Cancel button inside the Actions panel is clicked */
  onCancel: () => void;
  /** Called when the Agree button inside the Actions panel is clicked */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
}

export function FouxDropAccContractH({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: FouxDropAccContractHProps): React.ReactNode {
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
          className={`${styles.menuDropdown}${isOpen ? ` ${styles.isOpen}` : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>

        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordion}${isOpen ? ` ${styles.isOpen}` : ''}`}
        >
          <DropAccordion
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
