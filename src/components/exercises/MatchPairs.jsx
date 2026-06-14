import { useMemo, useState } from 'react';

// Associa cada conceito à sua definição. Para cada conceito, o aluno escolhe
// (num menu) qual definição corresponde. As definições aparecem embaralhadas.
export default function MatchPairs({ exercicio, bloqueado, onResponder }) {
  const [escolhas, setEscolhas] = useState({}); // { [parId]: definicaoParId }

  const definicoesEmbaralhadas = useMemo(
    () => embaralhar(exercicio.pares.map((p) => ({ id: p.id, texto: p.definicao }))),
    [exercicio.pares],
  );

  const todasPreenchidas = exercicio.pares.every((p) => escolhas[p.id]);

  const verificar = () => {
    if (!todasPreenchidas) return;
    const acertou = exercicio.pares.every((p) => escolhas[p.id] === p.id);
    onResponder(acertou);
  };

  return (
    <div className="exercicio">
      <h2 className="exercicio__pergunta">{exercicio.instrucao || 'Associe os pares'}</h2>
      <div className="pares">
        {exercicio.pares.map((p) => (
          <div key={p.id} className="par">
            <span className="par__conceito">{p.conceito}</span>
            <select
              className="par__select"
              value={escolhas[p.id] || ''}
              disabled={bloqueado}
              onChange={(e) => setEscolhas((s) => ({ ...s, [p.id]: e.target.value }))}
            >
              <option value="" disabled>
                escolha…
              </option>
              {definicoesEmbaralhadas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.texto}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {exercicio.dica && <p className="exercicio__dica">💡 {exercicio.dica}</p>}
      {!bloqueado && (
        <button className="botao botao--primario" onClick={verificar} disabled={!todasPreenchidas}>
          Verificar
        </button>
      )}
    </div>
  );
}

function embaralhar(itens) {
  const a = [...itens];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
