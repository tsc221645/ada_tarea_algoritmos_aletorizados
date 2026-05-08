# Problema 4 — Suma esperada de n dados: E[suma] = 3.5·n

---

## Enunciado

Usa variables aleatorias para calcular la suma esperada de `n` dados lanzados simultáneamente.

---

## Solución por linealidad de la esperanza

Sea `X = X₁ + X₂ + ··· + Xₙ` donde `Xᵢ` es el valor del dado `i`.

Como cada dado es idéntico e independiente, basta calcular `E[X₁]`:

```
E[X₁] = Σⱼ₌₁⁶ j · P(X₁ = j)
       = (1 + 2 + 3 + 4 + 5 + 6) / 6
       = 21 / 6
       = 3.5
```

Por **linealidad de la esperanza** (que vale incluso sin independencia):

```
E[X] = E[X₁] + E[X₂] + ··· + E[Xₙ] = n · 3.5
```

---

## Enfoque con variables indicadoras

Para hacer el análisis más formal, definamos:

```
Yᵢⱼ = 1  si el dado i muestra la cara j  (con j ∈ {1..6})
      0  en caso contrario
```

Entonces `P(Yᵢⱼ = 1) = 1/6` y:

```
Xᵢ = Σⱼ₌₁⁶  j · Yᵢⱼ

E[Xᵢ] = Σⱼ₌₁⁶  j · E[Yᵢⱼ]
       = Σⱼ₌₁⁶  j · (1/6)
       = (1/6) · 21
       = 3.5
```

Y el resultado es el mismo: `E[X] = n · 3.5`.

---

## ¿Por qué es poderosa la linealidad?

La linealidad de la esperanza `E[X + Y] = E[X] + E[Y]` es válida **siempre**, independientemente de si las variables son dependientes o no. Esto la hace mucho más útil que otras propiedades (como la multiplicatividad, que sí requiere independencia).

En este problema: aunque podríamos calcular la distribución completa de la suma de `n` dados (que involucra convoluciones complicadas), la linealidad nos da el valor esperado con un cálculo trivial.

---

## Implementación

Ver [`solution.js`](./solution.js).

```js
function expectedSum(n) {
  const E_dado = (1 + 2 + 3 + 4 + 5 + 6) / 6; // = 3.5
  return n * E_dado;
}
```

---

## Verificación

Al correr `node solution.js`:

| n   | E[suma] teórico | Simulado (20k) |
|-----|----------------|----------------|
| 1   | 3.5            | ≈ 3.5          |
| 5   | 17.5           | ≈ 17.5         |
| 10  | 35.0           | ≈ 35.0         |
| 100 | 350.0          | ≈ 350.0        |
