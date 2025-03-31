# Problem 1 
# Projectile Motion Analysis

## 1. Theoretical Foundation

### Deriving Equations of Motion
Projectile motion follows Newton’s second law:

$$ F = ma $$

For a projectile launched with initial velocity \( v_0 \) at an angle \( \theta \), we decompose motion into horizontal and vertical components:

- Horizontal: $v_{0x} = v_0 \cos\theta$
- Vertical: $v_{0y} = v_0 \sin\theta$
  
Using kinematic equations:

$$ x(t) = v_{0x} t $$

$$ y(t) = v_{0y} t - \frac{1}{2} g t^2 $$

To find the time of flight:

$$ t_f = \frac{2 v_{0y}}{g} = \frac{2 v_0 \sin\theta}{g} $$

### Family of Solutions
Varying initial velocity and angle results in different trajectories, forming a family of solutions characterized by different maximum heights and ranges.

---

## 2. Analysis of the Range

The horizontal range \( R \) is given by:

$$ R = \frac{v_0^2 \sin 2\theta}{g} $$

### Factors Affecting Range
- Increasing $v_0$ increases $R$ quadratically.
- Maximum range occurs at  $theta = 45^\circ$.
- Increasing $g$ (e.g., on different planets) decreases $R$.

---

## 3. Practical Applications

- **Ballistics**: Optimizing projectile launch angles for artillery.
- **Sports**: Calculating optimal angles for throwing a ball.
- **Rocket Launches**: Adjusting for air resistance and varying gravity.

---

## 4. Implementation

### Simulation

<div class="container">
    <div class="controls">
        <h2>Simulation Parameters</h2>
        
        <div class="input-group">
            <label for="initial-velocity">Initial Velocity (m/s): <span class="value-display" id="velocity-value">20</span></label>
            <input type="range" id="initial-velocity" min="1" max="100" value="20" step="1">
        </div>
        
        <div class="input-group">
            <label for="launch-angle">Launch Angle (degrees): <span class="value-display" id="angle-value">45</span></label>
            <input type="range" id="launch-angle" min="0" max="90" value="45" step="1">
        </div>
        
        <div class="input-group">
            <label for="gravity">Gravity (m/s²): <span class="value-display" id="gravity-value">9.81</span></label>
            <input type="range" id="gravity" min="0.5" max="20" value="9.81" step="0.1">
        </div>
        
        <div class="input-group">
            <label for="initial-height">Initial Height (m): <span class="value-display" id="height-value">0</span></label>
            <input type="range" id="initial-height" min="0" max="50" value="0" step="1">
        </div>
        
        <div class="input-group">
            <label for="air-resistance">Air Resistance Coefficient: <span class="value-display" id="resistance-value">0</span></label>
            <input type="range" id="air-resistance" min="0" max="0.1" value="0" step="0.01">
        </div>
        
        <button id="simulate-btn">Run Simulation</button>
        
        <div class="metrics">
            <div class="metric">
                <div class="metric-value" id="range-value">0.00</div>
                <div class="metric-label">Range (m)</div>
            </div>
            <div class="metric">
                <div class="metric-value" id="max-height-value">0.00</div>
                <div class="metric-label">Max Height (m)</div>
            </div>
            <div class="metric">
                <div class="metric-value" id="time-value">0.00</div>
                <div class="metric-label">Flight Time (s)</div>
            </div>
        </div>
    </div>
    
    <div class="visualization">
        <h2>Trajectory Visualization</h2>
        <canvas id="trajectory-canvas"></canvas>
        
        <div class="range-chart">
            <h2>Range vs. Launch Angle Analysis</h2>
            <canvas id="range-angle-canvas"></canvas>
            <p id="optimal-angle-info">Without air resistance and starting at ground level, the optimal launch angle for maximum range is exactly 45°.</p>
        </div>
    </div>
</div>

