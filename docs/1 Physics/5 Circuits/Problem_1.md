# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Interference Simulation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
    }
    header {
      background: #003366;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    section {
      max-width: 1000px;
      margin: auto;
      padding: 40px 20px;
    }
    h2 {
      border-bottom: 2px solid #ccc;
      padding-bottom: 10px;
    }
    canvas {
      display: block;
      margin: 30px auto;
      border: 2px solid #555;
      border-radius: 10px;
    }
    .controls {
      background: #eef2f5;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
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
    pre {
      background: #222;
      color: #0f0;
      padding: 20px;
      overflow-x: auto;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Wave Interference Explorations</h1>
    <p>Visualizing Patterns from Multiple Point Sources</p>
  </header>

  <section>
    <h2>1. Classical Real-Valued Model</h2>
    <p>This model represents wave interference using cosine-based real-valued wave equations. The sources are placed on vertices of a regular polygon, and their amplitudes decay with distance.</p>
    <pre>
η(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
η_sum(x, y, t) = \sum_{i=1}^{N} η_i(x, y, t)
    </pre>
    <div class="controls">
      <div class="control-group">
        <label for="amplitude">Amplitude</label>
        <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1.0">
      </div>
      <div class="control-group">
        <label for="wavelength">Wavelength</label>
        <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2.0">
      </div>
      <div class="control-group">
        <label for="sources">Sources</label>
        <select id="sources">
          <option value="3">3 (Triangle)</option>
          <option value="4" selected>4 (Square)</option>
          <option value="5">5 (Pentagon)</option>
          <option value="6">6 (Hexagon)</option>
          <option value="8">8 (Octagon)</option>
        </select>
      </div>
      <div class="control-group">
        <label for="radius">Polygon Radius</label>
        <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
      </div>
    </div>
    <canvas id="canvas1" width="600" height="600"></canvas>
  </section>

  <section>
    <h2>2. Complex Exponential Wave Model</h2>
    <p>This extended model uses complex numbers to represent waves, which is ideal for handling phase differences and advanced mathematical analysis. Each wave is represented as a phasor with a real and imaginary part.</p>
    <pre>
η_i(x, y, t) = \frac{A}{\sqrt{r_i}} \cdot e^{j(kr_i - \omega t + \phi_i)}
η_total(x, y, t) = Re{ \sum_{i=1}^{N} η_i(x, y, t) }
    </pre>
    <canvas id="canvas2" width="600" height="600"></canvas>
  </section>

  <script>
    const canvas1 = document.getElementById("canvas1");
    const ctx1 = canvas1.getContext("2d");
    const canvas2 = document.getElementById("canvas2");
    const ctx2 = canvas2.getContext("2d");
    const amplitudeInput = document.getElementById("amplitude");
    const wavelengthInput = document.getElementById("wavelength");
    const sourcesInput = document.getElementById("sources");
    const radiusInput = document.getElementById("radius");

    let A = parseFloat(amplitudeInput.value);
    let lambda = parseFloat(wavelengthInput.value);
    let k = 2 * Math.PI / lambda;
    let omega = 2 * Math.PI * 1.0;
    let t = 0;

    amplitudeInput.oninput = () => A = parseFloat(amplitudeInput.value);
    wavelengthInput.oninput = () => {
      lambda = parseFloat(wavelengthInput.value);
      k = 2 * Math.PI / lambda;
    };

    function getSources(n, r, usePhase = false) {
      const list = [];
      for (let i = 0; i < n; i++) {
        const angle = (2 * Math.PI * i) / n;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const phi = usePhase ? Math.random() * 2 * Math.PI : 0;
        list.push({ x, y, phi });
      }
      return list;
    }

    function colorMap(value) {
      const v = Math.max(0, Math.min(1, value));
      if (v < 0.5) return [0, 0, 255 * (v * 2)];
      return [255 * ((v - 0.5) * 2), 255 * ((v - 0.5) * 2), 255 * (1 - (v - 0.5) * 2)];
    }

    function draw(canvas, ctx, complex = false) {
      const w = canvas.width;
      const h = canvas.height;
      const scale = 20;
      const offsetX = w / 2;
      const offsetY = h / 2;
      const image = ctx.createImageData(w, h);
      const data = image.data;
      const n = parseInt(sourcesInput.value);
      const r = parseFloat(radiusInput.value);
      const sources = getSources(n, r, complex);

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
            const R = Math.sqrt(dx * dx + dy * dy) + 0.01;
            const phase = k * R - omega * t + src.phi;
            const amp = A / Math.sqrt(R);
            if (complex) {
              real += amp * Math.cos(phase);
              imag += amp * Math.sin(phase);
            } else {
              real += amp * Math.cos(phase);
            }
          }
          const eta = real;
          const idx = y * w + x;
          values[idx] = eta;
          if (eta < min) min = eta;
          if (eta > max) max = eta;
        }
      }

      for (let i = 0; i < values.length; i++) {
        const norm = (values[i] - min) / (max - min);
        const rgb = colorMap(norm);
        const p = i * 4;
        data[p] = rgb[0];
        data[p+1] = rgb[1];
        data[p+2] = rgb[2];
        data[p+3] = 255;
      }

      ctx.putImageData(image, 0, 0);
    }

    function animate() {
      draw(canvas1, ctx1, false);
      draw(canvas2, ctx2, true);
      t += 0.05;
      requestAnimationFrame(animate);
    }

    animate();
  </script>
</body>
</html>
