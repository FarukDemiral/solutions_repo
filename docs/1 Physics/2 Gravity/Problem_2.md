# Problem 2 - Escape & Cosmic Velocities Simulation

## 1. Motivation

The concept of escape velocity is crucial for understanding the conditions required to leave a celestial body's gravitational influence. Extending this concept, the first, second, and third cosmic velocities define the thresholds for orbiting, escaping, and leaving a star system. These principles underpin modern space exploration, from launching satellites to interplanetary missions.

---

## 2. Theoretical Foundation

The gravitational potential energy and kinetic energy concepts are used to derive these velocities.

- **1st Cosmic Velocity (Orbital):**  
  The minimum speed needed to stay in circular orbit around a planet:  
  $$ v_1 = \sqrt{\frac{GM}{R}} $$

- **2nd Cosmic Velocity (Escape):**  
  The minimum speed needed to escape the planet's gravity:  
  $$ v_2 = \sqrt{2} \cdot v_1 = \sqrt{\frac{2GM}{R}} $$

- **3rd Cosmic Velocity (Solar Escape):**  
  The speed needed to escape the entire solar system, relative to the Sun:  
  $$ v_3 = v_2 + v_{\text{orbital}} $$

Where:  
- \(G = 6.67430 \times 10^{-11} \text{ m}^3 \text{kg}^{-1} \text{s}^{-2}\)  
- \(M\) is the mass of the celestial body  
- \(R\) is the radius of the celestial body

---

## 3. Step-by-Step Derivation

We start with energy conservation:
- Total mechanical energy at surface = 0 at escape point (infinity)

$$ \frac{1}{2}mv^2 - \frac{GMm}{R} = 0 $$

Solving for escape velocity:
$$ v = \sqrt{\frac{2GM}{R}} $$

This equation explains how **mass** and **radius** influence the energy needed to escape.

---

## 4. Additional Examples and Data Table (Expanded)

| Celestial Body | Mass (kg)         | Radius (m)   | v₁ (km/s) | v₂ (km/s) | v₃ (km/s)* |
|----------------|-------------------|--------------|-----------|-----------|------------|
| Earth          | 5.972×10²⁴        | 6.371×10⁶    | 7.91      | 11.19     | 53.29      |
| Mars           | 6.417×10²³        | 3.389×10⁶    | 3.55      | 5.03      | 47.13      |
| Jupiter        | 1.898×10²⁷        | 6.991×10⁷    | 42.57     | 60.20     | 102.30     |
| Moon           | 7.342×10²²        | 1.737×10⁶    | 1.68      | 2.38      | 44.48      |
| Venus          | 4.867×10²⁴        | 6.052×10⁶    | 7.33      | 10.36     | 52.46      |
| Saturn         | 5.683×10²⁶        | 5.823×10⁷    | 25.52     | 36.09     | 78.19      |

\* Estimated using Earth's orbital speed around Sun (42.1 km/s)

These examples emphasize how mass and radius determine the effort required to escape a celestial body's gravity.

---


