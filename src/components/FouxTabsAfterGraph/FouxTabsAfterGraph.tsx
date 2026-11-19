import React, { useId, useState } from 'react';
import styles from './FouxTabsAfterGraph.module.css';

// ---------------------------------------------------------------------------
// TabPanel — a single panel entry with title, description, and summary
// ---------------------------------------------------------------------------

interface TabPanelData {
  id: string;
  label: string;
  title: string;
  description: string;
  summary: string;
  startsSelected?: boolean;
}

// ---------------------------------------------------------------------------
// FouxTabsAfterGraph — tab bar that controls a stacked panel area below it
// ---------------------------------------------------------------------------

// FOUX_TODO: reusable tabs-after-graph pattern — if needed elsewhere, extract TabPanel and FouxTabsAfterGraph to a shared location

interface FouxTabsAfterGraphProps {
  tabs: TabPanelData[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxTabsAfterGraph({
  tabs,
  ariaLabel = 'Navigation tabs',
  onSelect,
}: FouxTabsAfterGraphProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(
    () => Math.max(0, tabs.findIndex((t) => t.startsSelected)),
  );

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
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
              className={`${styles.tab}${selected === i ? ` ${styles.isSelected}` : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.panels}>
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={selected !== i}
              className={`${styles.panelCard}${selected === i ? ` ${styles.isVisible}` : ''}`}
            >
              <h2 className={styles.panelTitle}>{tab.title}</h2>
              <p className={styles.panelDescription}>{tab.description}</p>
              <p className={styles.panelSummary}>{tab.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
