// Regras de progresso centralizadas (funções puras). XP, vidas e ofensiva
// vivem aqui — os componentes apenas chamam estas funções via ProgressContext.

import { hojeISO, diffEmDias } from './date.js';

export const VERSAO_PROGRESSO = 1;
export const VIDAS_INICIAIS = 5;
export const XP_POR_LICAO = 10;

export function estadoInicial() {
  return {
    versao: VERSAO_PROGRESSO,
    xp: 0,
    vidas: VIDAS_INICIAIS,
    ofensiva: 0,
    ultimaData: null,
    licoesConcluidas: [],
    errosPorConceito: {},
    tentativasPorExercicio: {},
  };
}

// Normaliza/migra o progresso salvo. Como o schema ainda vai mudar, qualquer
// estado inválido ou de versão diferente volta ao estado inicial (com merge
// defensivo dos campos conhecidos para versões compatíveis).
export function migrarProgressoSalvo(bruto) {
  if (!bruto || typeof bruto !== 'object') return estadoInicial();
  if (bruto.versao !== VERSAO_PROGRESSO) return estadoInicial();
  return { ...estadoInicial(), ...bruto };
}

// Registra acerto de um exercício (apenas contabiliza a tentativa).
export function aplicarAcerto(estado, exercicioId) {
  return {
    ...estado,
    tentativasPorExercicio: incrementar(estado.tentativasPorExercicio, exercicioId),
  };
}

// Registra erro: perde 1 vida (mínimo 0) e contabiliza erro por conceito.
export function aplicarErro(estado, conceito, exercicioId) {
  return {
    ...estado,
    vidas: Math.max(0, estado.vidas - 1),
    errosPorConceito: incrementar(estado.errosPorConceito, conceito),
    tentativasPorExercicio: incrementar(estado.tentativasPorExercicio, exercicioId),
  };
}

// Conclui uma lição: soma XP, atualiza ofensiva e marca como concluída.
export function aplicarConclusaoLicao(estado, licaoId) {
  const hoje = hojeISO();
  let ofensiva = estado.ofensiva;

  if (estado.ultimaData === hoje) {
    // já estudou hoje: ofensiva não muda (garante pelo menos 1)
    ofensiva = Math.max(1, ofensiva);
  } else if (estado.ultimaData && diffEmDias(estado.ultimaData, hoje) === 1) {
    ofensiva = ofensiva + 1; // dia seguinte: incrementa
  } else {
    ofensiva = 1; // primeiro dia ou quebrou a sequência
  }

  const licoesConcluidas = estado.licoesConcluidas.includes(licaoId)
    ? estado.licoesConcluidas
    : [...estado.licoesConcluidas, licaoId];

  return {
    ...estado,
    xp: estado.xp + XP_POR_LICAO,
    ofensiva,
    ultimaData: hoje,
    licoesConcluidas,
  };
}

// Recarrega as vidas (chamado ao voltar para a trilha).
export function recarregarVidas(estado) {
  return { ...estado, vidas: VIDAS_INICIAIS };
}

function incrementar(mapa, chave) {
  if (!chave) return mapa;
  return { ...mapa, [chave]: (mapa[chave] || 0) + 1 };
}
