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
    }
    
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      background-color: #f8f9fa;
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
      background-color: #364fc7;
    }
    
    #phase-space, #time-series {
      width: 100%;
      height: 300px;
      margin-bottom: 20px;
      background-color: white;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
    }
    
    #poincare {
      width: 100%;
      height: 300px;
      background-color: white;
      border: 1px solid #e1e4e8;
      border-radius: 4px;
    }
    
    .chart-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
      margin-top: 20px;
      width: 100%;
    }
    
    .charts-row {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 20px;
    }
    
    .chart-box {
      flex: 1;
      min-width: 300px;
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
      
      <button id="simulate-btn">Run Simulation</button>
    </div>
    
    <div class="simulation-container">
      <h2>Pendulum Visualization</h2>
      <div class="simulation-view">
        <canvas id="pendulum-canvas"></canvas>
      </div>
      
      <div class="equation">
        <strong>Equation of Motion:</strong><br>
        d²θ/dt² + γ·dθ/dt + ω₀²·sin(θ) = A·cos(ω·t)
      </div>
      
      <p>This simulation demonstrates the behavior of a forced damped pendulum. Adjust the parameters to observe how the pendulum responds under different conditions, from periodic motion to chaotic behavior.</p>
    </div>
  </div>
  
  <div class="chart-container">
    <h2>Pendulum Dynamics Analysis</h2>
    
    <div class="charts-row">
      <div class="chart-box">
        <h3>Angular Displacement vs Time</h3>
        <div id="time-series"></div>
        <p>Shows how the pendulum angle changes over time, revealing periodic or chaotic patterns.</p>
      </div>
      
      <div class="chart-box">
        <h3>Phase Space</h3>
        <div id="phase-space"></div>
        <p>Plots angular velocity against angle, showing the system's overall dynamic behavior.</p>
      </div>
    </div>
    
    <div class="chart-container">
      <h3>Poincaré Section</h3>
      <div id="poincare"></div>
      <p>Samples the phase space at regular intervals synchronized with the driving force, revealing long-term behavior patterns and potential chaos.</p>
    </div>
  </div>
  
  <div class="footnote">
    <p>© 2025 Physics Simulation Project | Created with HTML, CSS, and JavaScript</p>
  </div>

  <script>
    // Pendulum physics parameters
    let gamma = 0.5;       // damping coefficient
    let A = 1.2;           // driving amplitude
    let omega = 0.67;      // driving frequency
    let omega0 = 1.0;      // natural frequency
    let theta0 = 0.2;      // initial angle
    let thetaDot0 = 0.0;   // initial angular velocity
    
    // Simulation variables
    let t = 0;
    let theta = theta0;
    let thetaDot = thetaDot0;
    let dt = 0.05;
    let simulationData = [];
    let poincareData = [];
    const maxDataPoints = 2000;
    
    // Get DOM elements
    const pendulumCanvas = document.getElementById('pendulum-canvas');
    const simulateBtn = document.getElementById('simulate-btn');
    const timeSeriesCanvas = document.getElementById('time-series');
    const phaseSpaceCanvas = document.getElementById('phase-space');
    const poincareCanvas = document.getElementById('poincare');
    
    // Setup context for drawing
    const pendulumCtx = pendulumCanvas.getContext('2d');
    const timeSeriesCtx = timeSeriesCanvas.getContext('2d');
    const phaseSpaceCtx = phaseSpaceCanvas.getContext('2d');
    const poincareCtx = poincareCanvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      // Pendulum canvas
      pendulumCanvas.width = pendulumCanvas.clientWidth * devicePixelRatio;
      pendulumCanvas.height = pendulumCanvas.clientHeight * devicePixelRatio;
      pendulumCtx.scale(devicePixelRatio, devicePixelRatio);
      
      // Time series canvas
      timeSeriesCanvas.width = timeSeriesCanvas.clientWidth * devicePixelRatio;
      timeSeriesCanvas.height = timeSeriesCanvas.clientHeight * devicePixelRatio;
      timeSeriesCtx.scale(devicePixelRatio, devicePixelRatio);
      
      // Phase space canvas
      phaseSpaceCanvas.width = phaseSpaceCanvas.clientWidth * devicePixelRatio;
      phaseSpaceCanvas.height = phaseSpaceCanvas.clientHeight * devicePixelRatio;
      phaseSpaceCtx.scale(devicePixelRatio, devicePixelRatio);
      
      // Poincare canvas
      poincareCanvas.width = poincareCanvas.clientWidth * devicePixelRatio;
      poincareCanvas.height = poincareCanvas.clientHeight * devicePixelRatio;
      poincareCtx.scale(devicePixelRatio, devicePixelRatio);
    }
    
    // Initialize canvases
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Update slider value displays
    function updateSliderDisplay(id, value) {
      document.getElementById(`${id}-value`).textContent = value.toFixed(2);
    }
    
    // Set up slider events
    document.getElementById('gamma').addEventListener('input', function() {
      gamma = parseFloat(this.value);
      updateSliderDisplay('gamma', gamma);
    });
    
    document.getElementById('amplitude').addEventListener('input', function() {
      A = parseFloat(this.value);
      updateSliderDisplay('amplitude', A);
    });
    
    document.getElementById('omega').addEventListener('input', function() {
      omega = parseFloat(this.value);
      updateSliderDisplay('omega', omega);
    });
    
    document.getElementById('omega0').addEventListener('input', function() {
      omega0 = parseFloat(this.value);
      updateSliderDisplay('omega0', omega0);
    });
    
    document.getElementById('theta0').addEventListener('input', function() {
      theta0 = parseFloat(this.value);
      updateSliderDisplay('theta0', theta0);
    });
    
    document.getElementById('thetaDot0').addEventListener('input', function() {
      thetaDot0 = parseFloat(this.value);
      updateSliderDisplay('thetaDot0', thetaDot0);
    });
    
    // Pendulum ODE function
    function pendulumODE(t, y) {
      const [theta, thetaDot] = y;
      
      // d²θ/dt² = -γ·dθ/dt - ω₀²·sin(θ) + A·cos(ωt)
      const thetaDotDot = -gamma * thetaDot - omega0 * omega0 * Math.sin(theta) + A * Math.cos(omega * t);
      
      return [thetaDot, thetaDotDot];
    }
    
    // RK4 step function
    function rk4Step(t, y, dt) {
      const k1 = pendulumODE(t, y);
      
      const y2 = [
        y[0] + k1[0] * dt / 2,
        y[1] + k1[1] * dt / 2
      ];
      const k2 = pendulumODE(t + dt / 2, y2);
      
      const y3 = [
        y[0] + k2[0] * dt / 2,
        y[1] + k2[1] * dt / 2
      ];
      const k3 = pendulumODE(t + dt / 2, y3);
      
      const y4 = [
        y[0] + k3[0] * dt,
        y[1] + k3[1] * dt
      ];
      const k4 = pendulumODE(t + dt, y4);
      
      return [
        y[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
        y[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
      ];
    }
    
    // Run simulation
    function runSimulation() {
      // Reset simulation
      t = 0;
      theta = theta0;
      thetaDot = thetaDot0;
      simulationData = [];
      poincareData = [];
      
      // The driving period
      const T = 2 * Math.PI / omega;
      let nextPoincareTime = T;
      
      // Add initial point
      simulationData.push({ t, theta, thetaDot });
      
      // Run simulation for a fixed number of steps
      for (let i = 0; i < maxDataPoints; i++) {
        // Calculate next state using RK4
        [theta, thetaDot] = rk4Step(t, [theta, thetaDot], dt);
        
        // Update time
        t += dt;
        
        // Normalize theta to [-π, π]
        theta = ((theta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
        
        // Add point to trajectory
        simulationData.push({ t, theta, thetaDot });
        
        // Check if we should add a point to the Poincaré section
        if (t >= nextPoincareTime) {
          poincareData.push({ t, theta, thetaDot });
          nextPoincareTime += T;
        }
      }
      
      // Draw all visualizations
      drawPendulum();
      drawTimeSeries();
      drawPhaseSpace();
      drawPoincare();
    }
    
    // Draw pendulum animation
    function drawPendulum() {
      if (simulationData.length === 0) return;
      
      const width = pendulumCanvas.width / window.devicePixelRatio;
      const height = pendulumCanvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 3;
      const length = height / 2;
      
      pendulumCtx.clearRect(0, 0, width, height);
      
      // Draw pivot
      pendulumCtx.beginPath();
      pendulumCtx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      pendulumCtx.fillStyle = '#333';
      pendulumCtx.fill();
      
      // Get current state (last data point)
      const { theta } = simulationData[simulationData.length - 1];
      
      // Calculate pendulum position
      const bobX = centerX + length * Math.sin(theta);
      const bobY = centerY + length * Math.cos(theta);
      
      // Draw rod
      pendulumCtx.beginPath();
      pendulumCtx.moveTo(centerX, centerY);
      pendulumCtx.lineTo(bobX, bobY);
      pendulumCtx.strokeStyle = '#555';
      pendulumCtx.lineWidth = 2;
      pendulumCtx.stroke();
      
      // Draw bob
      pendulumCtx.beginPath();
      pendulumCtx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      pendulumCtx.fillStyle = '#4c6ef5';
      pendulumCtx.fill();
      
      // Draw trace
      pendulumCtx.beginPath();
      
      // Only show the last 100 points for the trace
      const startIdx = Math.max(0, simulationData.length - 100);
      for (let i = startIdx; i < simulationData.length; i++) {
        const { theta } = simulationData[i];
        const x = centerX + length * Math.sin(theta);
        const y = centerY + length * Math.cos(theta);
        
        if (i === startIdx) {
          pendulumCtx.moveTo(x, y);
        } else {
          pendulumCtx.lineTo(x, y);
        }
      }
      
      pendulumCtx.strokeStyle = 'rgba(76, 110, 245, 0.3)';
      pendulumCtx.lineWidth = 2;
      pendulumCtx.stroke();
      
      // Continue animation
      requestAnimationFrame(drawPendulum);
    }
    
    // Draw time series chart
    function drawTimeSeries() {
      if (simulationData.length === 0) return;
      
      const width = timeSeriesCanvas.width / window.devicePixelRatio;
      const height = timeSeriesCanvas.height / window.devicePixelRatio;
      const padding = 30;
      
      timeSeriesCtx.clearRect(0, 0, width, height);
      
      // Draw axes
      timeSeriesCtx.beginPath();
      timeSeriesCtx.moveTo(padding, height - padding);
      timeSeriesCtx.lineTo(width - padding, height - padding);
      timeSeriesCtx.moveTo(padding, padding);
      timeSeriesCtx.lineTo(padding, height - padding);
      timeSeriesCtx.strokeStyle = '#aaa';
      timeSeriesCtx.lineWidth = 1;
      timeSeriesCtx.stroke();
      
      // Label axes
      timeSeriesCtx.fillStyle = '#555';
      timeSeriesCtx.textAlign = 'center';
      timeSeriesCtx.fillText('Time (s)', width / 2, height - 10);
      
      timeSeriesCtx.save();
      timeSeriesCtx.translate(15, height / 2);
      timeSeriesCtx.rotate(-Math.PI / 2);
      timeSeriesCtx.fillText('Angle (rad)', 0, 0);
      timeSeriesCtx.restore();
      
      // Draw time series
      timeSeriesCtx.beginPath();
      
      // Sample data to avoid too many points
      const stride = Math.max(1, Math.floor(simulationData.length / 300));
      let maxTime = simulationData[simulationData.length - 1].t;
      
      for (let i = 0; i < simulationData.length; i += stride) {
        const { t, theta } = simulationData[i];
        const x = padding + (width - 2 * padding) * (t / maxTime);
        const y = (height - 2 * padding) / 2 - theta * (height - 2 * padding) / 6 + padding;
        
        if (i === 0) {
          timeSeriesCtx.moveTo(x, y);
        } else {
          timeSeriesCtx.lineTo(x, y);
        }
      }
      
      timeSeriesCtx.strokeStyle = '#4c6ef5';
      timeSeriesCtx.lineWidth = 2;
      timeSeriesCtx.stroke();
    }
    
    // Draw phase space chart
    function drawPhaseSpace() {
      if (simulationData.length === 0) return;
      
      const width = phaseSpaceCanvas.width / window.devicePixelRatio;
      const height = phaseSpaceCanvas.height / window.devicePixelRatio;
      const padding = 30;
      
      phaseSpaceCtx.clearRect(0, 0, width, height);
      
      // Draw axes
      phaseSpaceCtx.beginPath();
      phaseSpaceCtx.moveTo(padding, height / 2);
      phaseSpaceCtx.lineTo(width - padding, height / 2);
      phaseSpaceCtx.moveTo(width / 2, padding);
      phaseSpaceCtx.lineTo(width / 2, height - padding);
      phaseSpaceCtx.strokeStyle = '#aaa';
      phaseSpaceCtx.lineWidth = 1;
      phaseSpaceCtx.stroke();
      
      // Label axes
      phaseSpaceCtx.fillStyle = '#555';
      phaseSpaceCtx.textAlign = 'center';
      phaseSpaceCtx.fillText('Angle (rad)', width / 2, height - 10);
      
      phaseSpaceCtx.save();
      phaseSpaceCtx.translate(15, height / 2);
      phaseSpaceCtx.rotate(-Math.PI / 2);
      phaseSpaceCtx.fillText('Angular Velocity (rad/s)', 0, 0);
      phaseSpaceCtx.restore();
      
      // Draw phase space
      phaseSpaceCtx.beginPath();
      
      // Sample data to avoid too many points
      const stride = Math.max(1, Math.floor(simulationData.length / 300));
      
      for (let i = 0; i < simulationData.length; i += stride) {
        const { theta, thetaDot } = simulationData[i];
        const x = width / 2 + theta * (width - 2 * padding) / 6;
        const y = height / 2 - thetaDot * (height - 2 * padding) / 6;
        
        if (i === 0) {
          phaseSpaceCtx.moveTo(x, y);
        } else {
          phaseSpaceCtx.lineTo(x, y);
        }
      }
      
      phaseSpaceCtx.strokeStyle = '#f06595';
      phaseSpaceCtx.lineWidth = 1.5;
      phaseSpaceCtx.stroke();
    }
    
    // Draw Poincare section
    function drawPoincare() {
      if (poincareData.length === 0) return;
      
      const width = poincareCanvas.width / window.devicePixelRatio;
      const height = poincareCanvas.height / window.devicePixelRatio;
      const padding = 30;
      
      poincareCtx.clearRect(0, 0, width, height);
      
      // Draw axes
      poincareCtx.beginPath();
      poincareCtx.moveTo(padding, height / 2);
      poincareCtx.lineTo(width - padding, height / 2);
      poincareCtx.moveTo(width / 2, padding);
      poincareCtx.lineTo(width / 2, height - padding);
      poincareCtx.strokeStyle = '#aaa';
      poincareCtx.lineWidth = 1;
      poincareCtx.stroke();
      
      // Label axes
      poincareCtx.fillStyle = '#555';
      poincareCtx.textAlign = 'center';
      poincareCtx.fillText('Angle (rad)', width / 2, height - 10);
      
      poincareCtx.save();
      poincareCtx.translate(15, height / 2);
      poincareCtx.rotate(-Math.PI / 2);
      poincareCtx.fillText('Angular Velocity (rad/s)', 0, 0);
      poincareCtx.restore();
      
      // Draw Poincare points
      for (let i = 0; i < poincareData.length; i++) {
        const { theta, thetaDot } = poincareData[i];
        const x = width / 2 + theta * (width - 2 * padding) / 6;
        const y = height / 2 - thetaDot * (height - 2 * padding) / 6;
        
        poincareCtx.beginPath();
        poincareCtx.arc(x, y, 2, 0, Math.PI * 2);
        poincareCtx.fillStyle = '#7950f2';
        poincareCtx.fill();
      }
    }
    
    // Set up simulation button
    simulateBtn.addEventListener('click', runSimulation);
    
    // Initialize the simulation on load
    window.addEventListener('load', runSimulation);
  </script>
</body>
</html>