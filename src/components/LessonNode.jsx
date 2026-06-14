export default function LessonNode({ licao, status, onIniciar }) {
  const bloqueada = status === 'bloqueada';
  const concluida = status === 'concluida';

  const icone = concluida ? '✓' : bloqueada ? '🔒' : '★';

  return (
    <button
      className={`no-licao no-licao--${status}`}
      onClick={onIniciar}
      disabled={bloqueada}
      aria-label={licao.titulo}
    >
      <span className="no-licao__marcador">{icone}</span>
      <span className="no-licao__texto">
        <span className="no-licao__titulo">{licao.titulo}</span>
        {licao.resumo && <span className="no-licao__resumo">{licao.resumo}</span>}
      </span>
    </button>
  );
}
