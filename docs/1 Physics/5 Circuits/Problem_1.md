# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wave Interference Explorations</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      color: #333;
    }
    header {
      background: #003366;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    section {
      max-width: 1000px;
      margin: auto;
      padding: 40px 20px;
    }
    h2 {
      border-bottom: 2px solid #ccc;
      padding-bottom: 10px;
    }
    canvas {
      display: block;
      margin: 30px auto;
      border: 2px solid #555;
      border-radius: 10px;
    }
    .controls {
      background: #eef2f5;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      margin-bottom: 30px;
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
    pre, .formula-box {
      background: #222;
      color: #0f0;
      padding: 20px;
      overflow-x: auto;
      border-radius: 10px;
      margin: 20px 0;
    }
    .color-legend {
      text-align: center;
      margin-top: 20px;
    }
    .color-legend span {
      font-weight: bold;
    }
    .animation-text {
      text-align: center;
      font-size: 18px;
      color: #555;
      margin-top: 10px;
      animation: blink 1.5s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Wave Interference Explorations</h1>
    <p>Visualizing Patterns from Multiple Point Sources</p>
  </header>

  <section>
    <h2>Table of Contents</h2>
    <ol>
      <li><a href="#problem-statement">Problem Statement</a></li>
      <li><a href="#theoretical-foundation">Theoretical Foundation</a></li>
      <li><a href="#superposition-principle">Superposition Principle</a></li>
      <li><a href="#simulation-method">Simulation Method</a></li>
      <li><a href="#simulation-code">Simulation Code</a></li>
      <li><a href="#visualization-and-analysis">Visualization and Analysis</a></li>
      <li><a href="#conclusions">Conclusions</a></li>
      <li><a href="#references">References</a></li>
    </ol>
  </section>

  <!-- Existing content stays the same here: Theoretical Foundation, Superposition, Simulation Code... -->

  <section class="color-legend">
    <p><strong>Color Interpretation:</strong></p>
    <p>
      <span style="color: blue;">Blue:</span> Negative displacement (trough) &nbsp; | &nbsp;
      <span style="color: gray;">White:</span> Zero displacement (node) &nbsp; | &nbsp;
      <span style="color: red;">Red:</span> Positive displacement (crest)
    </p>
  </section>

  <div class="animation-text">Simulation Running...</div>

  <section>
    <h2>Example Calculation</h2>
    <div class="formula-box">
\[ k = \frac{2\pi}{\lambda} = \pi \quad \text{for} \quad \lambda = 2 \]
\[ \omega = 2\pi f = 2\pi \quad \text{for} \quad f = 1 \]
\[ r = \sqrt{(1 - 0)^2 + (1 - 0)^2} = \sqrt{2} \]
\[ \eta(1, 1, t) = \frac{1}{\sqrt{\sqrt{2}}} \cos(\pi \sqrt{2} - 2\pi t) \]
    </div>
  </section>

  <section id="references">
    <h2>References</h2>
    <ol>
      <li>Halliday, Resnick, and Walker, <em>Fundamentals of Physics</em>, 11th Edition.</li>
      <li>Young & Freedman, <em>University Physics with Modern Physics</em>, 15th Edition.</li>
      <li>Online Resource: Wave Interference at <a href="https://www.physicsclassroom.com/" target="_blank">Physics Classroom</a>.</li>
    </ol>
  </section>

<!-- The JavaScript part remains the same with your existing simulation logic -->

</body>
</html>
