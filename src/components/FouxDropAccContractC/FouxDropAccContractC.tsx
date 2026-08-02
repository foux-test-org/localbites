import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccContractC.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AccordionSection {
  id: string;
  title: string;
  body: string;
}

export interface FouxDropAccContractCProps {
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

  const actionsIndex = sections.length - 1;

  const closeSection = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });

  return (
    <div>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionsSection = i === actionsIndex;
        const isLastSection = i === sections.length - 1;

        return (
          <div key={section.id} className={styles.section}>
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
              <span className={styles.sectionHeaderText}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>

            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBody} ${isOpen ? styles.isOpen : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                {isActionsSection ? (
                  <div className={styles.bodyInner}>
                    <p className={styles.bodyText}>{section.body}</p>
                    <div className={styles.buttons}>
                      <button
                        type="button"
                        aria-label="Cancel"
                        className={styles.cancelBtn}
                        onClick={() => {
                          closeSection(i);
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
                          closeSection(i);
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
                )}
              </div>
            </div>

            {!isLastSection && <div className={styles.divider} />}
          </div>
        );
      })}
    </div>
  );
}

// ── Outer dropdown wrapper ────────────────────────────────────────────────────

export function FouxDropAccContractC({
  menuLabel,
  sections,
  onToggle,
  onOpenChange,
  onCancel,
  onAgree,
}: FouxDropAccContractCProps): React.ReactNode {
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
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="drop-acc-panel"
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
          id="drop-acc-panel"
          role="region"
          className={`${styles.dropdown} ${isOpen ? styles.isOpen : ''}`}
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
