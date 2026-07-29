import React, { useId, useRef, useState, useEffect } from 'react';
import styles from './FouxDropAccTest.module.css';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

export interface AccordionMultiProps {
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onToggle?: (index: number) => void;
}

export interface DropdownProps {
  label: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
}

export interface FouxDropAccTestProps {
  label: string;
  sections: AccordionSection[];
  onCancel: () => void;
  onAgree: () => void;
  onOpenChange?: (open: boolean) => void;
}

// ---------------------------------------------------------------------------
// AccordionMulti — nested inside the dropdown menu
// ---------------------------------------------------------------------------

export function AccordionMulti({
  sections,
  onCancel,
  onAgree,
  onToggle,
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

  const actionIndex = sections.length - 1;

  return (
    <div className={styles.accordion}>
      {sections.map((section, i) => {
        const isOpen = open.has(i);
        const isActionSection = i === actionIndex;

        const panelBody = isActionSection ? (
          <div className={`${styles.panelInner} ${styles.actionsInner}`}>
            <p>{section.body}</p>
            <div className={styles.btnRow}>
              <button
                type="button"
                className={styles.btnCancel}
                aria-label="Cancel"
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
                className={styles.btnAgree}
                aria-label="Agree"
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
        ) : (
          <div className={styles.panelInner}>
            <p>{section.body}</p>
          </div>
        );

        return (
          <div key={`${section.title}-${i}`} className={styles.section}>
            <button
              type="button"
              id={`${baseId}-header-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-body-${i}`}
              onClick={() => {
                toggle(i);
                onToggle?.(i);
              }}
              className={styles.sectionHeader}
            >
              <span>{section.title}</span>
              <span className={styles.chevron} aria-hidden="true">
                ⌃
              </span>
            </button>
            <div
              id={`${baseId}-body-${i}`}
              role="region"
              aria-labelledby={`${baseId}-header-${i}`}
              className={`${styles.panel} ${isOpen ? styles.isSelected : ''}`}
            >
              <div className={styles.panelClip}>
                {panelBody}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dropdown — wraps the accordion in an open-dismiss menu
// ---------------------------------------------------------------------------

export function Dropdown({
  label,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: DropdownProps): React.ReactNode {
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
  }, [isOpen]);

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open menu"
        onClick={() => {
          setIsOpen((v) => !v);
          onOpenChange?.(!isOpen);
        }}
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''}`}
      >
        <span>{label}</span>
        <span className={styles.triggerChevron} aria-hidden="true">
          ▼
        </span>
      </button>

      <div
        role="menu"
        className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}
      >
        <AccordionMulti
          sections={sections}
          onCancel={onCancel}
          onAgree={onAgree}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxDropAccTest — root component
// ---------------------------------------------------------------------------

export function FouxDropAccTest({
  label,
  sections,
  onCancel,
  onAgree,
  onOpenChange,
}: FouxDropAccTestProps): React.ReactNode {
  return (
    <section className={styles.container}>
      <Dropdown
        label={label}
        sections={sections}
        onCancel={onCancel}
        onAgree={onAgree}
        onOpenChange={onOpenChange}
      />
    </section>
  );
}
