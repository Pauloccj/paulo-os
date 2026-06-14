// Helpers de data para o cálculo de ofensiva (streak).

// Data de hoje no formato 'YYYY-MM-DD' (horário local).
export function hojeISO() {
  const d = new Date();
  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// Diferença em dias inteiros entre duas datas 'YYYY-MM-DD' (b - a).
export function diffEmDias(aIso, bIso) {
  const a = new Date(`${aIso}T00:00:00`);
  const b = new Date(`${bIso}T00:00:00`);
  return Math.round((b - a) / 86400000);
}
