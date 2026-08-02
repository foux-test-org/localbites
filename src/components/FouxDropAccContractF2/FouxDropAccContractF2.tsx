import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractF2.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccContractF2Props {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** The five accordion sections rendered inside the dropdown panel */
  sections: [AccordionSection, AccordionSection, AccordionSection, AccordionSection, AccordionSection];
  /** Called when the Cancel button in a dismiss section is clicked */
  onCancel: () => void;
  /** Called when the Agree button in a dismiss section is clicked */
  onAgree: () => void;
  /** Optional: called after any accordion section is toggled */
  onToggle?: (index: number) => void;
  /** Optional: called after the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
}

// ─── Inner Accordion (disclosure) ────────────────────────────────────────────

interface DropAccordionProps {
  sections: [AccordionSection, AccordionSection, AccordionSection, AccordionSection, AccordionSection];
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
  // Initially open: indices 1, 2, 3, 4
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const handleCancel = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });
    onCancel();
  };

  const handleAgree = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });
    onAgree();
  };

  return (
    <>
      {sections.map((section, i) => {
        const isExpanded = open.has(i);
        // Sections at indices 2, 3, 4 contain in-panel dismiss controls
        const hasDismiss = i === 2 || i === 3 || i === 4;
        const showDivider = i < sections.length - 1;

        return (
          <React.Fragment key={`${baseId}-section-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isExpanded ? styles.isOpen : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.sectionArrow}>⌄</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBodyRegion} ${isExpanded ? styles.isOpen : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background; min-height:0 via CSS */}
              <div>
                {/* styled inner wrapper carries all box styling */}
                <div className={styles.sectionInner}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {hasDismiss && (
                    <div className={styles.buttonRow}>
                      <button
                        type="button"
                        className={styles.cancelBtn}
                        aria-controls={`${baseId}-body-${i}`}
                        onClick={() => handleCancel(i)}
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        className={styles.agreeBtn}
                        aria-controls={`${baseId}-body-${i}`}
                        onClick={() => handleAgree(i)}
                      >
                        AGREE
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showDivider && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── Outer Dropdown ───────────────────────────────────────────────────────────

export function FouxDropAccContractF2({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onToggle,
  onOpenChange,
}: FouxDropAccContractF2Props): React.ReactNode {
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
            onCancel={onCancel}
            onAgree={onAgree}
            onToggle={onToggle}
          />
        </div>
      </div>
    </section>
  );
}
