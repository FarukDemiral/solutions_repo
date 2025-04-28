# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electromagnetism: Advanced Lorentz Force Simulation</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 20px; background-color: #121212; color: #ffffff; }
    h1, h2, h3 { color: #00bcd4; }
    .section { margin-bottom: 40px; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; }
    .plot-box, .text-box { padding: 15px; background: rgba(0, 188, 212, 0.1); border-radius: 8px; }
    .controls { margin-bottom: 20px; }
    button { padding: 8px 15px; margin-top:10px; }
  </style>
</head>
<body>

<h1>Electromagnetism: Advanced Lorentz Force Simulation</h1>

<div class="section">
  <h2>Theoretical Foundation</h2>
  <div class="text-box">
    <p>The Lorentz force defines the interaction of charged particles with electric and magnetic fields, described by:</p>
    <p>$$\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$$</p>
    <p>The motion in a magnetic field results in circular or helical trajectories characterized by cyclotron frequency (\(\omega_c\)) and Larmor radius (\(r_L\)):</p>
    <p>$$\omega_c = \frac{qB}{m}, \quad r_L = \frac{mv_\perp}{qB}$$</p>
  </div>
</div>

<div class="section">
  <h2>Detailed Parameter Effects</h2>
  <div class="text-box">
    <table>
      <tr><th>Parameter</th><th>Symbol</th><th>Effect</th></tr>
      <tr><td>Electric Field</td><td>\(\mathbf{E}\)</td><td>Accelerates particle</td></tr>
      <tr><td>Magnetic Field</td><td>\(\mathbf{B}\)</td><td>Determines radius and frequency</td></tr>
      <tr><td>Initial Velocity</td><td>\(\mathbf{v}_0\)</td><td>Determines type of motion</td></tr>
      <tr><td>Charge</td><td>\(q\)</td><td>Affects force direction and magnitude</td></tr>
      <tr><td>Mass</td><td>\(m\)</td><td>Affects radius and frequency</td></tr>
    </table>
  </div>
</div>

<div class="section controls">
  <label>Velocity (m/s): <input type="range" id="velocity" min="1e5" max="2e6" step="1e4" value="1e6"><span id="velVal"></span></label>
  <label>B-field (T): <input type="range" id="bfield" min="0.1" max="5" step="0.1" value="1"><span id="bVal"></span></label>
  <button onclick="updatePlots()">Update Simulations</button>
</div>

<div id="info" class="section"></div>

<div class="section grid-container">
  <div class="plot-box">
    <h3>Uniform Magnetic Field</h3>
    <div id="uniform"></div>
  </div>
  <div class="plot-box">
    <h3>Crossed E & B Fields</h3>
    <div id="crossed"></div>
  </div>
</div>

<div class="section">
  <h2>Real-World Applications</h2>
  <div class="text-box">
    <p>Understanding the Lorentz force is crucial in technologies such as particle accelerators (e.g., cyclotrons), mass spectrometry, and magnetic confinement devices (e.g., Tokamak reactors).</p>
  </div>
</div>

<div class="section">
  <h2>Conclusion & Discussion</h2>
  <div class="text-box">
    <p>This simulation highlights the dynamics of charged particles in electromagnetic fields, demonstrating practical insights into particle behavior crucial for various scientific and industrial applications.</p>
  </div>
</div>

<script>
function plotTrajectory(type, id){
  let vel = parseFloat(document.getElementById('velocity').value);
  let Bz = parseFloat(document.getElementById('bfield').value);
  let steps = 1500, dt = 1e-11;
  let r=[0,0,0], v=[vel,0,vel];
  let E=[0,0,0], B=[0,0,Bz];
  if(type==='crossed') E=[0,1e5,0];
  let pos=[], color=[];
  for(let i=0;i<steps;i++){
    let F = [1.6e-19*(E[0]+v[1]*B[2]-v[2]*B[1]),1.6e-19*(E[1]+v[2]*B[0]-v[0]*B[2]),1.6e-19*(E[2]+v[0]*B[1]-v[1]*B[0])];
    v = [v[0]+F[0]/9.11e-31*dt,v[1]+F[1]/9.11e-31*dt,v[2]+F[2]/9.11e-31*dt];
    r = [r[0]+v[0]*dt*1e9,r[1]+v[1]*dt*1e9,r[2]+v[2]*dt*1e9];
    pos.push([r[0],r[1],r[2]]);color.push(i);}
  Plotly.newPlot(id,[{x:pos.map(p=>p[0]),y:pos.map(p=>p[1]),z:pos.map(p=>p[2]),type:'scatter3d',mode:'lines',line:{width:3,color:color,colorscale:'Jet'}}]);}
function updatePlots(){plotTrajectory('uniform','uniform');plotTrajectory('crossed','crossed');
document.getElementById('info').innerHTML=`Cyclotron Frequency: ${(1.6e-19*parseFloat(document.getElementById('bfield').value)/9.11e-31).toExponential(2)} rad/s, Larmor Radius: ${(9.11e-31*parseFloat(document.getElementById('velocity').value)/(1.6e-19*parseFloat(document.getElementById('bfield').value))).toExponential(2)} m`;}
window.onload=updatePlots;
</script>
</body>
</html>
