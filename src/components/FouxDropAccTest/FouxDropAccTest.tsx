import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ─── Accordion (nested inside the dropdown menu) ───────────────────────────────

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

function DropAccordion({ sections, onCancel, onAgree, onToggle }: DropAccordionProps): React.ReactNode {
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
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionsPanel = i === sections.length - 1;

        const bodyContent = isActionsPanel ? (
          <div className={`${styles.panelBody} ${styles.panelBodyActions}`}>
            <p>{section.body}</p>
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.btnCancel}
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
                className={styles.btnAgree}
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
          </div>
        ) : (
          <div className={styles.panelBody}>
            <p>{section.body}</p>
          </div>
        );

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
              className={`${styles.panelHeader} ${isOpen ? styles.isSelected : ''}`}
            >
              <span className={styles.panelTitle}>{section.title}</span>
              <span className={styles.panelChevron} aria-hidden="true">⌄</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={isOpen ? styles.isVisible : ''}
            >
              <div>
                {bodyContent}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── FouxDropAccTest (outer dropdown) ─────────────────────────────────────────

export interface FouxDropAccTestProps {
  menuLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
  onAccordionToggle?: (index: number) => void;
}

export function FouxDropAccTest({
  menuLabel,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
  onAccordionToggle,
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

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Toggle menu"
          onClick={() => {
            setIsOpen((v) => !v);
            onOpenChange?.(!isOpen);
          }}
          className={`${styles.menuTrigger} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.chevron} aria-hidden="true">▼</span>
        </button>

        <div
          role="menu"
          className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
        >
          <div className={styles.menuInner}>
            <DropAccordion
              sections={sections}
              onCancel={onCancel}
              onAgree={onAgree}
              onToggle={onAccordionToggle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
