// ═══════════════════════════════════════════════════════════════
// PROBLEMA 2: Truco de Von Neumann — Desesgar una moneda sesgada
// Módulo 5 · Análisis Probabilístico · UVG
// ═══════════════════════════════════════════════════════════════
//
// TRUCO DE VON NEUMANN:
//   Llamar biasedRandom() DOS veces y observar el par:
//
//   Par     | Prob         | Acción
//   --------|-------------|------------------
//   (1, 0)  | p·(1-p)     | → devuelve 1
//   (0, 1)  | (1-p)·p     | → devuelve 0
//   (0, 0)  | (1-p)²      | → DESCARTAR, repetir
//   (1, 1)  | p²          | → DESCARTAR, repetir
//
//   Como P(1,0) = P(0,1) = p(1-p), la salida es exactamente 50/50.
//
// TIEMPO ESPERADO:
//   P(emitir por intento) = 2p(1-p)
//   E[llamadas] = 2 / (2p(1-p)) = 1 / (p(1-p))
//   Mínimo en p=0.5 → E[llamadas] = 4

// Genera un bit sesgado: P(1) = p, P(0) = 1-p
function biasedRandom(p) {
  return Math.random() < p ? 1 : 0;
}

// Genera un bit uniforme 50/50 usando solo biasedRandom(p)
// Retorna { bit: 0|1, calls: número de llamadas usadas }
function unbiasedRandom(p) {
  let calls = 0;
  while (true) {
    const a = biasedRandom(p); calls++;
    const b = biasedRandom(p); calls++;

    if (a === 1 && b === 0) return { bit: 1, calls }; // (1,0) → 1
    if (a === 0 && b === 1) return { bit: 0, calls }; // (0,1) → 0
    // (0,0) o (1,1): descartar y reintentar
  }
}

// ── Verificación para múltiples valores de p ─────────────────
const N = 5_000;

console.log('Verificando P(salida=1) ≈ 0.5 para todo p:\n');
console.log('  p   | P(1) empírico | E[calls] simulado | E[calls] teórico');
console.log('  ----|--------------|------------------|-----------------');

for (const p of [0.1, 0.2, 0.3, 0.5, 0.7, 0.9]) {
  let ones = 0, totalCalls = 0;
  for (let i = 0; i < N; i++) {
    const { bit, calls } = unbiasedRandom(p);
    if (bit === 1) ones++;
    totalCalls += calls;
  }
  const pctOnes    = (ones / N).toFixed(4);
  const avgCalls   = (totalCalls / N).toFixed(3);
  const teorico    = (1 / (p * (1 - p))).toFixed(3);
  console.log(`  ${p.toFixed(1)} | ${pctOnes}        | ${avgCalls.padEnd(17)}| ${teorico}`);
}

// ── Análisis teórico detallado ────────────────────────────────
console.log('\nAnálisis teórico P(emitir) = 2p(1-p) y E[llamadas] = 1/(p(1-p)):');
for (const p of [0.1, 0.3, 0.5, 0.7, 0.9]) {
  const pEmitir  = 2 * p * (1 - p);
  const eLlamadas = 1 / (p * (1 - p));
  console.log(`  p=${p}: P(emitir)=${pEmitir.toFixed(4)}, E[llamadas]=${eLlamadas.toFixed(3)}`);
}

console.log('\n→ El mínimo de E[llamadas] ocurre en p=0.5: E = 1/(0.5·0.5) = 4');
console.log('→ Cuanto más sesgada la moneda, más llamadas se necesitan.');
console.log('→ El algoritmo NO necesita conocer p — solo necesita 0 < p < 1.');
