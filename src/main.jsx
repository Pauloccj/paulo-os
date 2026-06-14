import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import './styles/global.css';

// Migração de PWA antigo: o repositório já foi um PWA com `service-worker.js`
// próprio. Removemos esse arquivo, mas um navegador que já o instalou pode
// continuar servindo cache antigo. Desregistramos qualquer SW que não seja o
// gerado pelo Vite e limpamos caches obsoletos antes do plugin assumir.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => {
      const url = reg.active?.scriptURL || '';
      if (url.includes('service-worker.js')) {
        reg.unregister();
      }
    });
  });
  if (window.caches) {
    caches.keys().then((nomes) => {
      nomes.filter((n) => n.startsWith('paulo-os-cache')).forEach((n) => caches.delete(n));
    });
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>,
);
