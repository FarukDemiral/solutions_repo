# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lorentz Force Simulation</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; background-color: #f5f5f5; color: #333; }
    h1 { color: #0055a5; }
    .controls { margin-bottom: 20px; }
    label { margin-right: 10px; }
    .output { margin-top: 20px; font-weight: bold; }
    .button-group button { margin-right: 10px; padding: 5px 10px; }
  </style>
</head>
<body>
  <h1>Lorentz Force Interactive Simulation</h1>

  <h2>Theoretical Background</h2>
  <p>The Lorentz force is given by:</p>
  <p>$$\mathbf{F} = q (\mathbf{E} + \mathbf{v} \times \mathbf{B})$$</p>

  <h2>Controls</h2>
  <div class="controls">
    <label>Initial Velocity X (m/s): <input type="range" id="vx" min="0" max="2e6" value="1e6" step="1e4"> <span id="vxVal"></span></label>
    <label>Initial Velocity Y (m/s): <input type="range" id="vy" min="0" max="2e6" value="0" step="1e4"> <span id="vyVal"></span></label>
    <label>Initial Velocity Z (m/s): <input type="range" id="vz" min="0" max="2e6" value="1e6" step="1e4"> <span id="vzVal"></span></label><br><br>
    <label>Magnetic Field Bz (T): <input type="range" id="bz" min="0.1" max="5" value="1" step="0.1"> <span id="bzVal"></span></label>
  </div>

  <div class="button-group">
    <button onclick="setFieldConfig('uniform')">Uniform B Field</button>
    <button onclick="setFieldConfig('eb')">E and B Fields</button>
    <button onclick="setFieldConfig('crossed')">Crossed E & B Fields</button>
  </div>

  <div class="output" id="parameters"></div>

  <div id="plot3d" style="width: 100%; height: 600px;"></div>

  <script>
    let fieldConfig = 'uniform';

    function setFieldConfig(config) {
      fieldConfig = config;
      simulate();
    }

    const q = 1.6e-19, m = 9.11e-31;

    function simulate() {
      let vx = parseFloat(document.getElementById('vx').value);
      let vy = parseFloat(document.getElementById('vy').value);
      let vz = parseFloat(document.getElementById('vz').value);
      let bz = parseFloat(document.getElementById('bz').value);

      document.getElementById('vxVal').innerText = vx;
      document.getElementById('vyVal').innerText = vy;
      document.getElementById('vzVal').innerText = vz;
      document.getElementById('bzVal').innerText = bz;

      const dt = 1e-11, steps = 1500;
      let r = [0, 0, 0];
      let v = [vx, vy, vz];
      let positions = [];

      let E = [0, 0, 0];
      let B = [0, 0, bz];
      if (fieldConfig === 'eb') E = [0, 0, 1e5];
      if (fieldConfig === 'crossed') { E = [0, 1e5, 0]; B = [0, 0, bz]; }

      for (let i = 0; i < steps; i++) {
        let cross = [v[1]*B[2] - v[2]*B[1], v[2]*B[0] - v[0]*B[2], v[0]*B[1] - v[1]*B[0]];
        let F = [q * (E[0] + cross[0]), q * (E[1] + cross[1]), q * (E[2] + cross[2])];
        let a = [F[0]/m, F[1]/m, F[2]/m];
        v[0] += a[0]*dt;
        v[1] += a[1]*dt;
        v[2] += a[2]*dt;
        r[0] += v[0]*dt*1e9; // scaled
        r[1] += v[1]*dt*1e9;
        r[2] += v[2]*dt*1e9;
        positions.push([r[0], r[1], r[2]]);
      }

      let x = positions.map(p => p[0]);
      let y = positions.map(p => p[1]);
      let z = positions.map(p => p[2]);

      Plotly.newPlot('plot3d', [{
        type: 'scatter3d', mode: 'lines',
        x: x, y: y, z: z,
        line: {width: 4, color: '#1f77b4'}
      }], {
        margin: {l: 0, r: 0, b: 0, t: 0},
        scene: {xaxis: {title: 'X'}, yaxis: {title: 'Y'}, zaxis: {title: 'Z'}}
      });

      let omega = q * bz / m;
      let rL = (m * Math.sqrt(vx**2 + vy**2)) / (q * bz);
      document.getElementById('parameters').innerHTML =
        `Cyclotron Frequency (ω): ${omega.toExponential(2)} rad/s | Larmor Radius (rₗ): ${rL.toExponential(2)} m`;
    }

    document.querySelectorAll('input').forEach(input => input.addEventListener('input', simulate));
    window.onload = simulate;
  </script>

</body>
</html>
