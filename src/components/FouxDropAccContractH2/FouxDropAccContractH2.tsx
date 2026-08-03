import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractH2.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

export interface ActionsSection {
  title: string;
  body: string;
}

export interface FouxDropAccContractH2Props {
  menuLabel: string;
  sections: [AccordionSection, AccordionSection, ActionsSection];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// Inner accordion (disclosure) — nested pattern
// ---------------------------------------------------------------------------

interface DropAccordionProps {
  sections: [AccordionSection, AccordionSection, ActionsSection];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function DropAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: DropAccordionProps): React.ReactNode {
  const baseId = useId();
  // Initially open: sections 1 and 2 (0-indexed)
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
      {/* Section 0 */}
      <button
        type="button"
        id={`${baseId}-header-0`}
        aria-expanded={open.has(0)}
        aria-controls={`${baseId}-body-0`}
        onClick={() => { toggle(0); onToggle?.(0); }}
        className={`${styles.sectionHeader} ${open.has(0) ? styles.isOpen : ''}`}
      >
        <span className={styles.sectionLabel}>{sections[0].title}</span>
        <span className={styles.chevron}>⌄</span>
      </button>
      <div
        id={`${baseId}-body-0`}
        role="region"
        aria-labelledby={`${baseId}-header-0`}
        className={`${styles.sectionBody} ${open.has(0) ? styles.isOpen : ''}`}
      >
        <div>
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{sections[0].body}</p>
          </div>
        </div>
      </div>
      <div className={styles.divider} />

      {/* Section 1 */}
      <button
        type="button"
        id={`${baseId}-header-1`}
        aria-expanded={open.has(1)}
        aria-controls={`${baseId}-body-1`}
        onClick={() => { toggle(1); onToggle?.(1); }}
        className={`${styles.sectionHeader} ${open.has(1) ? styles.isOpen : ''}`}
      >
        <span className={styles.sectionLabel}>{sections[1].title}</span>
        <span className={styles.chevron}>⌄</span>
      </button>
      <div
        id={`${baseId}-body-1`}
        role="region"
        aria-labelledby={`${baseId}-header-1`}
        className={`${styles.sectionBody} ${open.has(1) ? styles.isOpen : ''}`}
      >
        <div>
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{sections[1].body}</p>
          </div>
        </div>
      </div>
      <div className={styles.divider} />

      {/* Section 2 — Actions (has dismiss controls) */}
      <button
        type="button"
        id={`${baseId}-header-2`}
        aria-expanded={open.has(2)}
        aria-controls={`${baseId}-body-2`}
        onClick={() => { toggle(2); onToggle?.(2); }}
        className={`${styles.sectionHeader} ${open.has(2) ? styles.isOpen : ''}`}
      >
        <span className={styles.sectionLabel}>{sections[2].title}</span>
        <span className={styles.chevron}>⌄</span>
      </button>
      <div
        id={`${baseId}-body-2`}
        role="region"
        aria-labelledby={`${baseId}-header-2`}
        className={`${styles.sectionBody} ${open.has(2) ? styles.isOpen : ''}`}
      >
        <div>
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{sections[2].body}</p>
            <div className={styles.actionsFooter}>
              <button
                type="button"
                aria-label="Cancel"
                className={styles.btnCancel}
                onClick={() => {
                  setOpen((prev) => {
                    const next = new Set(prev);
                    next.delete(2);
                    return next;
                  });
                  onCancel();
                }}
              >
                CANCEL
              </button>
              <button
                type="button"
                aria-label="Agree"
                className={styles.btnAgree}
                onClick={() => {
                  setOpen((prev) => {
                    const next = new Set(prev);
                    next.delete(2);
                    return next;
                  });
                  onAgree();
                }}
              >
                AGREE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Outer dropdown component
// ---------------------------------------------------------------------------

export function FouxDropAccContractH2({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onToggle,
  onOpenChange,
}: FouxDropAccContractH2Props): React.ReactNode {
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
      <div ref={ref} className={styles.wrapper}>
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
          className={`${styles.menuTrigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>

        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordion} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccordion
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
            onToggle={onToggle}
          />
        </div>
      </div>
    </section>
  );
}
