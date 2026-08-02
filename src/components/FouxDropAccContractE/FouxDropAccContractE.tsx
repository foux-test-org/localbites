import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractE.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccContractEProps {
  menuLabel: string;
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
  onCancel: () => void;
  onAgree: () => void;
}

// ── Inner accordion (disclosure) ─────────────────────────────────────────────

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
  // Initially open: indices 1 and 2
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const ACTIONS_INDEX = 2;

  return (
    <>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionsSection = i === ACTIONS_INDEX;

        return (
          <React.Fragment key={`${section.title}-${i}`}>
            {i > 0 && <div className={styles.divider} />}
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isOpen ? styles.isOpen : ''}`}
            >
              <span>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBodyRegion} ${isOpen ? styles.isOpen : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                {/* styled inner wrapper carries all box styling */}
                <div className={styles.sectionInner}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {isActionsSection && (
                    <div className={styles.buttonRow}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        aria-label="Cancel"
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(ACTIONS_INDEX);
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
                            next.delete(ACTIONS_INDEX);
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
          </React.Fragment>
        );
      })}
    </>
  );
}

// ── Outer dropdown (open-dismiss) ─────────────────────────────────────────────

export function FouxDropAccContractE({
  menuLabel,
  sections,
  onToggle,
  onOpenChange,
  onCancel,
  onAgree,
}: FouxDropAccContractEProps): React.ReactNode {
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
          <span>{menuLabel}</span>
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
