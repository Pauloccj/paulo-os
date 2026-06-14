import { useState } from 'react';

export default function TrueFalse({ exercicio, bloqueado, onResponder }) {
  const [escolha, setEscolha] = useState(null); // true | false | null

  const verificar = () => {
    if (escolha == null) return;
    onResponder(escolha === exercicio.correta);
  };

  const opcoes = [
    { valor: true, rotulo: 'Verdadeiro' },
    { valor: false, rotulo: 'Falso' },
  ];

  return (
    <div className="exercicio">
      <h2 className="exercicio__pergunta">{exercicio.afirmacao}</h2>
      <div className="opcoes opcoes--vf">
        {opcoes.map((op) => {
          const selecionada = escolha === op.valor;
          const certa = bloqueado && op.valor === exercicio.correta;
          const erradaSelecionada = bloqueado && selecionada && op.valor !== exercicio.correta;
          return (
            <button
              key={String(op.valor)}
              className={`opcao${selecionada ? ' opcao--selecionada' : ''}${
                certa ? ' opcao--certa' : ''
              }${erradaSelecionada ? ' opcao--errada' : ''}`}
              onClick={() => !bloqueado && setEscolha(op.valor)}
              disabled={bloqueado}
            >
              {op.rotulo}
            </button>
          );
        })}
      </div>
      {exercicio.dica && <p className="exercicio__dica">💡 {exercicio.dica}</p>}
      {!bloqueado && (
        <button className="botao botao--primario" onClick={verificar} disabled={escolha == null}>
          Verificar
        </button>
      )}
    </div>
  );
}
