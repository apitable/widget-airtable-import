export interface IRecord {
  createdTime: string;
  id: string;
  fields: object;
}

export interface IRecords {
  records: IRecord[];
}