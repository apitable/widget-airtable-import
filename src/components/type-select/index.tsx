import { Select } from '@apitable/components';
import React, { useMemo } from 'react';
import { getOptions } from '../../utils';

export const TypeSelect: React.FC<any> = props => {
  const { value, setValue, fieldValue } = props;
  const options = useMemo(() => {
    return getOptions(value, fieldValue);
  }, [value])
  return (
    <Select
      disabled={options.length === 1}
      options={options as any}
      value={value}
      onSelected={(option) => {
        setValue(option.value);
      }}
    />
  )
}