# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wave Interference Simulation</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f7fa;
      margin: 0 auto;
      padding: 20px;
      color: #333;
      line-height: 1.6;
      max-width: 1000px;
    }

    h1 {
      color: #2c3e50;
      text-align: center;
    }

    .container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px 0;
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
      min-width: 200px;
    }

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    button {
      background-color: #4c6ef5;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
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
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #000;
    }

    .color-scale {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
    }

    .color-bar {
      width: 300px;
      height: 20px;
      background: linear-gradient(to right, blue, white, red);
      border-radius: 2px;
      margin: 0 10px;
    }

    .scale-label {
      font-size: 14px;
      color: #666;
    }
  </style>
</head>
<body>

  <h1>Wave Interference Simulation</h1>

  <div class="container">
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
          <option value="4">4 (Square)</option>
          <option value="5">5 (Pentagon)</option>
          <option value="6">6 (Hexagon)</option>
          <option value="8" selected>8 (Octagon)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="radius">Source Radius:</label>
        <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
        <span id="radiusValue">3.0</span>
      </div>
    </div>

    <button id="updateBtn">Update Simulation</button>

    <div class="canvas-container">
      <canvas id="interferenceCanvas" width="600" height="600"></canvas>
    </div>

    <div class="color-scale">
      <span class="scale-label">Negative</span>
      <div class="color-bar"></div>
      <span class="scale-label">Positive</span>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('interferenceCanvas');
    const ctx = canvas.getContext('2d');

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

    updateBtn.addEventListener('click', () => {
      setupSources();
    });

    let sources = [];
    let t = 0;

    function setupSources() {
      sources = [];
      const numSources = parseInt(sourcesInput.value);
      const radius = parseFloat(radiusInput.value);
      for (let i = 0; i < numSources; i++) {
        const angle = (2 * Math.PI * i) / numSources;
        sources.push({
          x: canvas.width/2 + radius * 50 * Math.cos(angle),
          y: canvas.height/2 + radius * 50 * Math.sin(angle)
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      const A = parseFloat(amplitudeInput.value);
      const wavelength = parseFloat(wavelengthInput.value);
      const k = 2 * Math.PI / wavelength;
      const omega = 2 * Math.PI * 1.0; // frequency sabit

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          let sum = 0;
          for (const source of sources) {
            const dx = x - source.x;
            const dy = y - source.y;
            const r = Math.sqrt(dx*dx + dy*dy);
            sum += A * Math.sin(k*r - omega*t);
          }
          const normalized = (sum + sources.length) / (2 * sources.length);
          const color = Math.max(0, Math.min(255, normalized * 255));
          const index = (y * canvas.width + x) * 4;
          data[index] = color;     // Red
          data[index+1] = color;   // Green
          data[index+2] = 255 - color; // Blue
          data[index+3] = 255;     // Opacity
        }
      }

      ctx.putImageData(imageData, 0, 0);
      t += 0.05;
      requestAnimationFrame(draw);
    }

    setupSources();
    draw();
  </script>

</body>
</html>
