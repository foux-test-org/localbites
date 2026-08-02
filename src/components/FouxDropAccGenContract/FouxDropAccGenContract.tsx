import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './FouxDropAccGenContract.module.css';

// ─── Accordion (disclosure) ───────────────────────────────────────────────────

export interface AccordionSection {
  title: string;
  body: React.ReactNode;
}

interface AccordionProps {
  sections: AccordionSection[];
  onToggle?: (index: number) => void;
}

function Accordion({ sections, onToggle }: AccordionProps): React.ReactNode {
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
    <div className={styles.accordion}>
      {sections.map((section, i) => (
        <React.Fragment key={`${baseId}-section-${i}`}>
          {i > 0 && <div className={styles.divider} />}
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
            <span className={styles.sectionTitle}>{section.title}</span>
            <span
              className={`${styles.sectionChevron} ${
                open.has(i) ? styles['isOpen'] : ''
              }`}
            >
              {open.has(i) ? '⌃' : '⌄'}
            </span>
          </button>
          <div
            id={`${baseId}-body-${i}`}
            role="region"
            aria-labelledby={`${baseId}-header-${i}`}
            className={`${styles.sectionBody} ${
              open.has(i) ? styles['isOpen'] : ''
            }`}
          >
            {/* bare clip wrapper — NO padding/border/background */}
            <div>
              {section.body}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── FouxDropAccGenContract ───────────────────────────────────────────────────

export interface FouxDropAccGenContractProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** Text body for Section 1 */
  section1Body: string;
  /** Text body for Section 2 */
  section2Body: string;
  /** Text body for the Actions section */
  actionsBody: string;
  /** Label for the Cancel button */
  cancelLabel: string;
  /** Label for the Agree button */
  agreeLabel: string;
  /** Called when the Cancel button is clicked */
  onCancel: () => void;
  /** Called when the Agree button is clicked */
  onAgree: () => void;
  /** Optional: called when the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Optional: called when an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDropAccGenContract({
  menuLabel,
  section1Body,
  section2Body,
  actionsBody,
  cancelLabel,
  agreeLabel,
  onCancel,
  onAgree,
  onOpenChange,
  onToggle,
}: FouxDropAccGenContractProps): React.ReactNode {
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

  const accordionSections: AccordionSection[] = [
    {
      title: 'Section 1',
      body: (
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>{section1Body}</p>
        </div>
      ),
    },
    {
      title: 'Section 2',
      body: (
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>{section2Body}</p>
        </div>
      ),
    },
    {
      title: 'Actions',
      body: (
        <div className={`${styles.bodyInner} ${styles.actionsInner}`}>
          <p className={styles.bodyText}>{actionsBody}</p>
          <div className={styles.actionsFooter}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className={styles.agreeBtn}
              onClick={onAgree}
            >
              {agreeLabel}
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="drop-acc-panel"
          onClick={() => {
            const next = !isOpen;
            setIsOpen(next);
            onOpenChange?.(next);
          }}
          className={`${styles.menuTrigger} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <span className={styles.menuLabel}>{menuLabel}</span>
          <span className={styles.menuArrow}>▼</span>
        </button>

        <div
          id="drop-acc-panel"
          role="region"
          className={`${styles.dropdownPanel} ${isOpen ? styles['isOpen'] : ''}`}
        >
          <Accordion sections={accordionSections} onToggle={onToggle} />
        </div>
      </div>
    </section>
  );
}
