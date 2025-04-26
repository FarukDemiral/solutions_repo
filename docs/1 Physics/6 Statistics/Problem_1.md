# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Project</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 20px;
      max-width: 1000px;
      margin: auto;
    }
    section {
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 40px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
      color: #003366;
      margin-bottom: 20px;
    }
    canvas {
      display: block;
      margin: auto;
      border: 1px solid #ccc;
      background-color: #000;
    }
    #plot3d {
      width: 100%;
      height: 600px;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .control-group {
      min-width: 200px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input, select {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #aaa;
    }
    button {
      padding: 10px 20px;
      background-color: #003366;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #001f4d;
    }
  </style>
</head>
<body>

  <!-- FIRST PART: 2D Moving Canvas Simulation -->
  <section id="simulation">
    <h2>2D Wave Interference Simulation</h2>
    <canvas id="waveCanvas" width="600" height="600"></canvas>
  </section>

  <!-- SECOND PART: 3D Visualization -->
  <section id="visualization">
    <h2>3D Wave Interference Visualization</h2>

    <div class="controls">
      <div class="control-group">
        <label for="amplitude">Amplitude (A):</label>
        <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1.0">
        <span id="ampValue">1.0</span>
      </div>
      <div class="control-group">
        <label for="wavelength">Wavelength (λ):</label>
        <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2.0">
        <span id="waveValue">2.0</span>
      </div>
      <div class="control-group">
        <label for="sources">Number of Sources:</label>
        <select id="sources">
          <option value="3">3 (Triangle)</option>
          <option value="4" selected>4 (Square)</option>
          <option value="5">5 (Pentagon)</option>
          <option value="6">6 (Hexagon)</option>
          <option value="8">8 (Octagon)</option>
        </select>
      </div>
      <div class="control-group">
        <label for="radius">Source Radius:</label>
        <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
        <span id="radiusValue">3.0</span>
      </div>
      <button id="updateBtn">Update Plot</button>
    </div>

    <div id="plot3d"></div>
  </section>

  <script>
    // 2D Canvas Simulation Animation
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    let time = 0;
    const dt = 0.05;

    const amplitude2D = 20;
    const wavelength2D = 40;
    const frequency2D = 0.05;
    const k2D = (2 * Math.PI) / wavelength2D;
    const omega2D = 2 * Math.PI * frequency2D;

    const sources2D = [
      { x: width / 3, y: height / 2 },
      { x: 2 * width / 3, y: height / 2 }
    ];

    function drawFrame() {
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let value = 0;

          for (const source of sources2D) {
            const dx = x - source.x;
            const dy = y - source.y;
            const r = Math.sqrt(dx * dx + dy * dy) + 1;
            value += Math.sin(k2D * r - omega2D * time);
          }

          const color = Math.floor(127.5 + 127.5 * (value / sources2D.length));

          const index = (y * width + x) * 4;
          data[index] = color;     // Red
          data[index + 1] = color; // Green
          data[index + 2] = 255;   // Blue
          data[index + 3] = 255;   // Alpha
        }
      }

      ctx.putImageData(imageData, 0, 0);
      time += dt;
      requestAnimationFrame(drawFrame);
    }

    drawFrame();

    // 3D Plotly Visualization
    const amplitudeInput = document.getElementById('amplitude');
    const wavelengthInput = document.getElementById('wavelength');
    const sourcesInput = document.getElementById('sources');
    const radiusInput = document.getElementById('radius');
    const updateBtn = document.getElementById('updateBtn');
    const ampValue = document.getElementById('ampValue');
    const waveValue = document.getElementById('waveValue');
    const radiusValue = document.getElementById('radiusValue');

    ampValue.textContent = amplitudeInput.value;
    waveValue.textContent = wavelengthInput.value;
    radiusValue.textContent = radiusInput.value;

    amplitudeInput.addEventListener('input', () => ampValue.textContent = amplitudeInput.value);
    wavelengthInput.addEventListener('input', () => waveValue.textContent = wavelengthInput.value);
    radiusInput.addEventListener('input', () => radiusValue.textContent = radiusInput.value);

    updateBtn.addEventListener('click', plotSurface);

    function regularPolygon(n, radius) {
      const points = [];
      for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
      }
      return points;
    }

    function plotSurface() {
      const A = parseFloat(amplitudeInput.value);
      const wavelength = parseFloat(wavelengthInput.value);
      const numSources = parseInt(sourcesInput.value);
      const sourceRadius = parseFloat(radiusInput.value);
      const k = 2 * Math.PI / wavelength;
      const omega = 2 * Math.PI * 1.0;
      const phi = 0;
      const t = 0;

      const size = 50;
      const range = 5;
      const x = [...Array(size)].map((_, i) => -range + (2 * range * i) / (size - 1));
      const y = x;

      const X = [], Y = [], Z = [];
      const sources = regularPolygon(numSources, sourceRadius);

      for (let i = 0; i < size; i++) {
        X[i] = [];
        Y[i] = [];
        Z[i] = [];
        for (let j = 0; j < size; j++) {
          X[i][j] = x[j];
          Y[i][j] = y[i];
          let value = 0;
          for (const source of sources) {
            const dx = X[i][j] - source[0];
            const dy = Y[i][j] - source[1];
            const r = Math.sqrt(dx * dx + dy * dy) + 0.001;
            value += A * Math.sin(k * r - omega * t + phi) / r;
          }
          Z[i][j] = value;
        }
      }

      const data = [{
        type: 'surface',
        x: X,
        y: Y,
        z: Z,
        colorscale: 'RdBu',
        showscale: false
      }];

      const layout = {
        margin: { l: 0, r: 0, b: 0, t: 0 }
      };

      Plotly.newPlot('plot3d', data, layout);
    }

    plotSurface();
  </script>

</body>
</html>
