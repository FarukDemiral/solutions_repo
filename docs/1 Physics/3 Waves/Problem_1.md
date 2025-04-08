# Problem 1


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payload Trajectory near Earth</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: sans-serif;
      background: #f0f4f8;
      text-align: center;
      padding: 20px;
    }
    canvas {
      border: 1px solid #ccc;
      background: #000;
      display: block;
      margin: 30px auto;
    }
    input, button {
      margin: 10px;
      padding: 6px;
      font-size: 16px;
    }
    h2 {
      margin-top: 40px;
      color: #2c3e50;
    }
  </style>
</head>
<body>

  <h2>Payload Trajectory near Earth</h2>
  <label>Initial Velocity (m/s): <input id="speed" type="number" value="8000"></label><br>
  <label>Launch Angle (°): <input id="angle" type="number" value="45"></label><br>
  <button onclick="start()">Simulate</button>
  <canvas id="simCanvas" width="600" height="600"></canvas>

  <!-- First simulation script -->
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

  <!-- Second simulation: Trajectory Comparison -->
  <h2>Trajectory Comparison Based on Initial Velocity</h2>
  <canvas id="trajectoryChart" width="600" height="400"></canvas>
  <script>
    new Chart(document.getElementById("trajectoryChart"), {
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
            text: 'Trajectory Comparison Based on Initial Velocity'
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
  </script>

  <!-- Third simulation: Velocity vs Altitude -->
  <h2>Payload Trajectories by Velocity</h2>
  <canvas id="velocityChart" width="600" height="400"></canvas>
  <script>
    new Chart(document.getElementById("velocityChart"), {
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
            text: 'Payload Trajectories by Velocity'
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
