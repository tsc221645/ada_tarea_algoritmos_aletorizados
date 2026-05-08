// ═══════════════════════════════════════════════════════════════
// PROBLEMA 4: Suma esperada de n dados
// Módulo 5 · Análisis Probabilístico · UVG
// ═══════════════════════════════════════════════════════════════
//
// SETUP:
//   X = suma de n dados = X₁ + X₂ + ··· + Xₙ
//
// ENFOQUE CON VARIABLES INDICADORAS:
//   Yᵢⱼ = 1 si dado i muestra cara j  (j ∈ {1..6})
//   E[Yᵢⱼ] = P(Yᵢⱼ = 1) = 1/6
//   Xᵢ = Σⱼ₌₁⁶ j · Yᵢⱼ
//   E[Xᵢ] = Σⱼ₌₁⁶ j · (1/6) = 21/6 = 3.5
//
// POR LINEALIDAD DE LA ESPERANZA:
//   E[X] = Σᵢ₌₁ⁿ E[Xᵢ] = n · 3.5
//
// NOTA: La linealidad vale SIEMPRE, no requiere independencia.

// Simula el lanzamiento de un dado justo (1..6)
function lanzarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

// Calcula E[suma de n dados] usando la fórmula con indicadoras
function expectedSum(n) {
  // E[Yᵢⱼ] = 1/6 para cada cara j
  // E[Xᵢ] = Σⱼ₌₁⁶ j · (1/6) = (1+2+3+4+5+6)/6 = 3.5
  const E_dado = (1 + 2 + 3 + 4 + 5 + 6) / 6; // = 21/6 = 3.5
  return n * E_dado;                             // linealidad de la esperanza
}

// Verifica empíricamente simulando 'trials' lanzamientos de n dados
function simularNDados(n, trials) {
  let total = 0;
  for (let t = 0; t < trials; t++) {
    let suma = 0;
    for (let i = 0; i < n; i++) suma += lanzarDado();
    total += suma;
  }
  return total / trials; // promedio empírico
}

// ── Verificación ──────────────────────────────────────────────
const TRIALS = 20_000;

console.log('E[suma de n dados] = 3.5·n\n');
console.log('  n    | Teórico (3.5·n) | Simulado');
console.log('  -----|----------------|----------');

for (const n of [1, 2, 5, 10, 20, 50, 100]) {
  const teorico  = expectedSum(n);
  const simulado = simularNDados(n, TRIALS);
  const diff     = Math.abs(simulado - teorico);
  console.log(`  ${String(n).padEnd(4)} | ${String(teorico).padEnd(15)} | ${simulado.toFixed(2).padEnd(8)} (Δ=${diff.toFixed(2)})`);
}

// ── Demostración del enfoque con indicadoras ──────────────────
console.log('\nVerificando E[Xᵢ] = 3.5 para un solo dado (vía indicadoras):');
const facesProb = Array.from({ length: 6 }, (_, i) => ({ j: i + 1, prob: 1 / 6 }));
const EXi = facesProb.reduce((sum, { j, prob }) => sum + j * prob, 0);
console.log(`  E[Xᵢ] = Σⱼ₌₁⁶ j · P(Yᵢⱼ=1) = Σⱼ₌₁⁶ j · (1/6)`);
console.log(`        = (${facesProb.map(f => f.j).join('+')}) / 6`);
console.log(`        = 21/6 = ${EXi}`);
console.log('\n→ Resultado exacto, sin necesidad de simular ni calcular distribuciones complejas.');
console.log('→ La linealidad de la esperanza hace trivial lo que sería difícil de otra forma.');
