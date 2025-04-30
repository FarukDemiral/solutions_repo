# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields

## Project Goal
This project aims to simulate and visualize the behavior of charged particles under the influence of electric $$ \vec{E} $$ and magnetic $$ \vec{B} $$ fields, using the Lorentz force law:

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques.

## Theoretical Foundation
The Lorentz force determines how charged particles move through electromagnetic fields. Its effects depend on:

- The magnitude and direction of the electric field $$ \vec{E} $$
- The direction and strength of the magnetic field $$ \vec{B} $$
- The particle's velocity $$ \vec{v} $$ 
- charge $$ q $$, 
- mass $$ m $$

Key motion behaviors:

- **Circular or helical motion** in uniform $$ \vec{B} $$ fields  
- **Drift motion** in crossed $$ \vec{E} $$ and $$ \vec{B} $$ fields

## Task Breakdown

### Exploration of Applications
- Identify real-world systems using Lorentz force:
  - Particle accelerators (cyclotrons, synchrotrons)
  - Plasma confinement (tokamaks)
  - Mass spectrometers
- Discuss how $$ \vec{E} $$ and $$ \vec{B} $$ fields influence motion

### Simulating Particle Motion
- Compute and visualize trajectories under:
  - A uniform magnetic field
  - Combined uniform electric and magnetic fields
  - Crossed $$ \vec{E} $$ and $$ \vec{B} $$ fields
- Simulate circular, helical, and drift motion

### Parameter Exploration
- Allow variation of:
  - Field strengths $$ \vec{E}, \vec{B} $$
  - Initial velocity $$ \vec{v} $$
  - Particle properties $$ q, m $$
- Observe how parameters affect motion

### Visualization
- Create clear 2D plots of particle trajectories  
- Highlight Larmor radius and $$ \vec{E} \times \vec{B} $$ drift
