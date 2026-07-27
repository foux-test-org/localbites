import React, { useId, useState, useEffect, useRef } from 'react';
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

interface DropdownAccordionProps {
  sections: AccordionSection[];
  triggerLabel: string;
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

interface AccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

// ---------------------------------------------------------------------------
// Inner accordion component (disclosure pattern)
// ---------------------------------------------------------------------------

function DropAccordion({ sections, onToggle, onCancel, onAgree }: AccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2, 3, 4]));

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
        const isExpanded = open.has(i);

        return (
          <div key={`${section.title}-${i}`}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={
                `${styles.panelHeader}${isLast ? ` ${styles.panelHeaderLast}` : ''}`
              }
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
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={
                `${styles.panelBody}${isExpanded ? ` ${styles.isOpen}` : ''}`
              }
            >
              <div className={styles.clip}>
                <div
                  className={
                    `${styles.inner}${section.hasActions ? ` ${styles.innerActions}` : ''}`
                  }
                >
                  <p>{section.body}</p>

                  {section.hasActions && (
                    <div className={styles.btnRow}>
                      <button
                        type="button"
                        aria-controls={`${baseId}-body-${i}`}
                        className={styles.btnCancel}
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
                        aria-controls={`${baseId}-body-${i}`}
                        className={styles.btnAgree}
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
          </div>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// Dropdown wrapper (open-dismiss pattern)
// ---------------------------------------------------------------------------

function DropdownAccordion({
  sections,
  triggerLabel,
  onOpenChange,
  onToggle,
  onCancel,
  onAgree,
}: DropdownAccordionProps): React.ReactNode {
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
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="drop-acc-test-menu"
        onClick={() => {
          setIsOpen((v) => !v);
          onOpenChange?.(!isOpen);
        }}
        className={
          `${styles.trigger}${isOpen ? ` ${styles.isOpen}` : ''}`
        }
      >
        <span>{triggerLabel}</span>
        <span className={styles.triggerIcon} aria-hidden="true">
          ▼
        </span>
      </button>

      <div
        id="drop-acc-test-menu"
        role="menu"
        className={
          `${styles.menu}${isOpen ? ` ${styles.isOpen}` : ''}`
        }
      >
        <DropAccordion
          sections={sections}
          onToggle={onToggle}
          onCancel={onCancel}
          onAgree={onAgree}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: FouxDropAccTestProps): React.ReactNode {
  return (
    <section className={styles.container}>
      <DropdownAccordion
        triggerLabel={triggerLabel}
        sections={sections}
        onOpenChange={onOpenChange}
        onToggle={onToggle}
        onCancel={onCancel}
        onAgree={onAgree}
      />
    </section>
  );
}
