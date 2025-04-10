# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complex Wave Interference</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #0f0f0f;
      color: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    header, section {
      padding: 30px;
      max-width: 900px;
      margin: auto;
    }
    header {
      background: linear-gradient(to right, #1f1c2c, #928dab);
      color: white;
      text-align: center;
    }
    canvas {
      display: block;
      margin: 20px auto;
      border: 2px solid #444;
      border-radius: 8px;
    }
    .controls {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
      background: #1e1e1e;
      padding: 20px;
      border-radius: 10px;
    }
    .controls label {
      display: block;
      margin-bottom: 5px;
    }
    .control-group {
      flex: 1;
      min-width: 180px;
    }
    input, select {
      width: 100%;
      padding: 6px;
      border-radius: 4px;
      border: none;
    }
  </style>
</head>
<body>
  <header>
    <h1>Complex Wave Interference</h1>
    <p>Interference of circular waves using complex exponential representation</p>
  </header>

  <section>
    <h2>Theoretical Overview</h2>
    <p>We model each wave source using a complex exponential:</p>
    <pre style="background:#222;padding:15px;border-radius:10px;overflow:auto;">
η_i(x, y, t) = \frac{A}{\sqrt{r_i}} \cdot e^{j(kr_i - \omega t + \phi_i)}
    </pre>
    <p>The total wave at point (x, y) is:</p>
    <pre style="background:#222;padding:15px;border-radius:10px;overflow:auto;">
η_total(x, y, t) = Re{ \sum_{i=1}^{N} η_i(x, y, t) }
    </pre>
  </section>

  <section class="controls">
    <div class="control-group">
      <label for="amplitude">Amplitude</label>
      <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1">
    </div>
    <div class="control-group">
      <label for="wavelength">Wavelength</label>
      <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2">
    </div>
    <div class="control-group">
      <label for="sources">Number of Sources</label>
      <select id="sources">
        <option value="3">3</option>
        <option value="4" selected>4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="8">8</option>
      </select>
    </div>
    <div class="control-group">
      <label for="radius">Polygon Radius</label>
      <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
    </div>
  </section>

  <canvas id="canvas" width="600" height="600"></canvas>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const ampSlider = document.getElementById('amplitude');
    const lambdaSlider = document.getElementById('wavelength');
    const sourceSelect = document.getElementById('sources');
    const radiusSlider = document.getElementById('radius');

    let A = parseFloat(ampSlider.value);
    let lambda = parseFloat(lambdaSlider.value);
    let f = 1;
    let omega = 2 * Math.PI * f;
    let k = 2 * Math.PI / lambda;
    let t = 0;

    ampSlider.oninput = () => A = parseFloat(ampSlider.value);
    lambdaSlider.oninput = () => {
      lambda = parseFloat(lambdaSlider.value);
      k = 2 * Math.PI / lambda;
    };

    sourceSelect.onchange = radiusSlider.oninput = () => {
      t = 0;
      draw();
    };

    function getSources(n, r) {
      const sources = [];
      for (let i = 0; i < n; i++) {
        const angle = 2 * Math.PI * i / n;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const phi = Math.random() * 2 * Math.PI;
        sources.push({x, y, phi});
      }
      return sources;
    }

    function draw() {
      const w = canvas.width;
      const h = canvas.height;
      const scale = 20;
      const offsetX = w / 2;
      const offsetY = h / 2;
      const img = ctx.createImageData(w, h);
      const data = img.data;
      const n = parseInt(sourceSelect.value);
      const r = parseFloat(radiusSlider.value);
      const sources = getSources(n, r);

      let min = Infinity;
      let max = -Infinity;
      const values = new Array(w * h);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const px = (x - offsetX) / scale;
          const py = (y - offsetY) / scale;
          let real = 0, imag = 0;
          for (const src of sources) {
            const dx = px - src.x;
            const dy = py - src.y;
            const R = Math.sqrt(dx*dx + dy*dy) + 0.01;
            const phase = k * R - omega * t + src.phi;
            const amp = A / Math.sqrt(R);
            real += amp * Math.cos(phase);
            imag += amp * Math.sin(phase);
          }
          const eta = real; // Only real part visualized
          const idx = y * w + x;
          values[idx] = eta;
          if (eta < min) min = eta;
          if (eta > max) max = eta;
        }
      }

      for (let i = 0; i < values.length; i++) {
        const norm = (values[i] - min) / (max - min);
        const rgb = colormap(norm);
        const p = i * 4;
        data[p] = rgb[0];
        data[p+1] = rgb[1];
        data[p+2] = rgb[2];
        data[p+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    function colormap(v) {
      if (v < 0.5) return [0, 0, 255 * (v * 2)];
      return [255 * ((v - 0.5) * 2), 255 * ((v - 0.5) * 2), 255 * (1 - (v - 0.5) * 2)];
    }

    function animate() {
      draw();
      t += 0.05;
      requestAnimationFrame(animate);
    }

    animate();
  </script>
</body>
</html>
