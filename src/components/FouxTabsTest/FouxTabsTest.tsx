import React, { useId, useState } from 'react';
import styles from './FouxTabsTest.module.css';

export interface FouxTabsTestTab {
  label: string;
  panelTitle: string;
  panelBody: string[];
}

export interface FouxTabsTestProps {
  tabs: FouxTabsTestTab[];
  onSelect?: (index: number) => void;
}

export function FouxTabsTest({ tabs, onSelect }: FouxTabsTestProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.tablistWrapper}>
          <div
            role="tablist"
            className={styles.tablist}
            aria-label="TabsTest navigation"
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
          </div>
        </div>
        <div className={styles.panels}>
          {tabs.map((tab, i) => (
            <div
              key={`${tab.label}-panel-${i}`}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={selected !== i}
              className={`${styles.panel}${selected === i ? ` ${styles.isVisible}` : ''}`}
            >
              <h2 className={styles.panelTitle}>{tab.panelTitle}</h2>
              {tab.panelBody.map((bodyText, j) => (
                <p key={`${tab.label}-body-${j}`} className={styles.panelBody}>
                  {bodyText}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
