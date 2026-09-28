import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDaopen.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — shape for a single accordion panel entry
// ---------------------------------------------------------------------------
export interface AccordionSectionAction {
  id: string;
  label: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

export interface AccordionSectionItem {
  id: string;
  title: string;
  bodyText: string;
  startsOpen: boolean;
  actions?: AccordionSectionAction[];
}

// ---------------------------------------------------------------------------
// FouxDaOpenAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------
interface FouxDaOpenAccordionProps {
  sections: AccordionSectionItem[];
  onToggle?: (index: number) => void;
}

function FouxDaOpenAccordion({ sections, onToggle }: FouxDaOpenAccordionProps): React.ReactNode {
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

  const getHeaderClass = (index: number): string => {
    if (index === 0) return `${styles.section1Header}${open.has(index) ? ' ' + styles.isSelected : ''}`;
    if (index === 1) return `${styles.section2Header}${open.has(index) ? ' ' + styles.isSelected : ''}`;
    return `${styles.actionsHeader}${open.has(index) ? ' ' + styles.isSelected : ''}`;
  };

  const getChevronClass = (index: number): string => {
    if (index === 0) return styles.section1Chevron;
    if (index === 1) return styles.section2Chevron;
    return styles.actionsChevron;
  };

  const getHeaderTextClass = (index: number): string => {
    if (index === 0) return styles.section1HeaderText;
    if (index === 1) return styles.section2HeaderText;
    return styles.actionsHeaderText;
  };

  const getRegionClass = (index: number): string => {
    if (index === 0) return `${styles.section1Region}${open.has(index) ? ' ' + styles.isVisible : ''}`;
    if (index === 1) return `${styles.section2Region}${open.has(index) ? ' ' + styles.isVisible : ''}`;
    return `${styles.actionsRegion}${open.has(index) ? ' ' + styles.isVisible : ''}`;
  };

  const getClipClass = (index: number): string => {
    if (index === 0) return styles.section1Clip;
    if (index === 1) return styles.section2Clip;
    return styles.actionsClip;
  };

  const getBodyClass = (index: number): string => {
    if (index === 0) return styles.section1Body;
    if (index === 1) return styles.section2Body;
    return styles.actionsBody;
  };

  const getBodyTextClass = (index: number): string => {
    if (index === 0) return styles.section1BodyText;
    if (index === 1) return styles.section2BodyText;
    return styles.actionsBodyText;
  };

  return (
    <div className={styles.panelInner}>
      {sections.map((section, i) => (
        <div key={section.id}>
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => { toggle(i); onToggle?.(i); }}
            className={getHeaderClass(i)}
          >
            <span className={getHeaderTextClass(i)}>{section.title}</span>
            <span className={getChevronClass(i)}>{open.has(i) ? '∧' : '∨'}</span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={getRegionClass(i)}
          >
            <div className={getClipClass(i)}>
              <div className={getBodyClass(i)}>
                <span className={getBodyTextClass(i)}>{section.bodyText}</span>
                {section.actions && section.actions.length > 0 && (
                  <div className={styles.buttonsRow}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className={
                          action.variant === 'cancel'
                            ? styles.cancelButton
                            : styles.agreeButton
                        }
                        onClick={action.onPress}
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
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDaopen — outer dropdown that reveals the accordion on trigger click
// ---------------------------------------------------------------------------
export interface FouxDaopenProps {
  triggerLabel: string;
  sections: AccordionSectionItem[];
  onOpenChange?: (open: boolean) => void;
}

export function FouxDaopen({
  triggerLabel,
  sections,
  onOpenChange,
}: FouxDaopenProps): React.ReactNode {
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
    <section id="daopen" className={styles.container}>
      <div className={styles.wrapper}>
        <div ref={ref} className={styles.dropdownContainer}>
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
            className={`${styles.dropdownMenu}${isOpen ? ' ' + styles.isOpen : ''}`}
          >
            <span className={styles.dropdownMenuText}>{triggerLabel}</span>
            <span className={styles.dropdownArrow}>▼</span>
          </button>
          <div
            id={`${baseId}-menu`}
            role="region"
            aria-labelledby={`${baseId}-trigger`}
            className={`${styles.dropdownPanel}${isOpen ? ' ' + styles.isOpen : ''}`}
          >
            <FouxDaOpenAccordion sections={sections} />
          </div>
        </div>
      </div>
    </section>
  );
}
