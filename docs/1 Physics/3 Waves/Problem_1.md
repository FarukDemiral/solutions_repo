# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Problem 3 - Trajectories of a Freely Released Payload</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: sans-serif; background: #f0f4f8; padding: 20px; }
    canvas { border: 1px solid #ccc; background: #fff; display: block; margin: 30px auto; }
    input, button { margin: 10px; padding: 6px; font-size: 16px; }
    h2 { text-align: center; margin-top: 40px; color: #333; }
  </style>
</head>
<body>

<h1>Problem 3 - Trajectories of a Freely Released Payload Near Earth</h1>

<h2>1. Theoretical Background</h2>
<p>We use Newton's law of gravity:</p>
<pre>F = GMm / r²</pre>
<ul>
  <li>G = 6.67430 × 10⁻¹¹ Nm²/kg²</li>
  <li>M = mass of Earth</li>
  <li>m = mass of payload</li>
  <li>r = distance from Earth's center</li>
</ul>
<p>Escape velocity:</p>
<pre>v_escape = √(2GM / R)</pre>
<p>
  If:<br>
  v &lt; v_escape → Elliptical or Reentry<br>
  v = v_escape → Parabolic<br>
  v &gt; v_escape → Hyperbolic escape
</p>

<hr>

<h2>2. Interactive Simulation</h2>
<label>Initial Velocity (m/s): <input id="speed" type="number" value="8000"></label><br>
<label>Launch Angle (°): <input id="angle" type="number" value="45"></label><br>
<button onclick="start()">Simulate</button>
<canvas id="simCanvas" width="600" height="600"></canvas>

<script>
  const G = 6.6743e-11;
  const M = 5.972e24;
  const R = 6371000;
  let ctx = document.getElementById("simCanvas").getContext("2d");

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
      let r = Math.sqrt(x * x + y * y);
      let a = G * M / (r * r);
      let ax = -a * x / r;
      let ay = -a * y / r;

      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;

      path.push([x, y]);

      ctx.clearRect(0, 0, 600, 600);
      ctx.fillStyle = "#2c3e50";
      ctx.beginPath();
      ctx.arc(300, 300, 50, 0, 2 * Math.PI);
      ctx.fill();

      ctx.beginPath();
      ctx.strokeStyle = "#fff";
      for (let i = 0; i < path.length; i++) {
        let px = 300 + path[i][0] / 200000;
        let py = 300 - path[i][1] / 200000;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.fillStyle = "#f59f00";
      ctx.beginPath();
      ctx.arc(300 + x / 200000, 300 - y / 200000, 4, 0, 2 * Math.PI);
      ctx.fill();

      if (r < R) {
        alert("Payload crashed!");
        return;
      }
      if (r > 1.5e7) {
        alert("Payload escaped!");
        return;
      }

      requestAnimationFrame(update);
    }

    update();
  }
</script>

<hr>

<h2>3. Real World Examples</h2>
<table border="1" cellpadding="8" cellspacing="0">
  <tr><th>Scenario</th><th>Trajectory</th><th>Example</th></tr>
  <tr><td>Satellite Deployment</td><td>Elliptical Orbit</td><td>Starlink, ISS</td></tr>
  <tr><td>Moon Travel</td><td>Parabolic Arc</td><td>Apollo Missions</td></tr>
  <tr><td>Interplanetary Probe</td><td>Hyperbolic Path</td><td>Voyager 1 & 2</td></tr>
</table>

<hr>

<h2>4. How It Works (Numerical Model)</h2>
<p><strong>Euler Integration Method:</strong></p>
<pre>
r_new = r_old + v * Δt
v_new = v_old + a * Δt
a = -GM / r² * r̂
</pre>

<hr>

<h2>5. Trajectory Comparison Based on Initial Velocity</h2>
<canvas id="trajectoryComparison" width="600" height="400"></canvas>

<h2>6. Payload Trajectories by Velocity</h2>
<canvas id="velocityCurves" width="600" height="400"></canvas>

<script>
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

<hr>

<h2>7. Conclusion</h2>
<p>This project helps you visualize how gravitational physics works in real missions, and how trajectory decisions affect the fate of a payload. It combines <strong>physics</strong>, <strong>programming</strong>, and <strong>space engineering</strong> in a powerful, visual way.</p>

</body>
</html>
