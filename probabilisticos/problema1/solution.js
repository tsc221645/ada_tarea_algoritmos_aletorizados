// ═══════════════════════════════════════════════════════════════
// PROBLEMA 1: Generador uniforme random(a, b) usando random01()
// Módulo 5 · Análisis Probabilístico · UVG
// ═══════════════════════════════════════════════════════════════
//
// IDEA:
//   Para generar un entero uniforme en [a, b] necesitamos k = ⌈log₂(b−a+1)⌉ bits.
//   Generamos k bits → número r en [0, 2ᵏ−1].
//   Si r ≤ (b−a): retornamos a+r  (está en rango → uniforme)
//   Si r > (b−a): DESCARTAMOS y repetimos (distribución geométrica)
//
// TIEMPO ESPERADO:
//   p = (b−a+1) / 2ᵏ        (probabilidad de éxito por intento)
//   E[intentos] = 1/p = 2ᵏ / (b−a+1)
//   Como p ∈ (1/2, 1], E[intentos] < 2 → O(1) amortizado

// Simula un lanzamiento de moneda justa: P(0) = P(1) = 1/2
function random01() {
  return Math.random() < 0.5 ? 0 : 1;
}

// Genera un entero aleatorio uniforme en [a, b]
// usando ÚNICAMENTE llamadas a random01()
function random(a, b) {
  const range = b - a + 1;                     // cuántos valores distintos
  const k = Math.ceil(Math.log2(range));        // bits necesarios

  while (true) {
    // Paso 1: generar k bits y armarlos como número binario
    let r = 0;
    for (let i = 0; i < k; i++) {
      r = r * 2 + random01();                   // shift left + nuevo bit
    }
    // Ahora r ∈ [0, 2ᵏ − 1]

    // Paso 2: verificar si r cae en el rango válido
    if (r < range) {
      return a + r;                             // mapeamos [0, range-1] → [a, b]
    }
    // r >= range: descartamos — garantiza uniformidad
  }
}

// ── Verificación de uniformidad ───────────────────────────────
const [A, B] = [1, 6];
const N = 10_000;
const counts = {};

for (let i = 0; i < N; i++) {
  const v = random(A, B);
  counts[v] = (counts[v] || 0) + 1;
}

console.log(`random(${A}, ${B}) — ${N} llamadas:\n`);
for (let v = A; v <= B; v++) {
  const pct = ((counts[v] || 0) / N * 100).toFixed(1);
  const bar = '█'.repeat(Math.round((counts[v] || 0) / N * 40));
  console.log(`  ${v}: ${bar} ${pct}%`);
}
// Esperado: cada valor ≈ 16.7%

// ── Análisis teórico ──────────────────────────────────────────
const k = Math.ceil(Math.log2(B - A + 1));
const p = (B - A + 1) / Math.pow(2, k);

console.log(`\nAnálisis para random(${A}, ${B}):`);
console.log(`  rango  = b − a + 1 = ${B - A + 1}`);
console.log(`  k      = ⌈log₂(${B - A + 1})⌉ = ${k} bits`);
console.log(`  2ᵏ     = ${Math.pow(2, k)}`);
console.log(`  p      = ${B - A + 1}/${Math.pow(2, k)} = ${p.toFixed(4)}`);
console.log(`  E[intentos] = 1/p = ${(1 / p).toFixed(4)}`);
console.log(`  → T(n) ∈ O(1) en tiempo esperado`);

// ── Verificación del número de intentos ──────────────────────
// (versión instrumentada)
function randomInstrumented(a, b) {
  const range = b - a + 1;
  const k = Math.ceil(Math.log2(range));
  let attempts = 0;
  while (true) {
    attempts++;
    let r = 0;
    for (let i = 0; i < k; i++) r = r * 2 + random01();
    if (r < range) return { value: a + r, attempts };
  }
}

let totalAttempts = 0;
for (let i = 0; i < N; i++) {
  totalAttempts += randomInstrumented(A, B).attempts;
}
console.log(`\nPromedio de intentos (simulado) : ${(totalAttempts / N).toFixed(4)}`);
console.log(`E[intentos] teórico             : ${(1 / p).toFixed(4)}`);
