# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Physics Simulations</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f5f7fa;
      color: #333;
      margin: 0;
      padding: 20px;
      max-width: 1200px;
      margin: auto;
    }
    
    h1, h2, h3 {
      text-align: center;
      color: #2c3e50;
      margin-top: 1.5em;
    }
    
    .container {
      background: #fff;
      padding: 25px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      margin: 25px 0;
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
      transition: background-color 0.3s;
    }
    
    .tab.active {
      background-color: #fff;
      font-weight: bold;
      border-bottom: 1px solid #fff;
      margin-bottom: -1px;
    }
    
    .tab:hover {
      background-color: #e9ecef;
    }
    
    .tab-content {
      display: none;
    }
    
    .tab-content.active {
      display: block;
    }
    
    .theory-section {
      padding: 15px;
      background-color: #f8f9fa;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .equation {
      background-color: #f0f4f8;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      margin: 15px 0;
      font-family: 'Cambria Math', Georgia, serif;
      font-size: 18px;
    }
    
    .chart-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto 20px auto;
      height: 400px;
    }
    
    #simulationArea, #waveArea {
      width: 100%;
      background-color: #000;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      margin-bottom: 20px;
    }
    
    #spaceCanvas, #interferenceCanvas {
      display: block;
      background-color: #000;
      width: 100%;
      height: 500px;
    }
    
    .control-panel {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }
    
    .control-group {
      margin-bottom: 10px;
      min-width: 200px;
    }
    
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }
    
    select, input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fff;
      font-size: 14px;
    }
    
    .value-display {
      float: right;
      font-weight: normal;
      color: #666;
    }
    
    .button-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      justify-content: center;
    }
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #4c6ef5;
      color: white;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    button:hover {
      background-color: #364fc7;
    }
    
    button.start {
      background-color: #40c057;
    }
    
    button.start:hover {
      background-color: #2f9e44;
    }
    
    button.stop {
      background-color: #fa5252;
    }
    
    button.stop:hover {
      background-color: #e03131;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 25px 0;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: center;
    }
    
    th {
      background-color: #f0f4f8;
      font-weight: bold;
    }
    
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    
    .data-display {
      margin-top: 15px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #4c6ef5;
    }
    
    .footnote {
      font-size: 0.9em;
      color: #666;
      text-align: center;
      margin-top: 30px;
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
  </style>
</head>
<body>
  <h1>Fizik Simülasyonları</h1>
  
  <div class="container">
    <div class="tabs">
      <div class="tab active" onclick="switchTab('cosmic')">Kozmik Hızlar</div>
      <div class="tab" onclick="switchTab('wave')">Dalga Girişim Deseni</div>
    </div>
    
    <!-- KOZMIK HIZLAR SİMÜLASYONU -->
    <div id="cosmic-tab" class="tab-content active">
      <h2>Escape & Cosmic Velocities Simulation</h2>
      
      <div class="theory-section">
        <h3>Theoretical Foundation</h3>
        
        <p>The concept of escape velocity is crucial for understanding the conditions required to leave a celestial body's gravitational influence. Three important velocity thresholds define different space travel capabilities:</p>
        
        <div class="equation">
          <strong>1st Cosmic Velocity (Orbital):</strong><br>
          v₁ = √(GM/R)
        </div>
        
        <div class="equation">
          <strong>2nd Cosmic Velocity (Escape):</strong><br>
          v₂ = √2 · v₁ = √(2GM/R)
        </div>
        
        <div class="equation">
          <strong>3rd Cosmic Velocity (Solar Escape):</strong><br>
          v₃ = v₂ + v<sub>orbital</sub>
        </div>
        
        <p>Where:</p>
        <ul>
          <li>G = 6.67430 × 10⁻¹¹ m³kg⁻¹s⁻²</li>
          <li>M is the mass of the celestial body</li>
          <li>R is the radius of the celestial body</li>
          <li>v<sub>orbital</sub> is the orbital velocity of the planet around the Sun</li>
        </ul>
      </div>
      
      <div class="chart-container">
        <canvas id="velocityChart"></canvas>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Celestial Body</th>
            <th>1st Cosmic (km/s)</th>
            <th>2nd Cosmic (km/s)</th>
            <th>3rd Cosmic (km/s)</th>
          </tr>
        </thead>
        <tbody id="velocityTable"></tbody>
      </table>
      
      <h3>Interactive Space Travel Simulation</h3>
      
      <div id="simulationArea">
        <canvas id="spaceCanvas"></canvas>
      </div>
      
      <div class="control-panel">
        <div class="control-group">
          <label for="bodySelect">Select Celestial Body:</label>
          <select id="bodySelect">
            <option value="earth">Earth</option>
            <option value="mars">Mars</option>
            <option value="jupiter">Jupiter</option>
            <option value="moon">Moon</option>
            <option value="venus">Venus</option>
            <option value="saturn">Saturn</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="velocityType">Launch Velocity:</label>
          <select id="velocityType">
            <option value="custom">Custom Velocity</option>
            <option value="first">1st Cosmic (Orbital)</option>
            <option value="second">2nd Cosmic (Escape)</option>
            <option value="third">3rd Cosmic (Solar System Escape)</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="customVelocity">Velocity (km/s):</label>
          <input type="number" id="customVelocity" min="0.1" max="100" step="0.1" value="8.0">
        </div>
        
        <div class="control-group">
          <label for="launchAngle">Launch Angle (degrees):</label>
          <input type="number" id="launchAngle" min="0" max="90" step="1" value="45">
        </div>
      </div>
      
      <div class="button-group">
        <button id="startButton" class="start">Start Simulation</button>
        <button id="resetButton" class="stop">Reset</button>
      </div>
      
      <div class="data-display" id="flightData">
        <p>Select a celestial body and launch parameters to start the simulation.</p>
      </div>
      
      <div class="chart-container">
        <canvas id="massVelocityChart"></canvas>
      </div>
    </div>
    
    <!-- DALGA GİRİŞİM DESENİ SİMÜLASYONU -->
    <div id="wave-tab" class="tab-content">
      <h2>Interference Pattern from Polygon Wave Sources</h2>
      
      <div class="theory-section">
        <h3>Wave Physics Simulation</h3>
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
      
      <div class="control-panel">
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
      
      <div id="waveArea">
        <canvas id="interferenceCanvas" width="600" height="600"></canvas>
      </div>
      
      <div style="display: flex; justify-content: center; margin-top: 10px;">
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
  </div>
  
  <div class="footnote">
    <p>© 2025 Interactive Physics Simulations | Created for GitHub Pages</p>
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
      
      // Initialize the newly displayed tab content
      if (tabName === 'cosmic') {
        initCosmicVelocities();
      } else if (tabName === 'wave') {
        initWaveInterference();
      }
    }
    
    //===============================================================
    //               COSMIC VELOCITIES SIMULATION
    //===============================================================
    
    // Constants
    const G = 6.67430e-11;  // Gravitational constant
    const solarVelocity = 42.1;  // Earth's orbital velocity around Sun (km/s)
    
    // Celestial bodies data
    const bodies = [
      { name: "Earth", mass: 5.972e24, radius: 6371000, color: "#1e88e5" },
      { name: "Mars", mass: 6.417e23, radius: 3389500, color: "#d32f2f" },
      { name: "Jupiter", mass: 1.898e27, radius: 69911000, color: "#f9a825" },
      { name: "Moon", mass: 7.342e22, radius: 1737000, color: "#9e9e9e" },
      { name: "Venus", mass: 4.867e24, radius: 6052000, color: "#ff9800" },
      { name: "Saturn", mass: 5.683e26, radius: 58232000, color: "#ffeb3b" }
    ];
    
    // Variables for cosmic velocities simulation
    let selectedBody = bodies[0];  // Default: Earth
    let animationId = null;
    let isSimulating = false;
    let spacecraft = { x: 0, y: 0, vx: 0, vy: 0 };
    let trajectory = [];
    
    // DOM elements for cosmic velocities
    let bodySelect, velocityType, customVelocity, launchAngle, startButton, resetButton, flightData;
    let spaceCanvas, ctx3;
    
    function initCosmicVelocities() {
      // Initialize DOM references if not already
      if (!bodySelect) {
        bodySelect = document.getElementById("bodySelect");
        velocityType = document.getElementById("velocityType");
        customVelocity = document.getElementById("customVelocity");
        launchAngle = document.getElementById("launchAngle");
        startButton = document.getElementById("startButton");
        resetButton = document.getElementById("resetButton");
        flightData = document.getElementById("flightData");
        spaceCanvas = document.getElementById("spaceCanvas");
        ctx3 = spaceCanvas.getContext("2d");
        
        // Event listeners
        bodySelect.addEventListener("change", updateSelectedBody);
        velocityType.addEventListener("change", updateVelocityOptions);
        startButton.addEventListener("click", startSimulation);
        resetButton.addEventListener("click", resetSimulation);
        
        // Set canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Calculate cosmic velocities and create charts
        calculateVelocities();
        // Initial scene draw
        drawScene();
      }
    }
    
    function resizeCanvas() {
      if (spaceCanvas) {
        spaceCanvas.width = spaceCanvas.clientWidth;
        spaceCanvas.height = spaceCanvas.clientHeight;
      }
    }
    
    // Calculate cosmic velocities for all bodies
    function calculateVelocities() {
      // Calculate velocities
      const velocities = bodies.map(body => {
        const v1 = Math.sqrt(G * body.mass / body.radius) / 1000;  // km/s
        const v2 = Math.sqrt(2) * v1;  // km/s
        const v3 = v2 + solarVelocity;  // km/s
        return { name: body.name, v1, v2, v3, color: body.color };
      });
      
      // Populate data table
      const tableBody = document.getElementById("velocityTable");
      tableBody.innerHTML = '';  // Clear table first
      velocities.forEach(vel => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${vel.name}</td>
          <td>${vel.v1.toFixed(2)}</td>
          <td>${vel.v2.toFixed(2)}</td>
          <td>${vel.v3.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
      });
      
      // Create velocity comparison chart
      const ctx = document.getElementById("velocityChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: velocities.map(v => v.name),
          datasets: [
            { 
              label: "1st Cosmic (Orbital)", 
              data: velocities.map(v => v.v1), 
              backgroundColor: "#4c6ef5"
            },
            { 
              label: "2nd Cosmic (Escape)", 
              data: velocities.map(v => v.v2), 
              backgroundColor: "#40c057"
            },
            { 
              label: "3rd Cosmic (Solar Escape)", 
              data: velocities.map(v => v.v3), 
              backgroundColor: "#fa5252"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            title: { 
              display: true, 
              text: "Cosmic Velocities by Celestial Body",
              font: { size: 16 }
            }
          },
          scales: {
            y: {
              title: { 
                display: true, 
                text: "Velocity (km/s)",
                font: { size: 14 }
              }
            }
          }
        }
      });
      
      // Create mass vs velocity chart
      const ctx2 = document.getElementById("massVelocityChart").getContext("2d");
      new Chart(ctx2, {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "1st Cosmic Velocity",
              data: bodies.map(body => ({
                x: body.mass,
                y: Math.sqrt(G * body.mass / body.radius) / 1000
              })),
              backgroundColor: "#4c6ef5",
              borderColor: "#4c6ef5",
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: "2nd Cosmic Velocity",
              data: bodies.map(body => ({
                x: body.mass,
                y: Math.sqrt(2 * G * body.mass / body.radius) / 1000
              })),
              backgroundColor: "#40c057",
              borderColor: "#40c057",
              pointRadius: 6,
              pointHoverRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Mass vs Cosmic Velocities Relationship",
              font: { size: 16 }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const index = context.dataIndex;
                  const body = bodies[index];
                  return `${body.name}: ${context.parsed.y.toFixed(2)} km/s`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Body Mass (kg)",
                font: { size: 14 }
              },
              type: 'logarithmic',
              ticks: {
                callback: function(value) {
                  return `10^${Math.log10(value).toFixed(0)}`;
                }
              }
            },
            y: {
              title: {
                display: true,
                text: "Velocity (km/s)",
                font: { size: 14 }
              }
            }
          }
        }
      });
    }
    
    // Update selected body
    function updateSelectedBody() {
      const selectedName = bodySelect.value;
      selectedBody = bodies.find(body => body.name.toLowerCase() === selectedName);
      updateVelocityOptions();
    }
    
    // Update velocity options based on selected body
    function updateVelocityOptions() {
      const selectedVelType = velocityType.value;
      const bodyIndex = bodies.findIndex(body => body.name === selectedBody.name);
      
      // Calculate velocities
      const v1 = Math.sqrt(G * selectedBody.mass / selectedBody.radius) / 1000;
      const v2 = Math.sqrt(2) * v1;
      const v3 = v2 + solarVelocity;
      
      if (selectedVelType === "first") {
        customVelocity.value = v1.toFixed(2);
        customVelocity.disabled = true;
      } else if (selectedVelType === "second") {
        customVelocity.value = v2.toFixed(2);
        customVelocity.disabled = true;
      } else if (selectedVelType === "third") {
        customVelocity.value = v3.toFixed(2);
        customVelocity.disabled = true;
      } else {
        customVelocity.disabled = false;
      }
    }
    
    // Start simulation
    function startSimulation() {
      if (isSimulating) return;
      
      // Get parameters
      const velocity = parseFloat(customVelocity.value);
      const angle = parseFloat(launchAngle.value);
      
      // Convert angle to radians
      const angleRad = angle * Math.PI / 180;
      
      // Set initial spacecraft position and velocity
      spacecraft = {
        x: spaceCanvas.width / 2,
        y: spaceCanvas.height / 2,
        vx: velocity * Math.cos(angleRad) * 0.5,
        vy: -velocity * Math.sin(angleRad) * 0.5  // Negative because canvas y is inverted
      };
      
      // Clear previous trajectory
      trajectory = [];
      trajectory.push({ x: spacecraft.x, y: spacecraft.y });
      
      // Start simulation loop
      isSimulating = true;
      if (animationId) cancelAnimationFrame(animationId);
      simulationLoop();
      
      // Update flight data display
      updateFlightData();
    }
    
    // Reset simulation
    function resetSimulation() {
      if (animationId) cancelAnimationFrame(animationId);
      isSimulating = false;
      trajectory = [];
      drawScene();
      flightData.innerHTML = `<p>Select a celestial body and launch parameters to start the simulation.</p>`;
    }
    
    // Update flight data display
    function updateFlightData() {
      // Calculate velocities
      const v1 = Math.sqrt(G * selectedBody.mass / selectedBody.radius) / 1000;
      const v2 = Math.sqrt(2) * v1;
      const velocity = parseFloat(customVelocity.value);
      const angle = parseFloat(launchAngle.value);
      
      let flightResult;
      if (velocity < v1) {
        flightResult = "Insufficient velocity for orbit. Object will fall back to the surface.";
      } else if (velocity < v2) {
        flightResult = "Sufficient velocity for orbit. Object will enter an elliptical orbit.";
      } else {
        flightResult = "Escape velocity achieved. Object will escape the gravitational pull.";
      }
      
      flightData.innerHTML = `
        <strong>Flight Parameters for ${selectedBody.name}:</strong><br>
        Launch velocity: ${velocity.toFixed(2)} km/s<br>
        Launch angle: ${angle}°<br>
        Required orbital velocity: ${v1.toFixed(2)} km/s<br>
        Required escape velocity: ${v2.toFixed(2)} km/s<br><br>
        <strong>Result:</strong> ${flightResult}
      `;
    }
    
    // Main simulation loop
    function simulationLoop() {
      // Update spacecraft position
      updateSpacecraft();
      
      // Draw scene
      drawScene();
      
      // Check termination conditions
      const distanceFromCenter = Math.sqrt(
        Math.pow(spacecraft.x - spaceCanvas.width/2, 2) + 
        Math.pow(spacecraft.y - spaceCanvas.height/2, 2)
      );
      
      const bodyRadius = 25; // Visual radius for the planet
      
      if (distanceFromCenter < bodyRadius) {
        // Crashed
        isSimulating = false;
        flightData.innerHTML += `<br><strong>Simulation ended:</strong> Spacecraft crashed into ${selectedBody.name}.`;
      } else if (distanceFromCenter > Math.max(spaceCanvas.width, spaceCanvas.height)) {
        // Left visible area
        isSimulating = false;
        flightData.innerHTML += `<br><strong>Simulation ended:</strong> Spacecraft left visible area.`;
      }
      
      // Continue simulation if still active
      if (isSimulating) {
        animationId = requestAnimationFrame(simulationLoop);
      }
    }
    
    // Update spacecraft position and velocity
    function updateSpacecraft() {
      // Scaling factor to make simulation visually interesting
      const scaleFactor = 0.01;
      
      // Calculate direction to body center
      const dx = spaceCanvas.width/2 - spacecraft.x;
      const dy = spaceCanvas.height/2 - spacecraft.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      if (distance > 0) {
        // Calculate gravitational force
        const forceMagnitude = G * selectedBody.mass / (distance * distance) * scaleFactor;
        
        // Apply acceleration due to gravity
        spacecraft.vx += forceMagnitude * dx / distance;
        spacecraft.vy += forceMagnitude * dy / distance;
      }
      
      // Update position
      spacecraft.x += spacecraft.vx;
      spacecraft.y += spacecraft.vy;
      
      // Add to trajectory
      trajectory.push({ x: spacecraft.x, y: spacecraft.y });
      
      // Limit trajectory length for performance
      if (trajectory.length > 500) {
        trajectory.shift();
      }
    }
    
    // Draw the scene
    function drawScene() {
      if (!ctx3) return;
      
      // Clear canvas
      ctx3.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
      
      // Draw stars in background
      drawStars();
      
      // Draw celestial body
      ctx3.beginPath();
      ctx3.arc(spaceCanvas.width/2, spaceCanvas.height/2, 25, 0, Math.PI * 2);
      ctx3.fillStyle = selectedBody.color;
      ctx3.fill();
      
      // Draw body name
      ctx3.fillStyle = "#fff";
      ctx3.font = "14px Arial";
      ctx3.textAlign = "center";
      ctx3.fillText(selectedBody.name, spaceCanvas.width/2, spaceCanvas.height/2 - 35);
      
      // Draw orbit indicator
      ctx3.beginPath();
      ctx3.arc(spaceCanvas.width/2, spaceCanvas.height/2, 100, 0, Math.PI * 2);
      ctx3.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx3.stroke();
      
      // Draw escape indicator
      ctx3.beginPath();
      ctx3.arc(spaceCanvas.width/2, spaceCanvas.height/2, 150, 0, Math.PI * 2);
      ctx3.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx3.stroke();
      
      // Draw trajectory
      if (trajectory.length > 1) {
        ctx3.beginPath();
        ctx3.moveTo(trajectory[0].x, trajectory[0].y);
        for (let i = 1; i < trajectory.length; i++) {
          ctx3.lineTo(trajectory[i].x, trajectory[i].y);
        }
        ctx3.strokeStyle = "#fff";
        ctx3.lineWidth = 1.5;
        ctx3.stroke();
      }
      
      // Draw spacecraft
      if (isSimulating) {
        ctx3.beginPath();
        ctx3.arc(spacecraft.x, spacecraft.y, 4, 0, Math.PI * 2);
        ctx3.fillStyle = "#fff";
        ctx3.fill();
      }
    }
    
    // Draw stars in background
    function drawStars() {
      if (!ctx3) return;
      
      const numStars = 150;
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * spaceCanvas.width;
        const y = Math.random() * spaceCanvas.height;
        const radius = Math.random() * 1.5;
        const brightness = Math.random() * 0.5 + 0.5;
        
        ctx3.beginPath();
        ctx3.arc(x, y, radius, 0, Math.PI * 2);
        ctx3.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx3.fill();
      }
    }
    
    //===============================================================
    //               WAVE INTERFERENCE PATTERN SIMULATION
    //===============================================================
    
    // Variables for wave simulation
    let canvas, ctx;
    let polygonSelect, amplitudeInput, wavelengthInput, radiusInput;
    let resolutionSelect, colormapSelect, calculateBtn;
    let amplitudeValue, wavelengthValue, radiusValue;
    
    // Wave parameters
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
    
    function initWaveInterference() {
      // Initialize DOM references if not already
      if (!canvas) {
        canvas = document.getElementById('interferenceCanvas');
        ctx = canvas.getContext('2d');
        
        polygonSelect = document.getElementById('polygonVertices');
        amplitudeInput = document.getElementById('amplitude');
        wavelengthInput = document.getElementById('wavelength');
        radiusInput = document.getElementById('radius');
        resolutionSelect = document.getElementById('resolution');
        colormapSelect = document.getElementById('colormap');
        calculateBtn = document.getElementById('calculateBtn');
        
        amplitudeValue = document.getElementById('amplitudeValue');
        wavelengthValue = document.getElementById('wavelengthValue');
        radiusValue = document.getElementById('radiusValue');
        
        // Set up event listeners
        amplitudeInput.addEventListener('input', function() {
          A = parseFloat(this.value);
          amplitudeValue.textContent = A.toFixed(1);
        });
        
        wavelengthInput.addEventListener('input', function() {
          wavelength = parseFloat(this.value);
          k = 2 * Math.PI / wavelength;
          wavelengthValue.textContent = wavelength.toFixed(1);
        });
        
        radiusInput.addEventListener('input', function() {
          radius = parseFloat(this.value);
          radiusValue.textContent = radius.toFixed(1);
        });
        
        resolutionSelect.addEventListener('change', function() {
          resolution = parseInt(this.value);
        });
        
        polygonSelect.addEventListener('change', function() {
          N = parseInt(this.value);
        });
        
        colormapSelect.addEventListener('change', function() {
          colormap = this.value;
          updateColormapDisplay();
        });
        
        calculateBtn.addEventListener('click', calculateInterferencePattern);
        
        // Fix canvas size
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        
        // Initial colormap display
        updateColormapDisplay();
        
        // Initial calculation
        calculateInterferencePattern();
      }
    }
    
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
      if (!ctx) return;
      
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
    
    // Initialize the first tab
    window.addEventListener('load', function() {
      initCosmicVelocities();
    });
  </script>
</body>
</html>
