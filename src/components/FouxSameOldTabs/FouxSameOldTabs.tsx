import React, { useId, useState } from 'react';
import styles from './FouxSameOldTabs.module.css';

// ---------------------------------------------------------------------------
// TabPanel — renders a single panel's content inside the tab group
// ---------------------------------------------------------------------------

interface TabPanelContent {
  title: string;
  description: string;
  stats: string;
}

interface TabPanelProps {
  id: string;
  labelledBy: string;
  content: TabPanelContent;
  isVisible: boolean;
}

function TabPanel({ id, labelledBy, content, isVisible }: TabPanelProps): React.ReactNode {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!isVisible}
      className={`${styles.panel} ${isVisible ? styles.isVisible : ''}`}
    >
      <h2 className={styles.cardTitle}>{content.title}</h2>
      <p className={styles.cardDescription}>{content.description}</p>
      <p className={styles.cardStats}>{content.stats}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxSameOldTabs — tab group that controls the content of the panel below
// ---------------------------------------------------------------------------

export interface TabEntry {
  label: string;
  startsSelected?: boolean;
  panel: TabPanelContent;
}

export interface FouxSameOldTabsProps {
  tabs: TabEntry[];
  ariaLabel?: string;
  onSelect?: (index: number) => void;
}

export function FouxSameOldTabs({
  tabs,
  ariaLabel = 'SameOldTabs navigation',
  onSelect,
}: FouxSameOldTabsProps): React.ReactNode {
  const baseId = useId();

  const [selected, setSelected] = useState(
    () => Math.max(0, tabs.findIndex((t) => t.startsSelected)),
  );

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div
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
              className={`${styles.tab} ${selected === i ? styles.isSelected : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.panels}>
          {tabs.map((tab, i) => (
            <TabPanel
              key={`${tab.label}-${i}`}
              id={`${baseId}-panel-${i}`}
              labelledBy={`${baseId}-tab-${i}`}
              content={tab.panel}
              isVisible={selected === i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
