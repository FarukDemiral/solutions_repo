# Problem 1
#  Simulating the Effects of the Lorentz Force

## 1. Introduction
The Lorentz force describes how electric and magnetic fields influence the motion of charged particles. The force is defined as:

$$ \vec{F} = q (\vec{E} + \vec{v} \times \vec{B}) $$

Where:
- $$ q $$: charge of the particle
- $$ \vec{E} $$: electric field
- $$ \vec{B} $$: magnetic field
- $$ \vec{v} $$: velocity of the particle

This simulation focuses on visualizing how different field configurations affect the trajectory of a charged particle.


## 2. Python Simulation Code

This simulation uses the **Euler method** to numerically integrate the equations of motion for a charged particle:

$$ ec{F} = q(ec{E} + ec{v} 	imes ec{B}) = m ec{a} $$

We use **NumPy** for calculations and **Matplotlib** for visualization. The simulation starts with a uniform magnetic field and can be extended to crossed fields and more complex configurations.

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Physical Constants and Initial Parameters
q = 1.6e-19   # Charge (Coulombs)
m = 9.11e-31  # Mass (kg) — electron

# Field Definitions
E = np.array([0.0, 0.0, 0.0])  # Uniform electric field (V/m)
B = np.array([0.0, 0.0, 1.0])  # Uniform magnetic field (T)

# Initial Conditions
v0 = np.array([1e6, 0.0, 0.0])  # Initial velocity (m/s)
r0 = np.array([0.0, 0.0, 0.0])  # Initial position (m)

# Simulation Parameters
dt = 1e-11  # Time step (s)
steps = 2000  # Number of steps

# Arrays to store trajectory
positions = np.zeros((steps, 3))
velocities = np.zeros((steps, 3))
positions[0] = r0
velocities[0] = v0

# Lorentz Force Simulation Loop
for i in range(1, steps):
    v = velocities[i-1]
    r = positions[i-1]
    F = q * (E + np.cross(v, B))
    a = F / m
    velocities[i] = v + a * dt
    positions[i] = r + velocities[i] * dt

# Plotting the Trajectory
fig = plt.figure(figsize=(8,6))
ax = fig.add_subplot(111, projection='3d')
ax.plot(positions[:,0], positions[:,1], positions[:,2], label='Particle Path')
ax.set_title("Charged Particle Trajectory under Lorentz Force")
ax.set_xlabel("x [m]")
ax.set_ylabel("y [m]")
ax.set_zlabel("z [m]")
ax.legend()
plt.tight_layout()
plt.show()
```

---

## 3. Visualization Summary
The figure above shows the trajectory of a charged particle under a **uniform magnetic field**. With an initial velocity perpendicular to the field, the particle undergoes **circular motion**, as expected from Lorentz force theory.

We can modify the fields to simulate:
- Helical motion (initial velocity at an angle to the field)
- Drift in crossed $$ \vec{E} \) and \( \vec{B} $$ fields
- Straight-line acceleration in electric fields


## 4. Practical Applications

### Cyclotrons:
- Cyclotrons use uniform magnetic fields to spiral charged particles outward.
- The simulation shows circular motion as a core feature of cyclotron operation.

### Magnetic Traps (e.g. Penning traps):
- Charged particles are confined using static magnetic and electric fields.
- By adjusting $$ \vec{E} \) and \( \vec{B} $$, the simulation can mimic this confinement.

### Plasma Physics:
- Lorentz force governs particle dynamics in magnetic confinement fusion.
- The drift motion under crossed fields relates directly to **E × B** drift in plasmas.


## 5. Future Work
- Add interactive controls to vary $$ q, m, ec{E}, ec{B}, ec{v} $$
- Compute and visualize **Larmor radius** and **gyrofrequency**
- Extend to 3D drift and multiple particle systems
- Implement alternative integration methods like **Runge-Kutta** for better accuracy
- Simulate motion under **non-uniform fields** (e.g., magnetic field gradients or spatially varying electric fields)
- Add trajectory comparisons between uniform and non-uniform field configurations
- Incorporate energy and momentum plots to analyze particle dynamics more deeply
- Add interactive controls to vary $$ q, m, \vec{E}, \vec{B}, \vec{v} $$
- Compute and visualize **Larmor radius** and **gyrofrequency**
- Extend to 3D drift and multiple particle systems
