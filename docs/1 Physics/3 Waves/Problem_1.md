# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Problem 3 - Payload Trajectories</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f7fa;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    .container {
      max-width: 1000px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    canvas {
      margin: 30px auto;
      display: block;
      max-width: 100%;
    }
  </style>
</head>
<body>

  <div class="container">
    <h1>Problem 3 - Payload Trajectories Near Earth</h1>

    <h2>Trajectory Comparison Based On Initial Velocity</h2>
    <canvas id="trajectoryChart"></canvas>

    <h2>Payload Trajectories by Velocity</h2>
    <canvas id="payloadChart"></canvas>
  </div>

  <script>
    // Chart 1: Trajectory Comparison Based On Initial Velocity
    const ctx1 = document.getElementById('trajectoryChart').getContext('2d');
    new Chart(ctx1, {
      type: 'line',
      data: {
        labels: Array.from({length: 60}, (_, i) => i),
        datasets: [
          {
            label: 'Low Velocity (Reentry)',
            data: Array.from({length: 60}, (_, i) => 300 - 0.4*i*i),
            borderColor: '#e03131',
            tension: 0.3,
            fill: false
          },
          {
            label: 'Medium Velocity (Orbit)',
            data: Array.from({length: 60}, (_, i) => 300 + 20 * Math.sin(i / 10)),
            borderColor: '#228be6',
            tension: 0.3,
            fill: false
          },
          {
            label: 'High Velocity (Escape)',
            data: Array.from({length: 60}, (_, i) => 300 + i * 5),
            borderColor: '#40c057',
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Trajectory Comparison Based On Initial Velocity',
            font: { size: 18 }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (seconds)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Altitude (km)'
            }
          }
        }
      }
    });

    // Chart 2: Payload Trajectories by Velocity
    const ctx2 = document.getElementById('payloadChart').getContext('2d');
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Reentry', 'Orbit', 'Escape'],
        datasets: [{
          label: 'Maximum Altitude (km)',
          data: [150, 400, 1200],
          backgroundColor: ['#fa5252', '#339af0', '#69db7c']
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Payload Trajectories by Velocity',
            font: { size: 18 }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Altitude (km)'
            }
          }
        }
      }
    });
  </script>

</body>
</html>
