import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxDropAccFigmaB.module.css';

// ---------------------------------------------------------------------------
// AccordionAction — a single in-panel button entry
// ---------------------------------------------------------------------------

interface AccordionAction {
  id: string;
  label: string;
  ariaLabel: string;
  variant: 'cancel' | 'agree';
  onPress: () => void;
}

// ---------------------------------------------------------------------------
// AccordionSection — one entry in the sections list
// ---------------------------------------------------------------------------

interface AccordionSection {
  id: string;
  title: string;
  body: string;
  startsOpen: boolean;
  actions?: AccordionAction[];
}

// ---------------------------------------------------------------------------
// DropdownAccordion — the nested disclosure (accordion inside the dropdown panel)
// ---------------------------------------------------------------------------

interface DropdownAccordionProps {
  sections: AccordionSection[];
  menuTriggerId: string;
  menuPanelId: string;
  isMenuOpen: boolean;
  onToggle?: (index: number) => void;
}

function DropdownAccordion({
  sections,
  menuTriggerId,
  menuPanelId,
  isMenuOpen,
  onToggle,
}: DropdownAccordionProps): React.ReactNode {
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
    <div
      id={menuPanelId}
      role="region"
      aria-labelledby={menuTriggerId}
      className={`${styles.accordion} ${isMenuOpen ? styles.isOpen : ''}`}
    >
      {sections.map((section, i) => (
        <React.Fragment key={section.id}>
          {i > 0 && <div className={styles.divider} aria-hidden="true" />}
          <button
            type="button"
            id={`${baseId}-header-${i}`}
            aria-expanded={open.has(i)}
            aria-controls={`${baseId}-body-${i}`}
            onClick={() => {
              toggle(i);
              onToggle?.(i);
            }}
            className={`${styles.header} ${open.has(i) ? styles.isOpen : ''}`}
          >
            <span className={styles.headerText}>{section.title}</span>
            <svg
              className={styles.chevron}
              width="14"
              height="7"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 1L7 6L13 1" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.bodyRegion} ${open.has(i) ? styles.isOpen : ''}`}
          >
            <div className={styles.clip}>
              <div className={styles.bodyInner}>
                <p className={styles.bodyText}>{section.body}</p>
                {section.actions && section.actions.length > 0 && (
                  <div className={styles.buttonRow}>
                    {section.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        aria-label={action.ariaLabel}
                        className={styles.btn}
                        onClick={() => {
                          setOpen((prev) => {
                            const next = new Set(prev);
                            next.delete(i);
                            return next;
                          });
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
        </React.Fragment>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccFigmaB — outer dropdown that reveals the accordion on trigger click
// ---------------------------------------------------------------------------

export interface FouxDropAccFigmaBProps {
  /** Label shown on the dropdown trigger button */
  triggerLabel: string;
  /** Sections rendered inside the accordion panel */
  sections: AccordionSection[];
  /** Called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called when an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccFigmaB({
  triggerLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDropAccFigmaBProps): React.ReactNode {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-menu`;

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
      <div className={styles.container} ref={ref}>
        <div className={styles.menuBar} style={{ position: 'relative' }}>
          <button
            type="button"
            id={triggerId}
            aria-controls={panelId}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => {
              const next = !isOpen;
              setIsOpen(next);
              onOpenChange?.(next);
            }}
            className={`${styles.menuTrigger} ${isOpen ? styles.isOpen : ''}`}
          >
            <span className={styles.menuText}>{triggerLabel}</span>
            <svg
              className={styles.caret}
              width="16"
              height="9"
              viewBox="0 0 16 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1 1L8 8L15 1" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </button>

          <DropdownAccordion
            sections={sections}
            menuTriggerId={triggerId}
            menuPanelId={panelId}
            isMenuOpen={isOpen}
            onToggle={onToggle}
          />
        </div>
      </div>
    </section>
  );
}
