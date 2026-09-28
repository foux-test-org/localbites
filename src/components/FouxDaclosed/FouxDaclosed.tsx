import React, { useId, useRef, useState, useEffect } from 'react';
import styles from './FouxDaclosed.module.css';

// ---------------------------------------------------------------------------
// AccordionSection — one collapsible panel row rendered inside the dropdown
// ---------------------------------------------------------------------------

interface AccordionSectionData {
  id: string;
  title: string;
  body: React.ReactNode;
  startsOpen?: boolean;
}

interface AccordionSectionProps {
  section: AccordionSectionData;
  index: number;
  isOpen: boolean;
  headerId: string;
  bodyId: string;
  onToggle: (index: number) => void;
}

function AccordionSection({
  section,
  index,
  isOpen,
  headerId,
  bodyId,
  onToggle,
}: AccordionSectionProps): React.ReactNode {
  return (
    <>
      <button
        type="button"
        id={headerId}
        aria-controls={bodyId}
        aria-expanded={isOpen}
        onClick={() => onToggle(index)}
        className={`${styles.sectionRow} ${isOpen ? styles.isSelected : ''}`}
      >
        <span className={styles.sectionLabelText}>{section.title}</span>
        <span className={styles.chevron}>{'∨'}</span>
      </button>
      <div
        id={bodyId}
        role="region"
        aria-labelledby={headerId}
        className={`${styles.sectionBodyRegion} ${isOpen ? styles.isVisible : ''}`}
      >
        <div className={styles.sectionClip}>
          <div className={styles.sectionInner}>{section.body}</div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// FouxDaclosed — dropdown trigger that reveals a multi-open accordion panel
// ---------------------------------------------------------------------------

export interface FouxDaclosedProps {
  /** Label shown on the dropdown trigger button */
  menuLabel: string;
  /** The three accordion sections rendered inside the dropdown */
  sections: AccordionSectionData[];
  /** Called after the dropdown open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Called after an accordion section is toggled */
  onToggle?: (index: number) => void;
}

export function FouxDaclosed({
  menuLabel,
  sections,
  onOpenChange,
  onToggle,
}: FouxDaclosedProps): React.ReactNode {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set(sections.flatMap((s, i) => (s.startsOpen ? [i] : []))),
  );

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

  const toggleSection = (i: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    onToggle?.(i);
  };

  const triggerId = `${baseId}-trigger`;
  const panelId = `${baseId}-panel`;

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.wrapper}>
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
          className={`${styles.menuHeader} ${isOpen ? styles.isOpen : ''}`}
        >
          <span className={styles.menuHeaderText}>{menuLabel}</span>
          <span className={styles.menuHeaderIcon}>{'▲'}</span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          {sections.map((section, i) => {
            const headerId = `${baseId}-section-header-${i}`;
            const bodyId = `${baseId}-section-body-${i}`;
            return (
              <React.Fragment key={section.id}>
                <AccordionSection
                  section={section}
                  index={i}
                  isOpen={openSections.has(i)}
                  headerId={headerId}
                  bodyId={bodyId}
                  onToggle={toggleSection}
                />
                {i === 0 && <div className={styles.sectionDivider1} />}
                {i === 1 && <div className={styles.sectionDivider2} />}
              </React.Fragment>
            );
          })}
          <div className={styles.bottomLineAccent} />
        </div>
      </div>
    </section>
  );
}
