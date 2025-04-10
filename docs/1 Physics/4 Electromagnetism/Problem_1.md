# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Patterns</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1, h2, h3 {
      color: #2c3e50;
      text-align: center;
      margin-top: 1.5em;
    }
    
    .container {
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px 0;
    }
    
    .tabs {
      display: flex;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
    }
    
    .tab {
      padding: 10px 20px;
      cursor: pointer;
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      border-bottom: none;
      border-radius: 5px 5px 0 0;
      margin-right: 5px;
    }
    
    .tab.active {
      background-color: #fff;
      font-weight: bold;
      border-bottom: 1px solid #fff;
      margin-bottom: -1px;
    }
    
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
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
      background-color: #000;
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
      max-width: 300px;
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
    
    .value-display {
      float: right;
      font-weight: normal;
      color: #666;
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
      display: block;
      margin: 20px auto;
    }
    
    button:hover {
      background-color: #364fc7;
    }
    
    .info {
      background-color: #f0f4f8;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    
    .equation {
      text-align: center;
      margin: 15px 0;
      font-style: italic;
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 5px;
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
    
    .footnote {
      margin-top: 30px;
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Wave Interference Pattern Simulations</h1>
  
  <div class="container">
    <div class="tabs">
      <div class="tab active" onclick="switchTab('simulation1')">Polygon Sources</div>
      <div class="tab" onclick="switchTab('simulation2')">Regular Wave Pattern</div>
    </div>
    
    <!-- SİMÜLASYON 1: ÇOKGEN DALGA KAYNAKLARI -->
    <div id="simulation1-tab" class="tab-content active">
      <h2>Interference Pattern from Polygon Wave Sources</h2>
      
      <div class="info">
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
          
          <label for="amplitude1">Amplitude (A):</label>
          <input type="range" id="amplitude1" min="0.1" max="2" step="0.1" value="1">
          <span id="amplitudeValue1">1.0</span>
          
          <label for="wavelength1">Wavelength (λ):</label>
          <input type="range" id="wavelength1" min="0.5" max="5" step="0.1" value="2">
          <span id="wavelengthValue1">2.0</span>
        </div>
        
        <div class="control-group">
          <label for="radius1">Polygon Radius:</label>
          <input type="range" id="radius1" min="1" max="8" step="0.5" value="5">
          <span id="radiusValue1">5.0</span>
          
          <label for="resolution1">Resolution:</label>
          <select id="resolution1">
            <option value="100">Low</option>
            <option value="200" selected>Medium</option>
            <option value="300">High</option>
          </select>
          
          <label for="colormap1">Color Map:</label>
          <select id="colormap1">
            <option value="viridis" selected>Viridis</option>
            <option value="plasma">Plasma</option>
            <option value="inferno">Inferno</option>
            <option value="magma">Magma</option>
            <option value="rdbu">Red-Blue</option>
          </select>
        </div>
      </div>
      
      <button id="calculateBtn1">Calculate Interference Pattern</button>
      
      <div class="canvas-container">
        <canvas id="interferenceCanvas1" width="600" height="600"></canvas>
      </div>
      
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="background-color: red;"></div>
          <span>Wave Sources</span>
        </div>
      </div>
      
      <div>
        <p>Displacement Color Scale:</p>
        <div class="colormap" id="colormapDisplay1"></div>
        <div class="colormap-labels">
          <span>Minimum</span>
          <span>Maximum</span>
        </div>
      </div>
    </div>
    
    <!-- SİMÜLASYON 2: DÜZENLI DALGA GIRIŞIM DESENI -->
    <div id="simulation2-tab" class="tab-content">
      <h2>Wave Interference Pattern Simulation</h2>
      
      <div class="info">
        <p>This simulation shows the interference pattern created by multiple wave sources. The wave amplitude at each point is calculated by summing the contributions from all sources, considering distance-dependent amplitude decay and phase differences.</p>
        <div class="equation">
          η(x,y) = ∑ A/√R · cos(kR - ωt + φ)
        </div>
      </div>
      
      <div class="controls">
        <div class="control-group">
          <label for="amplitude2">Amplitude (A):</label>
          <input type="range" id="amplitude2" min="0.1" max="2" step="0.1" value="1.0">
          <span id="ampValue2">1.0</span>
        </div>

        <div class="control-group">
          <label for="wavelength2">Wavelength (λ):</label>
          <input type="range" id="wavelength2" min="0.5" max="5" step="0.1" value="2.0">
          <span id="waveValue2">2.0</span>
        </div>

        <div class="control-group">
          <label for="sources2">Number of Sources:</label>
          <select id="sources2">
            <option value="3">3 (Triangle)</option>
            <option value="4" selected>4 (Square)</option>
            <option value="5">5 (Pentagon)</option>
            <option value="6">6 (Hexagon)</option>
            <option value="8">8 (Octagon)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="radius2">Source Radius:</label>
          <input type="range" id="radius2" min="1" max="6" step="0.5" value="3">
          <span id="radiusValue2">3.0</span>
        </div>
      </div>
      
      <button id="updateBtn2">Update Simulation</button>
      
      <div class="canvas-container">
        <canvas id="interferenceCanvas2" width="600" height="600"></canvas>
      </div>
      
      <div class="legend">
        <div class="legend-item">
          <div class="legend-color" style="background-color: #4c6ef5;"></div>
          <span>Source Points</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footnote">
    <p>© 2025 Wave Interference Simulations | Created for GitHub Pages</p>
  </div>

  <script>
    // Tab switching functionality
    function switchTab(tabName) {
      // Hide all tab contents
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Deactivate all tabs
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.classList.remove('active');
      });
      
      // Activate selected tab
      document.getElementById(`${tabName}-tab`).classList.add('active');
      
      // Activate the clicked tab button
      event.target.classList.add('active');
      
      // Initialize the newly displayed tab
      if (tabName === 'simulation1') {
        initSimulation1();
      } else if (tabName === 'simulation2') {
        initSimulation2();
      }
    }
    
    //===============================================================
    //             SIMULATION 1: POLYGON WAVE SOURCES
    //===============================================================
    
    // Variables for simulation 1
    let canvas1, ctx1;
    let polygonSelect, amplitudeInput1, wavelengthInput1, radiusInput1;
    let resolutionSelect, colormapSelect, calculateBtn1;
    let amplitudeValue1, wavelengthValue1, radiusValue1;
    
    // Wave parameters for simulation 1
    let A1 = 1.0;               // Amplitude
    let wavelength1 = 2.0;      // Wavelength
    let frequency1 = 1.0;       // Frequency (fixed)
    let omega1 = 2 * Math.PI * frequency1;
    let k1 = 2 * Math.PI / wavelength1;
    let phi1 = 0;               // Initial phase
    let t1 = 0;                 // Time snapshot (fixed)
    let N1 = 6;                 // Number of sources
    let radius1 = 5.0;          // Polygon radius
    let resolution1 = 200;      // Grid resolution
    let colormap1 = 'viridis';  // Default colormap
    
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
    
    function initSimulation1() {
      // Initialize DOM references if not already
      if (!canvas1) {
        canvas1 = document.getElementById('interferenceCanvas1');
        ctx1 = canvas1.getContext('2d');
        
        polygonSelect = document.getElementById('polygonVertices');
        amplitudeInput1 = document.getElementById('amplitude1');
        wavelengthInput1 = document.getElementById('wavelength1');
        radiusInput1 = document.getElementById('radius1');
        resolutionSelect = document.getElementById('resolution1');
        colormapSelect = document.getElementById('colormap1');
        calculateBtn1 = document.getElementById('calculateBtn1');
        
        amplitudeValue1 = document.getElementById('amplitudeValue1');
        wavelengthValue1 = document.getElementById('wavelengthValue1');
        radiusValue1 = document.getElementById('radiusValue1');
        
        // Set up event listeners
        amplitudeInput1.addEventListener('input', function() {
          A1 = parseFloat(this.value);
          amplitudeValue1.textContent = A1.toFixed(1);
        });
        
        wavelengthInput1.addEventListener('input', function() {
          wavelength1 = parseFloat(this.value);
          k1 = 2 * Math.PI / wavelength1;
          wavelengthValue1.textContent = wavelength1.toFixed(1);
        });
        
        radiusInput1.addEventListener('input', function() {
          radius1 = parseFloat(this.value);
          radiusValue1.textContent = radius1.toFixed(1);
        });
        
        resolutionSelect.addEventListener('change', function() {
          resolution1 = parseInt(this.value);
        });
        
        polygonSelect.addEventListener('change', function() {
          N1 = parseInt(this.value);
        });
        
        colormapSelect.addEventListener('change', function() {
          colormap1 = this.value;
          updateColormapDisplay();
        });
        
        calculateBtn1.addEventListener('click', calculateInterferencePattern);
        
        // Fix canvas size
        canvas1.width = canvas1.clientWidth || 600;
        canvas1.height = canvas1.clientHeight || 600;
        
        // Initial colormap display
        updateColormapDisplay();
        
        // Initial calculation
        calculateInterferencePattern();
      }
    }
    
    // Update colormap display
    function updateColormapDisplay() {
      const colormapDiv = document.getElementById('colormapDisplay1');
      const colors = colormaps[colormap1];
      
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
    
    // Get color from colormap
    function getColor(value, min, max, map = colormap1) {
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
      if (!ctx1) return;
      
      // Update parameters from inputs
      A1 = parseFloat(amplitudeInput1.value);
      wavelength1 = parseFloat(wavelengthInput1.value);
      k1 = 2 * Math.PI / wavelength1;
      N1 = parseInt(polygonSelect.value);
      radius1 = parseFloat(radiusInput1.value);
      resolution1 = parseInt(resolutionSelect.value);
      colormap1 = colormapSelect.value;
      
      // Clear canvas
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      
      // Generate source positions
      const sourcePoints = generatePolygonPoints(N1, radius1);
      
      // Create a pixel-by-pixel image
      const imageData = ctx1.createImageData(canvas1.width, canvas1.height);
      const data = imageData.data;
      
      // Create scaling factors to map between canvas and simulation coordinates
      const scale = 20; // Adjust this to zoom in/out
      const offsetX = canvas1.width / 2;
      const offsetY = canvas1.height / 2;
      
      // Store the wave values to find min/max for normalization
      let waveValues = [];
      let minVal = Infinity;
      let maxVal = -Infinity;
      
      // Calculate wave values first to find min/max
      for (let y = 0; y < canvas1.height; y++) {
        for (let x = 0; x < canvas1.width; x++) {
          // Convert canvas coordinates to simulation coordinates
          const simX = (x - offsetX) / scale;
          const simY = (y - offsetY) / scale;
          
          // Calculate total amplitude from all sources
          let etaTotal = 0;
          for (const [x0, y0] of sourcePoints) {
            const r = Math.sqrt((simX - x0) ** 2 + (simY - y0) ** 2) + 1e-6; // Avoid division by zero
            const sourceContribution = (A1 / Math.sqrt(r)) * Math.cos(k1 * r - omega1 * t1 + phi1);
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
      for (let y = 0; y < canvas1.height; y++) {
        for (let x = 0; x < canvas1.width; x++) {
          const pixelIndex = (y * canvas1.width + x) * 4;
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
      ctx1.putImageData(imageData, 0, 0);
      
      // Draw the source points
      for (const [x0, y0] of sourcePoints) {
        const canvasX = x0 * scale + offsetX;
        const canvasY = y0 * scale + offsetY;
        
        ctx1.beginPath();
        ctx1.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        ctx1.fillStyle = 'red';
        ctx1.fill();
        ctx1.strokeStyle = 'white';
        ctx1.lineWidth = 1;
        ctx1.stroke();
      }
    }
    
    //===============================================================
    //            SIMULATION 2: REGULAR WAVE PATTERN
    //===============================================================
    
    // DOM elements for simulation 2
    let canvas2, ctx2;
    let sourceCountSelect, amplitudeInput2, wavelengthInput2, radiusInput2;
    let updateBtn2, ampValue2, waveValue2, radiusValue2;
    
    // Simulation parameters for simulation 2
    let A2 = 1.0;                  // Amplitude
    let wavelength2 = 2.0;         // Wavelength
    let frequency2 = 1.0;          // Frequency (Hz)
    let k2 = 2 * Math.PI / wavelength2;
    let omega2 = 2 * Math.PI * frequency2;
    let phi2 = 0;                  // Phase
    let t2 = 0;                    // Time snapshot
    let numSources2 = 4;           // Number of sources (square)
    let sourceRadius2 = 3;         // Radius for source arrangement
    
    function initSimulation2() {
      // Initialize DOM references if not already
      if (!canvas2) {
        canvas2 = document.getElementById('interferenceCanvas2');
        ctx2 = canvas2.getContext('2d');
        
        sourceCountSelect = document.getElementById('sources2');
        amplitudeInput2 = document.getElementById('amplitude2');
        wavelengthInput2 = document.getElementById('wavelength2');
        radiusInput2 = document.getElementById('radius2');
        updateBtn2 = document.getElementById('updateBtn2');
        
        ampValue2 = document.getElementById('ampValue2');
        waveValue2 = document.getElementById('waveValue2');
        radiusValue2 = document.getElementById('radiusValue2');
        
        // Set canvas dimensions
        setupCanvas();
        window.addEventListener('resize', setupCanvas);
        
        // Set up event listeners
        amplitudeInput2.addEventListener('input', function() {
          A2 = parseFloat(this.value);
          ampValue2.textContent = A2.toFixed(1);
        });
        
        wavelengthInput2.addEventListener('input', function() {
          wavelength2 = parseFloat(this.value);
          k2 = 2 * Math.PI / wavelength2;
          waveValue2.textContent = wavelength2.toFixed(1);
        });
        
        radiusInput2.addEventListener('input', function() {
          sourceRadius2 = parseFloat(this.value);
          radiusValue2.textContent = sourceRadius2.toFixed(1);
        });
        
        sourceCountSelect.addEventListener('change', function() {
          numSources2 = parseInt(this.value);
        });
        
        updateBtn2.addEventListener('click', runSimulation2);
        
        // Initial simulation
        runSimulation2();
      }
    }
    
    // Set proper canvas sizes
    function setupCanvas() {
      if (canvas2) {
        canvas2.width = canvas2.clientWidth || 600;
        canvas2.height = canvas2.clientHeight || 600;
      }
    }
    
    // Generate regular polygon points for simulation 2
    function regularPolygon(n, radius) {
      const points = [];
      for (let i = 0; i < n; i++) {
        const x = radius * Math.cos(2 * Math.PI * i / n);
        const y = radius * Math.sin(2 * Math.PI * i / n);
        points.push([x, y]);
      }
      return points;
    }
    
    // Map a value from one range to another
    function mapToColor(value, min, max) {
      // Normalize to 0-1
      const normalized = (value - min) / (max - min);
      
      // Map to RGB (blue - white - red)
      let r, g, b;
      
      if (normalized < 0.5) {
        // Blue to white (0 to 0.5)
        const t = normalized * 2;
        r = 255 * t;
        g = 255 * t;
        b = 255;
      } else {
        // White to red (0.5 to 1)
        const t = (normalized - 0.5) * 2;
        r = 255;
        g = 255 * (1 - t);
        b = 255 * (1 - t);
      }
      
      return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }
    
    // Run simulation 2
    function runSimulation2() {
      if (!ctx2) return;
      
      // Update parameters
      A2 = parseFloat(amplitudeInput2.value);
      wavelength2 = parseFloat(wavelengthInput2.value);
      k2 = 2 * Math.PI / wavelength2;
      numSources2 = parseInt(sourceCountSelect.value);
      sourceRadius2 = parseFloat(radiusInput2.value);
      
      // Get canvas dimensions
      const width = canvas2.width;
      const height = canvas2.height;
      
      // Create image data
      const imageData = ctx2.createImageData(width, height);
      const data = imageData.data;
      
      // Generate source positions
      const sources = regularPolygon(numSources2, sourceRadius2);
      
      // Scale factors for mapping canvas to computational grid
      const scale = 20; // This determines the "zoom" level
      const offsetX = width / 2;
      const offsetY = height / 2;
      
      // Calculate wave values
      let minVal = Infinity;
      let maxVal = -Infinity;
      const waveValues = new Array(width * height);
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Convert canvas coordinates to physical coordinates
          const physX = (x - offsetX) / scale;
          const physY = (y - offsetY) / scale;
          
          // Calculate total wave amplitude from all sources
          let eta = 0;
          for (const [x0, y0] of sources) {
            const R = Math.sqrt((physX - x0) ** 2 + (physY - y0) ** 2);
            // Avoid division by zero
            const amplitude = R < 0.01 ? A2 : A2 / Math.sqrt(R + 0.01);
            eta += amplitude * Math.cos(k2 * R - omega2 * t2 + phi2);
          }
          
          // Store value and track min/max
          const index = y * width + x;
          waveValues[index] = eta;
          minVal = Math.min(minVal, eta);
          maxVal = Math.max(maxVal, eta);
        }
      }
      
      // Render image
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = y * width + x;
          const eta = waveValues[index];
          const color = mapToColor(eta, minVal, maxVal);
          
          // Parse RGB values from the color string
          const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          
          // Set pixel data (4 bytes per pixel: R, G, B, A)
          const pixelIndex = (y * width + x) * 4;
          data[pixelIndex] = r;
          data[pixelIndex + 1] = g;
          data[pixelIndex + 2] = b;
          data[pixelIndex + 3] = 255;  // Alpha (opaque)
        }
      }
      
      // Draw the image data to the canvas
      ctx2.putImageData(imageData, 0, 0);
      
      // Draw source positions
      drawSources(sources, scale, offsetX, offsetY);
    }
    
    // Draw the source positions on the canvas for simulation 2
    function drawSources(sources, scale, offsetX, offsetY) {
      ctx2.fillStyle = '#4c6ef5';
      ctx2.strokeStyle = 'white';
      
      for (const [x0, y0] of sources) {
        const canvasX = x0 * scale + offsetX;
        const canvasY = y0 * scale + offsetY;
        
        ctx2.beginPath();
        ctx2.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
        ctx2.fill();
        ctx2.stroke();
      }
    }
    
    // Initialize the first tab
    window.addEventListener('load', function() {
      initSimulation1();
    });
  </script>
</body>
</html>
