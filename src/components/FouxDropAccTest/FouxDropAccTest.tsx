import React, { useState, useRef, useEffect, useId } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

export interface ActionSection extends AccordionSection {
  cancelLabel: string;
  agreeLabel: string;
}

export interface FouxDropAccTestProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** First two accordion sections (title + body copy) */
  sections: [AccordionSection, AccordionSection];
  /** Third accordion section which contains action buttons */
  actionsSection: ActionSection;
  /** Called when Cancel is clicked — close is handled locally */
  onCancel: () => void;
  /** Called when Agree is clicked — close is handled locally */
  onAgree: () => void;
  /** Optional: notified whenever the dropdown opens or closes */
  onOpenChange?: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// DisclosureAccordion — multi-open accordion (nested inside the dropdown menu)
// ---------------------------------------------------------------------------

interface DisclosureAccordionProps {
  sections: [AccordionSection, AccordionSection];
  actionsSection: ActionSection;
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function DisclosureAccordion({
  sections,
  actionsSection,
  onCancel,
  onAgree,
  onToggle,
}: DisclosureAccordionProps): React.ReactNode {
  const baseId = useId();
  // Initially open: sections at index 1 and 2
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const allSections: Array<{
    title: string;
    body: string;
    hasActions?: boolean;
  }> = [
    { title: sections[0].title, body: sections[0].body },
    { title: sections[1].title, body: sections[1].body },
    { title: actionsSection.title, body: actionsSection.body, hasActions: true },
  ];

  return (
    <div className={styles.accordion}>
      {allSections.map((section, i) => {
        const isOpen = open.has(i);
        return (
          <div key={`${baseId}-section-${i}`} className={styles.section}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isOpen ? styles.isSelected : ''}`}
            >
              <span>{section.title}</span>
              <span className={styles.sectionChevron} aria-hidden="true">
                ⌄
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              hidden={!isOpen}
              className={`${styles.sectionBody} ${isOpen ? styles.isVisible : ''}`}
            >
              <p className={styles.bodyText}>{section.body}</p>
              {section.hasActions && (
                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    aria-label={actionsSection.cancelLabel}
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
                    {actionsSection.cancelLabel}
                  </button>
                  <button
                    type="button"
                    aria-label={actionsSection.agreeLabel}
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
                    {actionsSection.agreeLabel}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccTest — outer dropdown component
// ---------------------------------------------------------------------------

export function FouxDropAccTest({
  triggerLabel,
  sections,
  actionsSection,
  onCancel,
  onAgree,
  onOpenChange,
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

  // FOUX_TODO: motion-vertical-slide — the menu panel should animate open/close
  // with a vertical slide transition. Render static visibility for now.

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="foux-drop-acc-menu"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.triggerLabel}>{triggerLabel}</span>
          <span className={styles.chevron} aria-hidden="true">
            ▼
          </span>
        </button>

        <div
          id="foux-drop-acc-menu"
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          <DisclosureAccordion
            sections={sections}
            actionsSection={actionsSection}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
