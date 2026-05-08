# 📚 Módulo 5 · Análisis Probabilístico · UVG

Soluciones a los 5 problemas del módulo de Análisis Probabilístico del curso ADA (Análisis y Diseño de Algoritmos), Universidad del Valle de Guatemala.

> **Fuente de los problemas:** https://ada-m5-homework.vercel.app/Enlaces  
> **Video de soluciones:** *(link pendiente — agregar URL de YouTube)*

---

## 🗂️ Estructura del repositorio

```
.
├── README.md                  ← este archivo
├── problema1/
│   ├── README.md              ← análisis y explicación
│   └── solution.js            ← implementación ejecutable
├── problema2/
│   ├── README.md
│   └── solution.js
├── problema3/
│   ├── README.md
│   └── solution.js
├── problema4/
│   ├── README.md
│   └── solution.js
└── problema5/
    ├── README.md
    └── solution.js
```

---

## 📋 Resumen de problemas

| # | Título | Concepto clave | Resultado |
|---|--------|---------------|-----------|
| 1 | [`random(a,b)` desde bits](./problema1/README.md) | Distribución geométrica | E[intentos] = 2ᵏ / (b−a+1) |
| 2 | [Truco de Von Neumann](./problema2/README.md) | Independencia y simetría | E[llamadas] = 1/(p(1−p)) |
| 3 | [Hiring Problem](./problema3/README.md) | Variables indicadoras + Hₙ | E[hires] = Hₙ ≈ ln(n) |
| 4 | [Suma de n dados](./problema4/README.md) | Linealidad de la esperanza | E[suma] = 3.5·n |
| 5 | [Inversiones esperadas](./problema5/README.md) | Indicadoras sobre pares | E[inv] = n(n−1)/4 |

---

## 🚀 Cómo ejecutar

Necesitas [Node.js](https://nodejs.org/) instalado.

```bash
# Ejecutar cualquier solución directamente
node problema1/solution.js
node problema2/solution.js
node problema3/solution.js
node problema4/solution.js
node problema5/solution.js
```

---

## 🧠 Temas cubiertos

- **Variables aleatorias indicadoras**: simplifican enormemente el cálculo de esperanzas.
- **Linealidad de la esperanza**: E[X + Y] = E[X] + E[Y], siempre, incluso sin independencia.
- **Distribución Geométrica**: modela el número de intentos hasta el primer éxito.
- **Números armónicos**: Hₙ = 1 + 1/2 + 1/3 + ··· + 1/n ≈ ln(n).
- **Algoritmos aleatorizados**: correctitud garantizada (en esperanza), eficiencia probabilística.

---

## 🤖 Herramientas utilizadas

Este repositorio fue desarrollado con asistencia de **Claude (Anthropic)** para la estructuración y documentación. Todo el código fue revisado, comprendido y verificado manualmente.
