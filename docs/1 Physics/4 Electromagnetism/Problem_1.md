# Problem 1
# Interference Patterns on a Water Surface

## Theoretical Foundation

A **circular wave** on the water surface, emanating from a point source located at $$(x_0, y_0)$$, can be described by the **Single Disturbance Equation**:

$$
\eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
$$

Where:
- $$\eta(x, y, t)$$: Displacement at point $$(x, y)$$ and time $$t$$
- $$A$$: Amplitude of the wave
- $$k = \frac{2\pi}{\lambda}$$: Wave number
- $$\omega = 2\pi f$$: Angular frequency
- $$r = \sqrt{(x - x_0)^2 + (y - y_0)^2}$$: Distance from source to point $$(x, y)$$
- $$\phi$$: Initial phase

### Superposition Principle

With multiple sources, total displacement is:

$$
\eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t)
$$

Where $$N$$ is the number of point sources.

---

## Simulation: Interference from Point Sources at Polygon Vertices

```python
import numpy as np
import matplotlib.pyplot as plt

# Wave and simulation parameters
A = 1                # Amplitude
wavelength = 2       # Wavelength (lambda)
frequency = 1        # Frequency (f)
omega = 2 * np.pi * frequency
k = 2 * np.pi / wavelength
phi = 0              # Initial phase

# Time snapshot for visualization
t = 0

# Grid setup
x = np.linspace(-10, 10, 500)
y = np.linspace(-10, 10, 500)
X, Y = np.meshgrid(x, y)

# Choose polygon (e.g. hexagon)
N = 6  # number of sources
radius = 5

# Generate source positions in a regular polygon
angles = np.linspace(0, 2 * np.pi, N, endpoint=False)
source_coords = [(radius * np.cos(a), radius * np.sin(a)) for a in angles]

# Compute total wave interference
eta_total = np.zeros_like(X)
for x0, y0 in source_coords:
    r = np.sqrt((X - x0)**2 + (Y - y0)**2) + 1e-6  # Avoid division by zero
    eta = (A / np.sqrt(r)) * np.cos(k * r - omega * t + phi)
    eta_total += eta

# Plotting
plt.figure(figsize=(8, 6))
plt.contourf(X, Y, eta_total, levels=200, cmap='viridis')
plt.colorbar(label='Displacement η(x, y)')
plt.scatter(*zip(*source_coords), color='red', label='Wave Sources')
plt.title("Interference Pattern from Polygon Wave Sources")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.axis('equal')
plt.tight_layout()
plt.show()

