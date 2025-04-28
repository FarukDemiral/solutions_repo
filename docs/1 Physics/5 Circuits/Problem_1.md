# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Electromagnetism: Lorentz Force Simulation</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <style>
    body { font-family: 'Segoe UI', sans-serif; padding: 20px; transition: background-color 0.3s, color 0.3s; }
    .dark-mode { background-color: #121212; color: #ffffff; }
    h1, h2 { color: #00bcd4; }
    .grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 20px; }
    .plot-box { padding: 10px; background: rgba(0, 188, 212, 0.1); border-radius: 8px; }
    .controls { margin-bottom: 20px; }
    label { margin-right: 10px; }
    button { padding: 8px 15px; }
  </style>
</head>
<body>

<h1>Electromagnetism: Lorentz Force Simulation</h1>

<h2>Theoretical Foundation</h2>
<p>The motion of a charged particle under electric and magnetic fields is described by the Lorentz force:</p>
<p>$$\mathbf{F} = q(\mathbf{E} + \mathbf{v}\times\mathbf{B})$$</p>
<p>The cyclotron frequency (\(\omega_c\)) and Larmor radius (\(r_L\)) are given by:</p>
<p>$$\omega_c = \frac{qB}{m}, \quad r_L = \frac{mv_\perp}{qB}$$</p>

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

function toggleMode(){document.body.classList.toggle('dark-mode');}
</script>

</body>
</html>
