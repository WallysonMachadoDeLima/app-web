'use client';

import { apiBanners } from 'src/utils/axios';
import { getLocalItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

async function index(id: any): Promise<any> {
  const response = await apiBanners.get(`/banner/carrossel/${id}`);

  return response.data;
}

export const BannerService = {
  index,
};
