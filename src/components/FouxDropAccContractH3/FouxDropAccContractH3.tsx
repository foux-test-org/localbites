import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractH3.module.css';

// ── Accordion (nested disclosure inside the dropdown) ────────────────────────

interface AccordionSection {
  title: string;
  body: string;
}

interface DropAccordionProps {
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
        const isLast = i === sections.length - 1;
        const isActionsPanel = isLast;
        const isExpanded = open.has(i);

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
              className={`${styles.sectionHeader} ${isExpanded ? styles['isOpen'] : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.sectionArrow}>&#8744;</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBodyRegion} ${isExpanded ? styles['isOpen'] : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                {/* styled inner wrapper carries all box styling */}
                <div className={styles.sectionInner}>
                  <p className={styles.sectionBodyText}>{section.body}</p>

                  {isActionsPanel && (
                    <div className={styles.buttonsRow}>
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
                  )}
                </div>
              </div>
            </div>

            {!isLast && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ── Dropdown (open-dismiss wrapper) ─────────────────────────────────────────

interface DropdownProps {
  label: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

function Dropdown({
  label,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: DropdownProps): React.ReactNode {
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
  }, [isOpen]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        type="button"
        id={`${baseId}-trigger`}
        aria-controls={`${baseId}-menu`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => {
          setIsOpen((v) => !v);
          onOpenChange?.(!isOpen);
        }}
        className={`${styles.menuDropdown} ${isOpen ? styles['isOpen'] : ''}`}
      >
        <span className={styles.menuLabel}>{label}</span>
        <span className={styles.menuArrow}>&#9660;</span>
      </button>

      {/* menu surface — hidden by CSS, shown via is-open class */}
      <div
        id={`${baseId}-menu`}
        role="region"
        aria-labelledby={`${baseId}-trigger`}
        className={`${styles.accordionPanel} ${isOpen ? styles['isOpen'] : ''}`}
      >
        <DropAccordion
          sections={sections}
          onCancel={onCancel}
          onAgree={onAgree}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}

// ── FouxDropAccContractH3 (root) ─────────────────────────────────────────────

export interface FouxDropAccContractH3Props {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Accordion sections rendered inside the dropdown */
  sections: AccordionSection[];
  /** Called when the Cancel button is clicked */
  onCancel: () => void;
  /** Called when the Agree button is clicked */
  onAgree: () => void;
  /** Optional: called whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Optional: called whenever an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccContractH3({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: FouxDropAccContractH3Props): React.ReactNode {
  return (
    <section className={styles.container}>
      <Dropdown
        label={menuLabel}
        sections={sections}
        onCancel={onCancel}
        onAgree={onAgree}
        onOpenChange={onOpenChange}
        onToggle={onToggle}
      />
    </section>
  );
}
