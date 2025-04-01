# Problem 1

# Problem 3 - Orbital Period and Orbital Radius Simulation

## 1. Motivation

The relationship between the orbital period and orbital radius, known as **Kepler's Third Law**, connects planetary motion with gravitational theory. It is expressed as:

$$
T^2 \propto R^3
$$

Where:
- \(T\) is the orbital period
- \(R\) is the orbital radius

This simulation explores this relationship in circular orbits using Newtonian gravitation and centripetal force.

---

## 2. Theoretical Foundation

Using Newton's Law of Gravitation and circular motion:

- Gravitational Force:  
  $$ F = \frac{GMm}{R^2} $$
- Centripetal Force:  
  $$ F = \frac{mv^2}{R} $$

Setting the two equal:

$$
\frac{GMm}{R^2} = \frac{mv^2}{R}
$$

Solving for velocity:

$$
v = \sqrt{\frac{GM}{R}}
$$

Orbital period is:

$$
T = \frac{2\pi R}{v} = 2\pi \sqrt{\frac{R^3}{GM}}
$$

Thus, proving Kepler's Third Law:

$$
T^2 = \frac{4\pi^2}{GM} R^3
$$

---

## 3. Simulation Code (Python)

```python
import numpy as np
import matplotlib.pyplot as plt

# Constants
G = 6.67430e-11  # gravitational constant
M = 1.989e30     # mass of the Sun (kg)

# Orbital radii in meters (e.g., Mercury to Mars)
radii = np.array([5.79e10, 1.08e11, 1.50e11, 2.28e11])
labels = ["Mercury", "Venus", "Earth", "Mars"]

# Calculate periods using T = 2pi * sqrt(R^3 / GM)
periods = 2 * np.pi * np.sqrt(radii**3 / (G * M))
periods_days = periods / (60 * 60 * 24)

# Plotting
plt.figure(figsize=(8, 5))
plt.plot(radii, periods_days, 'o-', label='Simulated T vs R')
plt.xlabel('Orbital Radius (m)')
plt.ylabel('Orbital Period (days)')
plt.title("Kepler's Third Law - Orbital Period vs Radius")
plt.grid(True)

for i, txt in enumerate(labels):
    plt.annotate(txt, (radii[i], periods_days[i]))

plt.show()
```

---

## 4. Results & Discussion

This simulation confirms:

- The square of the orbital period grows with the cube of the radius.
- The plotted data aligns with Kepler's Third Law prediction.
- Real planets like Earth and Mars fit well into the curve.

You can extend this model for:
- Elliptical orbits
- Moons around planets
- Exoplanet systems

---

## 5. Deliverables

- ✅ A Markdown document with Python simulation code ✅
- ✅ Explanation of Kepler's Law and Newtonian mechanics ✅
- ✅ Visual graph: Orbital Period vs Radius ✅
- ✅ Real examples from Solar System ✅

