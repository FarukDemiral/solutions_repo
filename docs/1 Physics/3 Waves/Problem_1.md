# Problem 1
# Waves
# Interference Patterns on a Water Surface

## Problem Statement

The aim of this study is to analyze interference patterns created by circular waves emitted from point sources located at the vertices of a regular polygon. The waves interfere constructively and destructively, leading to visually observable patterns.

## Theoretical Foundation

The displacement of a circular wave on the water surface, emanating from a point source located at \( (x_0, y_0) \), is described by the **Single Disturbance Equation**:

$$
\eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
$$

Where:
- \( \eta(x, y, t) \): Displacement at point \( (x, y) \) and time \( t \)
- \( A \): Amplitude of the wave
- \( k = \frac{2\pi}{\lambda} \): Wave number
- \( \omega = 2\pi f \): Angular frequency
- \( r = \sqrt{(x - x_0)^2 + (y - y_0)^2} \): Distance from source to the point \( (x, y) \)
- \( \phi \): Initial phase

---

## Superposition Principle

The total displacement on the water surface due to multiple sources is given by:

$$
\eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t)
$$

where \( N \) is the number of wave sources (vertices of the polygon).

---

## Simulation Method

### 1. Real-Valued Model (Cosine-Based Approach)
The real-valued model computes the sum of cosine wave disturbances from each source. The amplitude at each point decays with distance.

### 2. Complex Exponential Model (Phasor Approach)
The complex model uses phasor representation, summing complex wave contributions from each source and then taking the real part:

$$
\eta_i(x, y, t) = \frac{A}{\sqrt{r_i}} e^{j(kr_i - \omega t + \phi_i)}
$$

$$
\eta_{\text{total}}(x, y, t) = \Re \left\{ \sum_{i=1}^{N} \eta_i(x, y, t) \right\}
$$

---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Wave Interference Simulation and Visualization</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            line-height: 1.6;
            max-width: 1000px;
        }

        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 20px;
        }

        .container {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 20px;
            margin-bottom: 20px;
        }

        .controls {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            margin-bottom: 20px;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            min-width: 200px;
        }

        label {
            margin-bottom: 5px;
            font-weight: bold;
        }

        input, select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 10px;
            width: 100%;
            font-size: 14px;
        }

        button {
            background-color: #4c6ef5;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
        }

        button:hover {
            background-color: #364fc7;
        }

        .canvas-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }

        canvas {
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #000;
        }

        .color-scale {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }

        .color-bar {
            width: 300px;
            height: 20px;
            background: linear-gradient(to right, blue, white, red);
            border-radius: 2px;
            margin: 0 10px;
        }

        .scale-label {
            font-size: 14px;
            color: #666;
        }

        #plot3d {
            width: 100%;
            height: 800px;
            margin-top: 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
        }
    </style>
