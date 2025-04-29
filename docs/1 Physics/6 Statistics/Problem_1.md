# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields

## Project Goal
This project aims to simulate and visualize the behavior of charged particles under the influence of electric \( \vec{E} \) and magnetic \( \vec{B} \) fields, using the Lorentz force law:

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques.

---

## Theoretical Foundation
The Lorentz force determines how charged particles move through electromagnetic fields. Its effects depend on:
- The magnitude and direction of the electric field \( \vec{E} \)
- The direction and strength of the magnetic field \( \vec{B} \)
- The particle's velocity \( \vec{v} \), charge \( q \), and mass \( m \)

Key motion behaviors:
- **Circular or helical motion** in uniform \( \vec{B} \) fields
- **Drift motion** in crossed \( \vec{E} \) and \( \vec{B} \) fields

---

##  Task Breakdown

### Exploration of Applications
- Identify real-world systems using Lorentz force:
  - Particle accelerators (cyclotrons, synchrotrons)
  - Plasma confinement (tokamaks)
  - Mass spectrometers
- Discuss how \( \vec{E} \) and \( \vec{B} \) fields influence motion

### Simulating Particle Motion
- Compute and visualize trajectories under:
  - A uniform magnetic field
  - Combined uniform electric and magnetic fields
  - Crossed \( \vec{E} \) and \( \vec{B} \) fields
- Simulate circular, helical, and drift motion

### Parameter Exploration
- Allow variation of:
  - Field strengths (\( \vec{E}, \vec{B} \))
  - Initial velocity \( \vec{v} \)
  - Particle properties (\( q, m \))
- Observe how parameters affect motion

###  Visualization
- Create clear 2D plots of particle trajectories
- Highlight Larmor radius and \( \vec{E} \times \vec{B} \) drift

---

##  Interactive Simulation 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorentz Force Simulation</title>
    <style>
        canvas { border: 1px solid #ccc; }
    </style>
</head>
<body>
<canvas id="simulationCanvas" width="740" height="800"></canvas>

<script>
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Constants
const q = 1.6e-19;  // Coulombs
const m = 9.1e-31;  // kg
const dt = 1e-11;   // s
const steps = 10000;

// Initial conditions
let r = {x: 400, y: 300};
let v = {x: 1e6, y: 0};

// Fields
const E = {x: 0, y: 0};
const B = 0.1;  // Tesla, perpendicular to plane

function lorentzForce(v, E, B, q) {
    return {
        x: q * (E.x + v.y * B),
        y: q * (E.y - v.x * B)
    };
}

function runSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);

    for (let i = 0; i < steps; i++) {
        const a = lorentzForce(v, E, B, q);
        v.x += (a.x / m) * dt;
        v.y += (a.y / m) * dt;
        r.x += v.x * dt * 1e-5; // scaled for visualization
        r.y += v.y * dt * 1e-5;
        ctx.lineTo(r.x, r.y);
    }

    ctx.strokeStyle = '#007BFF';
    ctx.stroke();
}

runSimulation();
</script>
</body>
</html>


##  Observations & Analysis
- In uniform \( \vec{B} \): Circular motion (Larmor orbits)
- In \( \vec{E} \times \vec{B} \) fields: Particle drifts
- Increasing \( v \) or \( B \): Tighter orbits

### Example: Larmor Radius
$$
 r_L = \frac{mv_\perp}{qB} 
$$

---

##  Suggestions for Extension
- Non-uniform magnetic fields (simulate magnetic mirrors)
- Vary electric field strength for E-field acceleration
- Relativistic effects (\( \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \))
- Interactive sliders for real-time parameter tuning

---



