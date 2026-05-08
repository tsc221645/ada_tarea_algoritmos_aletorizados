# Problema 1 — `random(a, b)` desde `random(0, 1)`


---

## Enunciado

Implementa un generador de enteros uniformes en `[a, b]` usando únicamente llamadas a `random01()`, donde `P(0) = P(1) = ½`. Calcula el tiempo de ejecución esperado.

---

## Idea clave

Para generar un entero uniforme en `[a, b]` necesitamos producir uno de `(b − a + 1)` valores equiprobables. Como `random01()` solo produce bits, el plan es:

1. Calcular cuántos bits necesitamos: `k = ⌈log₂(b − a + 1)⌉`
2. Generar `k` bits → número `r ∈ [0, 2ᵏ − 1]`
3. Si `r ≤ b − a` → retornar `a + r` (está en rango)
4. Si `r > b − a` → **descartar y repetir** (garantiza uniformidad)

El rechazo de valores fuera de rango es lo que asegura que todos los valores en `[a, b]` sean igualmente probables.

---

## Análisis de tiempo esperado

La probabilidad de éxito en cada intento es:

```
p = (b − a + 1) / 2ᵏ
```

El número de intentos hasta el primer éxito sigue una **distribución Geométrica** con parámetro `p`:

```
E[intentos] = 1/p = 2ᵏ / (b − a + 1)
```

**¿Cuánto puede crecer esto?** En el peor caso, `(b − a + 1)` es una potencia de 2, entonces `p = 1` y solo necesitamos un intento. En el peor caso real, si `(b − a + 1)` es justo mayor que `2^(k-1)`, entonces `p` puede ser tan pequeño como `1/2`, dando `E[intentos] = 2`. En general, `1/2 < p ≤ 1`, así que:

```
E[intentos] < 2   →   T(n) ∈ O(1) tiempo esperado (constante respecto a n)
```

Cada intento requiere exactamente `k = O(log(b−a))` llamadas a `random01()`.

---

## Ejemplo: `random(1, 6)`

```
k = ⌈log₂(6)⌉ = 3 bits → rango [0, 7]

Valores válidos:   r ∈ {0,1,2,3,4,5}  →  retorna {1,2,3,4,5,6}
Valores inválidos: r ∈ {6, 7}          →  reintentar

p = 6/8 = 0.75
E[intentos] = 1/0.75 ≈ 1.33
```

---

## Implementación

Ver [`solution.js`](./solution.js).

```js
function random(a, b) {
  const range = b - a + 1;
  const k = Math.ceil(Math.log2(range));

  while (true) {
    let r = 0;
    for (let i = 0; i < k; i++) {
      r = r * 2 + random01();   // construye número binario bit a bit
    }
    if (r < range) return a + r; // r en [0, range-1] → mapea a [a, b]
    // si r >= range: descartar y repetir
  }
}
```

---

## Verificación

Al correr `node solution.js` con `A=1, B=6, N=10000`:

- Cada valor `{1..6}` debe aparecer ≈ 16.7% (1666 veces)
- El promedio de intentos debe converger a `E[intentos] = 2ᵏ/(b−a+1) ≈ 1.333`

---

## Conexión con distribución Geométrica

Si `X` es el número de intentos, entonces:

```
P(X = t) = (1 − p)^(t−1) · p     para t = 1, 2, 3, ...
E[X] = 1/p
Var[X] = (1 − p) / p²
```

Esta es exactamente la distribución que describe "¿cuántas veces hay que lanzar una moneda (con prob. p de cara) hasta obtener la primera cara?".
