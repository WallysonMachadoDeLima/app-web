import { getLocalItem, setLocalItem } from 'src/utils/storage';
import { create } from 'zustand';

interface Props {
  state: {
    unidade: {
      id: number;
      nome: string;
    };
  };
  actions: {
    create: (unidade: any) => void;
    remove: () => void;
  };
}

export const useUnidade = create<Props>((set) => ({
  state: {
    unidade: getLocalItem('unidade') || { id: 0, nome: '' },
  },
  actions: {
    create: (unidade: any) => {
      set({ state: { unidade: unidade } });
      setLocalItem('unidade', unidade);
    },
    remove: () => {
      set({ state: { unidade: { id: 0, nome: '' } } });
      setLocalItem('unidade', { id: 0, nome: '' });
    },
  },
}));
