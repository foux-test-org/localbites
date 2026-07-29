import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

export interface FouxDropAccTestProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** The three accordion sections rendered inside the dropdown */
  sections: [AccordionSection, AccordionSection, AccordionSection];
  /** Called when the Cancel button in the Actions panel is clicked */
  onCancel: () => void;
  /** Called when the Agree button in the Actions panel is clicked */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// DropdownDisclosure — nested disclosure (open-dismiss) wrapping the accordion
// ---------------------------------------------------------------------------

interface DropdownDisclosureProps {
  label: string;
  sections: [AccordionSection, AccordionSection, AccordionSection];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
}

function DropdownDisclosure({
  label,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: DropdownDisclosureProps): React.ReactNode {
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
    <div ref={ref} className={styles.dropdownContainer}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="drop-acc-test-menu"
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          onOpenChange?.(next);
        }}
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <span className={styles.triggerArrow} aria-hidden="true">▼</span>
      </button>

      <div
        id="drop-acc-test-menu"
        role="region"
        aria-label="Menu panel"
        className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
      >
        <PanelAccordion
          sections={sections}
          onCancel={onCancel}
          onAgree={onAgree}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PanelAccordion — multi-open accordion rendered inside the dropdown
// ---------------------------------------------------------------------------

interface PanelAccordionProps {
  sections: [AccordionSection, AccordionSection, AccordionSection];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

// Stable section ids derived from position — used for aria-controls / id wiring.
const SECTION_SLUG = ['section1', 'section2', 'actions'] as const;

function PanelAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: PanelAccordionProps): React.ReactNode {
  const baseId = useId();
  // Initially open: indices 1, 2, 3, 4 per spec — clamped to valid indices for 3 sections: {1, 2}.
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
        const sectionSlug = SECTION_SLUG[i];
        const headerId = `${baseId}-header-${i}`;
        const bodyId = `drop-acc-test-${sectionSlug}`;
        const isExpanded = open.has(i);
        const isActionsPanel = i === 2;

        const body = isActionsPanel ? (
          <div className={`${styles.panelBody} ${styles.panelBodyActions}`}>
            <p>{section.body}</p>
            <div className={styles.btnRow}>
              <button
                type="button"
                className={styles.btnCancel}
                aria-controls={bodyId}
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
                aria-controls={bodyId}
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
        );

        return (
          <div key={`${sectionSlug}-${i}`} className={styles.panel}>
            <button
              type="button"
              id={headerId}
              aria-expanded={isExpanded}
              aria-controls={bodyId}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.panelHeader}
            >
              <span>{section.title}</span>
              <span
                className={styles.chevron}
                aria-hidden="true"
              >
                {isExpanded ? '⌃' : '⌄'}
              </span>
            </button>
            <div
              id={bodyId}
              role="region"
              aria-label={`${section.title} content`}
              aria-labelledby={headerId}
              className={isExpanded ? styles.isOpen : ''}
              hidden={!isExpanded}
            >
              <div className={styles.panelClip}>
                {body}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccTest — root component
// ---------------------------------------------------------------------------

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: FouxDropAccTestProps): React.ReactNode {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <DropdownDisclosure
          label={triggerLabel}
          sections={sections}
          onCancel={onCancel}
          onAgree={onAgree}
          onOpenChange={onOpenChange}
        />
      </div>
    </section>
  );
}
