// Rodapé de feedback após responder um exercício.
export default function Feedback({ correto, exercicio, onContinuar }) {
  return (
    <div className={`feedback feedback--${correto ? 'acerto' : 'erro'}`}>
      <div className="feedback__titulo">{correto ? '✓ Boa!' : '✗ Quase lá'}</div>
      <p className="feedback__mensagem">
        {correto ? exercicio.feedbackAcerto : exercicio.feedbackErro}
      </p>
      {exercicio.explicacao && <p className="feedback__explicacao">{exercicio.explicacao}</p>}
      <button className="botao botao--continuar" onClick={onContinuar}>
        Continuar
      </button>
    </div>
  );
}
