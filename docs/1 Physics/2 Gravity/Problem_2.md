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

## 3. Simulation

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Escape & Cosmic Velocities Simulation</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f9fbfd;
      margin: 0;
      padding: 20px;
      max-width: 1000px;
      margin: auto;
      color: #333;
    }
    
    h1, h2, h3 {
      text-align: center;
      color: #2c3e50;
      margin-top: 1.5em;
    }
    
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-top: 20px;
      margin-bottom: 30px;
    }
    
    .simulation-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
    }
    
    #simulationCanvas {
      background-color: #000;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .control-group {
      display: flex;
      flex-direction: column;
      min-width: 200px;
    }
    
    .btn-group {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      justify-content: center;
    }
    
    button {
      background-color: #4c6ef5;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #364fc7;
    }
    
    button.red {
      background-color: #e03131;
    }
    
    button.red:hover {
      background-color: #c92a2a;
    }
    
    button.green {
      background-color: #40c057;
    }
    
    button.green:hover {
      background-color: #37b24d;
    }
    
    select, input {
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      margin-top: 5px;
      font-size: 1rem;
    }
    
    label {
      margin-bottom: 5px;
      font-weight: 600;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
    }
    
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }
    
    th {
      background: #f0f4f8;
    }
    
    .note {
      font-size: 0.9em;
      color: #555;
      text-align: center;
      margin-top: 40px;
    }
    
    .equation {
      background-color: #f0f4f8;
      padding: 15px;
      border-radius: 5px;
      text-align: center;
      margin: 20px 0;
      font-family: 'Cambria Math', Georgia, serif;
      font-size: 18px;
    }
    
    .trajectory-info {
      margin-top: 20px;
      padding: 10px;
      background-color: #f8f9fa;
      border-radius: 5px;
      border-left: 4px solid #4c6ef5;
    }
  </style>
