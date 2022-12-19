import { Typography } from '@apitable/components';
import { t, useDatasheet } from '@apitable/widget-sdk';
import React, { useState } from 'react';
import { useEffect } from 'react'
import { IFieldMap, IRecord } from '../types';
import { addField, sleep, Strings } from '../utils';
import { AddRecord } from './add-record';
import style from './index.css';

interface IAirTableImport {
  fieldMap: IFieldMap;
  records?: IRecord[] 
}

export const AirTableImport: React.FC<IAirTableImport> = props => {
  const { fieldMap, records } = props;
  const [importing, setImporting] = useState(true);
  const datasheet = useDatasheet();
  useEffect(() => {
    console.log('Create field ...');
    setImporting(true);
    const sync = async () => {
      await addField(fieldMap, datasheet);
      await sleep(3000);
      setImporting(false);
    }
    sync();
  }, [])
  if (!importing) {
    return <AddRecord records={records} fieldMap={fieldMap} />
  }
  return (
    <div className={style.importAddField}>
      <Typography variant="h3">
        {t(Strings.create_fields)}...
      </Typography>
    </div>
  )
}