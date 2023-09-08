import { Button, IconButton, LinkButton, Modal, showAlert, TextButton, Typography } from '@apitable/components';
import { getRecords } from '../apis';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IFieldMap, IFormData, IRecord } from '../types';
import styles from './index.css';
import { getFields, Strings } from '../utils';
import { concat, keys, omit, toPairs, values } from 'lodash';
import { TypeSelect } from '../components/type-select';
import { Context } from '../context';
import { AirTableImport } from '../airtable-import';
import { t, FieldType } from '@apitable/widget-sdk';
import { DeleteOutlined } from '@apitable/icons';
import { MAX_FIELDS_LEN } from '../constants';

interface IChooseField {
  formData: IFormData;
}

interface IError {
  error: {
    message: string;
    type: string;
  } | string
}

export const ChooseField: React.FC<IChooseField> = (props) => {
  const { formData } = props;
  const { step, setStep } = useContext(Context);
  const loadRef = useRef(false);
  // Airtable api limits that the data must be obtained in pages, with a maximum of 100 entries each time
  // The existence of offset indicates that there is still data. Continue to request
  const [data, setData]= useState<IRecord[] | IError>([]);

  useEffect(() => {
    const load = async () => {
      loadRef.current = true;
      let fetching = true;
      let offset = '';
      let records: IRecord[] = [];
      while(fetching) {
        const rlt = await getRecords(formData.apiKey, formData.baseId, formData.tableId, {
          offset,
          view: formData.viewId || ''
        });
        if (rlt.error) {
          loadRef.current = false;
          setData(rlt);
          return;
        } else {
          offset = rlt.offset;
          fetching = Boolean(offset);
          records = concat(records, rlt.records);
        }
      }
      loadRef.current = false;
      setData(records);
    }
    load();
  }, [])

  const isError = !Array.isArray(data);

  const [fieldMap, setFieldMap] = useState<IFieldMap>({});

  const isDataChange = !isError && data?.length;

  useEffect(() => {
    if (!isError) {
      const field = getFields(data);
      setFieldMap(field);
    } else {
      setFieldMap({});
    }
  }, [isDataChange])

  const fieldCount = keys(fieldMap).length;

  useEffect(() => {
    if (fieldCount > MAX_FIELDS_LEN) {
      showAlert({
        content: t(Strings.over_200_fields),
        type: 'error',
        closable: true,
        duration: 0
      });
    }
  }, [fieldCount])

  if (loadRef.current) return (
    <div className={styles.chooseFieldLoading}>
      {t(Strings.get_data)}...
    </div>
  );

  if (isError) {
    return (
      <div className={styles.chooseFieldError}>
        {typeof data?.error === 'object' && <Typography variant="body3"  className={styles.chooseFieldMes}>
          {data?.error.type}
        </Typography>}
        <Typography variant="h6" className={styles.chooseFieldText}>
          <span className={styles.chooseFieldErrorText}>
          {typeof data?.error === 'object' ? data?.error.message : data?.error}
          </span>
          <LinkButton
            href="https://help.aitable.ai/docs/guide/intro-widget-import-from-airtable/"
            target="_blank"
          >
            {t(Strings.help)}
          </LinkButton>
        </Typography>
        <Button onClick={() => {
          setStep(1);
  
        }} color="primary">
          {t(Strings.reset)}
        </Button>
      </div>
    )
  }

  const handleNext = () => {
    setStep(3);
  }

  const handlePre = () => {
    setStep(1);
  }

  // console.log('fieldMap', fieldMap);

  if (step === 3) {
    return <AirTableImport fieldMap={fieldMap} records={data} />
  }
  
  return (
    <div className={styles.chooseField}>
      <Typography variant="h6" className={styles.chooseFieldTitle}>
        2. {t(Strings.choose_field_type)} 
      </Typography>
      <Typography variant="body2" className={styles.chooseFieldDesc}>
        {t(Strings.field_edit_title)}
      </Typography>
      <div className={styles.fieldList}>
        <div className={styles.fieldListItem}>
          <div className={styles.fieldListItemLeft}>
            <Typography variant="h7">
              {t(Strings.pre_field_name)}
            </Typography>
          </div>
          <Typography variant="h7">
            {t(Strings.field_type)}
          </Typography>
        </div>
        {toPairs(fieldMap).map(([fieldKey, fieldType], index) => {
          return (
            <div key={`${fieldKey}-${index}`} className={styles.fieldListItem}>
              <div className={styles.fieldListItemLeft}>{fieldKey}</div>
              <TypeSelect
                value={fieldType[0]}
                fieldValue={fieldType[1]}
                setValue={(val) => {
                  setFieldMap({
                    ...fieldMap,
                    [fieldKey]: [val, fieldType[1]]
                  })
                }}
              />
              <IconButton
                className={styles.fieldListItemDelete}
                icon={DeleteOutlined}
                shape="square"
                onClick={() => {
                  const newFieldMap = omit(fieldMap, fieldKey);
                  setFieldMap(newFieldMap);
                }}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.chooseFieldAction}>
        <TextButton onClick={() => handlePre()}>
          {t(Strings.pre)}
        </TextButton>
        <Button disabled={fieldCount > MAX_FIELDS_LEN} onClick={() => {
          const hasAttachment = values(fieldMap).filter(fm => fm[0] === FieldType.Attachment).length > 0
          if (hasAttachment) {
            Modal.warning({
              title: t(Strings.waring_import_title),
              content: (
                <div className={styles.chooseFieldWarn}>
                  {t(Strings.waring_file_upload)}
                </div>
              ),
              okText: t(Strings.ok),
              closable: true,
              onOk: () => {
                handleNext();
              }
            });
          } else {
            handleNext();
          }
        }} color="primary">
          {t(Strings.start_import)}
        </Button>
      </div>
    </div>
  )
}
