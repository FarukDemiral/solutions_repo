# Problem 1
## Lorentz Force Simulation

This document contains a Python script that simulates the motion of a charged particle under the influence of the Lorentz force in various electromagnetic field configurations.

### 1. Exploration of Applications

The Lorentz force plays a crucial role in many physical systems:

* **Particle accelerators:** These devices use electric and magnetic fields to accelerate charged particles to very high speeds. The Lorentz force is essential for bending and focusing the particle beams.
* **Mass spectrometers:** These instruments measure the mass-to-charge ratio of ions. Magnetic fields are used to deflect ions, and the Lorentz force determines the radius of their trajectory.
* **Plasma confinement (e.g., Tokamaks):** In fusion research, Tokamaks use strong magnetic fields to confine hot plasma. The Lorentz force prevents the charged particles in the plasma from escaping.

In these applications, electric fields accelerate charged particles, while magnetic fields control their direction of motion.

### 2. Simulating Particle Motion

```python
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def lorentz_force(q, E, v, B):
    """
    Calculates the Lorentz force on a charged particle.

    Args:
        q: Charge of the particle (scalar).
        E: Electric field vector (3D array).
        v: Velocity vector of the particle (3D array).
        B: Magnetic field vector (3D array).

    Returns:
        Force vector (3D array).
    """
    return q * (E + np.cross(v, B))

def simulate_motion(q, m, E, B, v0, r0, t_max, dt):
    """
    Simulates the motion of a charged particle in electromagnetic fields using the Runge-Kutta 4th order method.

    Args:
        q: Charge of the particle (scalar).
        m: Mass of the particle (scalar).
        E: Electric field vector (3D array).
        B: Magnetic field vector (3D array).
        v0: Initial velocity vector (3D array).
        r0: Initial position vector (3D array).
        t_max: Maximum simulation time (scalar).
        dt: Time step (scalar).

    Returns:
        t: Array of time values.
        r: Array of position vectors (3D array).
        v: Array of velocity vectors (3D array).
    """
    t = np.arange(0, t_max, dt)
    n_steps = len(t)
    r = np.zeros((n_steps, 3))
    v = np.zeros((n_steps, 3))
    r[0] = r0
    v[0] = v0

    for i in range(n_steps - 1):
        # Runge-Kutta 4th order method
        k1_v = lorentz_force(q, E, v[i], B) / m
        k1_r = v[i]

        k2_v = lorentz_force(q, E, v[i] + 0.5 * dt * k1_v, B) / m
        k2_r = v[i] + 0.5 * dt * k1_r

        k3_v = lorentz_force(q, E, v[i] + 0.5 * dt * k2_v, B) / m
        k3_r = v[i] + 0.5 * dt * k2_r

        k4_v = lorentz_force(q, E, v[i] + dt * k3_v, B) / m
        k4_r = v[i] + dt * k3_r

        v[i+1] = v[i] + (dt / 6) * (k1_v + 2*k2_v + 2*k3_v + k4_v)
        r[i+1] = r[i] + (dt / 6) * (k1_r + 2*k2_r + 2*k3_r + k4_r)
    return t, r, v

def plot_trajectory(t, r, title):
    """
    Plots the trajectory of the particle in 2D and 3D.

    Args:
        t: Array of time values.
        r: Array of position vectors (3D array).
        title: Title of the plot.
    """
    plt.figure(figsize=(12, 6))
    plt.subplot(121)
    plt.plot(r[:, 0], r[:, 1])
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.title('2D Trajectory')
    plt.grid()

    plt.subplot(122, projection='3d')
    plt.plot(r[:, 0], r[:, 1], r[:, 2])
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.ylabel('Z')
    plt.title('3D Trajectory')
    plt.grid()
    plt.suptitle(title)
    plt.show()

if __name__ == "__main__":
    # Parameters
    q = 1.6e-19  # Charge of proton (C)
    m = 1.67e-27  # Mass of proton (kg)
    dt = 1e-9  # Time step (s)
    t_max = 1e-6  # Maximum simulation time (s)

    # Initial conditions
    r0 = np.array([0, 0, 0])  # Initial position (m)
    v0 = np.array([100, 0, 0])  # Initial velocity (m/s)

    # 1. Uniform magnetic field
    E = np.array([0, 0, 0])
    B = np.array([0, 0, 0.5])  # Magnetic field in Z direction (T)
    t, r, v = simulate_motion(q, m, E, B, v0, r0, t_max, dt)
    plot_trajectory(t, r, 'Uniform Magnetic Field')

    # Larmor radius and cyclotron frequency
    v_mag = np.linalg.norm(v0)
    Larmor_radius = (m * v_mag) / (q * np.linalg.norm(B))
    cyclotron_frequency = (q * np.linalg.norm(B)) / m
    print(f"Larmor radius: {Larmor_radius:.2e} m")
    print(f"Cyclotron frequency: {cyclotron_frequency:.2e} rad/s")

    # 2. Combined uniform electric and magnetic fields
    E = np.array([10, 0, 0])  # Electric field in X direction (V/m)
    B = np.array([0, 5, 0]) # Magnetic field in Y direction
    t, r, v = simulate_motion(q, m, E, B, v0, r0, t_max, dt)
    plot_trajectory(t, r, 'Uniform Electric and Magnetic Fields')

    # 3. Crossed electric and magnetic fields
    E = np.array([100, 0, 0])
    B = np.array([0, 0, 0.5])
    t, r, v = simulate_motion(q, m, E, B, v0, r0, t_max, dt)
    plot_trajectory(t, r, 'Crossed Electric and Magnetic Fields')

    # Drift velocity
    drift_velocity = np.cross(E, B) / np.linalg.norm(B)**2
    print(f"Drift velocity: {drift_velocity} m/s")
3. Parameter ExplorationThe Python script allows you to easily change the following parameters:q: Charge of the particle.m: Mass of the particle.E: Electric field vector.B: Magnetic field vector.v0: Initial velocity.r0: Initial position.dt: Time step.t_max: Maximum simulation time.By modifying these parameters in the script, you can observe how they affect the particle's trajectory. For example:Increasing the magnetic field strength will decrease the Larmor radius and increase the cyclotron frequency.In crossed fields, the drift velocity is directly proportional to the electric field strength and inversely proportional to the magnetic field strength.4. VisualizationThe script generates 2D and 3D plots of the particle's trajectory for each scenario. The plots are labeled with the field configurations.Circular motion: In a uniform magnetic field, the particle moves in a circle (if the initial velocity is perpendicular to the field).Helical motion: If the initial velocity has a component parallel to the magnetic field, the particle moves in a helix.Drift motion: In crossed electric and magnetic fields, the particle drifts in a direction perpendicular to both fields.  The simulation and plots clearly show this motion. The Larmor radius, cyclotron frequency, and drift velocity are calculated and printed, demonstrating key physical phenomena.DeliverablesA Markdown document with Python script implementing the simulations (provided above).Visualizations of particle trajectories for the specified field configurations (generated by the script).A discussion on how the results relate to practical systems (see below).Relation to Practical SystemsThe simulation results relate to several practical systems:Cyclotrons: These particle accelerators use a combination of magnetic and electric fields to accelerate charged particles in a spiral path. The magnetic field bends the particles, while the electric field accelerates them.Magnetic traps: These devices use magnetic fields to confine charged particles. The Lorentz force prevents the particles from escaping the trap.  This is used in plasma confinement and ion storage.Suggestions for Extending the SimulationNon-uniform fields: The simulation can be extended to handle non-uniform electric and magnetic fields, which are common in many real-world scenarios.  This would require modifying the lorentz_force function to accept position-dependent fields.Relativistic effects: For very high particle velocities, relativistic effects become important. The simulation could be modified to incorporate these effects by using the relativistic Lorentz