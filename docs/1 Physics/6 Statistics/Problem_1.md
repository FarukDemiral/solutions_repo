# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorentz Force Simulation Project</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      color: #333;
      padding: 20px;
      line-height: 1.6;
    }
    canvas {
      border: 1px solid #aaa;
      background: white;
      display: block;
      margin: 20px 0;
    }
    h2 {
      margin-top: 40px;
      color: #1a237e;
    }
    label {
      display: inline-block;
      margin: 6px 0;
    }
  </style>
</head>
<body>

<h1>Lorentz Force Simulation in Electromagnetic Fields</h1>

<p>This project simulates the behavior of charged particles under electric <strong>𝐸</strong> and magnetic <strong>𝐵</strong> fields using the Lorentz force law:</p>

<pre><code>
𝐅 = q𝐄 + q𝐯 × 𝐁
</code></pre>

<p>We'll simulate and visualize real-world effects such as circular, helical, and drift motion, and study how field strength, charge, mass, and velocity affect the trajectory.</p>

<h2>Simulation 1: Interactive 2D Motion with Sliders</h2>
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

<h2>Simulation 2: Circular Motion (Uniform B Field)</h2>
<canvas id="canvas1" width="720" height="400"></canvas>

<h2>Simulation 3: E × B Drift</h2>
<canvas id="canvas2" width="720" height="400"></canvas>

<h2>Simulation 4: Helical Motion (Spiral View)</h2>
<canvas id="canvas4" width="720" height="400"></canvas>

<script>
  const steps = 2000;

  // --- Simulation 1 (Sliders) ---
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

  ['Bz', 'Ey', 'vx'].forEach(id => {
    document.getElementById(id).addEventListener('input', updateSim);
  });

  // --- Simulation 2: Circular Motion ---
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

  // --- Simulation 3: E × B Drift ---
  const ctx2 = document.getElementById("canvas2").getContext("2d");
  let pos2 = { x: 400, y: 150 }, vel2 = { x: 0, y: 0 };
  const E2 = { x: 1, y: 0 }, B2 = 1, dt2 = 0.1;
  function simulate2() {
    ctx2.beginPath(); ctx2.moveTo(pos2.x, pos2.y);
    for (let i = 0; i < steps; i++) {
      const ax = E2.x + vel2.y * B2, ay = E2.y - vel2.x * B2;
      vel2.x += ax * dt2; vel2.y += ay * dt2;
      pos2.x += vel2.x * dt2; pos2.y += vel2.y * dt2;
      ctx2.lineTo(pos2.x, pos2.y);
    }
    ctx2.strokeStyle = '#FF5733'; ctx2.stroke();
  }

  // --- Simulation 4: Helical Motion ---
  const ctx4 = document.getElementById("canvas4").getContext("2d");
  let x4 = 0, y4 = 0, z4 = 0;
  let vx4 = 2, vy4 = 2, vz4 = 1;
  const Bz4 = 1, dt4 = 0.1, scale4 = 5;
  function simulate4() {
    ctx4.beginPath();
    ctx4.moveTo(600 + x4 * scale4, 400 + z4 * scale4); // spiral in x-z
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

  // Run all simulations
  updateSim();
  simulate1();
  simulate2();
  simulate4();
</script>

</body>
</html>
