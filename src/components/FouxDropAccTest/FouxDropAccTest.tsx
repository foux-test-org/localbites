import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single collapsible panel entry
// ---------------------------------------------------------------------------

interface AccordionAction {
  id: string;
  label: string;
  onPress?: () => void;
}

export interface AccordionSectionEntry {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen?: boolean;
  actions?: AccordionAction[];
}

// ---------------------------------------------------------------------------
// DropAccordion — multi-open accordion rendered inside the dropdown
// ---------------------------------------------------------------------------

interface DropAccordionProps {
  sections: AccordionSectionEntry[];
  onToggle?: (index: number) => void;
}

function DropAccordion({ sections, onToggle }: DropAccordionProps): React.ReactNode {
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

  const sectionBodyClass = (i: number): string => {
    const isOpenClass = open.has(i) ? styles.isOpen : '';
    if (i === 0) return `${styles.section1Body} ${isOpenClass}`;
    if (i === 1) return `${styles.section2Body} ${isOpenClass}`;
    return `${styles.actionsBody} ${isOpenClass}`;
  };

  const sectionHeaderClass = (i: number): string => {
    if (i === 0) return `${styles.accordionHeader} ${styles.section1Header}`;
    if (i === 1) return `${styles.accordionHeader} ${styles.section2Header}`;
    return `${styles.accordionHeader} ${styles.actionsHeader}`;
  };

  const sectionLabelClass = (i: number): string => {
    if (i === 0) return styles.section1Label;
    if (i === 1) return styles.section2Label;
    return styles.actionsLabel;
  };

  const sectionChevronClass = (i: number): string => {
    if (i === 0) return styles.section1Chevron;
    if (i === 1) return styles.section2Chevron;
    return styles.actionsChevron;
  };

  const sectionBodyClipClass = (i: number): string => {
    if (i === 0) return styles.section1BodyClip;
    if (i === 1) return styles.section2BodyClip;
    return styles.actionsBodyClip;
  };

  const sectionBodyInnerClass = (i: number): string => {
    if (i === 0) return styles.section1BodyInner;
    if (i === 1) return styles.section2BodyInner;
    return styles.actionsBodyInner;
  };

  const sectionCloseActionClass = (i: number): string => {
    if (i === 0) return styles.section1CloseAction;
    if (i === 1) return styles.section2CloseAction;
    return styles.actionsCloseAction;
  };

  return (
    <div className={styles.accordionPanel}>
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={sectionHeaderClass(i)}
          >
            <span className={sectionLabelClass(i)}>{section.title}</span>
            <span className={sectionChevronClass(i)}>&#8744;</span>
          </button>

          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={sectionBodyClass(i)}
          >
            <div className={sectionBodyClipClass(i)}>
              <div className={sectionBodyInnerClass(i)}>
                <p className={styles.sectionBodyContent}>{section.body}</p>
                {section.actions && section.actions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    className={sectionCloseActionClass(i)}
                    onClick={() => {
                      setOpen((prev) => {
                        const next = new Set(prev);
                        next.delete(i);
                        return next;
                      });
                      action.onPress?.();
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {i === 0 && <div className={styles.sectionDivider1} />}
          {i === 1 && <div className={styles.sectionDivider2} />}
        </React.Fragment>
      ))}
      <div className={styles.bottomBorderLine} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccTest — outer dropdown that wraps the accordion disclosure
// ---------------------------------------------------------------------------

export interface FouxDropAccTestProps {
  label: string;
  sections: AccordionSectionEntry[];
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxDropAccTest({
  label,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccTestProps): React.ReactNode {
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
      <div className={styles.container}>
        <div ref={ref} className={styles.menuTriggerWrapper}>
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
            className={styles.menuHeader}
          >
            <span className={styles.menuHeaderText}>{label}</span>
            <span className={styles.menuHeaderIcon}>&#9650;</span>
          </button>

          <div
            id={`${baseId}-menu`}
            role="region"
            aria-labelledby={`${baseId}-trigger`}
            className={`${styles.dropdownPanel} ${isOpen ? styles.isOpen : ''}`}
          >
            <DropAccordion sections={sections} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
