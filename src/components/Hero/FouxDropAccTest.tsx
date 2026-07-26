import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
  /** If true, renders Cancel + Agree buttons inside the panel */
  hasActions?: boolean;
}

interface DisclosureProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

interface AccordionMultiProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

export interface FouxDropAccTestProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** Accordion sections rendered inside the dropdown panel */
  sections: AccordionSection[];
  /** Called when the Cancel button inside the actions panel is clicked */
  onCancel: () => void;
  /** Called when the Agree button inside the actions panel is clicked */
  onAgree: () => void;
  /** Optional: called after any accordion section is toggled */
  onToggle?: (index: number) => void;
}

// ---------------------------------------------------------------------------
// AccordionMulti — multi-open accordion; sections at indices 1 and 2 are
// open by default.
// ---------------------------------------------------------------------------

function AccordionMulti({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: AccordionMultiProps): React.ReactElement {
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
        const isExpanded = open.has(i);
        const headerId = `${baseId}-header-${i}`;
        const bodyId = `${baseId}-body-${i}`;

        return (
          <div key={`${section.title}-${i}`}>
            <button
              type="button"
              id={headerId}
              aria-expanded={isExpanded}
              aria-controls={bodyId}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionHeader} ${isExpanded ? styles.isSelected : ''}`}
            >
              <span>{section.title}</span>
              <span className={styles.sectionChevron} aria-hidden="true">⌄</span>
            </button>

            <div
              id={bodyId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isExpanded}
              className={`${styles.sectionBody} ${isExpanded ? styles.isVisible : ''}`}
            >
              <p className={styles.bodyText}>{section.body}</p>

              {section.hasActions && (
                <div className={styles.buttonRow}>
                  <button
                    type="button"
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
            </div>
          </div>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Disclosure — innermost pattern wrapper (reserved for future independent
// open/closed state; currently delegates to AccordionMulti).
// FOUX_TODO: if this pattern needs its own open/closed state independent of
// the accordion, extract it into a standalone Disclosure component.
// ---------------------------------------------------------------------------

function Disclosure(props: DisclosureProps): React.ReactElement {
  return <AccordionMulti {...props} />;
}

// ---------------------------------------------------------------------------
// FouxDropAccTest — outer dropdown (open-dismiss pattern)
// ---------------------------------------------------------------------------

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onToggle,
}: FouxDropAccTestProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={ref}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="drop-acc-test-panel"
        onClick={() => setIsOpen((v) => !v)}
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
      >
        <span className={styles.triggerLabel}>{triggerLabel}</span>
        <span className={styles.chevron} aria-hidden="true">▼</span>
      </button>

      <div
        id="drop-acc-test-panel"
        role="menu"
        className={isOpen ? styles.isOpen : ''}
      >
        <Disclosure
          sections={sections}
          onCancel={onCancel}
          onAgree={onAgree}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}
