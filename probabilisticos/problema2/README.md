# Problema 2 — Truco de Von Neumann (Desesgar una moneda)
---

## Enunciado

Dado `biasedRandom()` que produce `1` con probabilidad `p` y `0` con probabilidad `1 − p` (con `0 < p < 1` desconocido), diseña un algoritmo que use únicamente `biasedRandom()` para generar `0` o `1` con probabilidad exactamente `½` cada uno. Calcula el tiempo de ejecución esperado.

---

## Truco de Von Neumann

La clave está en la **simetría** de los pares discordantes. Llama a `biasedRandom()` dos veces y observa el par resultante:

| Par     | Probabilidad | Acción      |
|---------|-------------|-------------|
| `(1, 0)` | `p · (1−p)` | → retorna **1** |
| `(0, 1)` | `(1−p) · p` | → retorna **0** |
| `(0, 0)` | `(1−p)²`    | → **descartar y repetir** |
| `(1, 1)` | `p²`        | → **descartar y repetir** |

**¿Por qué funciona?** Porque `P(1,0) = p(1−p) = P(0,1)` — los dos pares discordantes tienen exactamente la misma probabilidad, sin importar el valor de `p`. Dado que obtenemos un resultado (no descartamos), ambos resultados son igualmente probables → salida es 50/50.

---

## Análisis del tiempo esperado

La probabilidad de obtener un resultado válido en un intento es:

```
P(emitir) = P(1,0) + P(0,1) = p(1−p) + (1−p)p = 2p(1−p)
```

Cada intento consume 2 llamadas a `biasedRandom()`. El número de intentos sigue una **distribución Geométrica**:

```
E[intentos] = 1 / (2p(1−p))
E[llamadas a biasedRandom] = 2 · E[intentos] = 1 / (p(1−p))
```

**Casos extremos:**

| `p` | `E[llamadas]` |
|-----|--------------|
| 0.5 | **4** (mínimo) |
| 0.3 | ≈ 4.76 |
| 0.1 | ≈ 11.11 |
| 0.01 | ≈ 101 |

Cuanto más sesgada la moneda (`p → 0` o `p → 1`), más llamadas se necesitan. En el límite `p → 0` o `p → 1`, el número esperado de llamadas tiende a infinito.

---

## Implementación

Ver [`solution.js`](./solution.js).

```js
function unbiasedRandom(p) {
  while (true) {
    const a = biasedRandom(p);
    const b = biasedRandom(p);
    if (a === 1 && b === 0) return 1;  // par (1,0) → 1
    if (a === 0 && b === 1) return 0;  // par (0,1) → 0
    // (0,0) o (1,1): descartar y repetir
  }
}
```

---

## Verificación

Al correr `node solution.js` debemos ver:

- Para **cualquier** valor de `p`: la salida es ≈ 50% unos y 50% ceros
- El promedio de llamadas a `biasedRandom` coincide con `1/(p(1−p))`
- Para `p = 0.5`: ≈ 4 llamadas promedio
- Para `p = 0.1` o `p = 0.9`: ≈ 11 llamadas promedio

---

## Nota importante

El algoritmo **no necesita conocer `p`** — solo necesita que `0 < p < 1` y que las llamadas sean independientes. Esto lo hace extremadamente útil en la práctica: funciona con cualquier fuente sesgada sin saber cuánto sesgo tiene.
