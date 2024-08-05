'use client';

import { apiAuth } from 'src/utils/axios';

// ----------------------------------------------------------------------

async function index(id: any): Promise<any> {
  const response = await apiAuth.get(`/specta/ingresso/view/${id}`);

  return response.data;
}

export const PrecosService = {
  index,
};
