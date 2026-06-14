import { useState } from 'react';
import { TERMOS_ABC } from '../../data/exerciseTypes.js';

// Monta a contingência de três termos: o aluno classifica cada fragmento da
// vinheta como Antecedente (A), Comportamento (B) ou Consequência (C).
export default function ABCExercise({ exercicio, bloqueado, onResponder }) {
  const [escolhas, setEscolhas] = useState({}); // { [fragmentoId]: termoId }

  const todasPreenchidas = exercicio.fragmentos.every((f) => escolhas[f.id]);

  const verificar = () => {
    if (!todasPreenchidas) return;
    const acertou = exercicio.fragmentos.every((f) => escolhas[f.id] === f.termo);
    onResponder(acertou);
  };

  return (
    <div className="exercicio">
      <h2 className="exercicio__pergunta">Classifique cada parte como A, B ou C</h2>
      <p className="exercicio__vinheta">"{exercicio.vinheta}"</p>
      <div className="classificar">
        {exercicio.fragmentos.map((f) => (
          <div key={f.id} className="classificar__item">
            <span className="classificar__texto">{f.texto}</span>
            <select
              className="par__select"
              value={escolhas[f.id] || ''}
              disabled={bloqueado}
              onChange={(e) => setEscolhas((s) => ({ ...s, [f.id]: e.target.value }))}
            >
              <option value="" disabled>
                termo…
              </option>
              {TERMOS_ABC.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.rotulo}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {bloqueado && exercicio.funcaoProvavel && (
        <p className="exercicio__funcao">Função provável: {exercicio.funcaoProvavel}</p>
      )}
      {exercicio.dica && !bloqueado && <p className="exercicio__dica">💡 {exercicio.dica}</p>}
      {!bloqueado && (
        <button className="botao botao--primario" onClick={verificar} disabled={!todasPreenchidas}>
          Verificar
        </button>
      )}
    </div>
  );
}
