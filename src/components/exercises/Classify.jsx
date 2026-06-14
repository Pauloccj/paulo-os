import { useState } from 'react';
import { CATEGORIAS_CLASSIFICACAO } from '../../data/exerciseTypes.js';

// Classifica cada item em uma categoria comportamental (comportamento,
// antecedente, consequência, reforço positivo, etc.).
// As categorias oferecidas podem ser restringidas via `exercicio.categorias`
// (lista de ids); por padrão usa todas as categorias.
export default function Classify({ exercicio, bloqueado, onResponder }) {
  const [escolhas, setEscolhas] = useState({}); // { [itemId]: categoriaId }

  const categorias = exercicio.categorias
    ? CATEGORIAS_CLASSIFICACAO.filter((c) => exercicio.categorias.includes(c.id))
    : CATEGORIAS_CLASSIFICACAO;

  const todasPreenchidas = exercicio.itens.every((it) => escolhas[it.id]);

  const verificar = () => {
    if (!todasPreenchidas) return;
    const acertou = exercicio.itens.every((it) => escolhas[it.id] === it.categoria);
    onResponder(acertou);
  };

  return (
    <div className="exercicio">
      <h2 className="exercicio__pergunta">
        {exercicio.instrucao || 'Classifique cada item na categoria correta'}
      </h2>
      <div className="classificar">
        {exercicio.itens.map((it) => (
          <div key={it.id} className="classificar__item">
            <span className="classificar__texto">{it.texto}</span>
            <select
              className="par__select"
              value={escolhas[it.id] || ''}
              disabled={bloqueado}
              onChange={(e) => setEscolhas((s) => ({ ...s, [it.id]: e.target.value }))}
            >
              <option value="" disabled>
                categoria…
              </option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.rotulo}
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
