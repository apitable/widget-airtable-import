import React from 'react';
import { Typography, DropdownSelect } from '@apitable/components';
import styles from './index.css';

interface IFormSelect {
  options: { value: string; label: string }[];
  label: string;
  required?: boolean;
  onSelected?: (val: string) => void;
  value?: string;
  error?: string;
}

export const FormSelect: React.FC<IFormSelect> = (props) => {
  const { options, label, onSelected, required, value, error } = props;
  const handleChange = (e) => {
    const value = e.value.trim();
    onSelected?.(value);
  };
  return (
    <div className={styles.formSelect}>
      <Typography variant="body3" className={styles.label}>
        {required && <span className={styles.formSelectRequired}>*</span>}
        {label}
      </Typography>
      <DropdownSelect value={value} options={options} onSelected={handleChange} />
      {error && <div className={styles.formSelectError}>{error}</div>}
    </div>
  );
};
