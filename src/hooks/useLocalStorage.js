import { useEffect, useRef, useState } from 'react';

// Hook genérico de persistência em localStorage.
// `normalizar` permite migrar/validar o valor lido (ex.: migrarProgressoSalvo).
export function useLocalStorage(chave, valorInicial, normalizar = (v) => v) {
  const [valor, setValor] = useState(() => {
    try {
      const bruto = localStorage.getItem(chave);
      if (bruto == null) return typeof valorInicial === 'function' ? valorInicial() : valorInicial;
      return normalizar(JSON.parse(bruto));
    } catch {
      return typeof valorInicial === 'function' ? valorInicial() : valorInicial;
    }
  });

  // Mantém a função normalizadora estável entre renders.
  const normalizarRef = useRef(normalizar);
  normalizarRef.current = normalizar;

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // armazenamento indisponível (ex.: modo privado) — ignora
    }
  }, [chave, valor]);

  return [valor, setValor];
}
