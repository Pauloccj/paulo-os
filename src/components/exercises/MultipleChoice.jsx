import { useState } from 'react';

export default function MultipleChoice({ exercicio, bloqueado, onResponder }) {
  const [escolhida, setEscolhida] = useState(null);

  const verificar = () => {
    if (escolhida == null) return;
    onResponder(escolhida === exercicio.correta);
  };

  return (
    <div className="exercicio">
      <h2 className="exercicio__pergunta">{exercicio.pergunta}</h2>
      <div className="opcoes">
        {exercicio.opcoes.map((op) => {
          const selecionada = escolhida === op.id;
          const certa = bloqueado && op.id === exercicio.correta;
          const erradaSelecionada = bloqueado && selecionada && op.id !== exercicio.correta;
          return (
            <button
              key={op.id}
              className={`opcao${selecionada ? ' opcao--selecionada' : ''}${
                certa ? ' opcao--certa' : ''
              }${erradaSelecionada ? ' opcao--errada' : ''}`}
              onClick={() => !bloqueado && setEscolhida(op.id)}
              disabled={bloqueado}
            >
              {op.texto}
            </button>
          );
        })}
      </div>
      {exercicio.dica && <p className="exercicio__dica">💡 {exercicio.dica}</p>}
      {!bloqueado && (
        <button className="botao botao--primario" onClick={verificar} disabled={escolhida == null}>
          Verificar
        </button>
      )}
    </div>
  );
}
