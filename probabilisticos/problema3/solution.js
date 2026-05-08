// ═══════════════════════════════════════════════════════════════
// PROBLEMA 3: Hiring Problem — P(best/worst case) y E[hires] = Hₙ
// Módulo 5 · Análisis Probabilístico · UVG
// ═══════════════════════════════════════════════════════════════
//
// ALGORITMO:
//   Entrevistamos candidatos en orden. Contratamos al candidato i
//   si es mejor que todos los anteriores.
//
// INDICADORAS:
//   Xᵢ = 1 si candidato i es contratado.
//   P(Xᵢ = 1) = P(i es el mejor entre los primeros i) = 1/i
//
// ESPERANZA:
//   E[hires] = Σᵢ₌₁ⁿ 1/i = Hₙ ≈ ln(n) + γ  (γ ≈ 0.5772)
//
// CASOS EXTREMOS:
//   Best-case  (1 hire) :  P = 1/n     (candidato 1 es el mejor de todos)
//   Worst-case (n hires):  P = 1/n!    (llegan en orden creciente)

// Ejecuta el algoritmo de contratación sobre un arreglo de calidades
function hiringAlgorithm(candidates) {
  let best = -Infinity;
  let hires = 0;
  for (const quality of candidates) {
    if (quality > best) {
      best = quality;
      hires++;                // candidato i es mejor que todos los anteriores
    }
  }
  return hires;
}

// Genera una permutación aleatoria uniforme (Fisher-Yates)
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Calcula Hₙ = 1 + 1/2 + 1/3 + ... + 1/n
function harmonicNumber(n) {
  let h = 0;
  for (let i = 1; i <= n; i++) h += 1 / i;
  return h;
}

// ── Prueba manual ─────────────────────────────────────────────
const test = [3, 7, 2, 9, 1, 8, 5, 4];
console.log('Candidatos (en orden de llegada):', test.join(', '));
console.log('Contrataciones:', hiringAlgorithm(test));
console.log('(Se contrata cuando es mejor que todos los anteriores)\n');

// ── Simulación ────────────────────────────────────────────────
const n = 8;
const TRIALS = 100_000;
const qualities = Array.from({ length: n }, (_, i) => i + 1); // [1..n]

let totalHires = 0;
let bestCaseCount  = 0;  // exactamente 1 contratación
let worstCaseCount = 0;  // exactamente n contrataciones

for (let t = 0; t < TRIALS; t++) {
  const perm   = shuffleArray(qualities);
  const hires  = hiringAlgorithm(perm);
  totalHires  += hires;
  if (hires === 1) bestCaseCount++;
  if (hires === n) worstCaseCount++;
}

const Hn      = harmonicNumber(n);
const factN   = [1,1,2,6,24,120,720,5040,40320][n]; // n! para n ≤ 8

console.log(`Simulación (n=${n}, ${TRIALS.toLocaleString()} ensayos):\n`);
console.log(`  E[contrataciones]`);
console.log(`    simulado    : ${(totalHires / TRIALS).toFixed(4)}`);
console.log(`    Hₙ (teórico): ${Hn.toFixed(4)}`);
console.log(`    ln(n)       : ${Math.log(n).toFixed(4)}`);

console.log(`\n  P(best-case = 1 contratación)`);
console.log(`    simulado : ${(bestCaseCount / TRIALS).toFixed(4)}`);
console.log(`    teórico 1/n = 1/${n} = ${(1/n).toFixed(4)}`);

console.log(`\n  P(worst-case = ${n} contrataciones)`);
console.log(`    simulado : ${(worstCaseCount / TRIALS).toFixed(6)}`);
console.log(`    teórico 1/n! = 1/${factN} = ${(1/factN).toFixed(6)}`);

// ── Tabla para distintos n ────────────────────────────────────
console.log('\nTabla de E[hires] = Hₙ para distintos n:');
console.log('  n   | Hₙ (exacto) | ln(n)  | 1/n (best) | 1/n! (worst)');
console.log('  ----|------------|--------|------------|-------------');
for (const m of [2, 4, 8, 16, 32, 100]) {
  const Hm   = harmonicNumber(m);
  const lnm  = Math.log(m);
  console.log(`  ${String(m).padEnd(3)} | ${Hm.toFixed(4).padEnd(11)}| ${lnm.toFixed(4).padEnd(7)}| ${(1/m).toFixed(4).padEnd(11)}| (very small)`);
}
