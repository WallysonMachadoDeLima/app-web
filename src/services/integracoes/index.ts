'use client';

import { apiBanners, apiMovies } from 'src/utils/axios';

// ----------------------------------------------------------------------

async function indexBanner(): Promise<any> {
  const response = await apiBanners.get(`/integracao/context`);

  return response.data;
}

async function indexFilme(): Promise<any> {
  const response = await apiMovies.get(`/integracao/context`);

  return response.data;
}

export const IntegracoesService = {
  indexBanner,
  indexFilme,
};
