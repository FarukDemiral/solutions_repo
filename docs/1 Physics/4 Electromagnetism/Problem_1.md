# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Explorations</title>
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
    <h2>Theoretical Foundation</h2>
    <p>A <strong>circular wave</strong> on the water surface, emanating from a point source located at \( (x_0, y_0) \), can be described by the <strong>Single Disturbance Equation</strong>:</p>
    <pre>
\[ \eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi) \]</pre>
    <p>Where:</p>
    <ul>
      <li>\( \eta(x, y, t) \): Displacement at point \( (x, y) \) and time \( t \)</li>
      <li>\( A \): Amplitude of the wave</li>
      <li>\( k = \frac{2\pi}{\lambda} \): Wave number</li>
      <li>\( \omega = 2\pi f \): Angular frequency</li>
      <li>\( r = \sqrt{(x - x_0)^2 + (y - y_0)^2} \): Distance from source to point \( (x, y) \)</li>
      <li>\( \phi \): Initial phase</li>
    </ul>
    <p><strong>Superposition Principle:</strong></p>
    <pre>
\[ \eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t) \]</pre>
  </section>

  <section>
    <h2>1. Real-Valued Model Simulation</h2>
    <p>This model uses cosine-based equations to simulate wave interference from point sources arranged in a regular polygon.</p>
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
    <p>This model uses complex numbers to represent wave interactions. Each wave source is treated as a phasor, allowing for phase differences and a deeper understanding of interference phenomena.</p>
    <pre>
\[ \eta_i(x, y, t) = \frac{A}{\sqrt{r_i}} e^{j(kr_i - \omega t + \phi_i)} \]
\[ \eta_{\text{total}}(x, y, t) = \Re\left\{ \sum_{i=1}^{N} \eta_i(x, y, t) \right\} \]</pre>
    <canvas id="canvas2" width="600" height="600"></canvas>
  </section>

  <script>
    // JavaScript remains the same as current merged version including complex model drawing logic.
  </script>
</body>
</html>
