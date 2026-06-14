import { useCallback, useEffect, useState } from 'react';
import { useProgress } from '../context/ProgressContext.jsx';
import { TIPOS_EXERCICIO } from '../data/exerciseTypes.js';
import TeachingBlock from './TeachingBlock.jsx';
import Feedback from './Feedback.jsx';
import MultipleChoice from './exercises/MultipleChoice.jsx';
import TrueFalse from './exercises/TrueFalse.jsx';
import MatchPairs from './exercises/MatchPairs.jsx';
import Classify from './exercises/Classify.jsx';
import ABCExercise from './exercises/ABCExercise.jsx';

const COMPONENTES_EXERCICIO = {
  [TIPOS_EXERCICIO.MULTIPLA]: MultipleChoice,
  [TIPOS_EXERCICIO.VF]: TrueFalse,
  [TIPOS_EXERCICIO.ASSOCIAR]: MatchPairs,
  [TIPOS_EXERCICIO.CLASSIFICAR]: Classify,
  [TIPOS_EXERCICIO.ABC]: ABCExercise,
};

export default function Lesson({ licao, onConcluir, onFalhar, onSair }) {
  const { progresso, registrarAcerto, registrarErro } = useProgress();
  // Fila de blocos da lição. Exercícios errados são reenfileirados ao final
  // como treino corretivo (em vez de bloquear o aluno).
  const [fila, setFila] = useState(() => licao.blocos || []);
  const [pos, setPos] = useState(0);
  const [feedback, setFeedback] = useState(null); // { correto, exercicio } | null

  // Lição concluída quando a fila acaba.
  useEffect(() => {
    if (pos >= fila.length) onConcluir();
  }, [pos, fila.length, onConcluir]);

  const blocoAtual = fila[pos];

  const responder = useCallback(
    (correto) => {
      const exercicio = blocoAtual.exercicio;
      if (correto) {
        registrarAcerto(exercicio.id);
      } else {
        registrarErro(exercicio.conceito, exercicio.id);
        setFila((f) => [...f, blocoAtual]); // reenfileira para treino corretivo
      }
      setFeedback({ correto, exercicio });
    },
    [blocoAtual, registrarAcerto, registrarErro],
  );

  const continuar = useCallback(() => {
    const errouSemVida = feedback && !feedback.correto && progresso.vidas <= 0;
    setFeedback(null);
    if (errouSemVida) {
      onFalhar();
      return;
    }
    setPos((p) => p + 1);
  }, [feedback, progresso.vidas, onFalhar]);

  if (!blocoAtual) return null;

  const pct = fila.length ? Math.round((pos / fila.length) * 100) : 100;

  return (
    <div className="licao">
      <div className="licao__cabecalho">
        <button className="licao__sair" onClick={onSair} aria-label="Sair da lição">
          ✕
        </button>
        <div className="barra-progresso">
          <div className="barra-progresso__preenchida" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="licao__corpo">
        {blocoAtual.tipo === 'exercicio' ? (
          <ExercicioAtivo
            exercicio={blocoAtual.exercicio}
            bloqueado={!!feedback}
            onResponder={responder}
          />
        ) : (
          <TeachingBlock bloco={blocoAtual} onContinuar={() => setPos((p) => p + 1)} />
        )}
      </div>

      {feedback && (
        <Feedback correto={feedback.correto} exercicio={feedback.exercicio} onContinuar={continuar} />
      )}
    </div>
  );
}

function ExercicioAtivo({ exercicio, bloqueado, onResponder }) {
  const Componente = COMPONENTES_EXERCICIO[exercicio.tipo];
  if (!Componente) {
    return <p>Tipo de exercício não suportado: {exercicio.tipo}</p>;
  }
  return <Componente exercicio={exercicio} bloqueado={bloqueado} onResponder={onResponder} />;
}
