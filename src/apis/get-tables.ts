import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';
import { Table } from '../types';

export const GetTables = async (personalAccessToken: string, baseId: string) => {
  if (!personalAccessToken) return null;

  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/meta/bases/${baseId}/tables`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + personalAccessToken,
      Host: AIRTABLE_URL,
    },
  });

  const json = await response.json();
  const tables = json.tables.map((table: Table) => ({ id: table.id, name: table.name }));
  return tables;
};
