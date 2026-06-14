// Renderiza blocos pedagógicos: ensino, exemplo e não-exemplo.
const ROTULOS = {
  ensino: { etiqueta: '📖 Conceito', classe: 'ensino' },
  exemplo: { etiqueta: '✅ Exemplo', classe: 'exemplo' },
  naoExemplo: { etiqueta: '⛔ Não é exemplo', classe: 'nao-exemplo' },
};

export default function TeachingBlock({ bloco, onContinuar }) {
  const meta = ROTULOS[bloco.tipo] || ROTULOS.ensino;

  return (
    <div className={`bloco-ensino bloco-ensino--${meta.classe}`}>
      <div className="bloco-ensino__etiqueta">{meta.etiqueta}</div>
      {bloco.titulo && <h2 className="bloco-ensino__titulo">{bloco.titulo}</h2>}
      <p className="bloco-ensino__texto">{bloco.texto}</p>
      <button className="botao botao--primario" onClick={onContinuar}>
        Continuar
      </button>
    </div>
  );
}
