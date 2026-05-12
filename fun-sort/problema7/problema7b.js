// Implementa Fun-Sort según el paper de Biedl et al.
// Para cada fase i (1-indexed, i = 1..n):
//   x = a[i], l = 0, h = n+1
//   Mientras l+1 < h: m = floor((l+h)/2)
//     Si x <= a[m]: h = m; sino: l = m
//   Si h < i y a[h] != x: intercambia a[i] con a[h-1]  [mover izq]
//   Si h > i y a[h] != x: intercambia a[h] con a[i]    [mover der]
// Nota: el binary search termina con l+1 == h

function funSort(input) {
  const a = [...input];
  const n = a.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i <= n; i++) {
    const x = a[i - 1];
    let l = 0;
    let h = n + 1;

    while (l + 1 < h) {
      const m = Math.floor((l + h) / 2);
      comparisons++;
      if (x <= a[m - 1]) {
        h = m;
      } else {
        l = m;
      }
    }

    if (h < i && a[h - 1] !== x) {
      [a[i - 1], a[h - 2]] = [a[h - 2], a[i - 1]];
      swaps++;
    } else if (h > i && a[h - 1] !== x) {
      [a[h - 1], a[i - 1]] = [a[i - 1], a[h - 1]];
      swaps++;
    }
  }

  return { sorted: a, comparisons, swaps };
}

function countInversions(arr) {
  let inv = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i+1; j < arr.length; j++)
      if (arr[i] > arr[j]) inv++;
  return inv;
}

const tests = [
  [3, 1, 4, 1, 5, 9, 2, 6],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [8, 7, 6, 5, 4, 3, 2, 1],
];

for (const arr of tests) {
  const F = countInversions(arr);
  const result = funSort(arr);
  const n = arr.length;
  const bound = (n + F) * Math.log2(n);
  console.log(`Input: [${arr}]`);
  console.log(`  F=${F}, comparaciones=${result.comparisons}, O((n+F)logn)=${bound.toFixed(0)}`);
  console.log(`  Ordenado: [${result.sorted}]`);
  console.log('');
}

const n = 8;
let totalF = 0;
for (let t = 0; t < 10000; t++) {
  const arr = Array.from({length:n},(_,i)=>i+1);
  for (let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  totalF += countInversions(arr);
}
console.log(`E[F] simulado (n=${n}): ${(totalF/10000).toFixed(2)}`);
console.log(`E[F] teórico n(n-1)/4: ${n*(n-1)/4}`);
console.log(`Umbral Teorema 6 (F = o(n²/logn)): ${(n*n/Math.log2(n)).toFixed(0)}`);


// ─── Ejemplos adicionales de llamados a funSort ───────────────────────────────

console.log('\n=== Ejemplos adicionales ===\n');

// 1. Array ya ordenado (F=0) → mínimo trabajo, comparaciones ≈ n·log2(n)
const ejOrdenado = [1, 2, 3, 4, 5, 6, 7, 8];
const r1 = funSort(ejOrdenado);
console.log(`[Ya ordenado]  Input:  [${ejOrdenado}]`);
console.log(`               Output: [${r1.sorted}]  |  F=${countInversions(ejOrdenado)}, cmp=${r1.comparisons}, swaps=${r1.swaps}`);

// 2. Array invertido (F máximo = n(n-1)/2) → caso peor, comparaciones ≈ n²·log2(n)
const ejInvertido = [8, 7, 6, 5, 4, 3, 2, 1];
const r2 = funSort(ejInvertido);
console.log(`\n[Invertido]    Input:  [${ejInvertido}]`);
console.log(`               Output: [${r2.sorted}]  |  F=${countInversions(ejInvertido)}, cmp=${r2.comparisons}, swaps=${r2.swaps}`);

// 3. Un solo elemento fuera de lugar (F pequeño)
const ejCasiOrdenado = [1, 2, 8, 4, 5, 6, 7, 3];
const r3 = funSort(ejCasiOrdenado);
console.log(`\n[Casi ordenado] Input:  [${ejCasiOrdenado}]`);
console.log(`                Output: [${r3.sorted}]  |  F=${countInversions(ejCasiOrdenado)}, cmp=${r3.comparisons}, swaps=${r3.swaps}`);

// 4. Array con duplicados
const ejDuplicados = [4, 2, 4, 1, 3, 2, 4, 1];
const r4 = funSort(ejDuplicados);
console.log(`\n[Duplicados]   Input:  [${ejDuplicados}]`);
console.log(`               Output: [${r4.sorted}]  |  F=${countInversions(ejDuplicados)}, cmp=${r4.comparisons}, swaps=${r4.swaps}`);

// 5. Array de un solo elemento (caso base)
const ejUnico = [42];
const r5 = funSort(ejUnico);
console.log(`\n[Un elemento]  Input:  [${ejUnico}]`);
console.log(`               Output: [${r5.sorted}]  |  F=${countInversions(ejUnico)}, cmp=${r5.comparisons}, swaps=${r5.swaps}`);

// 6. Array de dos elementos desordenados
const ejDos = [2, 1];
const r6 = funSort(ejDos);
console.log(`\n[Dos elementos] Input:  [${ejDos}]`);
console.log(`                Output: [${r6.sorted}]  |  F=${countInversions(ejDos)}, cmp=${r6.comparisons}, swaps=${r6.swaps}`);

// 7. Permutación aleatoria de tamaño 12 → muestra escalado respecto a bound
const ejRandom = Array.from({length: 12}, (_, i) => i + 1);
for (let i = ejRandom.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [ejRandom[i], ejRandom[j]] = [ejRandom[j], ejRandom[i]];
}
const r7 = funSort(ejRandom);
const F7 = countInversions(ejRandom);
const bound7 = (ejRandom.length + F7) * Math.log2(ejRandom.length);
console.log(`\n[Random n=12]  Input:  [${ejRandom}]`);
console.log(`               Output: [${r7.sorted}]`);
console.log(`               F=${F7}, cmp=${r7.comparisons}, bound O((n+F)logn)=${bound7.toFixed(0)}, ratio=${(r7.comparisons/bound7).toFixed(3)}`);