</head>
<body>
  <h1>Escape & Cosmic Velocities Simulation</h1>
  
  <div class="container">
    <h2>Theoretical Foundation</h2>
    
    <p>The concept of escape velocity is crucial for understanding the conditions required to leave a celestial body's gravitational influence. Extending this concept, the first, second, and third cosmic velocities define the thresholds for orbiting, escaping, and leaving a star system.</p>
    
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
    </ul>
  </div>
  
  <div class="container">
    <h2>Velocity Comparison</h2>
    <canvas id="velocityChart"></canvas>
    <table>
      <thead>
        <tr>
          <th>Planet</th>
          <th>1st Cosmic (km/s)</th>
          <th>2nd Cosmic (km/s)</th>
          <th>3rd Cosmic (km/s)</th>
        </tr>
      </thead>
      <tbody id="velocityTable"></tbody>
    </table>
  </div>
  
  <div class="container">
    <h2>Interactive Trajectory Simulation</h2>
    
    <div class="simulation-container">
      <canvas id="simulationCanvas" width="800" height="500"></canvas>
      
      <div class="controls">
        <div class="control-group">
          <label for="planetSelect">Select Planet:</label>
          <select id="planetSelect">
            <option value="earth">Earth</option>
            <option value="mars">Mars</option>
            <option value="jupiter">Jupiter</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="velocityType">Velocity Type:</label>
          <select id="velocityType">
            <option value="custom">Custom Velocity</option>
            <option value="first">1st Cosmic (Orbital)</option>
            <option value="second">2nd Cosmic (Escape)</option>
            <option value="third">3rd Cosmic (Solar Escape)</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="velocityInput">Launch Velocity (km/s):</label>
          <input type="number" id="velocityInput" min="0" max="100" step="0.1" value="7.5">
        </div>
        
        <div class="control-group">
          <label for="angleInput">Launch Angle (degrees):</label>
          <input type="number" id="angleInput" min="0" max="90" step="1" value="45">
        </div>
      </div>
      
      <div class="btn-group">
        <button id="startBtn" class="green">Start Simulation</button>
        <button id="resetBtn" class="red">Reset</button>
      </div>
      
      <div class="trajectory-info" id="trajectoryInfo">
        Select a planet and launch parameters to start the simulation.
      </div>
    </div>
  </div>
  
  <div class="note">
    <p>© 2025 Physics Simulation Project | Cosmic Velocities</p>
  </div>

  <script>
    // Constants
    const G = 6.67430e-11;  // Gravitational constant (m³kg⁻¹s⁻²)
    const solarVelocity = 42.1;  // Solar orbital velocity (km/s)
    
    // Celestial bodies data
    const bodies = [
      { name: "Earth", mass: 5.972e24, radius: 6371000, color: "#1e88e5" },
      { name: "Mars", mass: 6.417e23, radius: 3389500, color: "#d32f2f" },
      { name: "Jupiter", mass: 1.898e27, radius: 69911000, color: "#f9a825" }
    ];
    
    // Calculate cosmic velocities for each body
    const velocities = bodies.map(body => {
      const v1 = Math.sqrt(G * body.mass / body.radius) / 1000;  // km/s
      const v2 = Math.sqrt(2) * v1;  // km/s
      const v3 = v2 + solarVelocity;  // km/s
      return { name: body.name, v1, v2, v3 };
    });
    
    // Populate velocity table
    const table = document.getElementById("velocityTable");
    velocities.forEach(vel => {
      const row = `<tr>
        <td>${vel.name}</td>
        <td>${vel.v1.toFixed(2)}</td>
        <td>${vel.v2.toFixed(2)}</td>
        <td>${vel.v3.toFixed(2)}</td>
      </tr>`;
      table.innerHTML += row;
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
            backgroundColor: "#4c6ef5",
            borderColor: "#364fc7",
            borderWidth: 1
          },
          { 
            label: "2nd Cosmic (Escape)", 
            data: velocities.map(v => v.v2), 
            backgroundColor: "#82c91e",
            borderColor: "#6eb318",
            borderWidth: 1
          },
          { 
            label: "3rd Cosmic (Solar Escape)", 
            data: velocities.map(v => v.v3), 
            backgroundColor: "#f59f00",
            borderColor: "#d18902",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { 
            display: true, 
            text: "Cosmic Velocities Comparison",
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
    
    // Trajectory Simulation
    const canvas = document.getElementById("simulationCanvas");
    const ctx2 = canvas.getContext("2d");
    const planetSelect = document.getElementById("planetSelect");
    const velocityTypeSelect = document.getElementById("velocityType");
    const velocityInput = document.getElementById("velocityInput");
    const angleInput = document.getElementById("angleInput");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");
    const trajectoryInfo = document.getElementById("trajectoryInfo");
    
    let animationId = null;
    let simRunning = false;
    let trajectory = [];
    
    // Simulation parameters
    let simPlanet = bodies[0];  // Default: Earth
    let simVelocity = 7.5;  // km/s
    let simAngle = 45;  // degrees
    let projectile = { x: 0, y: 0, vx: 0, vy: 0 };
    
    // Update velocity input when velocity type changes
    velocityTypeSelect.addEventListener("change", updateVelocityInput);
    planetSelect.addEventListener("change", updateVelocityInput);
    
    function updateVelocityInput() {
      const planetIndex = bodies.findIndex(b => b.name.toLowerCase() === planetSelect.value);
      const planet = bodies[planetIndex];
      const velType = velocityTypeSelect.value;
      
      if (velType === "first") {
        simVelocity = velocities[planetIndex].v1;
        velocityInput.value = simVelocity.toFixed(2);
      } else if (velType === "second") {
        simVelocity = velocities[planetIndex].v2;
        velocityInput.value = simVelocity.toFixed(2);
      } else if (velType === "third") {
        simVelocity = velocities[planetIndex].v3;
        velocityInput.value = simVelocity.toFixed(2);
      }
      
      // Disable/enable velocity input based on selection
      velocityInput.disabled = velType !== "custom";
    }
    
    // Start simulation
    startBtn.addEventListener("click", () => {
      if (simRunning) return;
      
      // Get selected planet
      const planetIndex = bodies.findIndex(b => b.name.toLowerCase() === planetSelect.value);
      simPlanet = bodies[planetIndex];
      
      // Get velocity
      simVelocity = parseFloat(velocityInput.value);
      simAngle = parseFloat(angleInput.value);
      
      // Convert to radians
      const angleRad = simAngle * Math.PI / 180;
      
      // Setup initial conditions (scaled for visualization)
      projectile = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: simVelocity * Math.cos(angleRad) * 5,
        vy: -simVelocity * Math.sin(angleRad) * 5  // Negative because canvas y is inverted
      };
      
      trajectory = [{ x: projectile.x, y: projectile.y }];
      simRunning = true;
      
      // Start animation loop
      if (animationId) cancelAnimationFrame(animationId);
      animate();
      
      // Update info
      const v1 = velocities[planetIndex].v1.toFixed(2);
      const v2 = velocities[planetIndex].v2.toFixed(2);
      trajectoryInfo.innerHTML = `
        <strong>Simulation for ${simPlanet.name}:</strong><br>
        Launch velocity: ${simVelocity.toFixed(2)} km/s (${(simVelocity/v1*100).toFixed(1)}% of orbital velocity)<br>
        Launch angle: ${simAngle}°<br>
        Orbital velocity (v₁): ${v1} km/s<br>
        Escape velocity (v₂): ${v2} km/s
      `;
    });
    
    // Reset simulation
    resetBtn.addEventListener("click", () => {
      if (animationId) cancelAnimationFrame(animationId);
      simRunning = false;
      trajectory = [];
      drawSimulation();
      trajectoryInfo.textContent = "Select a planet and launch parameters to start the simulation.";
    });
    
    // Animation loop
    function animate() {
      // Update projectile position
      updateProjectile();
      
      // Draw frame
      drawSimulation();
      
      // Check if projectile is out of bounds or has crashed
      const distanceFromCenter = Math.sqrt(
        Math.pow(projectile.x - canvas.width/2, 2) + 
        Math.pow(projectile.y - canvas.height/2, 2)
      );
      
      const planetRadius = 20;  // Visual radius of planet
      
      if (distanceFromCenter < planetRadius) {
        // Crashed into planet
        simRunning = false;
        trajectoryInfo.innerHTML += "<br><strong>Result:</strong> Crashed back to the surface!";
      } else if (distanceFromCenter > canvas.width) {
        // Escaped visualization bounds
        simRunning = false;
        
        // Determine escape status
        const v1 = velocities[bodies.findIndex(b => b.name === simPlanet.name)].v1;
        const v2 = velocities[bodies.findIndex(b => b.name === simPlanet.name)].v2;
        
        if (simVelocity >= v2) {
          trajectoryInfo.innerHTML += "<br><strong>Result:</strong> Escaped the planet's gravity!";
        } else if (simVelocity >= v1) {
          trajectoryInfo.innerHTML += "<br><strong>Result:</strong> Entered stable orbit around the planet.";
        } else {
          trajectoryInfo.innerHTML += "<br><strong>Result:</strong> Insufficient velocity to maintain orbit, would eventually fall back.";
        }
      }
      
      // Continue animation if simulation is still running
      if (simRunning) {
        animationId = requestAnimationFrame(animate);
      }
    }
    
    // Update projectile physics
    function updateProjectile() {
      // Scale factor for visualization
      const scaleFactor = 0.1;
      
      // Calculate direction to planet center
      const dx = canvas.width/2 - projectile.x;
      const dy = canvas.height/2 - projectile.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      // Skip if at center (to avoid division by zero)
      if (distance === 0) return;
      
      // Calculate gravitational force magnitude
      // Using F = G*m1*m2/r^2, but we simplify since projectile mass cancels out in a = F/m
      const forceMagnitude = G * simPlanet.mass / (distance * distance) * scaleFactor;
      
      // Apply acceleration in direction of planet
      projectile.vx += forceMagnitude * dx / distance;
      projectile.vy += forceMagnitude * dy / distance;
      
      // Update position
      projectile.x += projectile.vx * 0.1;
      projectile.y += projectile.vy * 0.1;
      
      // Add point to trajectory
      trajectory.push({ x: projectile.x, y: projectile.y });
      
      // Limit trajectory length for performance
      if (trajectory.length > 500) {
        trajectory.shift();
      }
    }
    
    // Draw simulation frame
    function drawSimulation() {
      // Clear canvas
      ctx2.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars (background)
      drawStars();
      
      // Draw planet
      ctx2.beginPath();
      ctx2.arc(canvas.width/2, canvas.height/2, 20, 0, Math.PI * 2);
      ctx2.fillStyle = simPlanet ? simPlanet.color : "#1e88e5";
      ctx2.fill();
      
      // Draw orbit circles
      drawOrbitCircles();
      
      // Draw trajectory
      if (trajectory.length > 1) {
        ctx2.beginPath();
        ctx2.moveTo(trajectory[0].x, trajectory[0].y);
        for (let i = 1; i < trajectory.length; i++) {
          ctx2.lineTo(trajectory[i].x, trajectory[i].y);
        }
        ctx2.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx2.lineWidth = 2;
        ctx2.stroke();
      }
      
      // Draw projectile
      if (simRunning) {
        ctx2.beginPath();
        ctx2.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
        ctx2.fillStyle = "#ffffff";
        ctx2.fill();
      }
    }
    
    // Draw stars background
    function drawStars() {
      // Draw some random stars in the background
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const brightness = Math.random() * 0.5 + 0.5;  // 0.5 to 1.0
        
        ctx2.beginPath();
        ctx2.arc(x, y, radius, 0, Math.PI * 2);
        ctx2.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx2.fill();
      }
    }
    
    // Draw orbit circles
    function drawOrbitCircles() {
      const planetIndex = bodies.findIndex(b => b.name === simPlanet.name);
      const v1 = velocities[planetIndex].v1;
      
      // Draw circular orbit approximation
      ctx2.beginPath();
      ctx2.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
      ctx2.strokeStyle = "rgba(76, 110, 245, 0.3)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
      
      // Draw escape boundary approximation
      ctx2.beginPath();
      ctx2.arc(canvas.width/2, canvas.height/2, 150, 0, Math.PI * 2);
      ctx2.strokeStyle = "rgba(130, 201, 30, 0.3)";
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }
    
    // Initialize simulation
    drawSimulation();
    
    // Handle window resize
    window.addEventListener("resize", () => {
      drawSimulation();
    });
  </script>
</body>
</html>

## 4. Results & Discussion

- Jupiter has the highest escape velocities due to its mass.
- Earth and Mars have significantly lower values.
- The third cosmic velocity is always highest because it includes escape from the solar system.

These values help us:
- Understand satellite orbits
- Plan interplanetary missions
- Estimate launch speeds and fuel requirements

---

## 5. Applications in Space Exploration

- **1st velocity:** Used by satellites orbiting planets (e.g., ISS around Earth)
- **2nd velocity:** Required for rockets to leave a planet's surface
- **3rd velocity:** Required for missions beyond the solar system (e.g., Voyager probes)

This problem demonstrates the interplay of gravity, motion, and engineering, offering insight into both theoretical physics and practical aerospace applications.
