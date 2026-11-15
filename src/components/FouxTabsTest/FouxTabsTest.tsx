import React, { useId, useState } from 'react';
import styles from './FouxTabsTest.module.css';

// ---------------------------------------------------------------------------
// TabPanel — data shape for a single tab and its associated panel content
// ---------------------------------------------------------------------------

export interface TabPanel {
  id: string;
  label: string;
  panelTitle: string;
  panelDescription: string;
  panelSummary: string;
  startsSelected?: boolean;
}

// ---------------------------------------------------------------------------
// FouxTabsTest — tab group that controls a set of content panels below it
// ---------------------------------------------------------------------------

export interface FouxTabsTestProps {
  tabs: TabPanel[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxTabsTest({
  tabs,
  ariaLabel = 'Navigation tabs',
  onSelect,
}: FouxTabsTestProps): React.ReactNode {
  const baseId = useId();

  const [selected, setSelected] = useState(
    () => Math.max(0, tabs.findIndex((t) => t.startsSelected)),
  );

  return (
    <section className={styles.container}>
      <div
        className={styles.tabBar}
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            id={`${baseId}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={selected === i}
            aria-controls={`${baseId}-panel-${i}`}
            onClick={() => {
              setSelected(i);
              onSelect?.(i);
            }}
            className={`${styles.tab} ${selected === i ? styles.isSelected : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.panelsWrapper}>
        {tabs.map((tab, i) => (
          <div
            key={tab.id}
            id={`${baseId}-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${i}`}
            className={`${styles.contentPanel} ${selected === i ? styles.isVisible : ''}`}
          >
            <h2 className={styles.panelTitle}>{tab.panelTitle}</h2>
            <p className={styles.panelDescription}>{tab.panelDescription}</p>
            <p className={styles.panelSummary}>{tab.panelSummary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
