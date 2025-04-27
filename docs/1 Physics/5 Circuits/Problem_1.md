# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lorentz Force Simulation (Two Scenarios)</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; background-color: #121212; color: #f0f0f0; }
    h1, h2 { color: #00c3ff; }
    label { margin-right: 15px; }
    .controls { margin-bottom: 20px; }
    .output { margin-top: 15px; font-weight: bold; }
    .grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .plot-box { background-color: #1e1e1e; padding: 10px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Lorentz Force: Interactive 3D Simulation (Two Scenarios)</h1>

  <h2>Theoretical Background</h2>
  <p>The Lorentz force equation:</p>
  <p>$$\mathbf{F} = q (\mathbf{E} + \mathbf{v} \times \mathbf{B})$$</p>
  <p>For a uniform magnetic field (and optional electric field):</p>
  <p>$$\omega_c = \frac{q B}{m}, \quad r_L = \frac{m v_\perp}{q B}$$</p>

  <div class="controls">
    <label>Velocity X (m/s): <input type="range" id="vx" min="0" max="2e6" value="1e6" step="1e4"> <span id="vxVal"></span></label>
    <label>Velocity Y (m/s): <input type="range" id="vy" min="0" max="2e6" value="0" step="1e4"> <span id="vyVal"></span></label>
    <label>Velocity Z (m/s): <input type="range" id="vz" min="0" max="2e6" value="1e6" step="1e4"> <span id="vzVal"></span></label>
    <label>Magnetic Field Bz (T): <input type="range" id="bz" min="0.1" max="5" value="1" step="0.1"> <span id="bzVal"></span></label>
  </div>

  <div id="parameters" class="output"></div>

  <>
    <div class="plot-box">
      <h2>Uniform Magnetic Field</h2>
      <div id="uniformPlot" style="width:100%; height:500px;"></div>
    </div>
    <div class="plot-box">
      <h2>Crossed Electric and Magnetic Fields (E ⊥ B)</h2>
      <div id="crossedPlot" style="width:100%; height:500px;"></div>
    </div>
  </div>

<script>
  const q = 1.6e-19, m = 9.11e-31;

  function simulate(config, plotId) {
    let vx = parseFloat(document.getElementById('vx').value);
    let vy = parseFloat(document.getElementById('vy').value);
    let vz = parseFloat(document.getElementById('vz').value);
    let bz = parseFloat(document.getElementById('bz').value);
    let dt = 1e-11, steps = 1500;
    let r = [0, 0, 0];
    let v = [vx, vy, vz];
    let E = [0, 0, 0], B = [0, 0, bz];

    if (config === 'crossed') { E = [0, 1e5, 0]; B = [0, 0, bz]; }

    let positions = [], colors = [];
    for (let i = 0; i < steps; i++) {
      let cross = [v[1]*B[2] - v[2]*B[1], v[2]*B[0] - v[0]*B[2], v[0]*B[1] - v[1]*B[0]];
      let F = [q * (E[0] + cross[0]), q * (E[1] + cross[1]), q * (E[2] + cross[2])];
      let a = [F[0]/m, F[1]/m, F[2]/m];
      v[0] += a[0]*dt; v[1] += a[1]*dt; v[2] += a[2]*dt;
      r[0] += v[0]*dt*1e9; r[1] += v[1]*dt*1e9; r[2] += v[2]*dt*1e9;
      positions.push([r[0], r[1], r[2]]);
      colors.push(i);
    }
    let x = positions.map(p => p[0]);
    let y = positions.map(p => p[1]);
    let z = positions.map(p => p[2]);

    Plotly.newPlot(plotId, [{
      type: 'scatter3d',
      mode: 'lines',
      x: x, y: y, z: z,
      line: { width: 4, color: colors, colorscale: 'Viridis' }
    }], {
      margin: { l: 0, r: 0, b: 0, t: 0 },
      scene: { xaxis: { title: 'X' }, yaxis: { title: 'Y' }, zaxis: { title: 'Z' } }
    });
  }

  function updateAll() {
    document.getElementById('vxVal').innerText = document.getElementById('vx').value;
    document.getElementById('vyVal').innerText = document.getElementById('vy').value;
    document.getElementById('vzVal').innerText = document.getElementById('vz').value;
    document.getElementById('bzVal').innerText = document.getElementById('bz').value;
    simulate('uniform', 'uniformPlot');
    simulate('crossed', 'crossedPlot');
    let bz = parseFloat(document.getElementById('bz').value);
    let vx = parseFloat(document.getElementById('vx').value), vy = parseFloat(document.getElementById('vy').value);
    let omega = q * bz / m;
    let rL = (m * Math.sqrt(vx**2 + vy**2)) / (q * bz);
    document.getElementById('parameters').innerHTML =
      `Cyclotron Frequency (ω): ${omega.toExponential(2)} rad/s | Larmor Radius (rₗ): ${rL.toExponential(2)} m`;
  }

  document.querySelectorAll('input').forEach(input => input.addEventListener('input', updateAll));
  window.onload = updateAll;
</script>

</body>
</html>