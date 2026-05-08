# Problema 5 — Inversiones esperadas: E[inv] = n(n−1)/4

---

## Enunciado

Sea `A` una permutación aleatoria uniforme de `[1..n]`. Una **inversión** es un par `(i, j)` con `i < j` pero `A[i] > A[j]`. Usa variables aleatorias indicadoras para calcular el número esperado de inversiones.

---

## Solución

### Paso 1 — Definir indicadoras

Para cada par de índices `(i, j)` con `i < j`, define:

```
Xᵢⱼ = 1  si (i, j) es una inversión (A[i] > A[j])
      0  en caso contrario
```

### Paso 2 — Calcular P(Xᵢⱼ = 1)

En una permutación aleatoria uniforme de `n` elementos distintos, fijando cualquier par de posiciones `i < j`, los valores `A[i]` y `A[j]` pueden estar en cualquiera de los dos órdenes relativos con igual probabilidad:

```
P(A[i] > A[j]) = 1/2    para todo par (i, j) con i ≠ j
```

Esto se debe a que la permutación es uniforme: de todas las `n!` permutaciones, exactamente la mitad tiene `A[i] > A[j]` para cualquier par fijo `(i, j)`.

### Paso 3 — Aplicar linealidad

El total de inversiones es:

```
X = Σ_{i < j} Xᵢⱼ
```

Por **linealidad de la esperanza**:

```
E[X] = Σ_{i < j} E[Xᵢⱼ]
     = Σ_{i < j} (1/2)
     = C(n, 2) · (1/2)
     = [n(n−1)/2] · (1/2)
     = n(n−1)/4
```

---

## Casos extremos

| Configuración | Inversiones |
|--------------|-------------|
| Arreglo ordenado `[1,2,...,n]` | 0 |
| Arreglo inverso `[n,...,2,1]` | `C(n,2) = n(n-1)/2` (máximo) |
| Permutación aleatoria promedio | `n(n-1)/4` |

El valor esperado es exactamente la mitad del máximo posible.

---

## Tabla de valores

| n  | E[inv] = n(n-1)/4 | Máx = n(n-1)/2 |
|----|------------------|----------------|
| 4  | 3.0              | 6              |
| 5  | 5.0              | 10             |
| 6  | 7.5              | 15             |
| 8  | 14.0             | 28             |
| 10 | 22.5             | 45             |

---

## Implementación

Ver [`solution.js`](./solution.js).

```js
function countInversions(arr) {
  let count = 0;
  for (let i = 0; i < arr.length; i++)
    for (let j = i + 1; j < arr.length; j++)
      if (arr[i] > arr[j]) count++;
  return count;
}

function expectedInversions(n) {
  return n * (n - 1) / 4;
}
```

---

## Verificación

Al correr `node solution.js`, el promedio de inversiones sobre 10,000 permutaciones aleatorias converge a `n(n-1)/4` para cada `n` probado.

---

## Conexión con algoritmos de sorting

El número de inversiones en un arreglo es exactamente el número de *swaps* que realizaría **Insertion Sort** (o Bubble Sort). Por eso, el tiempo promedio de Insertion Sort en una permutación aleatoria es `Θ(n²/4) = Θ(n²)`.