</head>
<body>
    <h1>Wave Interference Simulation and Visualization</h1>

    <div class="container">
        <div class="controls">
            <div class="control-group">
                <label for="amplitude">Amplitude (A):</label>
                <input type="range" id="amplitude" min="0.1" max="2" step="0.1" value="1.0">
                <span id="ampValue">1.0</span>
            </div>

            <div class="control-group">
                <label for="wavelength">Wavelength (λ):</label>
                <input type="range" id="wavelength" min="0.5" max="5" step="0.1" value="2.0">
                <span id="waveValue">2.0</span>
            </div>

            <div class="control-group">
                <label for="sources">Number of Sources:</label>
                <select id="sources">
                    <option value="3">3 (Triangle)</option>
                    <option value="4">4 (Square)</option>
                    <option value="5">5 (Pentagon)</option>
                    <option value="6" selected>6 (Hexagon)</option>
                    <option value="8">8 (Octagon)</option>
                </select>
            </div>

            <div class="control-group">
                <label for="radius">Source Radius:</label>
                <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
                <span id="radiusValue">3.0</span>
            </div>
        </div>

        <div style="display: flex; justify-content: center;">
            <button id="updateBtn">Update Simulation</button>
            <button id="updatePlotBtn">Update 3D Plot</button>
        </div>

        <div class="canvas-container">
            <canvas id="interferenceCanvas" width="600" height="600"></canvas>
        </div>

        <div class="color-scale">
            <span class="scale-label">Negative</span>
            <div class="color-bar"></div>
            <span class="scale-label">Positive</span>
        </div>

        <div id="plot3d"></div>
    </div>

    <script>
        const canvas = document.getElementById('interferenceCanvas');
        const ctx = canvas.getContext('2d');

        const amplitudeInput = document.getElementById('amplitude');
        const wavelengthInput = document.getElementById('wavelength');
        const sourcesInput = document.getElementById('sources');
        const radiusInput = document.getElementById('radius');
        const updateBtn = document.getElementById('updateBtn');
        const updatePlotBtn = document.getElementById('updatePlotBtn');
        const ampValue = document.getElementById('ampValue');
        const waveValue = document.getElementById('waveValue');
        const radiusValue = document.getElementById('radiusValue');

        let A = parseFloat(amplitudeInput.value);
        let wavelength = parseFloat(wavelengthInput.value);
        let numSources = parseInt(sourcesInput.value);
        let sourceRadius = parseFloat(radiusInput.value);
        let frequency = 1.0;
        let k = 2 * Math.PI / wavelength;
        let omega = 2 * Math.PI * frequency;
        let phi = 0;
        let t = 0;
        let animationId;

        ampValue.textContent = A.toFixed(1);
        waveValue.textContent = wavelength.toFixed(1);
        radiusValue.textContent = sourceRadius.toFixed(1);

        amplitudeInput.addEventListener('input', () => {
            A = parseFloat(amplitudeInput.value);
            ampValue.textContent = A.toFixed(1);
        });

        wavelengthInput.addEventListener('input', () => {
            wavelength = parseFloat(wavelengthInput.value);
            k = 2 * Math.PI / wavelength;
            waveValue.textContent = wavelength.toFixed(1);
        });

        radiusInput.addEventListener('input', () => {
            sourceRadius = parseFloat(radiusInput.value);
            radiusValue.textContent = sourceRadius.toFixed(1);
        });

        updateBtn.addEventListener('click', () => {
            cancelAnimationFrame(animationId);
            t = 0;
            runAnimation();
        });

        updatePlotBtn.addEventListener('click', () => {
            plotSurface();
        });

        function regularPolygon(n, radius) {
            const points = [];
            for (let i = 0; i < n; i++) {
                const angle = (2 * Math.PI * i) / n;
                points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
            }
            return points;
        }

        function mapToColor(value, min, max) {
            const normalized = (value - min) / (max - min);
            let r, g, b;
            if (normalized < 0.5) {
                const t = normalized * 2;
                r = 255 * t;
                g = 255 * t;
                b = 255;
            } else {
                const t = (normalized - 0.5) * 2;
                r = 255;
                g = 255 * (1 - t);
                b = 255 * (1 - t);
            }
            return [r, g, b];
        }

        function runAnimation() {
            numSources = parseInt(sourcesInput.value);
            k = 2 * Math.PI / wavelength;
            const width = canvas.width;
            const height = canvas.height;
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;
            const scale = 20;
            const offsetX = width / 2;
            const offsetY = height / 2;
            const sources = regularPolygon(numSources, sourceRadius);

            const waveValues = new Array(width * height);
            let minVal = Infinity;
            let maxVal = -Infinity;

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const physX = (x - offsetX) / scale;
                    const physY = (y - offsetY) / scale;
                    let eta = 0;
                    for (const [x0, y0] of sources) {
                        const R = Math.sqrt((physX - x0) ** 2 + (physY - y0) ** 2);
                        const amplitude = R < 0.01 ? A : A / Math.sqrt(R + 0.01);
                        eta += amplitude * Math.cos(k * R - omega * t + phi);
                    }
                    const index = y * width + x;
                    waveValues[index] = eta;
                    minVal = Math.min(minVal, eta);
                    maxVal = Math.max(maxVal, eta);
                }
            }

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const index = y * width + x;
                    const eta = waveValues[index];
                    const [r, g, b] = mapToColor(eta, minVal, maxVal);
                    const pixelIndex = (y * width + x) * 4;
                    data[pixelIndex] = r;
                    data[pixelIndex + 1] = g;
                    data[pixelIndex + 2] = b;
                    data[pixelIndex + 3] = 255;
                }
            }

            ctx.putImageData(imageData, 0, 0);
            drawSources(sources, scale, offsetX, offsetY);

            t += 0.05;
            animationId = requestAnimationFrame(runAnimation);
        }

        function drawSources(sources, scale, offsetX, offsetY) {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            for (const [x0, y0] of sources) {
                const canvasX = x0 * scale + offsetX;
                const canvasY = y0 * scale + offsetY;
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }

        function plotSurface() {
            const A = parseFloat(amplitudeInput.value);
            const wavelength = parseFloat(wavelengthInput.value);
            const numSources = parseInt(sourcesInput.value);
            const sourceRadius = parseFloat(radiusInput.value);
            const k = 2 * Math.PI / wavelength;
            const omega = 2 * Math.PI * 1.0; // fixed frequency
            const phi = 0;
            const t = 0; // snapshot at t = 0

            const size = 50;
            const range = 5;
            const x = [...Array(size)].map((_, i) => -range + (2 * range * i) / (size - 1));
            const y = x;

            const X = [], Y = [], Z = [];
            const sources = regularPolygon(numSources, sourceRadius);

            for (let i = 0; i < size; i++) {
                X[i] = [];
                Y[i] = [];
                Z[i] = [];
                for (let j = 0; j < size; j++) {
                    const xi = x[j];
                    const yi = y[i];
                    let eta = 0;
                    for (const [x0, y0] of sources) {
                        const R = Math.sqrt((xi - x0) ** 2 + (yi - y0) ** 2);
                        const amplitude = R < 0.01 ? A : A / Math.sqrt(R + 0.01);
                        eta += amplitude * Math.cos(k * R - omega * t + phi);
                    }
                    X[i][j] = xi;
                    Y[i][j] = yi;
                    Z[i][j] = eta;
                }
            }

            const data = [{
                type: 'surface',
                x: X,
                y: Y,
                z: Z,
                colorscale: 'Jet',
                contours: {
                    z: {
                        show: true,
                        usecolormap: true,
                        highlightcolor: "#42f462",
                        project: { z: true }
                    }
                }
            }];

            const layout = {
                title: '3D Wave Interference Pattern',
                autosize: true,
                scene: {
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    zaxis: { title: 'Displacement η(x, y, t)' }
                }
            };

            Plotly.newPlot('plot3d', data, layout);
        }

        runAnimation();
        plotSurface();
    </script>
</body>
</html>





## Visualization and Analysis

- **Constructive Interference:** Occurs when wave crests meet, amplifying the displacement.
- **Destructive Interference:** Occurs when crests and troughs meet, canceling each other out.

The interactive simulation allows the adjustment of:
- Amplitude
- Wavelength
- Number of sources (polygon selection)
- Source radius

Both real and complex models are visualized on separate canvases for comparison.

---

## Conclusions

This project demonstrates how the superposition of wave disturbances can lead to complex interference patterns. The approach provides insights into wave behavior and phase interactions using both real and complex wave models.

