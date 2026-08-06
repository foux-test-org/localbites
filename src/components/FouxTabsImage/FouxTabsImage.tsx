import React, { useId, useState } from 'react';
import styles from './FouxTabsImage.module.css';

// ---------------------------------------------------------------------------
// TabPanel — a single panel's content shape
// ---------------------------------------------------------------------------

export interface TabPanelData {
  label: string;
  title: string;
  description: string;
  stats: string;
  startsSelected?: boolean;
}

// ---------------------------------------------------------------------------
// FouxTabsImage — dark-themed tab group with four panels
// ---------------------------------------------------------------------------

export interface FouxTabsImageProps {
  tabs: TabPanelData[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxTabsImage({
  tabs,
  ariaLabel = 'Main navigation',
  onSelect,
}: FouxTabsImageProps): React.ReactNode {
  const baseId = useId();

  const [selected, setSelected] = useState(
    () => Math.max(0, tabs.findIndex((t) => t.startsSelected)),
  );

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <nav
          className={styles.tabBar}
          role="tablist"
          aria-label={ariaLabel}
        >
          {tabs.map((tab, i) => (
            <button
              key={`${tab.label}-${i}`}
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
        </nav>

        <div className={styles.panels}>
          <div className={styles.panelsGrid}>
            {tabs.map((tab, i) => (
              <div
                key={`${tab.label}-panel-${i}`}
                id={`${baseId}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${i}`}
                hidden={selected !== i}
                className={`${styles.panel}${selected === i ? ` ${styles.isVisible}` : ''}`}
              >
                <h2 className={styles.cardTitle}>{tab.title}</h2>
                <p className={styles.cardDescription}>{tab.description}</p>
                <p className={styles.cardStats}>{tab.stats}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
