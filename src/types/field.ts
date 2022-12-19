import { FieldType } from '@apitable/widget-sdk';

export interface IFieldMap {
  [key: string]: [FieldType, string[] | string | number];
}