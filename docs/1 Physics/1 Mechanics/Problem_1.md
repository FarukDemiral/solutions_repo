# Problem 
# Projectile Motion Analysis

## 1. Theoretical Foundation

### Deriving Equations of Motion
Projectile motion follows Newton’s second law:

$$ F = ma $$

For a projectile launched with initial velocity \( v_0 \) at an angle \( \theta \), we decompose motion into horizontal and vertical components:

- Horizontal: $$ v_{0x} = v_0 \cos\theta $$
- Vertical: $$ v_{0y} = v_0 \sin\theta $$

Using kinematic equations:

$$ x(t) = v_{0x} t $$

$$ y(t) = v_{0y} t - \frac{1}{2} g t^2 $$

To find the time of flight:

$$ t_f = \frac{2 v_{0y}}{g} = \frac{2 v_0 \sin\theta}{g} $$

### Family of Solutions
Varying initial velocity and angle results in different trajectories, forming a family of solutions characterized by different maximum heights and ranges.

---

## 2. Analysis of the Range

The horizontal range \( R \) is given by:

$$ R = \frac{v_0^2 \sin 2\theta}{g} $$

### Factors Affecting Range
- Increasing $v_0$ increases $R$ quadratically.
- Maximum range occurs at  $theta = 45^\circ$.
- Increasing g$ (e.g., on different planets) decreases $R$.

---

## 3. Practical Applications

- **Ballistics**: Optimizing projectile launch angles for artillery.
- **Sports**: Calculating optimal angles for throwing a ball.
- **Rocket Launches**: Adjusting for air resistance and varying gravity.

---

## 4. Implementation

### Python Simulation
Below is a Python script to simulate projectile motion and visualize range vs. angle:

```python
import numpy as np
import matplotlib.pyplot as plt

def projectile_range(v0, theta, g=9.81):
    theta_rad = np.radians(theta)
    return (v0**2 * np.sin(2 * theta_rad)) / g

angles = np.linspace(0, 90, 100)
v0 = 20  # Initial velocity (m/s)

ranges = [projectile_range(v0, theta) for theta in angles]

plt.plot(angles, ranges)
plt.xlabel("Launch Angle (degrees)")
plt.ylabel("Range (m)")
plt.title("Projectile Range vs. Launch Angle")
plt.grid()
plt.show()
```

This script plots the projectile range as a function of launch angle. The maximum range is achieved at \( 45^\circ \).
