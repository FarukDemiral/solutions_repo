# Problem 2 - Escape & Cosmic Velocities Simulation

## 1. Motivation

The concept of escape velocity is crucial for understanding the conditions required to leave a celestial body's gravitational influence. Extending this concept, the first, second, and third cosmic velocities define the thresholds for orbiting, escaping, and leaving a star system. These principles underpin modern space exploration, from launching satellites to interplanetary missions.

---

## 2. Theoretical Foundation

The gravitational potential energy and kinetic energy concepts are used to derive these velocities.

- **1st Cosmic Velocity (Orbital):**  
  The minimum speed needed to stay in circular orbit around a planet:  
  $$ v_1 = \sqrt{\frac{GM}{R}} $$

- **2nd Cosmic Velocity (Escape):**  
  The minimum speed needed to escape the planet's gravity:  
  $$ v_2 = \sqrt{2} \cdot v_1 = \sqrt{\frac{2GM}{R}} $$

- **3rd Cosmic Velocity (Solar Escape):**  
  The speed needed to escape the entire solar system, relative to the Sun:  
  $$ v_3 = v_2 + v_{\text{orbital}} $$

Where:  
- \(G = 6.67430 \times 10^{-11} \text{ m}^3 \text{kg}^{-1} \text{s}^{-2}\)  
- \(M\) is the mass of the celestial body  
- \(R\) is the radius of the celestial body

---

## 3. Simulation

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Escape & Cosmic Velocities Simulation</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #f9fbfd;
      color: #333;
      margin: 0;
      padding: 20px;
      max-width: 1200px;
      margin: auto;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      margin-top: 20px;
    }
    canvas {
      width: 100%;
      max-width: 800px;
      margin: 20px auto;
      display: block;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 30px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }
    th {
      background: #f0f4f8;
    }
    .note {
      font-size: 0.9em;
      color: #555;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <h1>Escape & Cosmic Velocities</h1>
  <div class="container">
    <h2>Velocity Comparison for Celestial Bodies</h2>
    <canvas id="velocityChart"></canvas>

    <table>
      <thead>
        <tr>
          <th>Planet</th>
          <th>1st Cosmic (km/s)</th>
          <th>2nd Cosmic (km/s)</th>
          <th>3rd Cosmic (km/s)</th>
        </tr>
      </thead>
      <tbody id="velocityTable"></tbody>
    </table>

    <div class="note">
      Based on standard values for mass and radius. Calculated using classical Newtonian mechanics.
    </div>
  </div>

  <script>
    const G = 6.67430e-11;
    const solarVelocity = 42.1;

    const bodies = [
      { name: "Earth", mass: 5.972e24, radius: 6371000 },
      { name: "Mars", mass: 6.417e23, radius: 3389500 },
      { name: "Jupiter", mass: 1.898e27, radius: 69911000 },
      { name: "Moon", mass: 7.342e22, radius: 1737000 },
      { name: "Venus", mass: 4.867e24, radius: 6052000 },
      { name: "Saturn", mass: 5.683e26, radius: 58232000 }
    ];

    const tableBody = document.getElementById("velocityTable");
    const chartData = {
      labels: [],
      datasets: [
        {
          label: "1st Cosmic Velocity",
          data: [],
          backgroundColor: "#4c6ef5"
        },
        {
          label: "2nd Cosmic Velocity",
          data: [],
          backgroundColor: "#82c91e"
        },
        {
          label: "3rd Cosmic Velocity",
          data: [],
          backgroundColor: "#f59f00"
        }
      ]
    };

    bodies.forEach(body => {
      const v1 = Math.sqrt(G * body.mass / body.radius) / 1000;
      const v2 = Math.sqrt(2) * v1;
      const v3 = v2 + solarVelocity;

      chartData.labels.push(body.name);
      chartData.datasets[0].data.push(v1);
      chartData.datasets[1].data.push(v2);
      chartData.datasets[2].data.push(v3);

      const row = `
        <tr>
          <td>${body.name}</td>
          <td>${v1.toFixed(2)}</td>
          <td>${v2.toFixed(2)}</td>
          <td>${v3.toFixed(2)}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

    new Chart(document.getElementById("velocityChart"), {
      type: "bar",
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Cosmic Velocities (km/s)"
          }
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Velocity (km/s)"
            }
          }
        }
      }
    });
  </script>
</body>
</html>


## 4. Results & Discussion

- Jupiter has the highest escape velocities due to its mass.
- Earth and Mars have significantly lower values.
- The third cosmic velocity is always highest because it includes escape from the solar system.

These values help us:
- Understand satellite orbits
- Plan interplanetary missions
- Estimate launch speeds and fuel requirements

---

## 5. Applications in Space Exploration

- **1st velocity:** Used by satellites orbiting planets (e.g., ISS around Earth)
- **2nd velocity:** Required for rockets to leave a planet's surface
- **3rd velocity:** Required for missions beyond the solar system (e.g., Voyager probes)

This problem demonstrates the interplay of gravity, motion, and engineering, offering insight into both theoretical physics and practical aerospace applications.
