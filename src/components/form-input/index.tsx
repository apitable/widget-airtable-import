import React from 'react';
import { Typography, TextInput } from '@apitable/components';
import styles from './index.css';
import { t } from '@apitable/widget-sdk';
import { Strings } from '../../utils';

interface IFormInput {
  label: string;
  required?: boolean;
  onChange?: (val: string) => void;
  value?: string;
  error?: string;
}

export const FormInput: React.FC<IFormInput> = props => {
  const { label, onChange, required, value, error } = props;
  const handleChange = (e) => {
    const value = e.target.value.trim();
    onChange?.(value);
  }
  return (
    <div className={styles.formInput}>
      <Typography variant="body3" className={styles.label}>
        {required && <span className={styles.formInputRequired}>*</span>}
        {label}
      </Typography>
      <TextInput
        error={!!error}
        block placeholder={t(Strings.placeholder)}
        onChange={handleChange}
        value={value}
      />
      {error && <div className={styles.formInputError}>{error}</div>}
    </div>
  )
}