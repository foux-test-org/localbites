import React, { useState, useId, useRef, useEffect } from 'react';
import styles from './FouxAccDropDescriptionRequiredCallbacks.module.css';

// ---------------------------------------------------------------------------
// AccordionPanel — a single collapsible panel inside the accordion
// ---------------------------------------------------------------------------

interface AccordionPanelProps {
  headerId: string;
  panelId: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionPanel({
  headerId,
  panelId,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionPanelProps): React.ReactNode {
  return (
    <>
      <button
        type="button"
        id={headerId}
        className={`${styles.sectionHeader} ${isOpen ? styles.isOpen : ''}`}
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className={styles.sectionTitle}>{title}</span>
        <span className={styles.chevron}>⌄</span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`${styles.panel} ${isOpen ? styles.isOpen : ''}`}
      >
        <div>
          {children}
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// DropdownAccordion — open-dismiss dropdown containing a multi-open accordion
// ---------------------------------------------------------------------------

export interface AccordionSection {
  title: string;
  body: string;
}

interface DropdownAccordionProps {
  menuLabel: string;
  sections: AccordionSection[];
  actionsSection: {
    title: string;
    body: string;
  };
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
  onCancel: () => void;
  onAgree: () => void;
}

function DropdownAccordion({
  menuLabel,
  sections,
  actionsSection,
  onToggle,
  onOpenChange,
  onCancel,
  onAgree,
}: DropdownAccordionProps): React.ReactNode {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // multi-open accordion: initially open panels at index 1 and 2
  const [openPanels, setOpenPanels] = useState<Set<number>>(new Set([1, 2]));

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

  const togglePanel = (i: number) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    onToggle?.(i);
  };

  // The actions panel is at index sections.length (after all regular sections)
  const actionsPanelIndex = sections.length;

  const handleCancelClick = () => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      next.delete(actionsPanelIndex);
      return next;
    });
    onCancel();
  };

  const handleAgreeClick = () => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      next.delete(actionsPanelIndex);
      return next;
    });
    onAgree();
  };

  return (
    <div ref={ref}>
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
        className={`${styles.menuBar} ${isOpen ? styles.isOpen : ''}`}
      >
        <span className={styles.menuLabel}>{menuLabel}</span>
        <span className={styles.menuArrow}>▼</span>
      </button>

      <div
        id={`${baseId}-menu`}
        role="region"
        aria-labelledby={`${baseId}-trigger`}
        className={`${styles.accordion} ${isOpen ? styles.isOpen : ''}`}
      >
        {sections.map((section, i) => (
          <React.Fragment key={`${section.title}-${i}`}>
            <AccordionPanel
              headerId={`${baseId}-header-${i}`}
              panelId={`${baseId}-body-${i}`}
              title={section.title}
              isOpen={openPanels.has(i)}
              onToggle={() => togglePanel(i)}
            >
              <div className={styles.panelInner}>
                <p className={styles.bodyText}>{section.body}</p>
              </div>
            </AccordionPanel>
            <div className={styles.divider} />
          </React.Fragment>
        ))}

        <AccordionPanel
          headerId={`${baseId}-header-${actionsPanelIndex}`}
          panelId={`${baseId}-body-${actionsPanelIndex}`}
          title={actionsSection.title}
          isOpen={openPanels.has(actionsPanelIndex)}
          onToggle={() => togglePanel(actionsPanelIndex)}
        >
          <div className={styles.panelInner}>
            <p className={styles.bodyText}>{actionsSection.body}</p>
            <div className={styles.actionsRow}>
              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Cancel"
                onClick={handleCancelClick}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Agree"
                onClick={handleAgreeClick}
              >
                AGREE
              </button>
            </div>
          </div>
        </AccordionPanel>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxAccDropDescriptionRequiredCallbacks — outer section wrapper
// ---------------------------------------------------------------------------

// FOUX_TODO: reusable dropdown-accordion pattern — extract to shared/components only when a second call site needs it

export interface FouxAccDropDescriptionRequiredCallbacksProps {
  menuLabel: string;
  sections: AccordionSection[];
  actionsSection: {
    title: string;
    body: string;
  };
  onToggle?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
  onCancel: () => void;
  onAgree: () => void;
}

export function FouxAccDropDescriptionRequiredCallbacks({
  menuLabel,
  sections,
  actionsSection,
  onToggle,
  onOpenChange,
  onCancel,
  onAgree,
}: FouxAccDropDescriptionRequiredCallbacksProps): React.ReactNode {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <DropdownAccordion
          menuLabel={menuLabel}
          sections={sections}
          actionsSection={actionsSection}
          onToggle={onToggle}
          onOpenChange={onOpenChange}
          onCancel={onCancel}
          onAgree={onAgree}
        />
      </div>
    </section>
  );
}
