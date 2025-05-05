# Problem 1
# Interference Patterns on a Water Surface

## Motivation

Interference occurs when waves from different sources overlap, creating new patterns. On a water surface, this can be easily observed when ripples from different points meet, forming distinctive interference patterns. These patterns can show us how waves combine in different ways, either reinforcing each other or canceling out.

Studying these patterns helps us understand wave behavior in a simple, visual way. It also allows us to explore important concepts, like the relationship between wave phase and the effects of multiple sources. This task offers a hands-on approach to learning about wave interactions and their real-world applications, making it an interesting and engaging way to dive into wave physics.


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


## Python Simulation Code

```python
import numpy as np
import matplotlib.pyplot as plt

# Parameters
A = 1.0
lambda_ = 5.0
k = 2 * np.pi / lambda_
f = 1.0
omega = 2 * np.pi * f
phi = 0

# Time instance
t = 0.0

# Grid setup
x = np.linspace(-20, 20, 400)
y = np.linspace(-20, 20, 400)
X, Y = np.meshgrid(x, y)

# Triangle vertices (equilateral)
radius = 10.0
angles = [0, 2*np.pi/3, 4*np.pi/3]
sources = [(radius*np.cos(a), radius*np.sin(a)) for a in angles]

# Superposition
eta_total = np.zeros_like(X)
for (x0, y0) in sources:
    R = np.sqrt((X - x0)**2 + (Y - y0)**2)
    eta = A / np.sqrt(R + 1e-6) * np.cos(k*R - omega*t + phi)
    eta_total += eta

# Plotting
plt.figure(figsize=(8, 6))
plt.pcolormesh(X, Y, eta_total, shading='auto', cmap='RdBu')
plt.colorbar(label='Surface Displacement')
plt.title('Interference Pattern - Triangle Configuration')
plt.xlabel('x')
plt.ylabel('y')
plt.gca().set_aspect('equal')
plt.tight_layout()
plt.show()
```


## Observations & Explanation

* **Constructive Interference**: Bright zones where wave crests align from multiple sources, increasing amplitude.
* **Destructive Interference**: Dark or zero-displacement regions where waves cancel out.
* The **symmetry** of the interference pattern reflects the underlying geometry (triangle).

The result highlights how the spatial arrangement of sources and wave properties leads to predictable, beautiful interference structures.


## Graphical Output

> The color map visualizes the displacement on the water surface. Red and blue represent peaks and troughs. White or central regions show minimal or no displacement due to destructive interference.


## Considerations

* All sources use identical wave properties (A, $\lambda$, f).
* Coherent sources ensure consistent phase relationships.
* Simulation can be extended to **square** or **pentagon** layouts by adjusting the number of vertices.


## Conclusion

This simulation shows how simple principles of wave superposition lead to complex interference patterns. By changing source positions and wave properties, we can study the effects of geometry and coherence in wave physics.


## References

* Fundamentals of Wave Physics
* Simulation adapted using NumPy and Matplotlib in Python
* GitHub Page by *Student Developer* (2025)
