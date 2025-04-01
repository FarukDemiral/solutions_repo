# Problem 2

## Projectile Motion Analysis

### 1. Theoretical Foundation

Projectile motion is a form of motion experienced by an object that is launched into the air and influenced only by gravity.

We split the motion into two components:

- **Horizontal motion:** constant velocity  
  $$ x(t) = v_0 \cos(\theta) \cdot t $$

- **Vertical motion:** uniformly accelerated motion  
  $$ y(t) = v_0 \sin(\theta) \cdot t - \frac{1}{2} g t^2 $$

---

### 2. Simulation Example

Initial conditions:

- Initial velocity: $$ v_0 = 20\, \text{m/s} $$
- Angle: $$ \theta = 45^\circ $$
- Gravity: $$ g = 9.81\, \text{m/s}^2 $$

#### Trajectory Table

| Time (s) | X (m) | Y (m) |
|----------|-------|-------|
| 0.0      | 0.00  | 0.00  |
| 0.5      | 7.07  | 6.02  |
| 1.0      | 14.14 | 9.82  |
| 1.5      | 21.21 | 11.39 |
| 2.0      | 28.28 | 10.73 |
| 2.5      | 35.35 | 7.85  |
| 3.0      | 42.42 | 2.74  |

---

### 3. Optional: Interactive Simulation

To interact with the simulation, [click here to open the live demo](Problem_2/sim/index.html).

