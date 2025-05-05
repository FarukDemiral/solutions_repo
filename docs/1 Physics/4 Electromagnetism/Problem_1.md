# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields
## Project Goal
- This project aims to simulate and visualize the behavior of charged particles under the influence of electric $\vec{E}$ 

- magnetic $\vec{B}$ 
 
 - fields using the Lorentz force law
$\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}$


We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques

## Theoretical Foundation
## The Lorentz force determines how charged particles move through electromagnetic fields. Its effects depend on

- The magnitude and direction of the electric field $\vec{E}$
- The direction and strength of the magnetic field $\vec{B}$
- The particle's velocity $\vec{v}$ 
- charge $q$
- mass $m$

## Key motion behaviors

- **Circular or helical motion** in uniform $\vec{B}$ 
- **Drift motion** in crossed $\vec{E}$ and $\vec{B}$ 

## Task Breakdown

### Exploration of Applications
## Identify real-world systems using Lorentz force
  - Particle accelerators (cyclotrons, synchrotrons)
  - Plasma confinement (tokamaks)
  - Mass spectrometers
- Discuss how $\vec{E}$
- and $\vec{B}$ fields influence motion

### Simulating Particle Motion
## Compute and visualize trajectories under
  - A uniform magnetic field
  - Combined uniform electric and magnetic fields
  - Crossed $\vec{E}$ 
  - and $\vec{B}$ 
- Simulate circular, helical, and drift motion

### Parameter Exploration
## Allow variation of
  - Field strengths $\vec{E}, \vec{B}$
  - Initial velocity $\vec{v}$
  - Particle properties $q, m$
- Observe how parameters affect motion

### Visualization
- Create clear 2D plots of particle trajectories  
- Highlight Larmor radius
- and $\vec{E} \times \vec{B}$ 


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorentz Force Simulations</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body { font-family: Arial; background: #f9f9f9; padding: 20px; color: #222; }
    canvas { border: 1px solid #aaa; margin: 20px 0; background: white; }
    h2 { margin-top: 40px; color: #1a237e; }
    label { font-weight: bold; margin-right: 10px; }
  </style>
</head>
<body>

<h1>Lorentz Force Simulation in Electromagnetic Fields</h1>

<h2>Simulation 1: Circular Motion (Uniform B Field)</h2>
<canvas id="canvas1" width="720" height="400"></canvas>

<h2>Simulation 2: E × B Drift</h2>
<canvas id="canvas2" width="720" height="400"></canvas>

<h2>Simulation 3: Pure Electric Field Acceleration</h2>
<canvas id="canvas3" width="720" height="400"></canvas>

<h2>Simulation 4: Helical Motion (Spiral View)</h2>
<canvas id="canvas4" width="720" height="400"></canvas>

<h2>Simulation 5: Interactive Simulation (2D)</h2>
<div>
  <label>Magnetic Field Bz (T): 
    <input type="range" id="Bz" min="-5" max="5" value="1" step="0.1"> 
    <span id="BzVal">1</span>
  </label><br>
  <label>Electric Field Ey (V/m): 
    <input type="range" id="Ey" min="-10" max="10" value="0" step="0.5"> 
    <span id="EyVal">0</span>
  </label><br>
  <label>Initial Velocity vx (m/s): 
    <input type="range" id="vx" min="-10" max="10" value="5" step="0.5"> 
    <span id="vxVal">5</span>
  </label>
</div>
<div id="plot" style="width:100%;height:500px;margin-top:20px;"></div>

<script>
  const steps = 2000;

  // Canvas Simulation 1: Circular Motion
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

  // Canvas Simulation 2: E × B Drift
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

  // Canvas Simulation 3: Pure E Field Acceleration
  const ctx3 = document.getElementById("canvas3").getContext("2d");
  let pos3 = { x: 100, y: 150 }, vel3 = { x: 0, y: 0 };
  const E3 = { x: 0.5, y: 0 }, dt3 = 0.1;
  function simulate3() {
    ctx3.beginPath(); ctx3.moveTo(pos3.x, pos3.y);
    for (let i = 0; i < steps; i++) {
      vel3.x += E3.x * dt3; vel3.y += E3.y * dt3;
      pos3.x += vel3.x * dt3; pos3.y += vel3.y * dt3;
      ctx3.lineTo(pos3.x, pos3.y);
    }
    ctx3.strokeStyle = '#28a745'; ctx3.stroke();
  }

  // Canvas Simulation 4: Helical Motion
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

  // Plotly Simulation 5
  const q = 1, m = 1;
  let dt = 0.05, tMax = 20;
  function simulate(Bz, Ey, vx0) {
    let x = 0, y = 0, vx = vx0, vy = 0;
    let xData = [], yData = [];
    for (let t = 0; t < tMax; t += dt) {
      let Fx = q * (vy * Bz);
      let Fy = q * (Ey - vx * Bz);
      vx += Fx / m * dt;
      vy += Fy / m * dt;
      x += vx * dt;
      y += vy * dt;
      xData.push(x);
      yData.push(y);
    }
    Plotly.newPlot('plot', [{
      x: xData,
      y: yData,
      mode: 'lines',
      line: { width: 3 },
      name: 'Trajectory'
    }], {
      title: 'Charged Particle Trajectory in E and B Fields',
      xaxis: { title: 'x (m)' },
      yaxis: { title: 'y (m)' }
    });
  }

  function updateSim() {
    let Bz = parseFloat(document.getElementById('Bz').value);
    let Ey = parseFloat(document.getElementById('Ey').value);
    let vx = parseFloat(document.getElementById('vx').value);
    document.getElementById('BzVal').innerText = Bz;
    document.getElementById('EyVal').innerText = Ey;
    document.getElementById('vxVal').innerText = vx;
    simulate(Bz, Ey, vx);
  }

  // Initialize all simulations
  simulate1();
  simulate2();
  simulate3();
  simulate4();
  ['Bz', 'Ey', 'vx'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateSim);
  });
  updateSim();
</script>

</body>
</html>



## Observations & Analysis

- Circular motion (Larmor orbits) in uniform fields  $\vec{B}$ 
- Uniform drift motion in crossed fields   $\vec{E} \times \vec{B}$ 
- Linear acceleration in pure field $\vec{E}$ 

## Suggestions for Extension

- Non-uniform magnetic fields (simulate magnetic mirrors)  
- Vary electric field strength for E-field acceleration  
- Relativistic effects:  
  $$ \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} $$
- Interactive sliders for real-time parameter tuning  
- Multiple particles with random initial conditions
