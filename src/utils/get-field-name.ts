import { IFieldMap, IRecord } from '../types';
import { set, toPairs, union } from 'lodash';
import { FieldType } from '@apitable/widget-sdk';
import { FIELD_GROUPS } from '../constants';

export const getFields = (records?: IRecord[]): IFieldMap => {

  if (!records) return {};

  return records.reduce((pre, cur) => {
    toPairs(cur.fields).map(([fieldKey, fieldValue]) => {
      if (!pre[fieldKey]) {
        const type = getFieldType(fieldValue);
        pre[fieldKey] = [type, []];
      }
      // if fieldValue has multiple types, set it as text type
      if (pre[fieldKey]) {
        const type = getFieldType(fieldValue);
        if (pre[fieldKey][0] != type) {
          set(pre[fieldKey], 0, FieldType.Text);
        }
      }
      // Collect multi-select default values and add default options in addField
      // fieldValue is array
      if (pre[fieldKey][0] === FieldType.MultiSelect) {
        const defaultOptions = union(pre[fieldKey][1], fieldValue);
        set(pre[fieldKey], 1, defaultOptions);
      } else if (pre[fieldKey][0] === FieldType.Checkbox) {
        set(pre[fieldKey], 1, true);
      } else if (
        FIELD_GROUPS.number.includes(pre[fieldKey][0])
      ) {
        const max = Math.max(pre[fieldKey][1], fieldValue);
        set(pre[fieldKey], 1, Math.max(max, 5));
      } else { // fieldValue is string
        // const defaultOptions = union(pre[fieldKey][1], [fieldValue]);
        set(pre[fieldKey], 1, fieldValue);
      }
    });
    return pre;
  }, {});
}

const getFieldType = (fieldValue) => {
 if (Array.isArray(fieldValue)) {
    if (fieldValue[0]?.url) {
      return FieldType.Attachment;
    }
    if (typeof fieldValue === 'object') {
      return FieldType.Text;
    }
    return FieldType.MultiSelect
  } else if (typeof fieldValue === 'boolean') {
    return FieldType.Checkbox;
  } else if (typeof fieldValue === 'number' && !isNaN(fieldValue)) {
    return FieldType.Number;
  }
  return FieldType.Text;
}