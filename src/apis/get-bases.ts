import { AIRTABLE_API_VERSION, AIRTABLE_URL } from '../constants';
import { Base } from '../types';

export const GetBases = async (personalAccessToken: string) => {
  if (!personalAccessToken) {
    throw new Error('personalAccessToken is required');
  }

  const url = `${AIRTABLE_URL}/${AIRTABLE_API_VERSION}/meta/bases`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${personalAccessToken}`,
      Host: AIRTABLE_URL,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized: Error Personal Access Token.');
    } else {
      const json = await response.json();
      throw new Error(json.error.message || 'Error fetching bases, please check your Personal Access Token.');
    }
  }

  const json = await response.json();
  const bases = json.bases.map((base: Base) => ({ id: base.id, name: base.name }));
  return bases;
};
