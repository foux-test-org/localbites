import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccContractB.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccContractBProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** The three accordion sections (title + body copy) */
  sections: [AccordionSection, AccordionSection, AccordionSection];
  /** Called when Cancel is clicked inside the Actions section */
  onCancel: () => void;
  /** Called when Agree is clicked inside the Actions section */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Optional: notified whenever an accordion panel is toggled */
  onToggle?: (index: number) => void;
}

// ── Inner accordion (disclosure) ─────────────────────────────────────────────

interface InnerAccordionProps {
  sections: [AccordionSection, AccordionSection, AccordionSection];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function InnerAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: InnerAccordionProps): React.ReactNode {
  const baseId = useId();
  // Initially open: panels 1 and 2 (0-indexed)
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
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionsPanel = i === 2;

        const bodyContent = (
          <>
            <p className={styles.bodyText}>{section.body}</p>
            {isActionsPanel && (
              <div className={styles.actionsRow}>
                <button
                  type="button"
                  aria-label="Cancel"
                  className={styles.cancelBtn}
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
                  aria-label="Agree"
                  className={styles.agreeBtn}
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
          </>
        );

        return (
          <React.Fragment key={`${baseId}-section-${i}`}>
            {i > 0 && <div className={styles.divider} />}
            <div className={styles.section}>
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
                <span className={styles.sectionLabel}>{section.title}</span>
                <span className={styles.sectionChevron}>{isOpen ? '⌃' : '⌄'}</span>
              </button>
              <div
                id={`${baseId}-body-${i}`}
                role="region"
                aria-labelledby={`${baseId}-header-${i}`}
                className={`${styles.bodyRegion} ${isOpen ? styles.isOpen : ''}`}
              >
                <div className={styles.bodyClip}>
                  <div
                    className={`${styles.bodyInner}${isActionsPanel ? ` ${styles.actionsInner}` : ''}`}
                  >
                    {bodyContent}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── Outer dropdown ────────────────────────────────────────────────────────────

export function FouxDropAccContractB({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: FouxDropAccContractBProps): React.ReactNode {
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
          aria-controls="drop-acc-contract-b-panels"
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
          id="drop-acc-contract-b-panels"
          className={`${styles.panelsContainer} ${isOpen ? styles.isOpen : ''}`}
        >
          <InnerAccordion
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
