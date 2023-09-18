import { t } from '@apitable/widget-sdk';
import { IFormData, IError, IFormName } from '../types';
import { Strings } from './i18n';

export const validateConfig = (formData: IFormData) => {
  const errors: IError = {};
  if (!formData.apiKey) {
    errors[IFormName.ApiKey] = `${t(Strings.form_valid)} API Key`;
  }
  if (!formData.baseId || !formData.baseId.startsWith('app')) {
    errors[IFormName.BaseId] = `${t(Strings.form_valid)} Base ID`;
  }
  if (!formData.tableId || !formData.tableId.startsWith('tb')) {
    errors[IFormName.TableId] = `${t(Strings.form_valid)} Table ID`;
  }
  return errors;
}
