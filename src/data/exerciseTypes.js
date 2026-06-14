// Tipos de exercício suportados pelo fluxo da lição.
export const TIPOS_EXERCICIO = {
  MULTIPLA: 'multipla',
  VF: 'vf',
  ASSOCIAR: 'associar',
  CLASSIFICAR: 'classificar',
  ABC: 'abc',
};

// Categorias usadas no exercício "classificar". Mantidas centralizadas aqui
// para reuso entre o conteúdo (curriculum) e o componente Classify.
export const CATEGORIAS_CLASSIFICACAO = [
  { id: 'comportamento', rotulo: 'Comportamento' },
  { id: 'antecedente', rotulo: 'Antecedente' },
  { id: 'consequencia', rotulo: 'Consequência' },
  { id: 'reforco-positivo', rotulo: 'Reforço positivo' },
  { id: 'reforco-negativo', rotulo: 'Reforço negativo' },
  { id: 'punicao', rotulo: 'Punição' },
  { id: 'extincao', rotulo: 'Extinção' },
  { id: 'operacao-motivadora', rotulo: 'Operação motivadora' },
  { id: 'estimulo-discriminativo', rotulo: 'Estímulo discriminativo' },
];

// Termos da contingência de três termos, usados no exercício "abc".
export const TERMOS_ABC = [
  { id: 'antecedente', rotulo: 'Antecedente (A)' },
  { id: 'comportamento', rotulo: 'Comportamento (B)' },
  { id: 'consequencia', rotulo: 'Consequência (C)' },
];
