import React, { useId, useState } from 'react';
import styles from './FouxTabsTest.module.css';

export interface FouxTab {
  label: string;
  panelTitle: string;
  bodyLines: string[];
}

export interface FouxTabsTestProps {
  tabs: FouxTab[];
  onSelect?: (index: number) => void;
}

export function FouxTabsTest({ tabs, onSelect }: FouxTabsTestProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <div
          className={styles.tabbar}
          role="tablist"
          aria-label="Main navigation tabs"
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
              className={`${styles.tab} ${selected === i ? styles.isSelected : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className={styles.panels}>
          {tabs.map((tab, i) => (
            <div
              key={`${tab.label}-panel-${i}`}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              className={`${styles.panel} ${selected === i ? styles.isVisible : ''}`}
            >
              <h2 className={styles.panelTitle}>{tab.panelTitle}</h2>
              {tab.bodyLines.map((line, j) => (
                <p key={`${tab.label}-body-${j}`} className={styles.panelBody}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
