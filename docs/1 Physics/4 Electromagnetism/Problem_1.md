# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields
## Project Goal
- This project aims to simulate and visualize the behavior of charged particles under the influence of electric $$ \vec{E} $$ 

- magnetic $$ \vec{B} $$ 
 
 - fields using the Lorentz force law

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques

## Theoretical Foundation
## The Lorentz force determines how charged particles move through electromagnetic fields. Its effects depend on

- The magnitude and direction of the electric field $$ \vec{E} $$
- The direction and strength of the magnetic field $$ \vec{B} $$
- The particle's velocity $$ \vec{v} $$ 
- charge $$ q $$
- mass $$ m $$

## Key motion behaviors

- **Circular or helical motion** in uniform $$ \vec{B} $$ 
- **Drift motion** in crossed $$ \vec{E} $$ and $$ \vec{B} $$ 

## Task Breakdown

### Exploration of Applications
## Identify real-world systems using Lorentz force
  - Particle accelerators (cyclotrons, synchrotrons)
  - Plasma confinement (tokamaks)
  - Mass spectrometers
- Discuss how $$ \vec{E} $$
- and $$ \vec{B} $$ fields influence motion

### Simulating Particle Motion
## Compute and visualize trajectories under
  - A uniform magnetic field
  - Combined uniform electric and magnetic fields
  - Crossed $$ \vec{E} $$ 
  - and $$ \vec{B} $$ 
- Simulate circular, helical, and drift motion

### Parameter Exploration
## Allow variation of
  - Field strengths $$ \vec{E}, \vec{B} $$
  - Initial velocity $$ \vec{v} $$
  - Particle properties $$ q, m $$
- Observe how parameters affect motion

### Visualization
- Create clear 2D plots of particle trajectories  
- Highlight Larmor radius
- and $$ \vec{E} \times \vec{B} $$ 


## Simulation 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multiple Lorentz Simulations</title>
  <style>
    body { font-family: Arial, background: #f4f4f4; text-align: left; }
    canvas { border: 1px solid #aaa; margin: 20px; background: white; }
  </style>
</head>
<body>

  <h2>Simulation 1: Circular Motion (Uniform B Field)</h2>
  <canvas id="canvas1" width="720" height="600"></canvas>

  <h2>Simulation 2: E × B Drift</h2>
  <canvas id="canvas2" width="720" height="600"></canvas>

  <h2>Simulation 3: Helical Motion (Spiral View)</h2>
  <canvas id="canvas4" width="720" height="600"></canvas>

  <script>
    const steps = 2000;

    // --- SIMULATION 1: Circular Motion ---
    const ctx1 = document.getElementById("canvas1").getContext("2d");
    let pos1 = { x: 400, y: 150 }, vel1 = { x: 2, y: 0 };
    const B1 = 1, dt1 = 0.1;

    function simulate1() {
      ctx1.beginPath(); ctx1.moveTo(pos1.x, pos1.y);
      for (let i = 0; i < steps; i++) {
        const ax = vel1.y * B1, ay = -vel1.x * B1;
        vel1.x += ax * dt1; vel1.y += ay * dt1;
        pos1.x += vel1.x * dt1; pos1.y += vel1.y * dt1;
        ctx1.lineTo(pos1.x, pos1.y);
      }
      ctx1.strokeStyle = '#007bff'; ctx1.stroke();
    }

    // --- SIMULATION 2: E × B Drift ---
    const ctx2 = document.getElementById("canvas2").getContext("2d");
    let pos2 = { x: 400, y: 150 }, vel2 = { x: 0, y: 0 };
    const E2 = { x: 1, y: 0 }, B2 = 1, dt2 = 0.1;

    function simulate2() {
      ctx2.beginPath(); ctx2.moveTo(pos2.x, pos2.y);
      for (let i = 0; i < steps; i++) {
        const ax = E2.x + vel2.y * B2;
        const ay = E2.y - vel2.x * B2;
        vel2.x += ax * dt2;
        vel2.y += ay * dt2;
        pos2.x += vel2.x * dt2;
        pos2.y += vel2.y * dt2;
        ctx2.lineTo(pos2.x, pos2.y);
      }
      ctx2.strokeStyle = '#FF5733'; ctx2.stroke();
    }

    // --- SIMULATION 3: Helical Motion ---
    const ctx4 = document.getElementById("canvas4").getContext("2d");
    let x4 = 0, y4 = 0, z4 = 0;
    let vx4 = 2, vy4 = 2, vz4 = 1;
    const Bz4 = 1, dt4 = 0.1, scale4 = 5;

    function simulate4() {
      ctx4.beginPath();
      ctx4.moveTo(400 + x4 * scale4, 200 + z4 * scale4);
      for (let i = 0; i < steps; i++) {
        const ax = vy4 * Bz4;
        const ay = -vx4 * Bz4;
        vx4 += ax * dt4;
        vy4 += ay * dt4;
        x4 += vx4 * dt4;
        y4 += vy4 * dt4;
        z4 += vz4 * dt4;
        ctx4.lineTo(400 + x4 * scale4, 200 + z4 * scale4);
      }
      ctx4.strokeStyle = '#6f42c1';
      ctx4.lineWidth = 2;
      ctx4.stroke();
    }

    // Run all 3 simulations
    simulate1();
    simulate2();
    simulate3();
  </script>

</body>
</html>



## Observations & Analysis

- Circular motion (Larmor orbits) in uniform fields  $$ \vec{B} $$ 
- Uniform drift motion in crossed fields   $$ \vec{E} \times \vec{B} $$ 
- Linear acceleration in pure field $$ \vec{E} $$ 

## Suggestions for Extension

- Non-uniform magnetic fields (simulate magnetic mirrors)  
- Vary electric field strength for E-field acceleration  
- Relativistic effects:  
  $$ \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} $$
- Interactive sliders for real-time parameter tuning  
- Multiple particles with random initial conditions
