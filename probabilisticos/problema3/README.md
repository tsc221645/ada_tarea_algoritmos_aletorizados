# Problema 3 — Hiring Problem: E[hires] = Hₙ ≈ ln(n)

---

## Enunciado

En el *hiring problem*, entrevistamos candidatos uno a uno. Cada vez que el candidato actual es **mejor que todos los anteriores**, lo contratamos (y despedimos al anterior). ¿Cuáles son las probabilidades del mejor y peor caso? ¿Cuántas contrataciones se esperan en promedio?

---

## Casos extremos

**Best case — solo 1 contratación:**  
El candidato 1 se contrata siempre (no hay nadie antes). Solo habrá 1 contratación si el candidato 1 es el mejor de todos.

```
P(best-case) = P(candidato 1 es el mejor de n) = 1/n
```

**Worst case — n contrataciones:**  
Contratamos a todos si los candidatos llegan en orden estrictamente creciente de calidad (el primero es el peor, el último el mejor). De todas las `n!` permutaciones, solo 1 tiene este orden.

```
P(worst-case) = 1/n!
```

---

## Cálculo de E[contrataciones] con variables indicadoras

Sea `Xᵢ = 1` si el candidato `i` es contratado, `0` si no.

El candidato `i` se contrata si y solo si es el **mejor entre los primeros `i`**. En una permutación aleatoria uniforme, cualquiera de los `i` primeros candidatos puede ser el mejor con igual probabilidad:

```
P(Xᵢ = 1) = 1/i    para i = 1, 2, ..., n
```

El total de contrataciones es `X = X₁ + X₂ + ··· + Xₙ`. Por **linealidad de la esperanza**:

```
E[X] = Σᵢ₌₁ⁿ E[Xᵢ] = Σᵢ₌₁ⁿ 1/i = Hₙ
```

donde `Hₙ = 1 + 1/2 + 1/3 + ··· + 1/n` es el **n-ésimo número armónico**.

Se puede demostrar que `Hₙ = ln(n) + γ + O(1/n)` donde `γ ≈ 0.5772` (constante de Euler-Mascheroni), por lo que:

```
E[contrataciones] = Hₙ ≈ ln(n)   → O(log n)
```

---

## Intuición

| n  | Hₙ (exacto) | ln(n) |
|----|------------|-------|
| 2  | 1.500 | 0.693 |
| 4  | 2.083 | 1.386 |
| 8  | 2.718 | 2.079 |
| 16 | 3.381 | 2.773 |
| 100 | 5.187 | 4.605 |

A pesar de que en el peor caso contratamos `n` veces, el **promedio** crece solo logarítmicamente — mucho más lento que `n`.

---

## Implementación

Ver [`solution.js`](./solution.js).

```js
function hiringAlgorithm(candidates) {
  let best = -Infinity;
  let hires = 0;
  for (const quality of candidates) {
    if (quality > best) {
      best = quality;
      hires++;
    }
  }
  return hires;
}
```

---

## Verificación

Al correr `node solution.js` con `n=8`, 100,000 ensayos:

- `E[contrataciones]` simulado ≈ `Hₙ ≈ 2.718`
- `P(1 contratación)` ≈ `1/8 = 0.125`
- `P(8 contrataciones)` ≈ `1/8! = 1/40320 ≈ 0.0000248`
