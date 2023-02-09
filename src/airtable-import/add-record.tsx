import { Button, Typography } from '@apitable/components';
import {
  FieldType, useActiveViewId, useDatasheet, useFields, upload, IAttachmentValue, t,
  getLanguage, LangType,
} from '@apitable/widget-sdk';
import { find, has, isEmpty } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getFileBlob, Strings } from '../utils';
import { IFieldMap, IRecord } from '../types';
import style from './index.css';
import { Context } from '../context';
import { MAX_FILE_SIZE } from '../constants';

interface IAddRecord {
  records?: IRecord[];
  fieldMap: IFieldMap;
}
export const AddRecord: React.FC<IAddRecord> = props => {
  const { records, fieldMap } = props;
  const [importing, setImporting] = useState(false);
  const { setStep } = useContext(Context);
  const datasheet = useDatasheet();
  const viewId = useActiveViewId();
  const fields = useFields(viewId);
  const successCountRef = useRef(0);
  const failCountRef = useRef(0);
  const stopRef = useRef(false);
  useEffect(() => {
    if (!datasheet?.datasheetId) {
      return;
    }
    const sync = async () => {
      if (records) {
        setImporting(true)
        let i = 0;
        while(i < records.length && !stopRef.current) {
          const record = records[i];
          let newRecord: object = {};
          for (const fieldName in record.fields) {
            const field = find(fields, { name: fieldName });
            if (!field || !fieldMap[fieldName]) {
              continue;
            } else {
              let recordValue = record.fields[fieldName];
              // Attachment adding line: obtain attachment blob => file with file name and file type => upload => add line
              // TODO: limit file blob size
              if (field.type === FieldType.Attachment) {
                const files: IAttachmentValue[] = [];
                for(let k = 0; k < recordValue.length; k++) {
                  const rv = recordValue[k];
                  const fileBlob = await getFileBlob(rv.url);
                  // Upload files smaller than 10MB
                  if (fileBlob.size < MAX_FILE_SIZE) {
                    const curFile = new File([fileBlob], rv.filename, {
                      type: rv.type
                    });
                    const uploadRlt = await upload({
                      file: curFile,
                      datasheetId: datasheet.datasheetId,
                    });
                    files.push({
                      ...uploadRlt,
                      name: rv.filename,
                    });
                  }
                }
                recordValue = files;
              } else if (
                field.type !== FieldType.MultiSelect &&
                Array.isArray(recordValue) &&
                typeof recordValue[0] === 'string'
              ) {
                recordValue = recordValue.join(',');
              } else if (field.type !== FieldType.MultiSelect && typeof recordValue === 'object') {
                recordValue = JSON.stringify(recordValue);
              } else if (field.type === FieldType.Text && typeof recordValue === 'number') {
                recordValue = JSON.stringify(recordValue);
              }
              newRecord[field.id] = recordValue;
            }
          }
          try {
            // Integer line null ignore
            if (!isEmpty(newRecord)) {
              const checkRlt = await datasheet.checkPermissionsForAddRecord(newRecord);
              if (checkRlt.acceptable) {
                await datasheet.addRecord(newRecord);
                  successCountRef.current++;
              } else {
                failCountRef.current++;
                console.error(checkRlt.message);
              }  
            }
          } catch (e) {
            failCountRef.current++;
            console.error(e);
          }
          i++;
        }
        setImporting(false);
      }
    }
    sync();
  }, []);

  const isZh = getLanguage() === LangType.ZhCN;

  const stopImport = () => {
    stopRef.current = true;
  }

  return (
    <div className={style.importAddRecord}>
      {!importing && !stopRef.current && (
        <img className={style.importAddRecordImg} src="https://legacy-s1.apitable.com/space/2022/12/22/ea175fa9bbc54753bec4a0a4d85b3ede" alt="succee image"/>
      )}
      <Typography variant="h6"  className={style.importProcess}>
        {!importing && !stopRef.current && (
          <span>
            {t(Strings.import_completed)}{t(Strings.dot)}
          </span>
        )}
        {!importing && stopRef.current && (
          <span>
            {t(Strings.import_stoped)}{t(Strings.dot)}
          </span>
        )}
        {isZh ? (
          <span>
            共 {records?.length} 行数据，已导入 
            <span className={style.importAddRecordSuccess}>{successCountRef.current}</span> 行、失败 
            <span className={style.importAddRecordFail}>{failCountRef.current}</span> 行
          </span>
        ): (
          <span>
            A total of {records?.length} records, 
            <span className={style.importAddRecordSuccess}>{successCountRef.current}</span> records has been imported, 
            <span className={style.importAddRecordFail}>{failCountRef.current}</span> records failed
          </span>
        )}
      </Typography>
      {importing && !stopRef.current && (
        <Button variant="fill" color="danger" onClick={() => stopImport()} className={style.importAddRecordBtn}>
          {t(Strings.stop_import)}
        </Button>
      )}
      {!importing && (
        <Button onClick={() => setStep(1)} color="primary" className={style.importAddRecordBtn}>
          {t(Strings.re_import)}
        </Button>
      )}
    </div>
  )
}