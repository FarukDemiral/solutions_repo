# Problem 1
# Interference Patterns on a Water Surface

## Theoretical Foundation

A **circular wave** on the water surface, emanating from a point source located at $$(x_0, y_0)$$, can be described by the **Single Disturbance Equation**:

$$
\eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
$$

Where:
- $$\eta(x, y, t)$$: Displacement at point $$(x, y)$$ and time $$t$$
- $$A$$: Amplitude of the wave
- $$k = \frac{2\pi}{\lambda}$$: Wave number
- $$\omega = 2\pi f$$: Angular frequency
- $$r = \sqrt{(x - x_0)^2 + (y - y_0)^2}$$: Distance from source to point $$(x, y)$$
- $$\phi$$: Initial phase

### Superposition Principle

With multiple sources, total displacement is:

$$
\eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t)
$$

Where $$N$$ is the number of point sources.

---

## Simulation: Interference from Point Sources at Polygon Vertices

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interference Pattern from Polygon Sources</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
      max-width: 1000px;
      margin: 0 auto;
    }
    
    h1, h2 {
      color: #2c3e50;
      text-align: center;
      margin-top: 1.5em;
    }
    
    .container {
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px 0;
    }
    
    .canvas-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    
    canvas {
      display: block;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      margin: 20px 0;
    }
    
    .control-group {
      flex: 1;
      min-width: 200px;
      max-width: 250px;
    }
    
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    input, select {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .button-group {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }
    
    button {
      background-color: #4c6ef5;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #364fc7;
    }
    
    .parameter-display {
      background-color: #f0f4f8;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    
    .equation {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
      margin: 15px 0;
      font-style: italic;
      text-align: center;
    }
    
    .legend {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 15px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      margin: 0 10px;
    }
    
    .legend-color {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 5px;
    }
    
    .colormap {
      height: 20px;
      width: 100%;
      margin: 10px 0;
      background: linear-gradient(to right,
        #440154, #482878, #3e4989, #31688e, #26828e, 
        #1f9e89, #35b779, #6ece58, #b5de2b, #fde725);
      border-radius: 3px;
    }
    
    .colormap-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.85em;
      color: #666;
    }
    
    .footnote {
      margin-top: 30px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Interference Pattern from Polygon Wave Sources</h1>
  
  <div class="container">
    <div class="parameter-display">
      <h2>Wave Physics Simulation</h2>
      <p>This simulation demonstrates the interference pattern created when multiple point sources of waves are arranged at the vertices of a regular polygon. The total wave amplitude at any point is calculated as the sum of contributions from each source.</p>
      
      <div class="equation">
        η(x,y) = ∑ (A / √r) · cos(kr - ωt + φ)
      </div>
      
      <p>Where:</p>
      <ul>
        <li>A = amplitude of each source</li>
        <li>r = distance from the source to the point (x,y)</li>
        <li>k = wave number (2π/λ)</li>
        <li>ω = angular frequency (2πf)</li>
        <li>t = time</li>
        <li>φ = initial phase</li>
      </ul>
    </div>
    
    <div class="controls">
      <div class="control-group">
        <label for="polygonVertices">Number of Sources:</label>
        <select id="polygonVertices">
          <option value="3">3 (Triangle)</option>
          <option value="4">4 (Square)</option>
          <option value="5">5 (Pentagon)</option>
          <option value="6" selected>6 (Hexagon)</option>
          <option value="8">8 (Octagon)</option>
          <option value="12">12 (Dodecagon)</option>
        </select>
        
        <label for="amplitude">Amplitude (A):</label>
        <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1">
        <span id="amplitudeValue">1.0</span>
        
        <label for="wavelength">Wavelength (λ):</label>
        <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2">
        <span id="wavelengthValue">2.0</span>
      </div>
      
      <div class="control-group">
        <label for="radius">Polygon Radius:</label>
        <input type="range" id="radius" min="1" max="8" step="0.5" value="5">
        <span id="radiusValue">5.0</span>
        
        <label for="resolution">Resolution:</label>
        <select id="resolution">
          <option value="100">Low</option>
          <option value="200" selected>Medium</option>
          <option value="300">High</option>
        </select>
        
        <label for="colormap">Color Map:</label>
        <select id="colormap">
          <option value="viridis" selected>Viridis</option>
          <option value="plasma">Plasma</option>
          <option value="inferno">Inferno</option>
          <option value="magma">Magma</option>
          <option value="rdbu">Red-Blue</option>
        </select>
      </div>
    </div>
    
    <div class="button-group">
      <button id="calculateBtn">Calculate Interference Pattern</button>
    </div>
    
    <div class="canvas-container">
      <canvas id="interferenceCanvas" width="600" height="600"></canvas>
    </div>
    
    <div class="legend">
      <div class="legend-item">
        <div class="legend-color" style="background-color: red;"></div>
        <span>Wave Sources</span>
      </div>
    </div>
    
    <div>
      <p>Displacement Color Scale:</p>
      <div class="colormap" id="colormapDisplay"></div>
      <div class="colormap-labels">
        <span>Minimum</span>
        <span>Maximum</span>
      </div>
    </div>
  </div>
  
  <div class="footnote">
    <p>© 2025 Wave Interference Physics Simulation | For educational purposes</p>
  </div>

  <script>
    // Get DOM elements
    const canvas = document.getElementById('interferenceCanvas');
    const ctx = canvas.getContext('2d');
    const calculateBtn = document.getElementById('calculateBtn');
    
    const polygonSelect = document.getElementById('polygonVertices');
    const amplitudeInput = document.getElementById('amplitude');
    const wavelengthInput = document.getElementById('wavelength');
    const radiusInput = document.getElementById('radius');
    const resolutionSelect = document.getElementById('resolution');
    const colormapSelect = document.getElementById('colormap');
    
    const amplitudeValue = document.getElementById('amplitudeValue');
    const wavelengthValue = document.getElementById('wavelengthValue');
    const radiusValue = document.getElementById('radiusValue');
    
    // Initial parameter values
    let A = 1.0;                // Amplitude
    let wavelength = 2.0;       // Wavelength
    let frequency = 1.0;        // Frequency (fixed)
    let omega = 2 * Math.PI * frequency;
    let k = 2 * Math.PI / wavelength;
    let phi = 0;                // Initial phase
    let t = 0;                  // Time snapshot (fixed)
    let N = 6;                  // Number of sources
    let radius = 5.0;           // Polygon radius
    let resolution = 200;       // Grid resolution
    let colormap = 'viridis';   // Default colormap
    
    // Update displayed values
    amplitudeInput.addEventListener('input', () => {
      A = parseFloat(amplitudeInput.value);
      amplitudeValue.textContent = A.toFixed(1);
    });
    
    wavelengthInput.addEventListener('input', () => {
      wavelength = parseFloat(wavelengthInput.value);
      wavelengthValue.textContent = wavelength.toFixed(1);
      k = 2 * Math.PI / wavelength;
    });
    
    radiusInput.addEventListener('input', () => {
      radius = parseFloat(radiusInput.value);
      radiusValue.textContent = radius.toFixed(1);
    });
    
    // Update resolution when selected
    resolutionSelect.addEventListener('change', () => {
      resolution = parseInt(resolutionSelect.value);
    });
    
    // Update number of sources when changed
    polygonSelect.addEventListener('change', () => {
      N = parseInt(polygonSelect.value);
    });
    
    // Update colormap when selected
    colormapSelect.addEventListener('change', () => {
      colormap = colormapSelect.value;
      updateColormapDisplay();
    });
    
    // Color maps
    const colormaps = {
      viridis: [
        [68, 1, 84], [70, 50, 126], [54, 92, 141], [39, 127, 142], 
        [31, 161, 135], [74, 194, 109], [159, 218, 58], [253, 231, 37]
      ],
      plasma: [
        [13, 8, 135], [75, 0, 160], [125, 0, 168], [168, 0, 157], 
        [203, 32, 107], [224, 80, 66], [239, 140, 45], [246, 211, 47]
      ],
      inferno: [
        [0, 0, 4], [40, 11, 84], [101, 21, 110], [159, 42, 99], 
        [212, 72, 66], [241, 130, 37], [250, 193, 39], [252, 255, 164]
      ],
      magma: [
        [0, 0, 4], [44, 13, 74], [104, 26, 107], [168, 49, 96], 
        [216, 80, 72], [244, 131, 44], [254, 190, 65], [252, 253, 191]
      ],
      rdbu: [
        [178, 24, 43], [214, 96, 77], [244, 165, 130], [253, 219, 199], 
        [209, 229, 240], [146, 197, 222], [67, 147, 195], [33, 102, 172]
      ]
    };
    
    // Update colormap display
    function updateColormapDisplay() {
      const colormapDiv = document.getElementById('colormapDisplay');
      const colors = colormaps[colormap];
      
      let gradientString = 'linear-gradient(to right';
      for (let i = 0; i < colors.length; i++) {
        const percent = (i / (colors.length - 1)) * 100;
        const [r, g, b] = colors[i];
        gradientString += `, rgb(${r}, ${g}, ${b}) ${percent}%`;
      }
      gradientString += ')';
      
      colormapDiv.style.background = gradientString;
    }
    
    // Generate points for a regular polygon
    function generatePolygonPoints(n, r) {
      const points = [];
      for (let i = 0; i < n; i++) {
        const angle = (i * 2 * Math.PI) / n;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        points.push([x, y]);
      }
      return points;
    }
    
    // Map a value from one range to another
    function mapValue(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    
    // Get color from colormap
    function getColor(value, min, max, map = colormap) {
      // Normalize value to 0-1 range
      const normalized = (value - min) / (max - min);
      
      // Clamp to 0-1
      const clamped = Math.max(0, Math.min(1, normalized));
      
      // Get color map
      const colors = colormaps[map];
      
      // Find position in colormap
      const position = clamped * (colors.length - 1);
      const index = Math.floor(position);
      const fraction = position - index;
      
      // Handle edge cases
      if (index >= colors.length - 1) {
        return `rgb(${colors[colors.length - 1][0]}, ${colors[colors.length - 1][1]}, ${colors[colors.length - 1][2]})`;
      }
      
      // Interpolate between colors
      const c1 = colors[index];
      const c2 = colors[index + 1];
      
      const r = Math.round(c1[0] + fraction * (c2[0] - c1[0]));
      const g = Math.round(c1[1] + fraction * (c2[1] - c1[1]));
      const b = Math.round(c1[2] + fraction * (c2[2] - c1[2]));
      
      return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Calculate and draw the interference pattern
    function calculateInterferencePattern() {
      // Update parameters from inputs
      A = parseFloat(amplitudeInput.value);
      wavelength = parseFloat(wavelengthInput.value);
      k = 2 * Math.PI / wavelength;
      N = parseInt(polygonSelect.value);
      radius = parseFloat(radiusInput.value);
      resolution = parseInt(resolutionSelect.value);
      colormap = colormapSelect.value;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Generate source positions
      const sourcePoints = generatePolygonPoints(N, radius);
      
      // Create a pixel-by-pixel image
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      // Create scaling factors to map between canvas and simulation coordinates
      const scale = 20; // Adjust this to zoom in/out
      const offsetX = canvas.width / 2;
      const offsetY = canvas.height / 2;
      
      // Store the wave values to find min/max for normalization
      let waveValues = [];
      let minVal = Infinity;
      let maxVal = -Infinity;
      
      // Calculate wave values first to find min/max
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          // Convert canvas coordinates to simulation coordinates
          const simX = (x - offsetX) / scale;
          const simY = (y - offsetY) / scale;
          
          // Calculate total amplitude from all sources
          let etaTotal = 0;
          for (const [x0, y0] of sourcePoints) {
            const r = Math.sqrt((simX - x0) ** 2 + (simY - y0) ** 2) + 1e-6; // Avoid division by zero
            const sourceContribution = (A / Math.sqrt(r)) * Math.cos(k * r - omega * t + phi);
            etaTotal += sourceContribution;
          }
          
          // Store value and track min/max
          waveValues.push(etaTotal);
          minVal = Math.min(minVal, etaTotal);
          maxVal = Math.max(maxVal, etaTotal);
        }
      }
      
      // Now set the pixel values with normalized colors
      let index = 0;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const pixelIndex = (y * canvas.width + x) * 4;
          const etaTotal = waveValues[index++];
          
          // Get color from colormap
          const color = getColor(etaTotal, minVal, maxVal);
          
          // Parse RGB components from the color string
          const rgb = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          
          // Set pixel data
          data[pixelIndex] = parseInt(rgb[1]);     // Red
          data[pixelIndex + 1] = parseInt(rgb[2]); // Green
          data[pixelIndex + 2] = parseInt(rgb[3]); // Blue
          data[pixelIndex + 3] = 255;              // Alpha (fully opaque)
        }
      }
      
      // Put the image data on the canvas
      ctx.putImageData(imageData, 0, 0);
      
      // Draw the source points
      for (const [x0, y0] of sourcePoints) {
        const canvasX = x0 * scale + offsetX;
        const canvasY = y0 * scale + offsetY;
        
        ctx.beginPath();
        ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
    
    // Initial setup
    updateColormapDisplay();
    calculateBtn.addEventListener('click', calculateInterferencePattern);
    // Calculate on page load
    window.addEventListener('load', calculateInterferencePattern);
  </script>
</body>
</html>