<script>
    // Get DOM elements
    const initialVelocitySlider = document.getElementById('initial-velocity');
    const launchAngleSlider = document.getElementById('launch-angle');
    const gravitySlider = document.getElementById('gravity');
    const initialHeightSlider = document.getElementById('initial-height');
    const airResistanceSlider = document.getElementById('air-resistance');
    
    const velocityValue = document.getElementById('velocity-value');
    const angleValue = document.getElementById('angle-value');
    const gravityValue = document.getElementById('gravity-value');
    const heightValue = document.getElementById('height-value');
    const resistanceValue = document.getElementById('resistance-value');
    
    const rangeValue = document.getElementById('range-value');
    const maxHeightValue = document.getElementById('max-height-value');
    const timeValue = document.getElementById('time-value');
    
    const simulateBtn = document.getElementById('simulate-btn');
    const trajectoryCanvas = document.getElementById('trajectory-canvas');
    const rangeAngleCanvas = document.getElementById('range-angle-canvas');
    
    const optimalAngleInfo = document.getElementById('optimal-angle-info');
    
    // Canvas setup
    const trajCtx = trajectoryCanvas.getContext('2d');
    const rangeCtx = rangeAngleCanvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        trajectoryCanvas.width = trajectoryCanvas.clientWidth;
        trajectoryCanvas.height = trajectoryCanvas.clientHeight;
        
        rangeAngleCanvas.width = rangeAngleCanvas.clientWidth;
        rangeAngleCanvas.height = rangeAngleCanvas.clientHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Display slider values
    initialVelocitySlider.addEventListener('input', () => {
        velocityValue.textContent = initialVelocitySlider.value;
    });
    
    launchAngleSlider.addEventListener('input', () => {
        angleValue.textContent = launchAngleSlider.value;
    });
    
    gravitySlider.addEventListener('input', () => {
        gravityValue.textContent = parseFloat(gravitySlider.value).toFixed(2);
    });
    
    initialHeightSlider.addEventListener('input', () => {
        heightValue.textContent = initialHeightSlider.value;
    });
    
    airResistanceSlider.addEventListener('input', () => {
        resistanceValue.textContent = parseFloat(airResistanceSlider.value).toFixed(2);
    });
    
    // Simulation calculations
    function calculateTrajectory(v0, angle, gravity, height, airResistance) {
        // Convert angle to radians
        const angleRad = angle * Math.PI / 180;
        
        // Initial velocities
        const vx0 = v0 * Math.cos(angleRad);
        const vy0 = v0 * Math.sin(angleRad);
        
        let flightTime;
        let x = [];
        let y = [];
        
        // Calculate flight time (analytical solution without air resistance)
        if (airResistance === 0) {
            flightTime = (vy0 + Math.sqrt(vy0 * vy0 + 2 * gravity * height)) / gravity;
            
            // Handle very small angles with initial height
            if (angle < 0.1 && height > 0) {
                flightTime = (2 * vy0) / gravity + Math.sqrt(2 * height / gravity);
            }
            
            // Time steps for trajectory
            const timeSteps = 1000;
            const dt = flightTime / timeSteps;
            
            // Analytical calculation
            for (let i = 0; i <= timeSteps; i++) {
                const t = i * dt;
                x.push(vx0 * t);
                y.push(height + vy0 * t - 0.5 * gravity * t * t);
                
                // Stop if we hit the ground
                if (y[i] < 0) {
                    y[i] = 0;
                    x = x.slice(0, i + 1);
                    y = y.slice(0, i + 1);
                    break;
                }
            }
        } else {
            // Numerical calculation with air resistance
            const dt = 0.01;
            let t = 0;
            let yPos = height;
            let xPos = 0;
            let vx = vx0;
            let vy = vy0;
            
            while (yPos >= 0) {
                // Update velocities
                vx = vx - airResistance * vx * dt;
                vy = vy - gravity * dt - airResistance * vy * dt;
                
                // Update position
                xPos = xPos + vx * dt;
                yPos = yPos + vy * dt;
                
                x.push(xPos);
                y.push(yPos);
                
                t += dt;
                
                // Avoid infinite loops or extremely long calculations
                if (t > 100 || xPos > 10000) break;
            }
            
            flightTime = t;
            
            // Fix the last point
            if (y[y.length - 1] < 0) {
                y[y.length - 1] = 0;
            }
        }
        
        // Calculate range
        const horizontalRange = x[x.length - 1];
        
        // Calculate maximum height
        let maxHeight = height;
        for (let i = 0; i < y.length; i++) {
            if (y[i] > maxHeight) {
                maxHeight = y[i];
            }
        }
        
        return {
            x: x,
            y: y,
            range: horizontalRange,
            maxHeight: maxHeight,
            flightTime: flightTime
        };
    }
    
    // Generate range vs angle chart
    function generateRangeVsAngleChart(v0, gravity, height) {
        const angles = [];
        const ranges = [];
        
        // Calculate range for each angle
        for (let angle = 0; angle <= 90; angle += 1) {
            angles.push(angle);
            const traj = calculateTrajectory(v0, angle, gravity, height, 0);
            ranges.push(traj.range);
        }
        
        // Find maximum range
        let maxRange = 0;
        let maxAngle = 0;
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i] > maxRange) {
                maxRange = ranges[i];
                maxAngle = angles[i];
            }
        }
        
        return {
            angles: angles,
            ranges: ranges,
            maxRange: maxRange,
            maxAngle: maxAngle
        };
    }
    
    // Draw trajectory graph
    function drawTrajectory(data) {
        const canvas = trajectoryCanvas;
        const ctx = trajCtx;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Margins for coordinate system
        const marginX = 50;
        const marginY = 50;
        
        // Available area
        const plotWidth = canvas.width - 2 * marginX;
        const plotHeight = canvas.height - 2 * marginY;
        
        // X and Y scales
        const xMax = Math.max(...data.x) * 1.1;
        const yMax = Math.max(data.maxHeight * 1.2, 10);
        
        const xScale = plotWidth / xMax;
        const yScale = plotHeight / yMax;
        
        // Ground line
        ctx.beginPath();
        ctx.strokeStyle = '#999';
        ctx.moveTo(marginX, canvas.height - marginY);
        ctx.lineTo(marginX + plotWidth, canvas.height - marginY);
        ctx.stroke();
        
        // Y axis
        ctx.beginPath();
        ctx.strokeStyle = '#999';
        ctx.moveTo(marginX, canvas.height - marginY);
        ctx.lineTo(marginX, marginY);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Horizontal Distance (m)', canvas.width / 2, canvas.height - 10);
        
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Height (m)', 0, 0);
        ctx.restore();
        
        // X axis values
        for (let x = 0; x <= xMax; x += xMax / 5) {
            const xPos = marginX + x * xScale;
            
            ctx.beginPath();
            ctx.strokeStyle = '#ddd';
            ctx.moveTo(xPos, canvas.height - marginY);
            ctx.lineTo(xPos, marginY);
            ctx.stroke();
            
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText(Math.round(x).toString(), xPos, canvas.height - marginY + 15);
        }
        
        // Y axis values
        for (let y = 0; y <= yMax; y += yMax / 5) {
            const yPos = canvas.height - marginY - y * yScale;
            
            ctx.beginPath();
            ctx.strokeStyle = '#ddd';
            ctx.moveTo(marginX, yPos);
            ctx.lineTo(marginX + plotWidth, yPos);
            ctx.stroke();
            
            ctx.fillStyle = '#666';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(y).toString(), marginX - 5, yPos + 4);
        }
        
        // Draw trajectory
        ctx.beginPath();
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < data.x.length; i++) {
            const xPos = marginX + data.x[i] * xScale;
            const yPos = canvas.height - marginY - data.y[i] * yScale;
            
            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        
        ctx.stroke();
        
        // Starting point
        ctx.beginPath();
        ctx.fillStyle = '#e74c3c';
        ctx.arc(marginX, canvas.height - marginY - data.y[0] * yScale, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Highest point
        const maxHeightIndex = data.y.indexOf(data.maxHeight);
        const maxHeightX = data.x[maxHeightIndex];
        
        ctx.beginPath();
        ctx.fillStyle = '#27ae60';
        ctx.arc(
            marginX + maxHeightX * xScale, 
            canvas.height - marginY - data.maxHeight * yScale, 
            5, 0, 2 * Math.PI
        );
        ctx.fill();
        
        // Landing point
        ctx.beginPath();
        ctx.fillStyle = '#9b59b6';
        ctx.arc(
            marginX + data.x[data.x.length - 1] * xScale, 
            canvas.height - marginY - data.y[data.y.length - 1] * yScale, 
            5, 0, 2 * Math.PI
        );
        ctx.fill();
        
        // Labels
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        
        // Start label
        ctx.textAlign = 'left';
        ctx.fillText('Start', marginX + 10, canvas.height - marginY - data.y[0] * yScale - 10);
        
        // Peak label
        ctx.textAlign = 'center';
        ctx.fillText(
            `Peak: ${data.maxHeight.toFixed(2)}m`, 
            marginX + maxHeightX * xScale,
            canvas.height - marginY - data.maxHeight * yScale - 10
        );
        
        // Range label
        ctx.textAlign = 'right';
        ctx.fillText(
            `Range: ${data.range.toFixed(2)}m`, 
            marginX + data.x[data.x.length - 1] * xScale - 10,
            canvas.height - marginY - data.y[data.y.length - 1] * yScale - 10
        );
    }
    
    // Draw range vs angle chart
    function drawRangeVsAngleChart(data) {
        const canvas = rangeAngleCanvas;
        const ctx = rangeCtx;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Margins for coordinate system
        const marginX = 50;
        const marginY = 50;
        
        // Available area
        const plotWidth = canvas.width - 2 * marginX;
        const plotHeight = canvas.height - 2 * marginY;
        
        // X and Y scales
        const xScale = plotWidth / 90;
        const yScale = plotHeight / (data.maxRange * 1.1);
        
        // X axis
        ctx.beginPath();
        ctx.strokeStyle = '#999';
        ctx.moveTo(marginX, canvas.height - marginY);
        ctx.lineTo(marginX + plotWidth, canvas.height - marginY);
        ctx.stroke();
        
        // Y axis
        ctx.beginPath();
        ctx.strokeStyle = '#999';
        ctx.moveTo(marginX, canvas.height - marginY);
        ctx.lineTo(marginX, marginY);
        ctx.stroke();
        
        // Axis labels
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Launch Angle (degrees)', canvas.width / 2, canvas.height - 10);
        
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText('Range (m)', 0, 0);
        ctx.restore();
        
        // X axis values
        for (let x = 0; x <= 90; x += 15) {
            const xPos = marginX + x * xScale;
            
            ctx.beginPath();
            ctx.strokeStyle = '#ddd';
            ctx.moveTo(xPos, canvas.height - marginY);
            ctx.lineTo(xPos, marginY);
            ctx.stroke();
            
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.fillText(x.toString(), xPos, canvas.height - marginY + 15);
        }
        
        // Y axis values
        const yStep = data.maxRange / 5;
        for (let y = 0; y <= data.maxRange; y += yStep) {
            const yPos = canvas.height - marginY - y * yScale;
            
            ctx.beginPath();
            ctx.strokeStyle = '#ddd';
            ctx.moveTo(marginX, yPos);
            ctx.lineTo(marginX + plotWidth, yPos);
            ctx.stroke();
            
            ctx.fillStyle = '#666';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(y).toString(), marginX - 5, yPos + 4);
        }
        
        // Draw chart
        ctx.beginPath();
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < data.angles.length; i++) {
            const xPos = marginX + data.angles[i] * xScale;
            const yPos = canvas.height - marginY - data.ranges[i] * yScale;
            
            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        
        ctx.stroke();
        
        // Mark maximum point
        const maxXPos = marginX + data.maxAngle * xScale;
        const maxYPos = canvas.height - marginY - data.maxRange * yScale;
        
        ctx.beginPath();
        ctx.fillStyle = '#2980b9';
        ctx.arc(maxXPos, maxYPos, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Maximum label
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(
            `Max Range: ${data.maxRange.toFixed(2)}m at ${data.maxAngle.toFixed(1)}°`,
            maxXPos,
            maxYPos - 10
        );
    }
    
    // Run simulation
    function runSimulation() {
        // Get parameters
        const v0 = parseFloat(initialVelocitySlider.value);
        const angle = parseFloat(launchAngleSlider.value);
        const gravity = parseFloat(gravitySlider.value);
        const height = parseFloat(initialHeightSlider.value);
        const airResistance = parseFloat(airResistanceSlider.value);
        
        // Calculate trajectory
        const trajData = calculateTrajectory(v0, angle, gravity, height, airResistance);
        
        // Update metrics
        rangeValue.textContent = trajData.range.toFixed(2);
        maxHeightValue.textContent = trajData.maxHeight.toFixed(2);
        timeValue.textContent = trajData.flightTime.toFixed(2);
        
        // Draw trajectory graph
        drawTrajectory(trajData);
        
        // Calculate and draw range vs angle chart
        const rangeAngleData = generateRangeVsAngleChart(v0, gravity, height);
        drawRangeVsAngleChart(rangeAngleData);
        
        // Update optimal angle info
        if (height === 0 && airResistance === 0) {
            optimalAngleInfo.textContent = "Without air resistance and starting at ground level, the optimal launch angle for maximum range is exactly 45°.";
        } else if (height > 0 && airResistance === 0) {
            optimalAngleInfo.textContent = "With initial height, the optimal launch angle for maximum range is slightly less than 45°.";
        } else if (airResistance > 0) {
            optimalAngleInfo.textContent = "With air resistance, the optimal launch angle is typically less than 45° and depends on the projectile's properties.";
        }
    }
    
    // Simulate button click event
    simulateBtn.addEventListener('click', runSimulation);
    
    // Run initial simulation when page loads
    window.addEventListener('load', runSimulation);
</script>