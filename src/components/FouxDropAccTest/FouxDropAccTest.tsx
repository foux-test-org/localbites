import React, { useId, useState, useRef, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Inner: DropAccordion (disclosure / accordion nested inside the dropdown)
// ---------------------------------------------------------------------------

interface DropAccordionInnerProps {
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
}: DropAccordionInnerProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(new Set([1, 2]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const actionsIndex = sections.length - 1;

  return (
    <div className={styles.panel}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionsSection = i === actionsIndex;

        const bodyContent = isActionsSection ? (
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{section.body}</p>
            <div className={styles.actionsRow}>
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
          </div>
        ) : (
          <div className={styles.bodyInner}>
            <p className={styles.bodyText}>{section.body}</p>
          </div>
        );

        return (
          <div key={`${section.title}-${i}`} className={styles.accordionItem}>
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
              <span>{section.title}</span>
              <span
                className={`${styles.chevron} ${isOpen ? styles.isOpen : ''}`}
                aria-hidden="true"
              >
                {isOpen ? '⌃' : '⌄'}
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.body} ${isOpen ? styles.isOpen : ''}`}
            >
              {/* bare clip wrapper — NO padding/border/background */}
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

// ---------------------------------------------------------------------------
// Outer: FouxDropAccTest (dropdown wrapping the accordion)
// ---------------------------------------------------------------------------

export interface FouxDropAccTestProps {
  triggerLabel: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
}

export function FouxDropAccTest({
  triggerLabel,
  sections,
  onCancel,
  onAgree,
  onToggle,
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

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div ref={ref} className={styles.triggerWrap}>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-controls="drop-acc-menu"
            onClick={() => {
              const next = !isOpen;
              setIsOpen(next);
              onOpenChange?.(next);
            }}
            className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
          >
            <span>{triggerLabel}</span>
            <span className={styles.triggerIcon} aria-hidden="true">▼</span>
          </button>
          <div
            id="drop-acc-menu"
            role="region"
            className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
          >
            <DropAccordion
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
