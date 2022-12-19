import { Object } from 'ts-toolbelt';

export enum IFormName {
  ApiKey = 'apiKey',
  BaseId = 'baseId',
  TableId = 'tableId',
  ViewId = 'viewId',
}

export interface IFormData {
  [IFormName.ApiKey]: string;
  [IFormName.BaseId]: string;
  [IFormName.TableId]: string;
  [IFormName.ViewId]?: string;
}

export type IError = Object.Optional<IFormData>;


export interface IQuery {
  offset?: string;
  view?: string;
}