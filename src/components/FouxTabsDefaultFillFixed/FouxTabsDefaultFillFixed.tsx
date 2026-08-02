import React, { useId, useState } from 'react';
import styles from './FouxTabsDefaultFillFixed.module.css';

export interface TabItem {
  label: string;
  panelTitle: string;
  panelTexts: string[];
}

export interface FouxTabsDefaultFillFixedProps {
  tabs: TabItem[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxTabsDefaultFillFixed({
  tabs,
  ariaLabel = 'Main navigation tabs',
  onSelect,
}: FouxTabsDefaultFillFixedProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
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
              {tab.panelTexts.map((text, j) => (
                <p key={`${tab.label}-text-${j}`} className={styles.panelText}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
