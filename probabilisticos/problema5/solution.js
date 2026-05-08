// ═══════════════════════════════════════════════════════════════
// PROBLEMA 5: Número esperado de inversiones — E[inv] = n(n-1)/4
// Módulo 5 · Análisis Probabilístico · UVG
// ═══════════════════════════════════════════════════════════════
//
// DEFINICIÓN:
//   Inversión: par (i,j) con i < j y A[i] > A[j]
//
// VARIABLES INDICADORAS:
//   Xᵢⱼ = 1 si (i,j) es inversión
//   En permutación aleatoria uniforme: P(A[i] > A[j]) = 1/2
//   → E[Xᵢⱼ] = 1/2  para todo par i < j
//
// CÁLCULO:
//   X = Σ_{i<j} Xᵢⱼ
//   E[X] = Σ_{i<j} (1/2) = C(n,2) · (1/2) = n(n-1)/4
//
// CONEXIÓN: el nº de inversiones = nº de swaps en Insertion Sort.
//   → Tiempo promedio de Insertion Sort ∈ Θ(n²/4) = Θ(n²)

// Cuenta todas las inversiones en un arreglo (O(n²))
function countInversions(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) count++; // par (i,j) con A[i] > A[j] → inversión
    }
  }
  return count;
}

// Fórmula cerrada: E[inversiones] = n(n-1)/4
function expectedInversions(n) {
  return n * (n - 1) / 4;
}

// Fisher-Yates shuffle: genera permutación aleatoria uniforme
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Prueba manual ─────────────────────────────────────────────
const ejemplo = [3, 6, 4, 5, 1, 2];
console.log('Ejemplo:', ejemplo.join(', '));
console.log('Inversiones:', countInversions(ejemplo));
console.log('(Pares donde A[i] > A[j] con i < j)\n');

// ── Verificación experimental ─────────────────────────────────
const TRIALS = 10_000;

console.log('Verificando E[inversiones] = n(n-1)/4:\n');
console.log('  n  | Teórico n(n-1)/4 | Simulado  | Máx C(n,2) | ¿OK?');
console.log('  ---|-----------------|-----------|------------|-----');

for (const n of [3, 4, 5, 6, 8, 10]) {
  const arr      = Array.from({ length: n }, (_, i) => i + 1);
  const teorico  = expectedInversions(n);
  const maxInv   = n * (n - 1) / 2; // C(n,2) = arreglo inverso
  let totalInv   = 0;

  for (let t = 0; t < TRIALS; t++) {
    totalInv += countInversions(shuffle(arr));
  }

  const simulado = totalInv / TRIALS;
  const ok = Math.abs(simulado - teorico) < 0.05 * teorico + 0.5 ? '✓' : '✗';
  console.log(`  ${String(n).padEnd(2)} | ${String(teorico).padEnd(16)}| ${simulado.toFixed(3).padEnd(10)}| ${String(maxInv).padEnd(11)}| ${ok}`);
}

// ── Casos extremos ────────────────────────────────────────────
console.log('\nCasos extremos:');
for (const n of [4, 5, 6]) {
  const sorted   = Array.from({ length: n }, (_, i) => i + 1);          // [1,2,...,n]
  const reversed = Array.from({ length: n }, (_, i) => n - i);          // [n,...,2,1]
  console.log(`  n=${n}: mín=${countInversions(sorted)} (ordenado), máx=${countInversions(reversed)} (invertido), E[random]=${expectedInversions(n)}`);
}

console.log('\n→ E[inv] = n(n-1)/4 es exactamente la mitad del máximo posible.');
console.log('→ Esto explica por qué Insertion Sort tiene tiempo promedio Θ(n²).');
