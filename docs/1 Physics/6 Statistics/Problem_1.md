# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Simulation - 2D and 3D Combined</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      margin: 0;
      padding: 20px;
      color: #333;
      max-width: 1000px;
      margin: auto;
    }
    header {
      background: #003366;
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .controls {
      background: #eef2f5;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
      justify-content: center;
    }
    .control-group {
      flex: 1;
      min-width: 200px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #aaa;
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
  </style>
</head>
<body>
  <header>
    <h1>Wave Interference Simulation (2D and 3D)</h1>
    <p>Interactive 2D Canvas Simulation and 3D Surface Visualization</p>
  </header>

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
        <option value="4" selected>4 (Square)</option>
        <option value="5">5 (Pentagon)</option>
        <option value="6">6 (Hexagon)</option>
        <option value="8">8 (Octagon)</option>
      </select>
    </div>
    <div class="control-group">
      <label for="radius">Source Radius:</label>
      <input type="range" id="radius" min="1" max="6" step="0.5" value="3">
      <span id="radiusValue">3.0</span>
    </div>
    <button id="updateBtn">Update Simulations</button>
  </div>

  <h2>2D Canvas Simulation</h2>
  <div class="canvas-container">
    <canvas id="interferenceCanvas" width="600" height="600"></canvas>
  </div>

  <h2>3D Surface Plot</h2>
  <div id="plot3d"></div>

  <script>
    // (JavaScript logic remains here as in the merged version)
  </script>
</body>
</html>
