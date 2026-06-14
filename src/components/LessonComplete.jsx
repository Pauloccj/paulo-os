import { XP_POR_LICAO } from '../utils/progressRules.js';
import { useProgress } from '../context/ProgressContext.jsx';

export default function LessonComplete({ licao, onVoltar }) {
  const { progresso } = useProgress();

  return (
    <div className="resultado">
      <div className="resultado__emoji">🎉</div>
      <h2>Lição concluída!</h2>
      <p>{licao.titulo}</p>
      <div className="resultado__premios">
        <span className="metrica metrica--xp">+{XP_POR_LICAO} XP</span>
        <span className="metrica metrica--ofensiva">🔥 {progresso.ofensiva}</span>
      </div>
      <button className="botao botao--primario" onClick={onVoltar}>
        Voltar à trilha
      </button>
    </div>
  );
}
