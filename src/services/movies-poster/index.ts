'use client';

import { apiSite } from 'src/utils/axios';
import { getLocalItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

async function index(id: number): Promise<any> {
  const response = await apiSite.get(`/programacao/filme/exibicao/${id}`);

  return response.data;
}


async function showSessions(id: number, filme: number, date: string): Promise<any> {
  const response = await apiSite.get(`programacao/sessao/${id}/${filme}/${date}`);

  return response.data;
}

export const MoviesPosterService = {
  index,
  sessions: {
    show: showSessions
  }
};
