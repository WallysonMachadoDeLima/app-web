'use client';

import { apiSite } from 'src/utils/axios';
import { getLocalItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

async function index(unit: any, movie: any, date: any): Promise<any> {
  const response = await apiSite.get(`/programacao/sessao/${unit}/${movie}/${date}`);

  return response.data;
}

export const SessionService = {
  index,
};