## 6. Interactive Simulation Code

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escape & Cosmic Velocities Simulation</title>
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
    
    #simulationArea {
      width: 100%;
      background-color: #000;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
      margin-bottom: 20px;
    }
    
    #spaceCanvas {
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
    
    .note {
      font-size: 0.9em;
      color: #666;
      text-align: center;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <h1>Escape & Cosmic Velocities Simulation</h1>
  
  <div class="container">
    <div class="theory-section">
      <h2>Theoretical Foundation</h2>
      
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
  </div>
  
  <div class="container">
    <h2>Velocity Comparison</h2>
    
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
  </div>
  
  <div class="container">
    <h2>Interactive Space Travel Simulation</h2>
    
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
  </div>
  
  <div class="container">
    <h2>Mass vs Cosmic Velocities Relationship</h2>
    <div class="chart-container">
      <canvas id="massVelocityChart"></canvas>
    </div>
    <p>This graph demonstrates how a celestial body's mass affects its cosmic velocities (with radius held constant).</p>
  </div>
  
  <div class="note">
    <p>© 2025 Cosmic Velocities Simulation | Created for GitHub Pages</p>
  </div>

  <script>
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
    
    // Calculate cosmic velocities for each body
    const velocities = bodies.map(body => {
      const v1 = Math.sqrt(G * body.mass / body.radius) / 1000;  // km/s
      const v2 = Math.sqrt(2) * v1;  // km/s
      const v3 = v2 + solarVelocity;  // km/s
      return { name: body.name, v1, v2, v3, color: body.color };
    });
    
    // Populate data table
    const tableBody = document.getElementById("velocityTable");
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
    
    // Space Travel Simulation
    const spaceCanvas = document.getElementById("spaceCanvas");
    const ctx3 = spaceCanvas.getContext("2d");
    
    // Set canvas size
    function resizeCanvas() {
      spaceCanvas.width = spaceCanvas.clientWidth;
      spaceCanvas.height = spaceCanvas.clientHeight;
    }
    
    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Simulation variables
    let selectedBody = bodies[0];  // Default: Earth
    let animationId = null;
    let isSimulating = false;
    let spacecraft = { x: 0, y: 0, vx: 0, vy: 0 };
    let trajectory = [];
    
    // DOM elements
    const bodySelect = document.getElementById("bodySelect");
    const velocityType = document.getElementById("velocityType");
    const customVelocity = document.getElementById("customVelocity");
    const launchAngle = document.getElementById("launchAngle");
    const startButton = document.getElementById("startButton");
    const resetButton = document.getElementById("resetButton");
    const flightData = document.getElementById("flightData");
    
    // Event listeners
    bodySelect.addEventListener("change", updateSelectedBody);
    velocityType.addEventListener("change", updateVelocityOptions);
    startButton.addEventListener("click", startSimulation);
    resetButton.addEventListener("click", resetSimulation);
    
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
      
      if (selectedVelType === "first") {
        customVelocity.value = velocities[bodyIndex].v1.toFixed(2);
        customVelocity.disabled = true;
      } else if (selectedVelType === "second") {
        customVelocity.value = velocities[bodyIndex].v2.toFixed(2);
        customVelocity.disabled = true;
      } else if (selectedVelType === "third") {
        customVelocity.value = velocities[bodyIndex].v3.toFixed(2);
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
      const bodyIndex = bodies.findIndex(body => body.name === selectedBody.name);
      const v1 = velocities[bodyIndex].v1.toFixed(2);
      const v2 = velocities[bodyIndex].v2.toFixed(2);
      const velocity = parseFloat(customVelocity.value);
      const angle = parseFloat(launchAngle.value);
      
      let flightResult;
      if (velocity < parseFloat(v1)) {
        flightResult = "Insufficient velocity for orbit. Object will fall back to the surface.";
      } else if (velocity < parseFloat(v2)) {
        flightResult = "Sufficient velocity for orbit. Object will enter an elliptical orbit.";
      } else {
        flightResult = "Escape velocity achieved. Object will escape the gravitational pull.";
      }
      
      flightData.innerHTML = `
        <strong>Flight Parameters for ${selectedBody.name}:</strong><br>
        Launch velocity: ${velocity.toFixed(2)} km/s<br>
        Launch angle: ${angle}°<br>
        Required orbital velocity: ${v1} km/s<br>
        Required escape velocity: ${v2} km/s<br><br>
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
      // Clear canvas
      ctx3.clearRect(0, 0, spaceCanvas.width, spaceCanvas.height);
      
      // Draw stars in background
      drawStars();
      
      // Draw celestial body
      const bodyIndex = bodies.findIndex(body => body.name === selectedBody.name);
      ctx3.beginPath();
      ctx3.arc(spaceCanvas.width/2, spaceCanvas.height/2, 25, 0, Math.PI * 2);
      ctx3.fillStyle = velocities[bodyIndex].color;
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
    
    // Initial draw
    drawScene();
  </script>
</body>
</html>

## 9. Results & Discussion

- **Jupiter** has the highest escape velocities due to its massive size.
- **Earth and Mars** require less velocity.
- **The 3rd cosmic velocity** includes Sun escape speed, making it the highest.

These results are useful in:
- Planning satellite orbits
- Launching interplanetary missions
- Estimating required energy and fuel

---

## 10. Applications in Space Exploration

- **1st velocity:** Satellite orbits (e.g., Hubble, ISS)
- **2nd velocity:** Planetary escape (e.g., Apollo missions)
- **3rd velocity:** Deep space exploration (e.g., Voyager probes)

This simulation bridges physics with real aerospace design, showing how theoretical formulas apply to modern technology.

---

## 11. Conclusion

This enhanced visualization and expanded data illustrate how escape and orbital velocities vary across celestial bodies. It highlights the necessity for precise calculation and engineering in space science.

