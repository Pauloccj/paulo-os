import { useCallback, useState } from 'react';
import { curriculum } from './data/curriculum.js';
import { useProgress } from './context/ProgressContext.jsx';
import TopBar from './components/TopBar.jsx';
import LearningPath from './components/LearningPath.jsx';
import Lesson from './components/Lesson.jsx';
import LessonComplete from './components/LessonComplete.jsx';

export default function App() {
  // telas: 'trilha' | 'licao' | 'completo' | 'falhou'
  const [tela, setTela] = useState('trilha');
  const [licaoAtual, setLicaoAtual] = useState(null);
  const { concluirLicao, reabastecerVidas } = useProgress();

  const voltarParaTrilha = useCallback(() => {
    reabastecerVidas(); // vidas recarregam ao voltar para a trilha
    setLicaoAtual(null);
    setTela('trilha');
  }, [reabastecerVidas]);

  const iniciarLicao = useCallback((licao) => {
    setLicaoAtual(licao);
    setTela('licao');
  }, []);

  const concluir = useCallback(() => {
    if (licaoAtual) concluirLicao(licaoAtual.id);
    setTela('completo');
  }, [licaoAtual, concluirLicao]);

  const falhar = useCallback(() => setTela('falhou'), []);

  return (
    <div className="app">
      <TopBar />
      <main className="conteudo">
        {tela === 'trilha' && (
          <LearningPath unidades={curriculum} onIniciarLicao={iniciarLicao} />
        )}
        {tela === 'licao' && licaoAtual && (
          <Lesson licao={licaoAtual} onConcluir={concluir} onFalhar={falhar} onSair={voltarParaTrilha} />
        )}
        {tela === 'completo' && licaoAtual && (
          <LessonComplete licao={licaoAtual} onVoltar={voltarParaTrilha} />
        )}
        {tela === 'falhou' && (
          <div className="resultado">
            <div className="resultado__emoji">💔</div>
            <h2>Tentativa encerrada</h2>
            <p>Suas vidas acabaram. Nenhum XP foi ganho desta vez — mas o erro faz parte do aprendizado.</p>
            <button className="botao botao--primario" onClick={voltarParaTrilha}>
              Voltar à trilha
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
