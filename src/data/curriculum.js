import { TIPOS_EXERCICIO } from './exerciseTypes.js';

// Conteúdo do app. Para adicionar/editar lições, basta mexer aqui.
//
// Estrutura:
//   unidade -> licoes -> blocos
//   bloco.tipo: 'ensino' | 'exemplo' | 'naoExemplo' | 'exercicio'
//   blocos de ensino/exemplo/naoExemplo têm `texto` (e `titulo` opcional)
//   blocos de exercício têm `exercicio` (schema rico, resposta por id)
//
// Schema do exercício (campos comuns):
//   id, tipo, conceito, objetivo, dificuldade,
//   feedbackAcerto, feedbackErro, explicacao, dica
// Campos específicos por tipo estão documentados em cada exercício abaixo.

export const curriculum = [
  {
    id: 'fundamentos',
    titulo: 'Fundamentos',
    descricao: 'O ponto de partida da Análise do Comportamento.',
    licoes: [
      {
        id: 'f1',
        titulo: 'Comportamento observável vs. explicação mentalista',
        resumo: 'Antes de explicar por que alguém faz algo, descrevemos o que a pessoa faz.',
        objetivo: 'Distinguir descrições de comportamento observável de rótulos mentalistas.',
        blocos: [
          {
            tipo: 'ensino',
            titulo: 'A ideia central',
            texto:
              'Na Análise do Comportamento, começamos descrevendo o que a pessoa faz — ações observáveis, em quais condições e com quais consequências. Evitamos explicar o comportamento por estados internos vagos ("é ansioso", "tem preguiça").',
          },
          {
            tipo: 'exemplo',
            texto:
              '"Quando o professor chamou seu nome, Maria fechou o caderno, levantou e saiu da sala." — descreve ações observáveis.',
          },
          {
            tipo: 'naoExemplo',
            texto:
              '"Maria é insegura." — é um rótulo/interpretação, não uma descrição do que ela fez.',
          },
          {
            tipo: 'exercicio',
            exercicio: {
              id: 'f1-e1',
              tipo: TIPOS_EXERCICIO.MULTIPLA,
              conceito: 'comportamento observável',
              objetivo: 'distinguir comportamento de rótulo mentalista',
              dificuldade: 1,
              pergunta: 'Qual alternativa descreve um comportamento observável?',
              opcoes: [
                { id: 'a', texto: 'João está ansioso' },
                { id: 'b', texto: 'João aperta as mãos e evita olhar para o professor' },
                { id: 'c', texto: 'João tem baixa autoestima' },
              ],
              correta: 'b',
              feedbackAcerto: 'Isso! A alternativa descreve ações observáveis no ambiente.',
              feedbackErro:
                '"Ansioso" e "baixa autoestima" são interpretações/rótulos, não descrições do que a pessoa faz.',
              explicacao:
                'Comportamento observável pode ser visto/medido: o que a pessoa faz, quando e com qual efeito.',
              dica: 'Procure verbos de ação observável.',
            },
          },
          {
            tipo: 'exercicio',
            exercicio: {
              id: 'f1-e2',
              tipo: TIPOS_EXERCICIO.VF,
              conceito: 'comportamento observável',
              objetivo: 'reconhecer rótulo mentalista',
              dificuldade: 1,
              afirmacao: '"Pedro é preguiçoso" é uma descrição de comportamento observável.',
              correta: false,
              feedbackAcerto: 'Exato. "Preguiçoso" é um rótulo, não uma descrição do que Pedro faz.',
              feedbackErro:
                'Na verdade é um rótulo. Uma descrição seria: "Pedro adiou a tarefa e ficou no celular por 40 min".',
              explicacao:
                'Rótulos resumem e julgam; descrições comportamentais dizem o que aconteceu, de forma observável.',
              dica: 'Dá para "ver" preguiça diretamente, ou só comportamentos específicos?',
            },
          },
          {
            tipo: 'exercicio',
            exercicio: {
              id: 'f1-e3',
              tipo: TIPOS_EXERCICIO.ASSOCIAR,
              conceito: 'descrição vs rótulo',
              objetivo: 'associar rótulo à sua reescrita comportamental',
              dificuldade: 2,
              instrucao: 'Associe cada rótulo a uma descrição comportamental correspondente.',
              pares: [
                { id: 'p1', conceito: 'É agitado', definicao: 'Levanta da cadeira várias vezes na aula' },
                { id: 'p2', conceito: 'É tímido', definicao: 'Fala baixo e não inicia conversas no recreio' },
                { id: 'p3', conceito: 'É dedicado', definicao: 'Entrega todas as tarefas no prazo' },
              ],
              feedbackAcerto: 'Boa! Cada rótulo virou uma descrição observável.',
              feedbackErro: 'Reveja: a descrição precisa dizer o que a pessoa faz, de forma observável.',
              explicacao: 'Transformar rótulos em descrições é um passo essencial da análise funcional.',
              dica: 'Para cada rótulo, pergunte: "o que eu veria a pessoa fazendo?"',
            },
          },
        ],
      },
      {
        id: 'f2',
        titulo: 'Contingência de três termos (ABC)',
        resumo: 'Todo comportamento ocorre num contexto: Antecedente → Comportamento → Consequência.',
        objetivo: 'Identificar os três termos (A-B-C) em uma situação cotidiana.',
        blocos: [
          {
            tipo: 'ensino',
            titulo: 'A-B-C',
            texto:
              'A contingência de três termos descreve a relação entre o Antecedente (o que acontece antes), o Comportamento (o que a pessoa faz) e a Consequência (o que acontece depois). Ela é a base para entender por que um comportamento se mantém.',
          },
          {
            tipo: 'exemplo',
            texto:
              'A: telefone toca → B: você atende → C: conversa com quem ligou.',
          },
          {
            tipo: 'exercicio',
            exercicio: {
              id: 'f2-e1',
              tipo: TIPOS_EXERCICIO.ABC,
              conceito: 'contingência de três termos',
              objetivo: 'separar antecedente, comportamento e consequência',
              dificuldade: 2,
              vinheta:
                'Quando a professora chama Pedro para ler em voz alta, ele diz que está com dor de barriga. A professora permite que ele saia da sala.',
              fragmentos: [
                { id: 'fr1', texto: 'A professora chama Pedro para ler em voz alta', termo: 'antecedente' },
                { id: 'fr2', texto: 'Pedro diz que está com dor de barriga', termo: 'comportamento' },
                { id: 'fr3', texto: 'A professora permite que ele saia da sala', termo: 'consequencia' },
              ],
              funcaoProvavel: 'Esquiva/evitação mantida por reforçamento negativo (sair da leitura).',
              feedbackAcerto: 'Correto! Você separou bem os três termos.',
              feedbackErro: 'Quase. Lembre: A vem antes, B é o que Pedro faz, C é o que acontece depois.',
              explicacao:
                'Saindo da sala, Pedro escapa da tarefa de leitura — uma consequência que tende a manter o comportamento.',
              dica: 'O que acontece ANTES, o que Pedro FAZ, e o que acontece DEPOIS?',
            },
          },
        ],
      },
      {
        id: 'f3',
        titulo: 'Reforçamento positivo',
        resumo: 'Quando uma consequência aumenta a frequência futura de um comportamento.',
        objetivo: 'Reconhecer exemplos de reforçamento positivo.',
        blocos: [
          {
            tipo: 'ensino',
            titulo: 'Reforço positivo',
            texto:
              'No reforçamento positivo, algo é ADICIONADO após o comportamento e isso AUMENTA a probabilidade de o comportamento ocorrer de novo. (Conteúdo de exemplo — expanda esta lição depois.)',
          },
          {
            tipo: 'exercicio',
            exercicio: {
              id: 'f3-e1',
              tipo: TIPOS_EXERCICIO.MULTIPLA,
              conceito: 'reforço positivo',
              objetivo: 'identificar reforçamento positivo',
              dificuldade: 2,
              pergunta: 'Qual situação é um exemplo de reforçamento positivo?',
              opcoes: [
                { id: 'a', texto: 'A criança arruma os brinquedos e os pais a elogiam; ela passa a arrumar mais vezes' },
                { id: 'b', texto: 'A criança leva uma bronca e para de gritar naquele momento' },
                { id: 'c', texto: 'O barulho irritante para quando você fecha a janela' },
              ],
              correta: 'a',
              feedbackAcerto: 'Isso! Algo agradável foi adicionado (elogio) e o comportamento aumentou.',
              feedbackErro: 'As outras envolvem remover/aplicar algo aversivo — não é reforço positivo.',
              explicacao: 'Reforço positivo = adiciona algo + aumenta o comportamento futuro.',
              dica: 'Procure onde algo foi ADICIONADO e o comportamento AUMENTOU.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'aprofundando',
    titulo: 'Aprofundando',
    descricao: 'Próximos passos (em breve).',
    bloqueada: true,
    licoes: [
      {
        id: 'a1',
        titulo: 'Operante vs. respondente',
        resumo: 'Em breve.',
        objetivo: 'Diferenciar comportamento operante de respondente.',
        blocos: [],
      },
      {
        id: 'a2',
        titulo: 'Reforço negativo, punição e extinção',
        resumo: 'Em breve.',
        objetivo: 'Distinguir os principais processos comportamentais.',
        blocos: [],
      },
    ],
  },
];
