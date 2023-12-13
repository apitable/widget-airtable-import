import React, { useEffect, useState, useContext } from 'react';
import { Button, LinkButton, Typography, colorVars } from '@apitable/components';
import { FormInput } from '../components/form-input';
import { FormSelect } from '../components/form-select';
import styles from './index.css';
import { t, useCloudStorage, useDatasheet } from '@apitable/widget-sdk';
import { IFormData, IFormName, IError } from '../types';
import { Strings, validateConfig } from '../utils';
import { isEmpty } from 'lodash';
import { Context } from '../context';
import { Base, Table } from '../types';
import { GetBases, GetTables } from '../apis';

interface ISetting {
  errors: IError;
  isBasesLoaded: boolean;
  setIsBasesLoaded: (isLoaded: boolean) => void;
  isTablesLoaded: boolean;
  setIsTablesLoaded: (isLoaded: boolean) => void;
}

export const Setting: React.FC<ISetting> = (props) => {
  const { errors, isBasesLoaded, setIsBasesLoaded, isTablesLoaded, setIsTablesLoaded } = props;
  const { setStep } = useContext(Context);
  const datasheet = useDatasheet();
  const [formData, setFormData, editable] = useCloudStorage<IFormData>(`airtable-import-${datasheet?.datasheetId}`, {
    personalAccessToken: '',
    baseId: '',
    tableId: '',
  });

  if (!editable) {
    return <div>t(Strings.no_edit_permission)</div>;
  }

  const handleKeyChange = (name: IFormName) => (val: string) => {
    if (name === IFormName.PersonalAccessToken) {
      setIsBasesLoaded(false);
      setIsTablesLoaded(false);
      setFormData({
        [IFormName.BaseId]: '',
        [IFormName.TableId]: '',
        [name]: val,
      });
    } else {
      setFormData({
        ...formData,
        [name]: val,
      });
    }
  };

  const [bases, setBases] = useState<Base[]>([]);
  const [tables, setTables] = useState<Table[]>([]);

  const baseOptions = bases.map((base) => ({
    value: base.id,
    label: base.name,
  }));

  const tableOptions = tables.map((table) => ({
    value: table.id,
    label: table.name,
  }));

  const [errorMessages, setErrorMessages] = useState({
    personalAccessTokenError: '',
  });

  // Get Base information when personalAccessToken is updated
  useEffect(() => {
    const load = async () => {
      if (formData.personalAccessToken) {
        try {
          const bases = await GetBases(formData.personalAccessToken);
          setBases(bases);
          setIsBasesLoaded(true);
          setErrorMessages({ personalAccessTokenError: '' });
        } catch (error) {
          setIsBasesLoaded(false);
          setErrorMessages({ personalAccessTokenError: (error as Error).message });
        }
      }
    };
    load();
  }, [formData.personalAccessToken]);

  // Get Table information when baseId is updated
  useEffect(() => {
    const load = async () => {
      if (formData.baseId) {
        const tables = await GetTables(formData.personalAccessToken, formData.baseId);
        if (tables) {
          setTables(tables);
          setIsTablesLoaded(true);
        } else {
          setIsTablesLoaded(true);
        }
      }
    };
    load();
  }, [formData.baseId]);

  const isValid = isEmpty(validateConfig(formData));

  return (
    <div className={styles.setting}>
      <Typography variant="h6" className={styles.settingTitle}>
        1. {t(Strings.setting_title)}
        <LinkButton href={t(Strings.help_url)} target="_blank" color={colorVars.textCommonSecondary}>
          {t(Strings.tutorial)}
        </LinkButton>
      </Typography>
      <div className={styles.formSetting}>
        <FormInput
          required
          label="Personal Access Token"
          onChange={handleKeyChange(IFormName.PersonalAccessToken)}
          value={formData.personalAccessToken}
          error={errors.personalAccessToken || errorMessages.personalAccessTokenError}
        />
        {errors.personalAccessToken || errorMessages.personalAccessTokenError ? null : (
          <>
            {isBasesLoaded && (
              <FormSelect
                required
                options={baseOptions}
                label="Base"
                onSelected={handleKeyChange(IFormName.BaseId)}
                value={formData.baseId}
                error={errors.baseId}
              />
            )}
            {isTablesLoaded && (
              <FormSelect
                required
                options={tableOptions}
                label="Table"
                onSelected={handleKeyChange(IFormName.TableId)}
                value={formData.tableId}
                error={errors.tableId}
              />
            )}
            {isTablesLoaded && (
              <FormInput label={`View ID (${t(Strings.optional)})`} onChange={handleKeyChange(IFormName.ViewId)} value={formData.viewId} />
            )}
          </>
        )}
      </div>
      <Button block disabled={!isValid} onClick={() => setStep(2)} color="primary">
        {t(Strings.next)}
      </Button>
    </div>
  );
};
