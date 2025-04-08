# Problem 1


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

