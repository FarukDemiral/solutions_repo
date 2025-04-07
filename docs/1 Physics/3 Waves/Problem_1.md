# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Problem 3 - Payload Trajectories</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: sans-serif; background: #f0f4f8; padding: 30px; }
    canvas { border: 1px solid #ccc; margin: 20px auto; display: block; background: #fff; }
    .container { max-width: 900px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    h1, h2, h3 { text-align: center; color: #2c3e50; }
    p, label, input { font-size: 16px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
    th { background-color: #f2f2f2; }
    input, button { margin: 8px; padding: 8px; font-size: 16px; }
  </style>
</head>
<body>

<div class="container">
  <h1>Problem 3 - Trajectories of a Freely Released Payload Near Earth</h1>

  <h2>1. Theoretical Background</h2>
  <p>We use Newton's law of gravity:</p>
  <p>$$ F = \\frac{GMm}{r^2} $$</p>
  <ul>
    <li>\\( G = 6.67430 \\times 10^{-11} \\, \\text{Nm}^2/\\text{kg}^2 \\)</li>
    <li>\\( M \\): mass of Earth</li>
    <li>\\( m \\): mass of payload</li>
    <li>\\( r \\): distance from Earth's center</li>
  </ul>
  <p>The escape velocity formula:</p>
  <p>$$ v_{\\text{escape}} = \\sqrt{\\frac{2GM}{R}} $$</p>
  <p>If:</p>
  <ul>
    <li>\\( v < v_{\\text{escape}} \\) → elliptical or reentry</li>
    <li>\\( v = v_{\\text{escape}} \\) → parabolic trajectory</li>
    <li>\\( v > v_{\\text{escape}} \\) → hyperbolic escape</li>
  </ul>

  <h2>2. Interactive Simulation</h2>
  <p>🎯 Test different <strong>initial velocities</strong> and <strong>angles</strong> to explore:</p>
  <ul>
    <li>🌍 Orbital insertion</li>
    <li>🚀 Escape</li>
    <li>🌠 Reentry</li>
  </ul>

  <label>Initial Velocity (m/s): <input id="speed" type="number" value="8000"></label><br>
  <label>Launch Angle (°): <input id="angle" type="number" value="45"></label><br>
  <button onclick="start()">Simulate</button>
  <canvas id="simCanvas" width="600" height="600"></canvas>

  <h2>3. Real World Examples</h2>
  <table>
    <tr>
      <th>Scenario</th><th>Trajectory</th><th>Mission Example</th>
    </tr>
    <tr><td>Satellite Deployment</td><td>Elliptical Orbit</td><td>Starlink, ISS</td></tr>
    <tr><td>Moon Travel</td><td>Parabolic Arc</td><td>Apollo Missions</td></tr>
    <tr><td>Interplanetary Probe</td><td>Hyperbolic Path</td><td>Voyager 1, Voyager 2</td></tr>
  </table>

  <h2>4. How It Works (Numerical Model)</h2>
  <p>We simulate motion using a basic <strong>Euler Integration</strong> scheme:</p>
  <p><strong>Position update:</strong> $$ \\vec{r}_{\\text{new}} = \\vec{r}_{\\text{old}} + \\vec{v} \\cdot \\Delta t $$</p>
  <p><strong>Velocity update:</strong> $$ \\vec{v}_{\\text{new}} = \\vec{v}_{\\text{old}} + \\vec{a} \\cdot \\Delta t $$</p>
  <p><strong>Acceleration from gravity:</strong> $$ \\vec{a} = -\\frac{GM}{r^2} \\cdot \\hat{r} $$</p>

  <h2>5. Trajectory Comparison Based On Initial Velocity</h2>
  <canvas id="trajectoryComparisonChart" width="800" height="400"></canvas>

  <h2>6. Payload Trajectories by Velocity</h2>
  <canvas id="velocityTypeChart" width="800" height="400"></canvas>

  <h2>7. Conclusion</h2>
  <p>This project helps you visualize how gravitational physics works in real missions, and how trajectory decisions affect the fate of a payload. It combines <strong>physics</strong>, <strong>programming</strong>, and <strong>space engineering</strong> in a powerful, visual way.</p>
</div>

<script>
  // ========== Simulation ==========
  const G = 6.6743e-11, M = 5.972e24, R = 6371000;
  const ctxSim = document.getElementById("simCanvas").getContext("2d");

  function start() {
    let v = parseFloat(document.getElementById("speed").value);
    let angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;

    let x = 0, y = R + 500000;
    let vx = v * Math.cos(angle);
    let vy = -v * Math.sin(angle);
    let dt = 0.1, path = [];

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
      ctxSim.beginPath(); ctxSim.arc(300, 300, 50, 0, 2*Math.PI); ctxSim.fill();

      ctxSim.beginPath(); ctxSim.strokeStyle = "#fff";
      for (let i = 0; i < path.length; i++) {
        let px = 300 + path[i][0]/200000, py = 300 - path[i][1]/200000;
        if (i === 0) ctxSim.moveTo(px, py); else ctxSim.lineTo(px, py);
      }
      ctxSim.stroke();

      ctxSim.fillStyle = "#f59f00";
      ctxSim.beginPath();
      ctxSim.arc(300 + x/200000, 300 - y/200000, 4, 0, 2*Math.PI);
      ctxSim.fill();

      if (r < R) { alert("Payload crashed!"); return; }
      if (r > 1.5e7) { alert("Payload escaped!"); return; }

      requestAnimationFrame(update);
    }
    update();
  }

  // ========== Chart 1 ==========
  new Chart(document.getElementById('trajectoryComparisonChart').getContext('2d'), {
    type: 'line',
    data: {
      labels: ['0 km', '1000 km', '2000 km', '3000 km', '4000 km', '5000 km', '6000 km'],
      datasets: [
        {
          label: 'Elliptical (7500 m/s)',
          data: [0, 200, 380, 520, 600, 640, 660],
          borderColor: '#3498db', tension: 0.4
        },
        {
          label: 'Parabolic (Escape Velocity)',
          data: [0, 300, 600, 1000, 1600, 2500, 3500],
          borderColor: '#2ecc71', tension: 0.4
        },
        {
          label: 'Hyperbolic (15000 m/s)',
          data: [0, 500, 1100, 2000, 3500, 5500, 8000],
          borderColor: '#e74c3c', tension: 0.4
        }
      ]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Trajectory Altitude vs Distance from Earth', font: { size: 16 } }
      },
      scales: {
        x: { title: { display: true, text: 'Distance (km)' } },
        y: { title: { display: true, text: 'Altitude (km)' } }
      }
    }
  });

  // ========== Chart 2 ==========
  new Chart(document.getElementById('velocityTypeChart').getContext('2d'), {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Elliptical Trajectory',
          data: [ {x:0,y:500},{x:1000,y:800},{x:2000,y:1100},{x:3000,y:1300} ],
          borderColor: '#3498db', backgroundColor: '#3498db', showLine: true, tension: 0.3
        },
        {
          label: 'Parabolic Trajectory',
          data: [ {x:0,y:500},{x:1000,y:1200},{x:2000,y:2200},{x:3000,y:4000} ],
          borderColor: '#2ecc71', backgroundColor: '#2ecc71', showLine: true, tension: 0.3
        },
        {
          label: 'Hyperbolic Trajectory',
          data: [ {x:0,y:500},{x:1000,y:1800},{x:2000,y:3600},{x:3000,y:7000} ],
          borderColor: '#e74c3c', backgroundColor: '#e74c3c', showLine: true, tension: 0.3
        }
      ]
    },
    options: {
      plugins: {
        title: { display: true, text: 'Trajectory Shape by Velocity Type', font: { size: 16 } }
      },
      scales: {
        x: { title: { display: true, text: 'Distance (km)' } },
        y: { title: { display: true, text: 'Altitude (km)' } }
      }
    }
  });
</script>

</body>
</html>
