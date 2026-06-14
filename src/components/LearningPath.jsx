import { useProgress } from '../context/ProgressContext.jsx';
import LessonNode from './LessonNode.jsx';

// Calcula o status de cada lição: 'concluida' | 'atual' | 'bloqueada'.
// Regra: a primeira lição não concluída e desbloqueada vira a "atual";
// as seguintes ficam bloqueadas até a anterior ser concluída.
export default function LearningPath({ unidades, onIniciarLicao }) {
  const { progresso } = useProgress();
  const concluidas = new Set(progresso.licoesConcluidas);

  let atualJaDefinida = false;

  return (
    <div className="trilha">
      <h1 className="trilha__titulo">Análise do Comportamento</h1>
      {unidades.map((unidade) => (
        <section key={unidade.id} className="unidade">
          <div className="unidade__cabecalho">
            <h2>{unidade.titulo}</h2>
            {unidade.descricao && <p>{unidade.descricao}</p>}
          </div>
          <div className="unidade__licoes">
            {unidade.licoes.map((licao) => {
              const semConteudo = !licao.blocos || licao.blocos.length === 0;
              let status;
              if (concluidas.has(licao.id)) {
                status = 'concluida';
              } else if (unidade.bloqueada || semConteudo) {
                status = 'bloqueada';
              } else if (!atualJaDefinida) {
                status = 'atual';
                atualJaDefinida = true;
              } else {
                status = 'bloqueada';
              }

              return (
                <LessonNode
                  key={licao.id}
                  licao={licao}
                  status={status}
                  onIniciar={() => onIniciarLicao(licao)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
