import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDaclosedWithDesc.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion section entry
// ---------------------------------------------------------------------------
export interface AccordionSectionControl {
  id: string;
  label: string;
  onPress: () => void;
}

export interface AccordionSection {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen?: boolean;
  controls?: AccordionSectionControl[];
}

// ---------------------------------------------------------------------------
// InnerAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface InnerAccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function InnerAccordion({ sections, onToggle }: InnerAccordionProps): React.ReactNode {
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
    <>
      {sections.map((section, i) => {
        const isLast = i === sections.length - 1;
        const panelClass =
          i === 0
            ? styles.accordionPanel
            : i === 1
            ? styles.section2Panel
            : styles.actionsPanel;

        return (
          <div key={section.id} className={panelClass}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={open.has(i)}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.sectionHeader}
            >
              <span>{section.title}</span>
              <span className={styles.chevronIcon}>&#8964;</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              hidden={!open.has(i)}
              className={styles.daclosed}
            >
              <div className={styles.sectionClip}>
                <div className={styles.sectionBody}>
                  {section.body}
                  {section.controls && section.controls.length > 0 && (
                    <div>
                      {section.controls.map((ctrl) => (
                        <button
                          key={ctrl.id}
                          type="button"
                          className={styles.actionBtn}
                          onClick={ctrl.onPress}
                        >
                          {ctrl.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {!isLast && i === 0 && <div className={styles.sectionDivider1} />}
            {!isLast && i === 1 && <div className={styles.sectionDivider2} />}
          </div>
        );
      })}
      <div className={styles.bottomBorderLine} />
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDaclosedWithDesc — dropdown trigger that reveals a collapsible accordion panel
// ---------------------------------------------------------------------------
export interface FouxDaclosedWithDescProps {
  label: string;
  sections: AccordionSection[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDaclosedWithDesc({
  label,
  sections,
  onOpenChange,
  onToggle,
}: FouxDaclosedWithDescProps): React.ReactNode {
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
      <div className={styles.wrapper}>
        <div ref={ref}>
          <div className={styles.triggerContainer}>
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
              className={`${styles.menuHeader} ${isOpen ? styles.isOpen : ''}`}
            >
              <span>{label}</span>
              <span className={styles.menuChevron}>&#9650;</span>
            </button>
          </div>
          <div
            id={`${baseId}-menu`}
            role="region"
            aria-labelledby={`${baseId}-trigger`}
            className={`${styles.dropdownPanel} ${isOpen ? styles.isOpen : ''}`}
          >
            <InnerAccordion sections={sections} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
