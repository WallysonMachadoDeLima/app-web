interface Ingresso {
  cod: number;
  tipoPoltrona: string;
  valor: string;
}

interface TipoProjecao {
  cod: number;
  projecao: string;
  ingresso: Ingresso[];
}

interface Experiencia {
  id: number;
  nome: string;
  descricao: string;
  tipoProjecao: TipoProjecao[];
}

interface IPrecos {
  id: number;
  nome: string;
  experiencia: Experiencia[];
}
