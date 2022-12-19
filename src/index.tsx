import React, { useEffect, useState } from 'react';
import { initializeWidget, t, useCloudStorage, useDatasheet, useViewport } from '@apitable/widget-sdk';
import { Button } from '@apitable/components';
import { Setting } from './setting';
import styles from './index.css';
import { IFormData } from './types';
import { Strings, validateConfig } from './utils';
import { ChooseField } from './choose-field';
import { Context } from './context';


export const Main: React.FC = () => {

  const datasheet = useDatasheet();
  const [formData] = useCloudStorage<IFormData>(`airtable-import-${datasheet?.datasheetId}`, {
    apiKey: '',
    baseId: '',
    tableId: ''
  });

  const { isFullscreen, toggleFullscreen } = useViewport();

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isFullscreen) {
      setStep(0);
    }
  }, [isFullscreen])
  const errors = validateConfig(formData);
  const handleNext = () => {
    if (!isFullscreen) {
      toggleFullscreen(true);
    }
    setStep(step + 1);
  }

  return (
   <div className={styles.importContainer}>
     <Context.Provider
        value={{
          step, setStep
        }}
      >
        {step === 0 && (
          <div className={styles.importMain}>
            <div className={styles.title}>
              {
                t(Strings.start_import_title)
              }
            </div>
            <Button  color="primary" onClick={() => handleNext()}>
              {t(Strings.start_import)}
            </Button>
          </div>
        )}
        {step === 1 && <Setting errors={errors} />}
        {step > 1 && <ChooseField formData={formData} />}
      </Context.Provider>
   </div>
  );
};

initializeWidget(Main, process.env.WIDGET_PACKAGE_ID);
