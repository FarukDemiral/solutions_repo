# Problem 1

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payload Trajectories - Simulation</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background: #f4f7fa;
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    h2 {
      color: #2c3e50;
      margin-top: 40px;
    }
    canvas {
      margin: 20px auto;
      display: block;
      max-width: 800px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    input, button {
      padding: 8px 12px;
      font-size: 16px;
      margin: 6px;
    }
    .input-group {
      text-align: center;
      margin-bottom: 20px;
    }
    .alert {
      background: #ffe3e3;
      color: #c92a2a;
      padding: 10px;
      border-radius: 4px;
      margin: 10px auto;
      max-width: 500px;
      text-align: center;
      display: none;
    }
  </style>
</head>
<body>
  <h2>1. Payload Trajectory near Earth (Interactive)</h2>
  <div class="input-group">
    <label>Initial Velocity (m/s): <input id="speed" type="number" value="8000" /></label>
    <label>Launch Angle (°): <input id="angle" type="number" value="45" /></label>
    <button onclick="start()">Simulate</button>
  </div>
  <canvas id="simCanvas" width="600" height="600"></canvas>
  <div id="alertBox" class="alert"></div>

  <h2>2. Trajectory Comparison Based on Initial Velocity</h2>
  <canvas id="velocityComparisonChart" width="800" height="400"></canvas>

  <h2>3. Payload Trajectories by Velocity</h2>
  <canvas id="trajectoryTypesChart" width="800" height="400"></canvas>

  <script>
    // Simulation 1 - Real-time Payload Motion
    const G = 6.6743e-11, M = 5.972e24, R = 6371000;
    const ctx = document.getElementById("simCanvas").getContext("2d");
    const alertBox = document.getElementById("alertBox");

    function start() {
      let v = parseFloat(document.getElementById("speed").value);
      let angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;

      let x = 0, y = R + 500000;
      let vx = v * Math.cos(angle), vy = -v * Math.sin(angle);
      let path = [], dt = 0.1;

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

        ctx.clearRect(0, 0, 600, 600);
        ctx.fillStyle = "#2c3e50";
        ctx.beginPath();
        ctx.arc(300, 300, 50, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        path.forEach((p, i) => {
          let px = 300 + p[0] / 200000;
          let py = 300 - p[1] / 200000;
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        });
        ctx.stroke();

        ctx.fillStyle = "#f59f00";
        ctx.beginPath();
        ctx.arc(300 + x/200000, 300 - y/200000, 4, 0, 2 * Math.PI);
        ctx.fill();

        if (r < R) {
          alertBox.textContent = "🛑 Payload crashed!";
          alertBox.style.display = "block";
          return;
        }
        if (r > 2e7) {
          alertBox.textContent = "🚀 Payload escaped Earth's gravity!";
          alertBox.style.display = "block";
          return;
        }

        requestAnimationFrame(update);
      }
      alertBox.style.display = "none";
      update();
    }

    // Simulation 2 - Trajectory Comparison Based on Initial Velocity
    const velCtx = document.getElementById('velocityComparisonChart').getContext('2d');
    new Chart(velCtx, {
      type: 'line',
      data: {
        labels: Array.from({length: 100}, (_, i) => i),
        datasets: [
          {
            label: '5000 m/s',
            borderColor: 'blue',
            fill: false,
            data: Array.from({length: 100}, (_, x) => -0.01 * x * x + 5 * x + 500)
          },
          {
            label: '7800 m/s (Orbital)',
            borderColor: 'green',
            fill: false,
            data: Array.from({length: 100}, (_, x) => -0.006 * x * x + 8 * x + 500)
          },
          {
            label: '11000 m/s (Escape)',
            borderColor: 'red',
            fill: false,
            data: Array.from({length: 100}, (_, x) => -0.003 * x * x + 11 * x + 500)
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Horizontal Distance (arbitrary)' } },
          y: { title: { display: true, text: 'Height (arbitrary)' } }
        },
        plugins: {
          title: {
            display: true,
            text: 'Trajectory Comparison Based on Initial Velocity'
          }
        }
      }
    });

    // Simulation 3 - Payload Trajectories by Velocity Types
    const trajCtx = document.getElementById('trajectoryTypesChart').getContext('2d');
    new Chart(trajCtx, {
      type: 'line',
      data: {
        labels: Array.from({length: 100}, (_, i) => 6500 + i * 400),
        datasets: [
          {
            label: 'Elliptical',
            borderColor: 'blue',
            fill: false,
            data: Array.from({length: 100}, (_, x) => 500 + 3000 * Math.sin(x / 15))
          },
          {
            label: 'Parabolic',
            borderColor: 'green',
            fill: false,
            data: Array.from({length: 100}, (_, x) => 500 + x * 10)
          },
          {
            label: 'Hyperbolic',
            borderColor: 'red',
            fill: false,
            data: Array.from({length: 100}, (_, x) => 500 + x * 25)
          }
        ]
      },
      options: {
        scales: {
          x: { title: { display: true, text: "Distance from Earth's Center (10³ km)" } },
          y: { title: { display: true, text: 'Distance (km)' } }
        },
        plugins: {
          title: {
            display: true,
            text: 'Payload Trajectories by Velocity Type'
          }
        }
      }
    });
  </script>
</body>
</html>
