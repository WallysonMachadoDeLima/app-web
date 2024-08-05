'use client';

import { apiBusiness } from 'src/utils/axios';

// ----------------------------------------------------------------------

async function index(id: any): Promise<any> {
  const response = await apiBusiness.get(`/unidade/footer/${id}`);

  return response.data;
}

export const FooterService = {
  index,
};
