# Problem 2
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

## Task Breakdown

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

### Visualization
- Create clear 2D plots of particle trajectories
- Highlight Larmor radius and \( \vec{E} \times \vec{B} \) drift

---

##  Simulation 1: Circular Motion in Uniform Magnetic Field
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

---

## Simulation 2: \( \vec{E} \times \vec{B} \) Drift Simulation
```html
<canvas id="canvas2" width="800" height="600"></canvas>
<script>
  const canvas2 = document.getElementById("canvas2");
  const ctx2 = canvas2.getContext("2d");

  let pos2 = { x: 400, y: 300 };
  let vel2 = { x: 0, y: 0 };

  const dt2 = 0.1;
  const q2 = 1;
  const m2 = 1;
  const E2 = { x: 1, y: 0 };
  const B2 = 1;

  function lorentzForce2(v, E, B, q) {
    return {
      x: q * (E.x + v.y * B),
      y: q * (E.y - v.x * B)
    };
  }

  function simulate2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.beginPath();
    ctx2.moveTo(pos2.x, pos2.y);

    for (let i = 0; i < 2000; i++) {
      const a = lorentzForce2(vel2, E2, B2, q2);
      vel2.x += (a.x / m2) * dt2;
      vel2.y += (a.y / m2) * dt2;
      pos2.x += vel2.x * dt2;
      pos2.y += vel2.y * dt2;
      ctx2.lineTo(pos2.x, pos2.y);
    }

    ctx2.strokeStyle = "#FF5733";
    ctx2.stroke();
  }

  simulate2();
</script>
```

---

## Simulation 3: Pure Electric Field Acceleration
```html
<canvas id="canvas3" width="800" height="600"></canvas>
<script>
  const canvas3 = document.getElementById("canvas3");
  const ctx3 = canvas3.getContext("2d");

  let pos3 = { x: 100, y: 300 };
  let vel3 = { x: 0, y: 0 };

  const dt3 = 0.1;
  const q3 = 1;
  const m3 = 1;
  const E3 = { x: 0.5, y: 0 };

  function simulate3() {
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    ctx3.beginPath();
    ctx3.moveTo(pos3.x, pos3.y);

    for (let i = 0; i < 2000; i++) {
      const ax = (q3 * E3.x) / m3;
      const ay = (q3 * E3.y) / m3;
      vel3.x += ax * dt3;
      vel3.y += ay * dt3;
      pos3.x += vel3.x * dt3;
      pos3.y += vel3.y * dt3;
      ctx3.lineTo(pos3.x, pos3.y);
    }

    ctx3.strokeStyle = "#28a745";
    ctx3.stroke();
  }

  simulate3();
</script>
```

---

## Observations & Analysis
- In uniform \( \vec{B} \): Circular motion (Larmor orbits)
- In \( \vec{E} \times \vec{B} \) fields: Uniform drift motion
- In pure \( \vec{E} \) field: Linear acceleration

---

## Suggestions for Extension
- Non-uniform magnetic fields (simulate magnetic mirrors)
- Vary electric field strength for E-field acceleration
- Relativistic effects (\( \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \))
- Interactive sliders for real-time parameter tuning
- Multiple particles with random initial conditions

---

