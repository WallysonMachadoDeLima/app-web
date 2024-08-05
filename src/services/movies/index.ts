'use client';

import { apiMovies } from 'src/utils/axios';
import { getSessionItem } from 'src/utils/storage';

// ----------------------------------------------------------------------


async function show(id: any): Promise<any> {
  const response = await apiMovies.get(`/filme/view/${id}`);

  return response.data;
}


export const MoviesService = {
  show,
};
