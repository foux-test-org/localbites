import React, { useId, useState } from 'react';
import styles from './FouxTabsTest.module.css';

export interface FouxTabsTestTab {
  label: string;
  panelTitle: string;
  panelBody: string[];
}

export interface FouxTabsTestProps {
  tabs: FouxTabsTestTab[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxTabsTest({
  tabs,
  ariaLabel = 'TabsTest navigation',
  onSelect,
}: FouxTabsTestProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.tabbarWrap}>
          <div
            className={styles.tablist}
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
                className={`${styles.tab} ${selected === i ? styles['isSelected'] : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.panelContainer}>
          {tabs.map((tab, i) => (
            <div
              key={`${tab.label}-panel-${i}`}
              id={`${baseId}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${i}`}
              hidden={selected !== i}
              className={`${styles.panel} ${selected === i ? styles.isVisible : ''}`}
            >
              <h2 className={styles.panelTitle}>{tab.panelTitle}</h2>
              {tab.panelBody.map((line, j) => (
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
