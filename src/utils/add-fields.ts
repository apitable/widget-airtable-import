import { Datasheet, FieldType, IField } from '@apitable/widget-sdk';
import { toPairs } from 'lodash';
import { IFieldMap } from '../types';

export const addField = async (fieldMap: IFieldMap, datasheet?: Datasheet) => {
  if (!datasheet) return null;
  await Promise.all(toPairs(fieldMap).map(([fieldKey, fieldTypes], index) => {
    let property: IField['property'] = null;
    let [fieldType, defaultOptions] = fieldTypes;
    if (fieldType === FieldType.SingleSelect || fieldType === FieldType.MultiSelect) {
      defaultOptions = typeof defaultOptions === 'string' ? [defaultOptions] : defaultOptions;
      property = {
        options: (defaultOptions as string[]).map(option => ({ name: option }))
      }
    } else if (fieldType === FieldType.DateTime) {
      property = {
        dateFormat: 'YYYY/MM/DD'
      }
    } else if (fieldType === FieldType.Checkbox) {
      property = {
        icon: 'white_check_mark'
      }
    } else if (fieldType === FieldType.Rating) {
      property = {
        max: Math.min(defaultOptions as number, 10), // No more than 10
        icon: 'star',
      }
    } else if (fieldType === FieldType.Percent) {
      property = {
        precision: 2,
      }
    } else if (fieldType === FieldType.Currency) {
      property = {
        precision: 2,
        symbol: '¥'
      }
    }
    const check = datasheet.checkPermissionsForAddField(fieldKey, fieldType, property);
    if (check.acceptable) {
      datasheet.addField(fieldKey, fieldType, property);
    } else {
      console.error(`Field ${fieldKey} add failed：${check.message}`);
    }
  }))
}