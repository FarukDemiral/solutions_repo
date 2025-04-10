# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Polygonal Wave Interference - Test Page</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      background-color: #121212;
      color: #eeeeee;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    header {
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
      padding: 30px 20px;
      text-align: center;
      color: #ffffff;
    }

    header h1 {
      margin: 0;
      font-size: 32px;
    }

    .section {
      padding: 30px 20px;
      max-width: 1000px;
      margin: auto;
    }

    .panel {
      background-color: #1e1e1e;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }

    .panel label {
      display: block;
      margin: 10px 0 5px;
    }

    .panel input,
    .panel select {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: none;
      font-size: 14px;
    }

    canvas {
      display: block;
      margin: 30px auto;
      background: black;
      border: 2px solid #555;
      border-radius: 10px;
    }

    button {
      background-color: #03dac6;
      color: #000;
      border: none;
      padding: 12px 20px;
      font-size: 16px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 20px;
    }

    button:hover {
      background-color: #00c4b4;
    }
  </style>
</head>
<body>

<header>
  <h1>Polygonal Wave Interference</h1>
  <p>Dynamic Simulation Test Page</p>
</header>

<div class="section">
  <div class="panel">
    <label for="amplitude">Amplitude (A)</label>
    <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1.0">

    <label for="wavelength">Wavelength (λ)</label>
    <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2.0">

    <label for="sources">Number of Sources</label>
    <select id="sources">
      <option value="3">3 (Triangle)</option>
      <option value="4" selected>4 (Square)</option>
      <option value="5">5 (Pentagon)</option>
      <option value="6">6 (Hexagon)</option>
    </select>

    <label for="radius">Radius of Source Arrangement</label>
    <input type="range" id="radius" min="1" max="6" step="0.5" value="3">

    <button id="runBtn">Update Simulation</button>
  </div>

  <canvas id="canvas" width="600" height="600"></canvas>
</div>

<script>
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const ampSlider = document.getElementById("amplitude");
  const waveSlider = document.getElementById("wavelength");
  const sourceSelect = document.getElementById("sources");
  const radiusSlider = document.getElementById("radius");
  const runBtn = document.getElementById("runBtn");

  let A = parseFloat(ampSlider.value);
  let lambda = parseFloat(waveSlider.value);
  let f = 1;
  let omega = 2 * Math.PI * f;
  let k = 2 * Math.PI / lambda;
  let phi = 0;
  let t = 0;
  let animationId = null;

  ampSlider.oninput = () => (A = parseFloat(ampSlider.value));
  waveSlider.oninput = () => {
    lambda = parseFloat(waveSlider.value);
    k = 2 * Math.PI / lambda;
  };
  radiusSlider.oninput = () => {};
  sourceSelect.onchange = () => {};

  runBtn.onclick = () => {
    cancelAnimationFrame(animationId);
    t = 0;
    animate();
  };

  function getPolygonVertices(n, r) {
    const points = [];
    for (let i = 0; i < n; i++) {
      const angle = (2 * Math.PI * i) / n;
      points.push([r * Math.cos(angle), r * Math.sin(angle)]);
    }
    return points;
  }

  function animate() {
    const width = canvas.width;
    const height = canvas.height;
    const scale = 20;
    const offsetX = width / 2;
    const offsetY = height / 2;
    const ctxData = ctx.createImageData(width, height);
    const pixels = ctxData.data;

    const numSources = parseInt(sourceSelect.value);
    const radius = parseFloat(radiusSlider.value);
    const sources = getPolygonVertices(numSources, radius);
    let min = Infinity;
    let max = -Infinity;
    const values = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const physX = (x - offsetX) / scale;
        const physY = (y - offsetY) / scale;
        let eta = 0;
        for (const [x0, y0] of sources) {
          const R = Math.sqrt((physX - x0) ** 2 + (physY - y0) ** 2);
          const amp = R < 0.01 ? A : A / Math.sqrt(R + 0.01);
          eta += amp * Math.cos(k * R - omega * t + phi);
        }
        const idx = y * width + x;
        values[idx] = eta;
        if (eta < min) min = eta;
        if (eta > max) max = eta;
      }
    }

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const norm = (values[idx] - min) / (max - min);
        const color = colorMap(norm);
        const pixel = 4 * idx;
        pixels[pixel] = color[0];
        pixels[pixel + 1] = color[1];
        pixels[pixel + 2] = color[2];
        pixels[pixel + 3] = 255;
      }
    }

    ctx.putImageData(ctxData, 0, 0);
    t += 0.05;
    animationId = requestAnimationFrame(animate);
  }

  function colorMap(value) {
    let r, g, b;
    if (value < 0.5) {
      const t = value * 2;
      r = g = 255 * t;
      b = 255;
    } else {
      const t = (value - 0.5) * 2;
      r = 255;
      g = b = 255 * (1 - t);
    }
    return [Math.floor(r), Math.floor(g), Math.floor(b)];
  }

  animate();
</script>
</body>
</html>
