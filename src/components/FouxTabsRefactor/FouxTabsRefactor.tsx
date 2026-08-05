import React, { useState } from 'react';
import styles from './FouxTabsRefactor.module.css';

// ---------------------------------------------------------------------------
// TabPanel — a single content panel shown when its tab is active
// ---------------------------------------------------------------------------

interface TabPanelProps {
  id: string;
  tabId: string;
  title: string;
  description: string;
  stats: string;
  isVisible: boolean;
}

function TabPanel({ id, tabId, title, description, stats, isVisible }: TabPanelProps): React.ReactNode {
  return (
    <div
      id={id}
      className={`${styles.card} ${isVisible ? styles.isVisible : ''}`}
      role="tabpanel"
      aria-labelledby={tabId}
    >
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
      <p className={styles.cardStats}>{stats}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FouxTabsRefactor — tab bar that controls which content panel is displayed
// ---------------------------------------------------------------------------

export interface TabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  stats: string;
}

interface FouxTabsRefactorProps {
  tabs: TabItem[];
  ariaLabel?: string;
  onSelect?: (id: string) => void;
}

export function FouxTabsRefactor({ tabs, ariaLabel = 'Navigation tabs', onSelect }: FouxTabsRefactorProps): React.ReactNode {
  const [selectedId, setSelectedId] = useState<string>(tabs[0]?.id ?? '');

  function handleTabClick(id: string): void {
    setSelectedId(id);
    onSelect?.(id);
  }

  return (
    <section className={styles.container}>
      <div className={styles.tabBar} role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => {
          const isSelected = selectedId === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`${styles.tab} ${isSelected ? styles.isSelected : ''}`}
              role="tab"
              aria-controls={`panel-${tab.id}`}
              aria-selected={isSelected}
              type="button"
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <TabPanel
          key={tab.id}
          id={`panel-${tab.id}`}
          tabId={`tab-${tab.id}`}
          title={tab.title}
          description={tab.description}
          stats={tab.stats}
          isVisible={selectedId === tab.id}
        />
      ))}
    </section>
  );
}
