import { useProgress } from '../context/ProgressContext.jsx';
import { VIDAS_INICIAIS } from '../utils/progressRules.js';

export default function TopBar() {
  const { progresso, resetarProgresso } = useProgress();
  const { xp, vidas, ofensiva } = progresso;

  const onReset = () => {
    if (window.confirm('Resetar todo o progresso (XP, vidas, ofensiva)?')) {
      resetarProgresso();
    }
  };

  return (
    <header className="topbar">
      <div className="topbar__metricas">
        <span className="metrica metrica--ofensiva" title="Ofensiva (dias seguidos)">
          🔥 {ofensiva}
        </span>
        <span className="metrica metrica--xp" title="Experiência">
          ⭐ {xp}
        </span>
        <span className="metrica metrica--vidas" title="Vidas">
          {'❤️'.repeat(vidas)}
          {'🤍'.repeat(Math.max(0, VIDAS_INICIAIS - vidas))}
        </span>
      </div>
      <button className="topbar__reset" onClick={onReset} title="Resetar progresso (dev)">
        Resetar
      </button>
    </header>
  );
}
