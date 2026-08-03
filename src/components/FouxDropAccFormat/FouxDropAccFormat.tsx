import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccFormat.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section's data
// ---------------------------------------------------------------------------
export interface AccordionSection {
  title: string;
  body: string;
}

// ---------------------------------------------------------------------------
// DropAccMultiAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface DropAccMultiAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

function DropAccMultiAccordion({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: DropAccMultiAccordionProps): React.ReactNode {
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
        const isOpen = open.has(i);
        const isLastSection = i === sections.length - 1;

        const bodyContent =
          isLastSection ? (
            <div className={`${styles.sectionBodyInner} ${styles.actionsBody}`}>
              <p className={styles.bodyText}>{section.body}</p>
              <div className={styles.buttonRow}>
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
            </div>
          ) : (
            <div className={styles.sectionBodyInner}>
              <p className={styles.bodyText}>{section.body}</p>
            </div>
          );

        return (
          <React.Fragment key={`${section.title}-${i}`}>
            {i > 0 && <div className={styles.divider} />}
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
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.dropAccSection} ${isOpen ? styles.isSelected : ''}`}
            >
              <div className={styles.clip}>
                {bodyContent}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFormat — dropdown trigger that reveals a multi-open accordion panel
// ---------------------------------------------------------------------------
export interface FouxDropAccFormatProps {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxDropAccFormat({
  menuLabel,
  sections,
  onOpenChange,
  onCancel,
  onAgree,
}: FouxDropAccFormatProps): React.ReactNode {
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
    <section className={styles.container}>
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
          className={`${styles.dropdownBar} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.dropAccMenuPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccMultiAccordion
            sections={sections}
            onCancel={onCancel}
            onAgree={onAgree}
          />
        </div>
      </div>
    </section>
  );
}
