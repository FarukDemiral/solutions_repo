# Problem 3 - Trajectories of a Freely Released Payload Near Earth

## 1. Theoretical Background

We use Newton's law of gravity:

$$
F = \frac{GMm}{r^2}
$$

- \( G = 6.67430 \times 10^{-11} \, \text{Nm}^2/\text{kg}^2 \)
- \( M \): mass of Earth
- \( m \): mass of payload
- \( r \): distance from Earth's center

The escape velocity formula:

$$
v_{\text{escape}} = \sqrt{\frac{2GM}{R}}
$$

If:

- \( v < v_{\text{escape}} \) → elliptical or reentry
- \( v = v_{\text{escape}} \) → parabolic trajectory
- \( v > v_{\text{escape}} \) → hyperbolic escape

---

## 2. Interactive Simulation

🎯 Test different **initial velocities** and **angles** to explore:
- 🌍 Orbital insertion
- 🚀 Escape
- 🌠 Reentry

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Payload Trajectory Simulations</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f7fa;
      color: #333;
      padding: 20px;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    canvas {
      display: block;
      margin: 20px auto;
      border: 1px solid #ccc;
      background: #000;
    }
    .section {
      margin-bottom: 60px;
    }
  </style>
</head>
<body>

  <h1>🚀 Trajectories of a Freely Released Payload</h1>

  <div class="section">
    <h2>1️⃣ Payload Trajectory near Earth (Interactive)</h2>
    <label>Initial Velocity (m/s): <input id="speed" type="number" value="8000"></label>
    <label>Launch Angle (°): <input id="angle" type="number" value="45"></label>
    <button onclick="start()">Simulate</button>
    <canvas id="simCanvas" width="600" height="600"></canvas>
  </div>

  <div class="section">
    <h2>2️⃣ Trajectory Comparison Based On Initial Velocity</h2>
    <canvas id="comparisonChart" width="800" height="400"></canvas>
  </div>

  <div class="section">
    <h2>3️⃣ Payload Trajectories by Velocity Type</h2>
    <canvas id="velocityTypeChart" width="800" height="400"></canvas>
  </div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  // First Simulation
  const G = 6.6743e-11;
  const M = 5.972e24;
  const R = 6371000;
  const ctx1 = document.getElementById("simCanvas").getContext("2d");

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
      ctx1.clearRect(0, 0, 600, 600);
      ctx1.fillStyle = "#2c3e50";
      ctx1.beginPath();
      ctx1.arc(300, 300, 50, 0, 2 * Math.PI);
      ctx1.fill();
      ctx1.beginPath();
      ctx1.strokeStyle = "#fff";
      for (let i = 0; i < path.length; i++) {
        let px = 300 + path[i][0] / 200000;
        let py = 300 - path[i][1] / 200000;
        if (i === 0) ctx1.moveTo(px, py);
        else ctx1.lineTo(px, py);
      }
      ctx1.stroke();
      ctx1.fillStyle = "#f59f00";
      ctx1.beginPath();
      ctx1.arc(300 + x/200000, 300 - y/200000, 4, 0, 2*Math.PI);
      ctx1.fill();
      if (path.length < 800) requestAnimationFrame(update);
    }
    update();
  }

  // Second Simulation - Trajectory Comparison
  const ctx2 = document.getElementById("comparisonChart").getContext("2d");
  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: ['0 km', '2000 km', '4000 km', '6000 km', '8000 km'],
      datasets: [
        {
          label: 'Elliptical (7.5 km/s)',
          data: [0, 250, 400, 450, 300],
          borderColor: '#4c6ef5',
          fill: false
        },
        {
          label: 'Parabolic (11.2 km/s)',
          data: [0, 500, 1000, 1500, 2000],
          borderColor: '#82c91e',
          fill: false
        },
        {
          label: 'Hyperbolic (14.0 km/s)',
          data: [0, 800, 1600, 3000, 5000],
          borderColor: '#f59f00',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Trajectory Comparison Based on Initial Velocity'
        }
      },
      scales: {
        y: { title: { display: true, text: 'Altitude (km)' } },
        x: { title: { display: true, text: 'Horizontal Distance' } }
      }
    }
  });

  // Third Simulation - Payload Velocities
  const ctx3 = document.getElementById("velocityTypeChart").getContext("2d");
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ['Elliptical', 'Parabolic', 'Hyperbolic'],
      datasets: [{
        label: 'Velocity (km/s)',
        data: [7.5, 11.2, 14.0],
        backgroundColor: ['#4c6ef5', '#82c91e', '#f59f00']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Payload Trajectories by Velocity Type'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Velocity (km/s)'
          }
        }
      }
    }
  });
</script>

</body>
</html>


---

## 3. Real World Examples

| Scenario              | Trajectory       | Mission Example        |
|----------------------|------------------|------------------------|
| Satellite Deployment | Elliptical Orbit | Starlink, ISS          |
| Moon Travel          | Parabolic Arc    | Apollo Missions        |
| Interplanetary Probe | Hyperbolic Path  | Voyager 1, Voyager 2   |

---

## 4. How It Works (Numerical Model)

We simulate motion using a basic **Euler Integration** scheme:

**Position update**

$$
\vec{r}_{\text{new}} = \vec{r}_{\text{old}} + \vec{v} \cdot \Delta t
$$

**Velocity update**

$$
\vec{v}_{\text{new}} = \vec{v}_{\text{old}} + \vec{a} \cdot \Delta t
$$

**Acceleration from gravity**

$$
\vec{a} = -\frac{GM}{r^2} \cdot \hat{r}
$$

---

## 5. Conclusion

This project helps you visualize how gravitational physics works in real missions, and how trajectory decisions affect the fate of a payload. It combines **physics**, **programming**, and **space engineering** in a powerful, visual way.
