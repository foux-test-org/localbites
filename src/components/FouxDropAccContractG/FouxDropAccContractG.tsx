import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractG.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccContractGProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** The three accordion sections (title + body copy) */
  sections: [AccordionSection, AccordionSection, AccordionSection];
  /** Called when Cancel is clicked inside the Actions panel */
  onCancel: () => void;
  /** Called when Agree is clicked inside the Actions panel */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
  /** Optional: notified whenever an accordion section is toggled */
  onToggle?: (index: number) => void;
}

// ── Inner accordion (disclosure) ─────────────────────────────────────────────

interface DisclosureAccordionProps {
  baseId: string;
  sections: [AccordionSection, AccordionSection, AccordionSection];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function DisclosureAccordion({
  baseId,
  sections,
  onCancel,
  onAgree,
  onToggle,
}: DisclosureAccordionProps): React.ReactNode {
  // Sections 1 and 2 (indices 1 and 2) are open initially
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const closeSection = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });

  const ACTIONS_INDEX = 2;

  return (
    <>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const headerId = `${baseId}-header-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        const isActionsPanel = i === ACTIONS_INDEX;

        return (
          <React.Fragment key={`${section.title}-${i}`}>
            {i > 0 && <hr className={styles.divider} />}

            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isOpen ? styles.isOpen : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>

            {/*
              The panel uses CSS grid-template-rows to animate height.
              The direct child is a bare clip wrapper (no padding/border/background)
              so the panel can collapse fully to zero.
              We use an inline data attribute to scope the open state since
              `styles.panel` is not available — the CSS module targets the
              panel via the `isOpen` class applied directly to this element.
            */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              data-panel
              className={isOpen ? styles.isOpen : ''}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                {/* styled inner wrapper carries all box styling */}
                <div
                  className={
                    isActionsPanel
                      ? `${styles.panelInner} ${styles.actionsInner}`
                      : styles.panelInner
                  }
                >
                  <p className={styles.bodyText}>{section.body}</p>

                  {isActionsPanel && (
                    <div className={styles.actionsFooter}>
                      <button
                        type="button"
                        aria-label="Cancel"
                        className={styles.cancelBtn}
                        onClick={() => {
                          closeSection(ACTIONS_INDEX);
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
                          closeSection(ACTIONS_INDEX);
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

// ── Root component ────────────────────────────────────────────────────────────

export function FouxDropAccContractG({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: FouxDropAccContractGProps): React.ReactNode {
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

  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.inner}>
        <button
          type="button"
          id={triggerId}
          aria-controls={menuId}
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
          id={menuId}
          role="region"
          aria-labelledby={triggerId}
          className={`${styles.accordion} ${isOpen ? styles.isOpen : ''}`}
        >
          <DisclosureAccordion
            baseId={baseId}
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
