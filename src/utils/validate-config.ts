import {t} from "@apitable/widget-sdk";
import {IFormData, IError, IFormName} from "../types";
import {Strings} from "./i18n";

export const validateConfig = (formData: IFormData) => {
  const errors: IError = {};
  if (!formData.personalAccessToken) {
    errors[IFormName.PersonalAccessToken] = `${t(Strings.form_valid)} API Key`;
  }
  if (!formData.baseId) {
    errors[IFormName.BaseId] = `${t(Strings.form_valid)} Base ID`;
  }
  if (!formData.tableId) {
    errors[IFormName.TableId] = `${t(Strings.form_valid)} Table ID`;
  }
  return errors;
};
