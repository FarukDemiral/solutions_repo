# Problem 1

<!-- Combined 2D & 3D Wave Interference Simulation -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Combined 2D & 3D Wave Interference Simulation</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f7fa;
      color: #333;
      max-width: 1000px;
      margin: auto;
      padding: 20px;
    }

    h1, h2 {
      color: #2c3e50;
      text-align: center;
    }

    .container {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      min-width: 180px;
    }

    input, select, button {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    button {
      background-color: #4c6ef5;
      color: white;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background-color: #364fc7;
    }

    .canvas-container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }

    canvas {
      border-radius: 4px;
      background: #000;
    }
  </style>
</head>

<body>
  <h1>Wave Interference Simulations (2D & 3D)</h1>

  <div class="container">
    <div class="controls">
      <div class="control-group">
        <label>Amplitude (A)</label>
        <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1.0">
        <span id="ampVal">1.0</span>
      </div>
      <div class="control-group">
        <label>Wavelength (λ)</label>
        <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2.0">
        <span id="waveVal">2.0</span>
      </div>
      <div class="control-group">
        <label>Number of Sources</label>
        <select id="sources">
          <option value="3">Triangle (3)</option>
          <option value="4" selected>Square (4)</option>
          <option value="5">Pentagon (5)</option>
          <option value="6">Hexagon (6)</option>
          <option value="8">Octagon (8)</option>
        </select>
      </div>
      <div class="control-group">
        <label>Source Radius</label>
        <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
        <span id="radiusVal">3.0</span>
      </div>
      <button id="updateBtn">Update Both Simulations</button>
    </div>
  </div>

  <h2>2D Canvas Simulation</h2>
  <div class="container canvas-container">
    <canvas id="canvas2d" width="600" height="600"></canvas>
  </div>

  <h2>3D Plotly Surface Visualization</h2>
  <div class="container">
    <div id="plot3d" style="width:100%; height:700px;"></div>
  </div>

  <script>
    // Shared controls for both simulations
    const amplitude = document.getElementById('amplitude');
    const wavelength = document.getElementById('wavelength');
    const sources = document.getElementById('sources');
    const radius = document.getElementById('radius');
    const updateBtn = document.getElementById('updateBtn');

    amplitude.oninput = () => document.getElementById('ampVal').innerText = amplitude.value;
    wavelength.oninput = () => document.getElementById('waveVal').innerText = wavelength.value;
    radius.oninput = () => document.getElementById('radiusVal').innerText = radius.value;

    updateBtn.onclick = () => {
      updateCanvas();
      updatePlotly();
    };

    function regularPolygon(n, r) {
      return Array.from({length:n},(_,i)=>[
        r*Math.cos(2*Math.PI*i/n), r*Math.sin(2*Math.PI*i/n)
      ]);
    }

    function updateCanvas() {
      const A = +amplitude.value, λ = +wavelength.value, N = +sources.value, R = +radius.value;
      const k=2*Math.PI/λ, ω=2*Math.PI, ctx=document.getElementById('canvas2d').getContext('2d');
      const img=ctx.createImageData(600,600), data=img.data;
      const points=regularPolygon(N,R);
      for(let y=0;y<600;y++)for(let x=0;x<600;x++){
        const X=(x-300)/20,Y=(y-300)/20;
        let eta=0;
        points.forEach(([px,py])=>{
          const d=Math.hypot(X-px,Y-py)+0.01;
          eta+=A*Math.cos(k*d-ω)/Math.sqrt(d);
        });
        const c=127+128*Math.sin(eta);
        const idx=4*(x+y*600);
        data[idx]=c; data[idx+1]=c; data[idx+2]=255; data[idx+3]=255;
      }
      ctx.putImageData(img,0,0);
    }

    function updatePlotly() {
      const A = +amplitude.value, λ = +wavelength.value, N = +sources.value, R = +radius.value;
      const k=2*Math.PI/λ, ω=2*Math.PI;
      const xy=[...Array(50)].map((_,i)=>-5+10*i/49),points=regularPolygon(N,R);
      const z=xy.map(y=>xy.map(x=>{
        let eta=0;
        points.forEach(([px,py])=>{
          const d=Math.hypot(x-px,y-py)+0.01;
          eta+=A*Math.cos(k*d-ω)/Math.sqrt(d);
        });
        return eta;
      }));
      Plotly.newPlot('plot3d',[{z,x:xy,y:xy,type:'surface',colorscale:'Jet'}],{
        scene:{xaxis:{title:'X'},yaxis:{title:'Y'},zaxis:{title:'Displacement (η)'}}
      });
    }

    // Initialize both simulations on page load
    updateCanvas();
    updatePlotly();
  </script>

</body>
</html>
