# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorentz Force Simulation</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css"/>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            min-height: 100vh;
            box-sizing: border-box;
            overflow-x: hidden; /* Prevent horizontal scrollbar */
        }
        h1 {
            color: #333;
            margin-top: 20px;
        }
        #controls {
            background-color: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            width: calc(100% - 40px); /* Adjust width and padding to prevent overflow */
            max-width: 1000px; /* Maximum width for the controls section */
            box-sizing: border-box;
        }

        #controls > div {
            display: flex;
            flex-direction: column;
            margin-right: 0; /* Remove right margin */
            margin-bottom: 0;
            width: calc(50% - 10px); /* 2 columns with some gap */
            box-sizing: border-box;
            min-width: 200px; /* Ensure controls don't get too narrow */
        }
        #controls > div > label {
            margin-bottom: 8px;
            color: #555;
            font-weight: bold;
            display: block;
            text-align: left; /* Align labels to the left */
        }

        #controls > div > input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            transition: border-color 0.3s ease;
            width: calc(100% - 20px); /* Adjust input width */
            box-sizing: border-box;
        }

        #controls > div > input:focus {
            outline: none;
            border-color: #4CAF50;
            box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
        }


        #simulationCanvas {
            background-color: #e0e0e0;
            border: 1px solid #ccc;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            width: 95%; /* Make canvas responsive */
            max-width: 800px; /* Limit maximum width of canvas */
            height: auto; /* Maintain aspect ratio */
            aspect-ratio: 8 / 6;
        }

        #plotTabs {
            display: flex;
            margin-bottom: 10px;
            width: 95%;
            max-width: 800px;
        }
        #plotTabs button {
            padding: 10px 15px;
            border: none;
            border-bottom: 2px solid transparent;
            background-color: #f0f0f0;
            border-radius: 8px 8px 0 0;
            cursor: pointer;
            transition: background-color 0.3s ease, border-color 0.3s ease;
            margin-right: 5px;
            color: #555;
        }

        #plotTabs button:hover {
            background-color: #ddd;
            border-color: #4CAF50;
            color: #333;
        }

        #plotTabs button.active {
            background-color: #fff;
            border-color: #4CAF50;
            font-weight: bold;
            color: #333;
        }

        .plotContainer {
            background-color: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            width: 95%;
            max-width: 800px;
            display: none; /* Initially hide all plots */
            box-sizing: border-box;
        }

        .plotContainer.active {
            display: block; /* Show the active plot */
        }

        #message-box {
            background-color: #fff;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 20px;
            text-align: center;
            color: #333;
            width: 95%;
            max-width: 800px;
            box-sizing: border-box;
        }

        #simulation-controls {
            display: flex;
            flex-wrap: wrap;
            justify-content: center; /* Center the buttons */
            gap: 10px; /* Add some gap between buttons */
            margin-top: 20px;
            width: 95%;
            max-width: 800px;
            box-sizing: border-box;
        }
        #simulation-controls button {
            padding: 12px 18px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
            color: white;
            background-color: #4CAF50;
        }

        #simulation-controls button:hover {
            background-color: #45a049;
        }
        #resetButton {
            background-color: #f44336;
        }
         #resetButton:hover {
            background-color: #d32f2f;
        }

        @media (max-width: 768px) {
            #controls {
                flex-direction: column;
            }
            #controls > div {
                width: 100%;
                margin-right: 0;
                margin-bottom: 20px;
            }
             #simulation-controls {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    <h1>Lorentz Force Simulation</h1>

    <div id="controls">
        <div>
            <label for="charge">Charge (q):</label>
            <input type="number" id="charge" value="1.6e-19" placeholder="Charge (C)">
        </div>
        <div>
            <label for="mass">Mass (m):</label>
            <input type="number" id="mass" value="1.67e-27" placeholder="Mass (kg)">
        </div>
        <div>
            <label for="electricX">Electric Field X (Ex):</label>
            <input type="number" id="electricX" value="0" placeholder="Ex (V/m)">
        </div>
        <div>
            <label for="electricY">Electric Field Y (Ey):</label>
            <input type="number" id="electricY" value="0" placeholder="Ey (V/m)">
        </div>
        <div>
            <label for="electricZ">Electric Field Z (Ez):</label>
            <input type="number" id="electricZ" value="0" placeholder="Ez (V/m)">
        </div>
        <div>
            <label for="magneticX">Magnetic Field X (Bx):</label>
            <input type="number" id="magneticX" value="0" placeholder="Bx (T)">
        </div>
        <div>
            <label for="magneticY">Magnetic Field Y (By):</label>
            <input type="number" id="magneticY" value="0" placeholder="By (T)">
        </div>
        <div>
            <label for="magneticZ">Magnetic Field Z (Bz):</label>
            <input type="number" id="magneticZ" value="0.5" placeholder="Bz (T)">
        </div>
        <div>
            <label for="velocityX">Initial Velocity X (vx0):</label>
            <input type="number" id="velocityX" value="100" placeholder="vx0 (m/s)">
        </div>
        <div>
            <label for="velocityY">Initial Velocity Y (vy0):</label>
            <input type="number" id="velocityY" value="0" placeholder="vy0 (m/s)">
        </div>
        <div>
            <label for="velocityZ">Initial Velocity Z (vz0):</label>
            <input type="number" id="velocityZ" value="0" placeholder="vz0 (m/s)">
        </div>
        <div>
            <label for="timeStep">Time Step (dt):</label>
            <input type="number" id="timeStep" value="1e-9" placeholder="dt (s)">
        </div>
        <div>
            <label for="maxTime">Max Time (t_max):</label>
            <input type="number" id="maxTime" value="1e-6" placeholder="t_max (s)">
        </div>
    </div>

    <canvas id="simulationCanvas"></canvas>

     <div id="plotTabs">
        <button data-plot="2dPlot" class="active">2D Trajectory</button>
        <button data-plot="3dPlot">3D Trajectory</button>
    </div>

    <div id="2dPlot" class="plotContainer active">
        <canvas id="trajectoryPlot2D"></canvas>
    </div>
    <div id="3dPlot" class="plotContainer">
        <canvas id="trajectoryPlot3D"></canvas>
    </div>

    <div id="message-box">Simulation running...</div>

    <div id="simulation-controls">
        <button id="startSimulation">Start Simulation</button>
        <button id="resetButton">Reset</button>
    </div>

    <script>
        const canvas = document.getElementById('simulationCanvas');
        const ctx = canvas.getContext('2d');
        const plotCtx2D = document.getElementById('trajectoryPlot2D').getContext('2d');
        const plotCtx3D = document.getElementById('trajectoryPlot3D').getContext('2d');
        const messageBox = document.getElementById('message-box');

        // Get input elements
        const chargeInput = document.getElementById('charge');
        const massInput = document.getElementById('mass');
        const electricXInput = document.getElementById('electricX');
        const electricYInput = document.getElementById('electricY');
        const electricZInput = document.getElementById('electricZ');
        const magneticXInput = document.getElementById('magneticX');
        const magneticYInput = document.getElementById('magneticY');
        const magneticZInput = document.getElementById('magneticZ');
        const velocityXInput = document.getElementById('velocityX');
        const velocityYInput = document.getElementById('velocityY');
        const velocityZInput = document.getElementById('velocityZ');
        const timeStepInput = document.getElementById('timeStep');
        const maxTimeInput = document.getElementById('maxTime');
        const startSimulationButton = document.getElementById('startSimulation');
        const resetButton = document.getElementById('resetButton');

        const plotTabs = document.getElementById('plotTabs');
        const plotContainers = document.querySelectorAll('.plotContainer');
        const tabButtons = plotTabs.querySelectorAll('button');

        let activePlot = '2dPlot'; // Default active plot

        // Add event listeners to the tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Deactivate all tabs and plots
                tabButtons.forEach(b => b.classList.remove('active'));
                plotContainers.forEach(p => p.classList.remove('active'));

                // Activate the clicked tab and corresponding plot
                const plotId = button.dataset.plot;
                document.getElementById(plotId).classList.add('active');
                button.classList.add('active');
                activePlot = plotId; // Update the active plot
            });
        });


        let simulationRunning = false;
        let animationFrameId;

        function updateDimensions() {
            canvas.width = document.getElementById('simulationCanvas').offsetWidth;
            canvas.height = document.getElementById('simulationCanvas').offsetHeight;
             document.getElementById('trajectoryPlot2D').width = document.getElementById('simulationCanvas').offsetWidth;
            document.getElementById('trajectoryPlot2D').height = document.getElementById('simulationCanvas').offsetHeight;
            document.getElementById('trajectoryPlot3D').width = document.getElementById('simulationCanvas').offsetWidth;
            document.getElementById('trajectoryPlot3D').height = document.getElementById('simulationCanvas').offsetHeight;
        }

        updateDimensions();
        window.addEventListener('resize', updateDimensions);


        function getParameters() {
            // Get values from input elements
            const q = parseFloat(chargeInput.value);
            const m = parseFloat(massInput.value);
            const Ex = parseFloat(electricXInput.value);
            const Ey = parseFloat(electricYInput.value);
            const Ez = parseFloat(electricZInput.value);
            const Bx = parseFloat(magneticXInput.value);
            const By = parseFloat(magneticYInput.value);
            const Bz = parseFloat(magneticZInput.value);
            const vx0 = parseFloat(velocityXInput.value);
            const vy0 = parseFloat(velocityYInput.value);
            const vz0 = parseFloat(velocityZInput.value);
            const dt = parseFloat(timeStepInput.value);
            const tMax = parseFloat(maxTimeInput.value);

            // Return parameters as an object
            return { q, m, Ex, Ey, Ez, Bx, By, Bz, vx0, vy0, vz0, dt, tMax };
        }

        function lorentzForce(q, E, v, B) {
            // Calculate Lorentz force
            const F = [
                q * (E[0] + v[1] * B[2] - v[2] * B[1]),
                q * (E[1] + v[2] * B[0] - v[0] * B[2]),
                q * (E[2] + v[0] * B[1] - v[1] * B[0])
            ];
            return F;
        }

        function simulateMotion(q, m, E, B, v0, r0, tMax, dt) {
            // Simulate particle motion using the Runge-Kutta 4th order method
            const t = [];
            const r = [r0];
            const v = [v0];
            let time = 0;

            while (time < tMax) {
                // Runge-Kutta 4th order method
                const k1_v = lorentzForce(q, E, v[v.length - 1], B).map(a => a / m);
                const k1_r = v[v.length - 1];

                const k2_v = lorentzForce(q, E, v[v.length - 1].map((a, i) => a + 0.5 * dt * k1_v[i]), B).map(a => a / m);
                const k2_r = v[v.length - 1].map((a, i) => a + 0.5 * dt * k1_r[i]);

                const k3_v = lorentzForce(q, E, v[v.length - 1].map((a, i) => a + 0.5 * dt * k2_v[i]), B).map(a => a / m);
                const k3_r = v[v.length - 1].map((a, i) => a + 0.5 * dt * k2_r[i]);

                const k4_v = lorentzForce(q, E, v[v.length - 1].map((a, i) => a + dt * k3_v[i]), B).map(a => a / m);
                const k4_r = v[v.length - 1].map((a, i) => a + dt * k3_r[i]);

                const new_v = v[v.length - 1].map((a, i) => a + (dt / 6) * (k1_v[i] + 2 * k2_v[i] + 2 * k3_v[i] + k4_v[i]));
                const new_r = r[r.length - 1].map((a, i) => a + (dt / 6) * (k1_r[i] + 2 * k2_r[i] + 2 * k3_r[i] + k4_r[i]));

                v.push(new_v);
                r.push(new_r);
                t.push(time);
                time += dt;
            }
            return { t, r, v };
        }

        function drawTrajectory(r, ctx, dimensions) {
            // Draw the particle trajectory on the canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.moveTo(r[0][0] + dimensions.xOffset, r[0][1] + dimensions.yOffset);
            for (let i = 1; i < r.length; i++) {
                ctx.lineTo(r[i][0] + dimensions.xOffset, r[i][1] + dimensions.yOffset);
            }
            ctx.strokeStyle = '#007BFF';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        function plotTrajectory2D(r, ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
            ctx.moveTo(r[0][0], r[0][1]);
            for (let i = 1; i < r.length; i++) {
                ctx.lineTo(r[i][0], r[i][1]);
            }
            ctx.strokeStyle = '#007BFF';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Add labels and title
            ctx.xlabel = "X Position (m)";
            ctx.ylabel = "Y Position (m)";
            ctx.title = "2D Trajectory of Charged Particle";

        }

        function plotTrajectory3D(r, ctx) {
             ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            const points = r.map(p => ({ x: p[0], y: p[1], z: p[2] }));

            // 3D projection
            const projectionFactor = 100;
            const projectedPoints = points.map(p => ({
                x: p.x + projectionFactor * (p.x / (p.z + projectionFactor)),
                y: p.y + projectionFactor * (p.y / (p.z + projectionFactor)),
                z: p.z
            }));

            ctx.beginPath();
            ctx.moveTo(projectedPoints[0].x, projectedPoints[0].y);
            for (let i = 1; i < projectedPoints.length; i++) {
                ctx.lineTo(projectedPoints[i].x, projectedPoints[i].y);
            }
            ctx.strokeStyle = '#007BFF';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.xlabel = "Projected X Position";
            ctx.ylabel = "Projected Y Position";
            ctx.title = "3D Trajectory of Charged Particle";
        }



        function animate() {
            if (!simulationRunning) return;

            const { q, m, Ex, Ey, Ez, Bx, By, Bz, vx0, vy0, vz0, dt, tMax } = getParameters();
            const E = [Ex, Ey, Ez];
            const B = [Bx, By, Bz];
            const v0 = [vx0, vy0, vz0];
            const r0 = [0, 0, 0];

            const { r } = simulateMotion(q, m, E, B, v0, r0, tMax, dt);
            let dimensions = {xOffset: canvas.width / 2, yOffset: canvas.height / 2};
            drawTrajectory(r, ctx, dimensions);

            if (activePlot === '2dPlot'){
                plotTrajectory2D(r, plotCtx2D);
             } else if (activePlot === '3dPlot'){
                plotTrajectory3D(r, plotCtx3D);
             }

            animationFrameId = requestAnimationFrame(animate);
            messageBox.textContent = 'Simulation running...';
        }

        function startSimulation() {
            if (simulationRunning) return;
            simulationRunning = true;
            startSimulationButton.textContent = 'Stop Simulation';
            animate();
        }

        function resetSimulation() {
            simulationRunning = false;
            startSimulationButton.textContent = 'Start Simulation';
            cancelAnimationFrame(animationFrameId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            plotCtx2D.clearRect(0, 0, plotCtx2D.canvas.width, plotCtx2D.canvas.height);
            plotCtx3D.clearRect(0, 0, plotCtx3D.canvas.width, plotCtx3D.canvas.height);
            messageBox.textContent = 'Simulation stopped. Reset parameters to start a new simulation.';

            // Reset input values to their defaults
            chargeInput.value = '1.6e-19';
            massInput.value = '1.67e-27';
            electricXInput.value = '0';
            electricYInput.value = '0';
            electricZInput.value = '0';
            magneticXInput.value = '0';
            magneticYInput.value = '0';
            magneticZInput.value = '0.5';
            velocityXInput.value = '100';
            velocityYInput.value = '0';
            velocityZInput.value = '0';
            timeStepInput.value = '1e-9';
            maxTimeInput.value = '1e-6';
        }

        startSimulationButton.addEventListener('click', startSimulation);
        resetButton.addEventListener('click', resetSimulation);
    </script>
</body>
</html>
