import { createContext, useCallback, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import {
  estadoInicial,
  migrarProgressoSalvo,
  aplicarAcerto,
  aplicarErro,
  aplicarConclusaoLicao,
  recarregarVidas,
} from '../utils/progressRules.js';

const CHAVE = 'bx-progresso';
const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progresso, setProgresso] = useLocalStorage(CHAVE, estadoInicial, migrarProgressoSalvo);

  const registrarAcerto = useCallback(
    (exercicioId) => setProgresso((e) => aplicarAcerto(e, exercicioId)),
    [setProgresso],
  );

  const registrarErro = useCallback(
    (conceito, exercicioId) => setProgresso((e) => aplicarErro(e, conceito, exercicioId)),
    [setProgresso],
  );

  const concluirLicao = useCallback(
    (licaoId) => setProgresso((e) => aplicarConclusaoLicao(e, licaoId)),
    [setProgresso],
  );

  const reabastecerVidas = useCallback(
    () => setProgresso((e) => recarregarVidas(e)),
    [setProgresso],
  );

  const resetarProgresso = useCallback(() => setProgresso(estadoInicial()), [setProgresso]);

  const valor = useMemo(
    () => ({
      progresso,
      registrarAcerto,
      registrarErro,
      concluirLicao,
      reabastecerVidas,
      resetarProgresso,
    }),
    [progresso, registrarAcerto, registrarErro, concluirLicao, reabastecerVidas, resetarProgresso],
  );

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress deve ser usado dentro de ProgressProvider');
  return ctx;
}