<iframe src="Problem_2/sim/index.html" width="100%" height="600px" style="border: 1px solid #ccc;"></iframe>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forced Damped Pendulum Simulator</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f7f9;
      color: #333;
      line-height: 1.6;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1, h2, h3 {
      color: #2c3e50;
      margin-top: 1.5em;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 1em;
      padding-bottom: 0.5em;
      border-bottom: 1px solid #eaeaea;
    }
    
    .container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
      margin-bottom: 2em;
    }
    
    .simulation-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      flex: 1;
      min-width: 300px;
      max-width: 600px;
    }
    
    .controls-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      flex: 1;
      min-width: 300px;
      max-width: 400px;
    }
    
    .simulation-view {
      position: relative;
      height: 300px;
      overflow: hidden;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
      margin-bottom: 1em;
      background-color: #f8f9fa;
    }
    
    #pendulum-canvas {
      width: 100%;
      height: 100%;
    }
    
    .control-group {
      margin-bottom: 15px;
    }
    
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 5px;
      color: #555;
    }
    
    .value-display {
      float: right;
      font-weight: 400;
      color: #666;
    }
    
    input[type="range"] {
      width: 100%;
      margin: 8px 0;
    }
    
    button {
      background-color: #4c6ef5;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      width: 100%;
      margin-top: 15px;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color:rgb(7, 148, 98);
    }
    
    .chart-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .chart-box {
      flex: 1;
      min-width: 300px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
    }
    
    .chart {
      width: 100%;
      height: 200px;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
      margin-bottom: 10px;
      background-color: #f8f9fa;
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
    
    .footnote {
      margin-top: 2em;
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Forced Damped Pendulum Simulation and Analysis</h1>
  
  <div class="container">
    <div class="controls-container">
      <h2>Simulation Parameters</h2>
      
      <div class="control-group">
        <label>Damping Coefficient (γ) <span id="gamma-value" class="value-display">0.50</span></label>
        <input type="range" id="gamma" min="0" max="2" step="0.01" value="0.5">
      </div>
      
      <div class="control-group">
        <label>Driving Amplitude (A) <span id="amplitude-value" class="value-display">1.20</span></label>
        <input type="range" id="amplitude" min="0" max="5" step="0.1" value="1.2">
      </div>
      
      <div class="control-group">
        <label>Driving Frequency (ω) <span id="omega-value" class="value-display">0.67</span></label>
        <input type="range" id="omega" min="0.1" max="3" step="0.01" value="0.67">
      </div>
      
      <div class="control-group">
        <label>Natural Frequency (ω₀) <span id="omega0-value" class="value-display">1.00</span></label>
        <input type="range" id="omega0" min="0.1" max="3" step="0.01" value="1.0">
      </div>
      
      <div class="control-group">
        <label>Initial Angle (θ₀) <span id="theta0-value" class="value-display">0.20</span></label>
        <input type="range" id="theta0" min="-3.14" max="3.14" step="0.01" value="0.2">
      </div>
      
      <div class="control-group">
        <label>Initial Angular Velocity (θ̇₀) <span id="thetaDot0-value" class="value-display">0.00</span></label>
        <input type="range" id="thetaDot0" min="-3" max="3" step="0.1" value="0">
      </div>
      
      <button id="run-btn">Run Simulation</button>
    </div>
    
    <div class="simulation-container">
      <h2>Pendulum Visualization</h2>
      <div class="simulation-view">
        <canvas id="pendulum-canvas"></canvas>
      </div>
      
      <div class="equation">
        d²θ/dt² + γ·dθ/dt + ω₀²·sin(θ) = A·cos(ω·t)
      </div>
      
      <p>This simulation demonstrates the behavior of a forced damped pendulum. Adjust the parameters to observe how the pendulum responds under different conditions, from periodic motion to chaotic behavior.</p>
    </div>
  </div>
  
  <div class="chart-row">
    <div class="chart-box">
      <h2>Angular Displacement vs Time</h2>
      <canvas id="time-chart" class="chart"></canvas>
      <p>Shows how the pendulum angle changes over time, revealing periodic or chaotic patterns.</p>
    </div>
    
    <div class="chart-box">
      <h2>Phase Space</h2>
      <canvas id="phase-chart" class="chart"></canvas>
      <p>Plots angular velocity against angle, showing the system's overall dynamic behavior.</p>
    </div>
  </div>
  
  <div class="chart-box" style="margin-bottom: 30px;">
    <h2>Poincaré Section</h2>
    <canvas id="poincare-chart" class="chart"></canvas>
    <p>Samples the phase space at regular intervals synchronized with the driving force, revealing long-term behavior patterns and potential chaos.</p>
  </div>
  
  <div class="footnote">
    <p>© 2025 Physics Simulation Project</p>
  </div>

  <script>
    // Get DOM elements
    const pendulumCanvas = document.getElementById('pendulum-canvas');
    const timeChart = document.getElementById('time-chart');
    const phaseChart = document.getElementById('phase-chart');
    const poincareChart = document.getElementById('poincare-chart');
    const runBtn = document.getElementById('run-btn');
    
    // Set up canvas contexts
    const pendulumCtx = pendulumCanvas.getContext('2d');
    const timeCtx = timeChart.getContext('2d');
    const phaseCtx = phaseChart.getContext('2d');
    const poincareCtx = poincareChart.getContext('2d');
    
    // Set proper canvas sizes
    function setupCanvases() {
      // Set pendulum canvas size
      pendulumCanvas.width = pendulumCanvas.offsetWidth;
      pendulumCanvas.height = pendulumCanvas.offsetHeight;
      
      // Set chart canvas sizes
      timeChart.width = timeChart.offsetWidth;
      timeChart.height = timeChart.offsetHeight;
      
      phaseChart.width = phaseChart.offsetWidth;
      phaseChart.height = phaseChart.offsetHeight;
      
      poincareChart.width = poincareChart.offsetWidth;
      poincareChart.height = poincareChart.offsetHeight;
    }
    
    // Call setupCanvases when the page loads and on window resize
    window.addEventListener('load', setupCanvases);
    window.addEventListener('resize', setupCanvases);
    
    // Simulation parameters
    let gamma = 0.5;       // damping coefficient
    let A = 1.2;         // driving amplitude
    let omega = 0.67;      // driving frequency
    let omega0 = 1.0;      // natural frequency
    let theta0 = 0.2;      // initial angle
    let thetaDot0 = 0.0;   // initial angular velocity
    
    // Connect sliders to values
    document.getElementById('gamma').addEventListener('input', function() {
      gamma = parseFloat(this.value);
      document.getElementById('gamma-value').textContent = gamma.toFixed(2);
    });
    
    document.getElementById('amplitude').addEventListener('input', function() {
      A = parseFloat(this.value);
      document.getElementById('amplitude-value').textContent = A.toFixed(2);
    });
    
    document.getElementById('omega').addEventListener('input', function() {
      omega = parseFloat(this.value);
      document.getElementById('omega-value').textContent = omega.toFixed(2);
    });
    
    document.getElementById('omega0').addEventListener('input', function() {
      omega0 = parseFloat(this.value);
      document.getElementById('omega0-value').textContent = omega0.toFixed(2);
    });
    
    document.getElementById('theta0').addEventListener('input', function() {
      theta0 = parseFloat(this.value);
      document.getElementById('theta0-value').textContent = theta0.toFixed(2);
    });
    
    document.getElementById('thetaDot0').addEventListener('input', function() {
      thetaDot0 = parseFloat(this.value);
      document.getElementById('thetaDot0-value').textContent = thetaDot0.toFixed(2);
    });
    
    // Simulation data
    let simData = [];
    let poincareData = [];
    let animationId = null;
    
    // ODE for pendulum
    function pendulumODE(t, theta, thetaDot) {
      // d²θ/dt² = -γ·dθ/dt - ω₀²·sin(θ) + A·cos(ωt)
      return -gamma * thetaDot - omega0 * omega0 * Math.sin(theta) + A * Math.cos(omega * t);
    }
    
    // RK4 method for solving ODEs
    function rungeKutta4(t, theta, thetaDot, dt) {
      const k1_v = thetaDot;
      const k1_a = pendulumODE(t, theta, thetaDot);
      
      const k2_v = thetaDot + k1_a * dt/2;
      const k2_a = pendulumODE(t + dt/2, theta + k1_v * dt/2, thetaDot + k1_a * dt/2);
      
      const k3_v = thetaDot + k2_a * dt/2;
      const k3_a = pendulumODE(t + dt/2, theta + k2_v * dt/2, thetaDot + k2_a * dt/2);
      
      const k4_v = thetaDot + k3_a * dt;
      const k4_a = pendulumODE(t + dt, theta + k3_v * dt, thetaDot + k3_a * dt);
      
      const new_theta = theta + (dt/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v);
      const new_thetaDot = thetaDot + (dt/6) * (k1_a + 2*k2_a + 2*k3_a + k4_a);
      
      return [new_theta, new_thetaDot];
    }
    
    // Run simulation
    function runSimulation() {
      // Cancel any previous animation
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Reset data
      simData = [];
      poincareData = [];
      
      // Initial conditions
      let t = 0;
      let theta = theta0;
      let thetaDot = thetaDot0;
      const dt = 0.05;
      const simLength = 100; // seconds
      
      // Period of driving force
      const T = 2 * Math.PI / omega;
      let nextPoincareTime = T;
      
      // Generate simulation data
      while (t < simLength) {
        // Save current state
        simData.push({t, theta, thetaDot});
        
        // Check if we should record a Poincaré point
        if (t >= nextPoincareTime) {
          poincareData.push({t, theta, thetaDot});
          nextPoincareTime += T;
        }
        
        // Calculate next state
        [theta, thetaDot] = rungeKutta4(t, theta, thetaDot, dt);
        
        // Normalize theta to be between -π and π
        theta = ((theta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        
        // Increment time
        t += dt;
      }
      
      // Start visualization
      drawCharts();
      startPendulumAnimation();
    }
    
    // Draw the time series chart
    function drawTimeChart() {
      timeCtx.clearRect(0, 0, timeChart.width, timeChart.height);
      
      // Draw axes
      const padding = 30;
      const width = timeChart.width;
      const height = timeChart.height;
      
      timeCtx.strokeStyle = '#aaa';
      timeCtx.lineWidth = 1;
      
      // x-axis
      timeCtx.beginPath();
      timeCtx.moveTo(padding, height/2);
      timeCtx.lineTo(width - padding, height/2);
      timeCtx.stroke();
      
      // y-axis
      timeCtx.beginPath();
      timeCtx.moveTo(padding, padding);
      timeCtx.lineTo(padding, height - padding);
      timeCtx.stroke();
      
      // Skip points to avoid too many data points
      const skip = Math.max(1, Math.floor(simData.length / 200));
      const maxTime = simData[simData.length - 1].t;
      
      // Draw the time series
      timeCtx.beginPath();
      for (let i = 0; i < simData.length; i += skip) {
        const x = padding + (width - 2 * padding) * (simData[i].t / maxTime);
        const y = height/2 - simData[i].theta * 50;
        
        if (i === 0) {
          timeCtx.moveTo(x, y);
        } else {
          timeCtx.lineTo(x, y);
        }
      }
      
      timeCtx.strokeStyle = '#4c6ef5';
      timeCtx.lineWidth = 2;
      timeCtx.stroke();
    }
    
    // Draw the phase space chart
    function drawPhaseChart() {
      phaseCtx.clearRect(0, 0, phaseChart.width, phaseChart.height);
      
      // Draw axes
      const padding = 30;
      const width = phaseChart.width;
      const height = phaseChart.height;
      
      phaseCtx.strokeStyle = '#aaa';
      phaseCtx.lineWidth = 1;
      
      // x-axis
      phaseCtx.beginPath();
      phaseCtx.moveTo(padding, height/2);
      phaseCtx.lineTo(width - padding, height/2);
      phaseCtx.stroke();
      
      // y-axis
      phaseCtx.beginPath();
      phaseCtx.moveTo(width/2, padding);
      phaseCtx.lineTo(width/2, height - padding);
      phaseCtx.stroke();
      
      // Skip points to avoid too many data points
      const skip = Math.max(1, Math.floor(simData.length / 200));
      
      // Draw the phase space trajectory
      phaseCtx.beginPath();
      for (let i = 0; i < simData.length; i += skip) {
        const x = width/2 + simData[i].theta * 50;
        const y = height/2 - simData[i].thetaDot * 30;
        
        if (i === 0) {
          phaseCtx.moveTo(x, y);
        } else {
          phaseCtx.lineTo(x, y);
        }
      }
      
      phaseCtx.strokeStyle = '#e64980';
      phaseCtx.lineWidth = 2;
      phaseCtx.stroke();
    }
    
    // Draw the Poincaré section
    function drawPoincareChart() {
      poincareCtx.clearRect(0, 0, poincareChart.width, poincareChart.height);
      
      // Draw axes
      const padding = 30;
      const width = poincareChart.width;
      const height = poincareChart.height;
      
      poincareCtx.strokeStyle = '#aaa';
      poincareCtx.lineWidth = 1;
      
      // x-axis
      poincareCtx.beginPath();
      poincareCtx.moveTo(padding, height/2);
      poincareCtx.lineTo(width - padding, height/2);
      poincareCtx.stroke();
      
      // y-axis
      poincareCtx.beginPath();
      poincareCtx.moveTo(width/2, padding);
      poincareCtx.lineTo(width/2, height - padding);
      poincareCtx.stroke();
      
      // Draw Poincaré points
      for (const point of poincareData) {
        const x = width/2 + point.theta * 50;
        const y = height/2 - point.thetaDot * 30;
        
        poincareCtx.beginPath();
        poincareCtx.arc(x, y, 3, 0, 2*Math.PI);
        poincareCtx.fillStyle = '#7950f2';
        poincareCtx.fill();
      }
    }
    
    // Draw all charts
    function drawCharts() {
      drawTimeChart();
      drawPhaseChart();
      drawPoincareChart();
    }
    
    // Animate the pendulum
    function startPendulumAnimation() {
      let frameIndex = 0;
      const framesPerDataPoint = 2;
      
      function drawPendulum() {
        // Clear canvas
        pendulumCtx.clearRect(0, 0, pendulumCanvas.width, pendulumCanvas.height);
        
        // Get dimensions
        const width = pendulumCanvas.width;
        const height = pendulumCanvas.height;
        const centerX = width / 2;
        const centerY = height / 3;
        
        // Length of pendulum
        const pendulumLength = height / 2;
        
        // Get current state
        const dataIndex = Math.floor(frameIndex / framesPerDataPoint) % simData.length;
        const currentTheta = simData[dataIndex].theta;
        
        // Calculate pendulum position
        const bobX = centerX + pendulumLength * Math.sin(currentTheta);
        const bobY = centerY + pendulumLength * Math.cos(currentTheta);
        
        // Draw pivot
        pendulumCtx.beginPath();
        pendulumCtx.arc(centerX, centerY, 5, 0, 2*Math.PI);
        pendulumCtx.fillStyle = '#333';
        pendulumCtx.fill();
        
        // Draw rod
        pendulumCtx.beginPath();
        pendulumCtx.moveTo(centerX, centerY);
        pendulumCtx.lineTo(bobX, bobY);
        pendulumCtx.strokeStyle = '#555';
        pendulumCtx.lineWidth = 2;
        pendulumCtx.stroke();
        
        // Draw bob
        pendulumCtx.beginPath();
        pendulumCtx.arc(bobX, bobY, 15, 0, 2*Math.PI);
        pendulumCtx.fillStyle = '#4c6ef5';
        pendulumCtx.fill();
        
        // Increment frame counter
        frameIndex++;
        
        // Request next frame
        animationId = requestAnimationFrame(drawPendulum);
      }
      
      // Start animation
      drawPendulum();
    }
    
    // Run simulation button click handler
    runBtn.addEventListener('click', runSimulation);
    
    // Run the simulation when the page loads
    window.addEventListener('load', function() {
      setTimeout(runSimulation, 500);
    });
  </script>
</body>
</html>
 

### 4. Conclusion

Projectile motion can be analyzed easily using basic trigonometry and kinematic equations. This problem demonstrates the use of physics formulas to predict real-world behavior. 