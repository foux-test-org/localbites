import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDaopenDesc.module.css';

// ---------------------------------------------------------------------------
// AccordionAction — a single in-panel button entry
// ---------------------------------------------------------------------------

export interface AccordionActionEntry {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — one entry in the accordion list
// ---------------------------------------------------------------------------

export interface AccordionSectionEntry {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: AccordionActionEntry[];
}

// ---------------------------------------------------------------------------
// PanelAccordion — multi-open accordion rendered inside the dropdown menu
// ---------------------------------------------------------------------------

interface PanelAccordionProps {
  sections: AccordionSectionEntry[];
  onToggle?: (index: number) => void;
  onAgree: () => void;
}

function PanelAccordion({ sections, onToggle, onAgree }: PanelAccordionProps): React.ReactNode {
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

  const headerClassFor = (i: number): string => {
    if (i === 0) return `${styles.section1Header} ${open.has(i) ? styles.isSelected : ''}`;
    if (i === 1) return `${styles.section2Header} ${open.has(i) ? styles.isSelected : ''}`;
    return `${styles.actionsHeader} ${open.has(i) ? styles.isSelected : ''}`;
  };

  const chevronClassFor = (i: number): string => {
    if (i === 0) return styles.section1Chevron;
    if (i === 1) return styles.section2Chevron;
    return styles.actionsChevron;
  };

  const headerTextClassFor = (i: number): string => {
    if (i === 0) return styles.section1HeaderText;
    if (i === 1) return styles.section2HeaderText;
    return styles.actionsHeaderText;
  };

  const bodyClassFor = (i: number): string => {
    if (i === 0) return `${styles.section1Body} ${open.has(i) ? styles.isVisible : ''}`;
    if (i === 1) return `${styles.section2Body} ${open.has(i) ? styles.isVisible : ''}`;
    return `${styles.actionsBody} ${open.has(i) ? styles.isVisible : ''}`;
  };

  const clipClassFor = (i: number): string => {
    if (i === 0) return styles.section1Clip;
    if (i === 1) return styles.section2Clip;
    return styles.actionsClip;
  };

  const innerClassFor = (i: number): string => {
    if (i === 0) return styles.section1Inner;
    if (i === 1) return styles.section2Inner;
    return styles.actionsInner;
  };

  const contentClassFor = (i: number): string => {
    if (i === 0) return styles.section1ContentText;
    if (i === 1) return styles.section2Content;
    return styles.actionsContent;
  };

  const buttonClassFor = (variant: AccordionActionEntry['variant']): string => {
    if (variant === 'cancel') return styles.cancelButton;
    return styles.agreeButton;
  };

  return (
    <>
      {sections.map((section, i) => (
        <div key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={headerClassFor(i)}
          >
            <span className={headerTextClassFor(i)}>{section.title}</span>
            <span className={chevronClassFor(i)}>∨</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={bodyClassFor(i)}
          >
            <div className={clipClassFor(i)}>
              <div className={innerClassFor(i)}>
                <p className={contentClassFor(i)}>{section.body}</p>
                {section.actions && section.actions.length > 0 && (
                  <div className={styles.buttons}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={buttonClassFor(action.variant)}
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
                          if (action.variant === 'agree') {
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
        </div>
      ))}
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDaopenDesc — outer dropdown that reveals the accordion on open
// ---------------------------------------------------------------------------

export interface FouxDaopenDescProps {
  label: string;
  sections: AccordionSectionEntry[];
  onOpenChange?: (open: boolean) => void;
  onAgree: () => void;
}

export function FouxDaopenDesc({
  label,
  sections,
  onOpenChange,
  onAgree,
}: FouxDaopenDescProps): React.ReactNode {
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
      <div className={styles.wrapper} ref={ref}>
        <button
          type="button"
          id={`${baseId}-trigger`}
          aria-controls={`${baseId}-menu`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => { setIsOpen((v) => !v); onOpenChange?.(!isOpen); }}
          className={`${styles.dropdownMenu} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <span className={styles.dropdownMenuText}>{label}</span>
          <span className={styles.dropdownArrow}>▼</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.menuPanel} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <PanelAccordion sections={sections} onAgree={onAgree} />
        </div>
      </div>
    </section>
  );
}
