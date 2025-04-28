# Problem 1
# Simulating the Effects of the Lorentz Force

## Theoretical Background

The Lorentz force describes the force on a charged particle moving in electric and magnetic fields. The general formula is:

$$
\mathbf{F} = q (\mathbf{E} + \mathbf{v} \times \mathbf{B})
$$

where:
- \( \mathbf{F} \): Force on the particle
- \( q \): Charge of the particle
- \( \mathbf{E} \): Electric field
- \( \mathbf{v} \): Particle velocity
- \( \mathbf{B} \): Magnetic field

In this simulation, we focus on **uniform magnetic field** (\( \mathbf{E} = 0 \)):

$$
\mathbf{F} = q (\mathbf{v} \times \mathbf{B})
$$

---

## Simulation Setup

- Uniform magnetic field: \( \mathbf{B} = [0, 0, B_z] \)
- Initial particle velocity: adjustable
- Parameters: charge \( q \), mass \( m \), magnetic field strength \( B_z \)

---

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
    <div class="controls">
  <label>Velocity (m/s): <input type="range" id="velocity" min="1e5" max="2e6" step="1e4" value="1e6"><span id="velVal"></span></label>
  <label>B-field (T): <input type="range" id="bfield" min="0.1" max="5" step="0.1" value="1"><span id="bVal"></span></label>
  <button onclick="toggleMode()">Toggle Dark/Light Mode</button>
</div>

<div id="info" style="margin-bottom:20px;font-weight:bold;"></div>

<div class="grid-container">
  <div class="plot-box">
    <h3>Uniform Magnetic Field</h3>
    <div id="uniform"></div>
  </div>
  <div class="plot-box">
    <h3>Crossed E & B Fields</h3>
    <div id="crossed"></div>
  </div>
</div>

<script>
let q = 1.6e-19, m = 9.11e-31;

function plotTrajectory(type, id){
  let vel = parseFloat(document.getElementById('velocity').value);
  let Bz = parseFloat(document.getElementById('bfield').value);
  let steps = 1000, dt = 1e-11;
  let r=[0,0,0], v=[vel,0,vel];
  let E=[0,0,0], B=[0,0,Bz];

  if(type==='crossed') E=[0,1e5,0];

  let pos=[], color=[];

  for(let i=0;i<steps;i++){
    let F = [q*(E[0]+v[1]*B[2]-v[2]*B[1]), q*(E[1]+v[2]*B[0]-v[0]*B[2]), q*(E[2]+v[0]*B[1]-v[1]*B[0])];
    v = [v[0]+F[0]/m*dt, v[1]+F[1]/m*dt, v[2]+F[2]/m*dt];
    r = [r[0]+v[0]*dt*1e9, r[1]+v[1]*dt*1e9, r[2]+v[2]*dt*1e9];
    pos.push([r[0],r[1],r[2]]);
    color.push(i);
  }

  let x=pos.map(p=>p[0]), y=pos.map(p=>p[1]), z=pos.map(p=>p[2]);
  Plotly.newPlot(id,[{x,y,z,type:'scatter3d',mode:'lines',line:{width:4,color:color,colorscale:'Jet'}}],{margin:{t:0,b:0,l:0,r:0}});
}

function update(){
  document.getElementById('velVal').innerText=document.getElementById('velocity').value;
  document.getElementById('bVal').innerText=document.getElementById('bfield').value;
  plotTrajectory('uniform','uniform');
  plotTrajectory('crossed','crossed');
  let Bz=parseFloat(document.getElementById('bfield').value);
  let vel=parseFloat(document.getElementById('velocity').value);
  document.getElementById('info').innerHTML=`Cyclotron Frequency: ${(q*Bz/m).toExponential(2)} rad/s | Larmor Radius: ${(m*vel/(q*Bz)).toExponential(2)} m`;
}

document.querySelectorAll('input').forEach(el=>el.oninput=update);
window.onload=update;

  </script>

</body>
</html>

---

## Visualization Explanation

- The blue dot represents the charged particle.
- The path shows the **circular or helical trajectory** due to the magnetic field.
- By adjusting the initial velocity and magnetic field strength, you can observe:
  - **Circular motion** (perpendicular velocity)
  - **Helical motion** (velocity has a parallel component)

---

## Physical Phenomena

- **Larmor Radius**:

  $$
  r_L = \frac{m v_\perp}{q B}
  $$

- **Cyclotron Frequency**:

  $$
  \omega_c = \frac{q B}{m}
  $$

---

## Further Suggestions for Extension

- Add **electric field \( \mathbf{E} \)** and explore combined fields.
- Implement **non-uniform magnetic fields**.
- Add **sliders** for real-time parameter changes using `range` inputs.
- Compute and display **Larmor radius** on the simulation dynamically.

---

> *Prepared for Problem 1: Simulating the Effects of the Lorentz Force.*
