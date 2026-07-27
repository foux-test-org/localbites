import React, { useId, useState } from 'react';
import styles from './FouxSingleAccTest.module.css';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface FouxSingleAccTestProps {
  items: AccordionItem[];
  onSelect?: (index: number) => void;
}

export function FouxSingleAccTest({ items, onSelect }: FouxSingleAccTestProps): React.ReactNode {
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  function handleTriggerClick(index: number): void {
    setSelected(index);
    onSelect?.(index);
  }

  return (
    <section className={styles.container}>
      <div className={styles.inner}>
        {items.map((item, i) => {
          const isOpen = selected === i;
          const isLast = i === items.length - 1;
          const triggerId = `${baseId}-trigger-${i}`;
          const panelId = `${baseId}-panel-${i}`;

          return (
            <React.Fragment key={item.id}>
              <button
                id={triggerId}
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => handleTriggerClick(i)}
                className={styles.trigger}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={styles.chevron}>{isOpen ? '⌃' : '⌄'}</span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className={`${styles.region} ${isOpen ? styles.isVisible : ''}`}
              >
                <div>
                  <div className={styles.body}>{item.answer}</div>
                </div>
              </div>

              {!isLast && <hr className={styles.divider} />}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
