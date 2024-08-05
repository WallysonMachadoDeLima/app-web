'use client';

import { apiSite } from 'src/utils/axios';
import { getSessionItem, setSessionItem } from 'src/utils/storage';

// ----------------------------------------------------------------------

async function index(): Promise<any> {
  const sessionData = getSessionItem(`context-unidade`);
  if (sessionData) return sessionData;

  const response = await apiSite.get('/home/unidade');

  setSessionItem(`context-unidade`, response.data);
  return response.data;
}

export const UnidadeServices = {
  index,
};
