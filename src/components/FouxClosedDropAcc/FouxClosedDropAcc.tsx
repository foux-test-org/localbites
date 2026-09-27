// FOUX_TODO: FouxClosedDropAcc is ready to use — import and render it wherever Hero is currently rendered.
// Example: import { FouxClosedDropAcc } from 'src/components/FouxClosedDropAcc/FouxClosedDropAcc';

import React, { useId, useRef, useEffect, useState } from 'react';
import styles from './FouxClosedDropAcc.module.css';

// ---------------------------------------------------------------------------
// AccordionSectionData — data shape for one collapsible section inside the accordion
// ---------------------------------------------------------------------------

interface AccordionSectionData {
  id: string;
  title: string;
  body: React.ReactNode;
  labelClassName: string;
  startsOpen: boolean;
}

// ---------------------------------------------------------------------------
// ClosedDropAccAccordion — multi-open accordion rendered inside the dropdown panel
// ---------------------------------------------------------------------------

interface ClosedDropAccAccordionProps {
  sections: AccordionSectionData[];
  onToggle?: (index: number) => void;
}

function ClosedDropAccAccordion({
  sections,
  onToggle,
}: ClosedDropAccAccordionProps): React.ReactNode {
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
    <div className={styles.accordionInner}>
      {sections.map((section, i) => {
        const isExpanded = open.has(i);
        const isLast = i === sections.length - 1;
        return (
          <React.Fragment key={section.id}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isExpanded}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={`${styles.sectionRow} ${isExpanded ? styles.isOpen : ''}`}
            >
              <span className={section.labelClassName}>{section.title}</span>
              <span className={styles.chevron}>&#8744;</span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.sectionBody} ${isExpanded ? styles.isVisible : ''}`}
            >
              <div className={styles.sectionBodyClip}>
                <div className={styles.sectionBodyInner}>
                  {section.body}
                </div>
              </div>
            </div>
            {!isLast && (
              <div className={styles.sectionDivider} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxClosedDropAcc — outer open-dismiss dropdown that reveals the accordion
// ---------------------------------------------------------------------------

interface FouxClosedDropAccProps {
  label?: string;
  onOpenChange?: (open: boolean) => void;
  onToggle?: (index: number) => void;
}

export function FouxClosedDropAcc({
  label,
  onOpenChange,
  onToggle,
}: FouxClosedDropAccProps): React.ReactNode {
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

  // FOUX_TODO: replace with the real menu label string
  const menuLabel = label ?? 'Menu';

  // FOUX_TODO: replace with the real accordion sections — each entry needs id, title, body (ReactNode), labelClassName, and startsOpen
  const sections: AccordionSectionData[] = [
    {
      id: 'section-1',
      title: 'Section 1',
      body: <p className={styles.sectionBodyContent}>Section 1 content</p>,
      labelClassName: styles.section1Label,
      startsOpen: false,
    },
    {
      id: 'section-2',
      title: 'Section 2',
      body: <p className={styles.sectionBodyContent}>Section 2 content</p>,
      labelClassName: styles.section2Label,
      startsOpen: false,
    },
    {
      id: 'actions',
      title: 'Actions',
      body: <p className={styles.sectionBodyContent}>Actions content</p>,
      labelClassName: styles.actionsLabel,
      startsOpen: false,
    },
  ];
  // FOUX_TODO: end

  return (
    <section className={styles.container}>
      <div ref={ref} className={styles.container}>
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
          className={`${styles.menuHeader} ${isOpen ? styles.isOpen : ''}`}
        >
          <span>{menuLabel}</span>
          <span className={styles.menuHeaderIcon}>&#9650;</span>
        </button>
        <div
          id={`${baseId}-menu`}
          role="region"
          aria-labelledby={`${baseId}-trigger`}
          className={`${styles.accordionPanel} ${isOpen ? styles.isOpen : ''}`}
        >
          <div className={styles.accordionClip}>
            <ClosedDropAccAccordion sections={sections} onToggle={onToggle} />
          </div>
        </div>
      </div>
    </section>
  );
}
