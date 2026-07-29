import React, { useState } from 'react';
import styles from './FouxColorButtonGroup.module.css';

interface ButtonVariant {
  key: string;
  label: string;
  variantClass: string;
}

const BUTTON_VARIANTS: ButtonVariant[] = [
  { key: 'default',   label: 'Default',   variantClass: styles.btnDefault },
  { key: 'secondary', label: 'Secondary', variantClass: styles.btnSecondary },
  { key: 'tertiary',  label: 'Tertiary',  variantClass: styles.btnTertiary },
  { key: 'success',   label: 'Success',   variantClass: styles.btnSuccess },
  { key: 'danger',    label: 'Danger',    variantClass: styles.btnDanger },
  { key: 'warning',   label: 'Warning',   variantClass: styles.btnWarning },
  { key: 'dark',      label: 'Dark',      variantClass: styles.btnDark },
];

const GHOST_LABEL = 'Ghost';

interface FouxColorButtonGroupProps {
  onToggle?: (index: number) => void;
}

export function FouxColorButtonGroup({ onToggle }: FouxColorButtonGroupProps): React.ReactNode {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleItem = (i: number): void => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    onToggle?.(i);
  };

  return (
    <section
      id="color-button-group"
      className={styles.container}
      role="group"
      aria-label="Color Button Group"
    >
      <div className={styles.content}>
        <div
          className={styles.buttonRow}
          role="group"
          aria-label="Button variants"
        >
          {BUTTON_VARIANTS.map((variant, i) => (
            <button
              key={variant.key}
              type="button"
              role="checkbox"
              aria-checked={selected.has(i)}
              aria-pressed={selected.has(i)}
              onClick={() => toggleItem(i)}
              className={`${styles.btn} ${variant.variantClass}${
                selected.has(i) ? ` ${styles.isSelected}` : ''
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
        <span className={styles.ghost}>{GHOST_LABEL}</span>
      </div>
    </section>
  );
}
