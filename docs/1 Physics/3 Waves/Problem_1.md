# Problem 1
<!-- 🚀 Problem 3 - Trajectories of a Freely Released Payload Near Earth -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payload Trajectories Simulation</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f4f7fa;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    h1, h2, h3 {
      text-align: center;
      color: #2c3e50;
    }
    canvas {
      display: block;
      margin: 30px auto;
      background: #fff;
      border-radius: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th, td {
      padding: 12px;
      border: 1px solid #ccc;
      text-align: center;
    }
    th {
      background: #dde7f0;
    }
    .container {
      max-width: 900px;
      margin: auto;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .note {
      font-size: 0.9em;
      color: #666;
      text-align: center;
    }
    .control {
      text-align: center;
      margin-bottom: 20px;
    }
    input, button {
      padding: 10px;
      margin: 10px;
      font-size: 1rem;
    }
    iframe {
      width: 100%;
      height: 400px;
      border: 1px solid #ccc;
      margin: 20px 0;
    }
  </style>
</head>
<body>
<div class="container">
  <h1>Problem 3 - Payload Trajectories Near Earth</h1>

  <h2>1. Theoretical Background</h2>
  <p>
    Newton's law of gravity governs the motion of a payload released in space:
    <br>
    $$ F = \\frac{GMm}{r^2} $$
    <br>
    The escape velocity from Earth is:
    <br>
    $$ v_{\\text{escape}} = \\sqrt{\\frac{2GM}{R}} $$
    <br>
    Where:<br>
    - \(G = 6.67430 \\times 10^{-11} \\text{Nm}^2/\\text{kg}^2\) <br>
    - \(M\) = Mass of Earth <br>
    - \(R\) = Radius from Earth's center
  </p>

  <h2>2. Interactive Simulation</h2>
  <div class="control">
    <label>Initial Velocity (m/s): <input id="speed" type="number" value="8000" /></label><br>
    <label>Launch Angle (°): <input id="angle" type="number" value="45" /></label><br>
    <button onclick="start()">Simulate</button>
  </div>
  <canvas id="simCanvas" width="600" height="600"></canvas>

  <h2>3. Real World Examples</h2>
  <table>
    <tr>
      <th>Scenario</th><th>Trajectory</th><th>Mission Example</th>
    </tr>
    <tr><td>Satellite Deployment</td><td>Elliptical Orbit</td><td>Starlink, ISS</td></tr>
    <tr><td>Moon Travel</td><td>Parabolic Arc</td><td>Apollo Missions</td></tr>
    <tr><td>Interplanetary Probe</td><td>Hyperbolic Path</td><td>Voyager 1 & 2</td></tr>
  </table>

  <h2>4. Euler Integration (Numerical Model)</h2>
  <p>We use Euler’s method to simulate the trajectory:</p>
  <ul>
    <li>$$ \\vec{r}_{\\text{new}} = \\vec{r}_{\\text{old}} + \\vec{v} \\cdot \\Delta t $$</li>
    <li>$$ \\vec{v}_{\\text{new}} = \\vec{v}_{\\text{old}} + \\vec{a} \\cdot \\Delta t $$</li>
    <li>$$ \\vec{a} = -\\frac{GM}{r^2} \\cdot \\hat{r} $$</li>
  </ul>

  <h2>5. Graph: Trajectory Comparison Based On Initial Velocity</h2>
  <canvas id="trajectoryComparison" width="600" height="400"></canvas>

  <h2>6. Graph: Payload Trajectories by Velocity</h2>
  <canvas id="velocityCurves" width="600" height="400"></canvas>

  <h2>7. Conclusion</h2>
  <p>
    This interactive model helps visualize gravity's effect on motion and trajectory.
    It shows how different speeds lead to orbits, reentry, or escape.
  </p>

  <div class="note">© 2025 - Trajectory Simulation | Physics + Programming</div>
</div>

<script>
  // Constants
  const G = 6.6743e-11;
  const M = 5.972e24;
  const R = 6371000;
  let ctxSim = document.getElementById("simCanvas").getContext("2d");

  function start() {
    let v = parseFloat(document.getElementById("speed").value);
    let angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;

    let x = 0;
    let y = R + 500000;
    let vx = v * Math.cos(angle);
    let vy = -v * Math.sin(angle);

    let path = [];
    let dt = 0.1;

    function update() {
      let r = Math.sqrt(x*x + y*y);
      let a = G * M / (r * r);
      let ax = -a * x / r;
      let ay = -a * y / r;

      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;

      path.push([x, y]);

      ctxSim.clearRect(0, 0, 600, 600);
      ctxSim.fillStyle = "#2c3e50";
      ctxSim.beginPath();
      ctxSim.arc(300, 300, 50, 0, 2 * Math.PI);
      ctxSim.fill();

      ctxSim.beginPath();
      ctxSim.strokeStyle = "#fff";
      for (let i = 0; i < path.length; i++) {
        let px = 300 + path[i][0] / 200000;
        let py = 300 - path[i][1] / 200000;
        if (i === 0) ctxSim.moveTo(px, py);
        else ctxSim.lineTo(px, py);
      }
      ctxSim.stroke();

      ctxSim.fillStyle = "#f59f00";
      ctxSim.beginPath();
      ctxSim.arc(300 + x/200000, 300 - y/200000, 4, 0, 2*Math.PI);
      ctxSim.fill();

      if (r < R || r > 1.5e7) return;
      requestAnimationFrame(update);
    }

    update();
  }

  // Chart 1 - Trajectory Comparison Based on Initial Velocity
  new Chart(document.getElementById("trajectoryComparison"), {
    type: 'bar',
    data: {
      labels: ['Reentry (< vₑ)', 'Orbit (≈ vₑ)', 'Escape (> vₑ)'],
      datasets: [{
        label: 'Initial Velocity (m/s)',
        data: [6000, 11200, 14000],
        backgroundColor: ['#ef476f', '#ffd166', '#06d6a0']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Trajectory Comparison Based On Initial Velocity'
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Velocity (m/s)'
          }
        }
      }
    }
  });

  // Chart 2 - Payload Trajectories by Velocity
  new Chart(document.getElementById("velocityCurves"), {
    type: 'line',
    data: {
      labels: Array.from({length: 10}, (_, i) => i + 1),
      datasets: [
        {
          label: 'Reentry Path',
          data: [0, 1, 3, 2.5, 2, 1.5, 1.2, 0.8, 0.4, 0.1],
          borderColor: '#ef476f',
          fill: false
        },
        {
          label: 'Orbital Path',
          data: [1, 2, 2.8, 3.5, 3.2, 3.5, 3.2, 3.5, 3.2, 3.5],
          borderColor: '#ffd166',
          fill: false
        },
        {
          label: 'Escape Path',
          data: [2, 3, 4.5, 5, 6, 7, 8, 10, 12, 14],
          borderColor: '#06d6a0',
          fill: false
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Payload Trajectories by Velocity (Sample Altitudes)'
        }
      },
      scales: {
        y: {
          title: {
            display: true,
            text: 'Relative Altitude'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time Step'
          }
        }
      }
    }
  });
</script>
</body>
</html>
