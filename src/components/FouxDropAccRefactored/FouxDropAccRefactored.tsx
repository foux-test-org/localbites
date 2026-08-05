import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './FouxDropAccRefactored.module.css';

// ---------------------------------------------------------------------------
// AccordionAction — a single in-panel action button entry
// ---------------------------------------------------------------------------
export interface AccordionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — one entry in the accordion section list
// ---------------------------------------------------------------------------
export interface AccordionSection {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen: boolean;
  hasDivider: boolean;
  actions?: AccordionAction[];
}

// ---------------------------------------------------------------------------
// DropAccAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface DropAccAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

function DropAccAccordion({
  sections,
  onToggle,
  onCancel,
  onAgree,
}: DropAccAccordionProps): React.ReactNode {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(sections.flatMap((s, i) => (s.startsOpen ? [i] : []))),
  );

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
        return (
          <React.Fragment key={section.id}>
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
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionRegion} ${isOpen ? styles.isVisible : ''}`}
            >
              <div>
                <div
                  className={`${styles.sectionInner}${
                    section.actions && section.actions.length > 0
                      ? ` ${styles.actionsInner}`
                      : ''
                  }`}
                >
                  {section.body}
                  {section.actions && section.actions.length > 0 && (
                    <div className={styles.btnRow}>
                      {section.actions.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          aria-label={action.label}
                          className={
                            action.variant === 'cancel'
                              ? styles.cancelBtn
                              : styles.agreeBtn
                          }
                          onClick={() => {
                            setOpen((prev) => {
                              const next = new Set(prev);
                              next.delete(i);
                              return next;
                            });
                            if (action.variant === 'cancel') {
                              onCancel();
                            } else {
                              onAgree();
                            }
                            action.onPress();
                          }}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {section.hasDivider && <div className={styles.divider} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccRefactored — dropdown trigger that reveals a multi-open accordion
// ---------------------------------------------------------------------------
export interface FouxDropAccRefactoredProps {
  label: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxDropAccRefactored({
  label,
  sections,
  onOpenChange,
  onToggle,
  onCancel,
  onAgree,
}: FouxDropAccRefactoredProps): React.ReactNode {
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
          className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
        >
          <span>{label}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.panel} ${isOpen ? styles.isOpen : ''}`}
        >
          <DropAccAccordion
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
