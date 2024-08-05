'use client';

import { apiMovies } from 'src/utils/axios';

// ----------------------------------------------------------------------

async function index(id: any): Promise<any> {
  const response = await apiMovies.get(`/filme/breve/${id}`);

  return response.data;
}

export const MoviesShortlyService = {
  index,
};
