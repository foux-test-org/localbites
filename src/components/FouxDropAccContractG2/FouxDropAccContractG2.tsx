import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccContractG2.module.css';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: string;
}

export interface AccordionMultiProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export interface FouxDropAccContractG2Props {
  menuLabel: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

// ─── AccordionMulti (child component) ────────────────────────────────────────

export function AccordionMulti({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: AccordionMultiProps): React.ReactNode {
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
        const isActionsSection = i === sections.length - 1;

        const bodyContent = isActionsSection ? (
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionRegion} ${isOpen ? styles.isVisible : ''}`}
          >
            {/* bare clip wrapper — no className, no padding/border/background */}
            <div>
              <div className={styles.sectionInner}>
                <p className={styles.bodyText}>{section.body}</p>
                <div className={styles.actionsFooter}>
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
            </div>
          </div>
        ) : (
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionRegion} ${isOpen ? styles.isVisible : ''}`}
          >
            {/* bare clip wrapper — no className, no padding/border/background */}
            <div>
              <div className={styles.sectionInner}>
                <p className={styles.bodyText}>{section.body}</p>
              </div>
            </div>
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
              className={`${styles.sectionHeader} ${isOpen ? styles.isSelected : ''}`}
            >
              <span className={styles.sectionTitle}>{section.title}</span>
              <span className={styles.chevron}>⌄</span>
            </button>
            {bodyContent}
          </React.Fragment>
        );
      })}
    </>
  );
}

// ─── FouxDropAccContractG2 (outer component) ──────────────────────────────────

export function FouxDropAccContractG2({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
  onCancel,
  onAgree,
}: FouxDropAccContractG2Props): React.ReactNode {
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
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <AccordionMulti
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
