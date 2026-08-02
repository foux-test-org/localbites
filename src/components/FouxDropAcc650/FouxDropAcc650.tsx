import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAcc650.module.css';

// --- Types ---

export interface AccordionSection {
  title: string;
  body: string;
}

// --- Child: DropdownAccordion (disclosure inside the dropdown menu) ---

interface DropdownAccordionInnerProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

function DropdownAccordion({
  sections,
  onCancel,
  onAgree,
  onToggle,
}: DropdownAccordionInnerProps): React.ReactNode {
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
        const isOpen = open.has(i);
        // Section index 2 ("Actions") has both Cancel and Agree buttons
        const hasActions = i === 2;

        return (
          <div key={`${section.title}-${i}`} className={styles.panel}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.panelHeader}
            >
              <span className={styles.panelTitle}>{section.title}</span>
              <span
                className={`${styles.panelChevron} ${isOpen ? styles.isOpen : ''}`}
                aria-hidden="true"
              >
                {isOpen ? '⌃' : '⌄'}
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panelRegion} ${isOpen ? styles.isOpen : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
              <div>
                <div className={styles.panelBody}>
                  <p className={styles.bodyText}>{section.body}</p>
                  {hasActions && (
                    <div className={styles.actions}>
                      <button
                        type="button"
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

// --- Root: FouxDropAcc650 ---

export interface FouxDropAcc650Props {
  menuLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
}

export function FouxDropAcc650({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onToggle,
  onOpenChange,
}: FouxDropAcc650Props): React.ReactNode {
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
      <div ref={ref} className={styles.inner}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => {
            setIsOpen((v) => !v);
            onOpenChange?.(!isOpen);
          }}
          className={`${styles.menuTrigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.chevron} aria-hidden="true">
            ▼
          </span>
        </button>

        {/* Dropdown menu surface — revealed by isOpen class */}
        <div
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          {/* bare clip wrapper — NO padding/border/background */}
          <div>
            <DropdownAccordion
              sections={sections}
              onCancel={onCancel}
              onAgree={onAgree}
              onToggle={onToggle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
