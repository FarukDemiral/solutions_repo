# Problem 2
# Interference Patterns on a Water Surface

## Motivation

Interference occurs when waves from different sources overlap, creating new patterns. On a water surface, this can be easily observed when ripples from different points meet, forming distinctive interference patterns. These patterns can show us how waves combine in different ways, either reinforcing each other or canceling out.

Studying these patterns helps us understand wave behavior in a simple, visual way. It also allows us to explore important concepts, like the relationship between wave phase and the effects of multiple sources. This task offers a hands-on approach to learning about wave interactions and their real-world applications, making it an interesting and engaging way to dive into wave physics.

---

## Theoretical Foundation

A circular wave on the water surface, emanating from a point source located at $(x_0, y_0)$, can be described by the **Single Disturbance Equation**:

$$
\eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
$$

where:

* $\eta(x, y, t)$: displacement of the water surface at position $(x, y)$ and time $t$
* $A$: amplitude of the wave
* $k = \frac{2\pi}{\lambda}$: wave number ($\lambda$ is the wavelength)
* $\omega = 2\pi f$: angular frequency ($f$ is the frequency)
* $r = \sqrt{(x - x_0)^2 + (y - y_0)^2}$: distance from the source to the point $(x, y)$
* $\phi$: initial phase

To simulate multiple sources:

$$
\eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t)
$$

where $N$ is the number of point sources.


## Problem Setup

We simulate waves from 3 coherent sources placed at the vertices of an **equilateral triangle**. All sources share:

* Same amplitude $A$
* Same frequency $f$
* Same wavelength $\lambda$
* Constant phase relation (coherent)


## Interactive JavaScript Simulation

Below is an interactive 3D surface plot implemented using Plotly.js. It simulates the interference pattern from point sources arranged in a triangle.

```html
<div id="plot"></div>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
const A = 1.0;
const lambda = 5.0;
const k = 2 * Math.PI / lambda;
const f = 1.0;
const omega = 2 * Math.PI * f;
const phi = 0;
const t = 0.0;
const N = 200;

const x = [...Array(N)].map((_, i) => -20 + i * 40 / (N - 1));
const y = [...Array(N)].map((_, i) => -20 + i * 40 / (N - 1));

const sources = [
  [10 * Math.cos(0), 10 * Math.sin(0)],
  [10 * Math.cos(2 * Math.PI / 3), 10 * Math.sin(2 * Math.PI / 3)],
  [10 * Math.cos(4 * Math.PI / 3), 10 * Math.sin(4 * Math.PI / 3)]
];

let z = [];
for (let i = 0; i < N; i++) {
  let row = [];
  for (let j = 0; j < N; j++) {
    let xi = x[j];
    let yi = y[i];
    let sum = 0;
    for (let s = 0; s < sources.length; s++) {
      let [x0, y0] = sources[s];
      let r = Math.sqrt((xi - x0) ** 2 + (yi - y0) ** 2) + 0.001;
      sum += A / Math.sqrt(r) * Math.cos(k * r - omega * t + phi);
    }
    row.push(sum);
  }
  z.push(row);
}

Plotly.newPlot('plot', [{
  z: z,
  x: x,
  y: y,
  type: 'surface',
  colorscale: 'RdBu',
  contours: {
    z: { show: true, usecolormap: true }
  }
}], {
  title: 'Interference Pattern - Triangle Configuration',
  autosize: true,
  scene: { aspectratio: { x: 1, y: 1, z: 0.5 } }
});
</script>
```


## Observations & Explanation

* **Constructive Interference**: Bright zones where wave crests align from multiple sources, increasing amplitude.
* **Destructive Interference**: Dark or zero-displacement regions where waves cancel out.
* The **symmetry** of the interference pattern reflects the underlying geometry (triangle).

The result highlights how the spatial arrangement of sources and wave properties leads to predictable, beautiful interference structures.


## Graphical Output

> The interactive plot shows the 3D displacement of the water surface. Use mouse or touch to rotate and explore regions of interference.


## Considerations

* All sources use identical wave properties (A, $\lambda$, f).
* Coherent sources ensure consistent phase relationships.
* Simulation can be extended to **square** or **pentagon** layouts by adjusting the number of vertices.


## Conclusion

This simulation shows how simple principles of wave superposition lead to complex interference patterns. By changing source positions and wave properties, we can study the effects of geometry and coherence in wave physics.


## References

* Fundamentals of Wave Physics
* Simulation adapted using Plotly.js in JavaScript
* GitHub Page by *Student Developer* (2025)
