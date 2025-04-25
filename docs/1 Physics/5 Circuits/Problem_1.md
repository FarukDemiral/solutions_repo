# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Explorations - 3D Visualization</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      margin: 0;
      padding: 20px;
      color: #333;
      max-width: 1000px;
      margin: auto;
    }
    header {
      background: #003366;
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .controls {
      background: #eef2f5;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      justify-content: center;
    }
    .control-group {
      flex: 1;
      min-width: 200px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #aaa;
    }
  </style>
</head>
<body>
  <header>
    <h1>Wave Interference 3D Surface Visualization</h1>
    <p>Interactive 3D Plot of Interference Patterns Using Plotly.js</p>
  </header>

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

  <script>
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
      const omega = 2 * Math.PI * 1.0; // fixed frequency
      const phi = 0;
      const t = 0; // snapshot at t = 0

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
          const xi = x[j];
          const yi = y[i];
          let eta = 0;
          for (const [x0, y0] of sources) {
            const R = Math.sqrt((xi - x0) ** 2 + (yi - y0) ** 2);
            const amplitude = R < 0.01 ? A : A / Math.sqrt(R + 0.01);
            eta += amplitude * Math.cos(k * R - omega * t + phi);
          }
          X[i][j] = xi;
          Y[i][j] = yi;
          Z[i][j] = eta;
        }
      }

      const data = [{
        type: 'surface',
        x: X,
        y: Y,
        z: Z,
        colorscale: 'Jet',
        contours: {
          z: {
            show: true,
            usecolormap: true,
            highlightcolor: "#42f462",
            project: { z: true }
          }
        }
      }];

      const layout = {
        title: '3D Wave Interference Pattern',
        autosize: true,
        scene: {
          xaxis: { title: 'X' },
          yaxis: { title: 'Y' },
          zaxis: { title: 'Displacement η(x, y, t)' }
        }
      };

      Plotly.newPlot('plot3d', data, layout);
    }

    plotSurface();
  </script>
</body>
</html>