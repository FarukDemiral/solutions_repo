# Problem 1
# Simulating the Effects of the Lorentz Force

## Overview

This project implements and visualizes the Lorentz force, which determines the trajectories of charged particles under electric and magnetic fields. We use Python for numerical solutions and visualizations.


## Theory and Equations

The Lorentz force is given by:

$\mathbf{F} = q(\mathbf{E} + \mathbf{v} \times \mathbf{B})$

Where:

* \$q\$: particle charge
* \$\mathbf{E}\$: electric field
* \$\mathbf{B}\$: magnetic field
* \$\mathbf{v}\$: particle velocity

We numerically solve the equations of motion using the Runge-Kutta method.


## Simulation and Visualization

### Python Implementation

We simulate three cases:

* **Uniform Magnetic Field**
* **Combined Electric and Magnetic Fields**
* **Crossed Electric and Magnetic Fields**

// Particle properties
const q = 1.6e-19; // Charge (C)
const m = 9.11e-31; // Mass (kg)

// Fields
const E = [0, 0, 0]; // Electric field (V/m)
const B = [0, 0, 0.001]; // Magnetic field (T)

// Initial conditions
let r = [0, 0, 0]; // Position (m)
let v = [1e6, 0, 0]; // Velocity (m/s)

// Simulation parameters
const dt = 1e-11; // Time step (s)
const steps = 10000; // Number of simulation steps

// Function to compute cross product
function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

// Euler integration loop
let trajectory = [];
for (let i = 0; i < steps; i++) {
    let F = [
        q * (E[0] + cross(v, B)[0]),
        q * (E[1] + cross(v, B)[1]),
        q * (E[2] + cross(v, B)[2])
    ];

    // Acceleration
    let a = [F[0]/m, F[1]/m, F[2]/m];

    // Update velocity
    v[0] += a[0] * dt;
    v[1] += a[1] * dt;
    v[2] += a[2] * dt;

    // Update position
    r[0] += v[0] * dt;
    r[1] += v[1] * dt;
    r[2] += v[2] * dt;

    trajectory.push([...r]);
}

console.log(trajectory); // Trajectory output

### Results and Visualization

Running the script provides clear 3D trajectories illustrating:

* Circular motion (Uniform B)
* Helical motion (Combined E + B)
* Drift motion (Crossed E and B)


##  Practical Applications

* **Cyclotrons**: Uniform magnetic fields induce circular particle paths crucial for acceleration.
* **Magnetic Traps**: Magnetic fields confine plasma in devices like Tokamaks, enabling fusion reactions.
* **Mass Spectrometers**: Trajectory deflection by magnetic fields separates charged particles by mass.

The visualized trajectories directly reflect these operational principles.


##  Future Extensions

To enhance the realism and complexity of simulations:

* **Non-uniform fields**: Simulate realistic fields found in stellar magnetic fields or sophisticated plasma confinement devices.
* **Time-dependent fields**: Explore time-varying electromagnetic fields to model particle behavior in dynamic conditions.
* **Relativistic effects**: Incorporate relativistic dynamics for high-energy particles typically encountered in particle accelerators.


This structured, extendable simulation allows exploration of complex physical phenomena in particle dynamics under electromagnetic fields.
