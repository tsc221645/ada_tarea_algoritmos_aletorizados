// ═══════════════════════════════════════════════════════
// PROBLEMA 7a: guess-sort vs bozo-sort⁺_opt
// ═══════════════════════════════════════════════════════
//
// DIFERENCIA CLAVE:
//   bozo-sort⁺_opt: en cada paso, elige (i,j) al azar.
//     Si es par malo (i<j y A[i]>A[j]) → intercambia.
//     Si no → paso DESPERDICIADO (no avanza).
//
//   guess-sort: en cada paso, sigue eligiendo pares al azar
//     hasta encontrar uno malo, ENTONCES intercambia.
//     Cada swap está garantizado a reducir inversiones en 1.
//
//   Ambos necesitan ≤ C(n,2) swaps para ordenar (peor caso).
//   Pero guess-sort no desperdicia swaps en pares ya buenos.
function countBadPairs(arr) {
  let bad = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i+1; j < arr.length; j++)
      if (arr[i] > arr[j]) bad++;
  return bad;
}
// bozo-sort⁺_opt: 1 paso = elegir (i,j), intercambiar si es par malo
function bozoSortOptStep(arr) {
  const n = arr.length;
  const i = Math.floor(Math.random() * n);
  const j = Math.floor(Math.random() * n);
  if (i < j && arr[i] > arr[j]) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return true; // hubo swap
  }
  return false; // paso desperdiciado
}
// guess-sort: 1 paso = buscar par malo y luego intercambiar
// Retorna número de comparaciones hechas hasta encontrar el par malo.
function guessSortStep(arr) {
  const n = arr.length;
  let comparisons = 0;
  while (true) {
    const i = Math.floor(Math.random() * n);
    const j = Math.floor(Math.random() * n);
    comparisons++;
    if (i < j && arr[i] > arr[j]) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return comparisons;
    }
  }
}
const original = [8, 3, 7, 1, 5, 4, 6, 2];
const MAX_STEPS = 1000000;
function runBozo(input) {
  const arr = [...input];
  let steps = 0, swaps = 0;
  while (countBadPairs(arr) > 0 && steps < MAX_STEPS) {
    if (bozoSortOptStep(arr)) swaps++;
    steps++;
  }
  return { steps, swaps, sorted: countBadPairs(arr) === 0 };
}
function runGuess(input) {
  const arr = [...input];
  let comparisons = 0, swaps = 0;
  while (countBadPairs(arr) > 0) {
    comparisons += guessSortStep(arr);
    swaps++;
  }
  return { comparisons, swaps };
}
const n = original.length;
const maxInversions = n * (n - 1) / 2;
let bozoTotal = { steps: 0, swaps: 0 };
let guessTotal = { comparisons: 0, swaps: 0 };
for (let t = 0; t < 100; t++) {
  const b = runBozo(original);
  const g = runGuess(original);
  bozoTotal.steps += b.steps;
  bozoTotal.swaps += b.swaps;
  guessTotal.comparisons += g.comparisons;
  guessTotal.swaps += g.swaps;
}
console.log('Comparación (promedio de 100 ensayos):');
console.log(`bozo-sort+_opt: ${(bozoTotal.steps/100).toFixed(0)} pasos, ${(bozoTotal.swaps/100).toFixed(0)} intercambios`);
console.log(`guess-sort:     ${(guessTotal.comparisons/100).toFixed(0)} comparaciones, ${(guessTotal.swaps/100).toFixed(0)} intercambios`);
console.log(`C(n,2) = ${maxInversions} — esperado para intercambios`);
console.log('\n¿Por qué guess-sort mejora? Siempre intercambia pares malos.');