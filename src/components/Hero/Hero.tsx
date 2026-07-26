import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Hero.module.css';
import { FouxDropAccTest } from "./FouxDropAccTest";

export function Hero(): React.ReactNode {
    // FOUX_TODO: replace with real trigger label
    const fouxTriggerLabel = 'Menu';
    // FOUX_TODO: replace with real section data
    const fouxSections: AccordionSection[] = [
      { title: 'Section 1', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Section 2', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Actions', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', hasActions: true },
    ];
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  // FOUX_TODO: possibly unused after this change
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchValue(e.target.value);
  }
  // FOUX_TODO: end

  // FOUX_TODO: possibly unused after this change
  function handleSearchSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchValue.trim())}`);
    }
  }
  // FOUX_TODO: end

  return (
    <section className={styles.hero}>
            <FouxDropAccTest
              triggerLabel={fouxTriggerLabel}
              sections={fouxSections}
              onCancel={() => {} /* FOUX_TODO: wire cancel action */}
              onAgree={() => {} /* FOUX_TODO: wire agree action */}
            />
          </section>
  );
}
