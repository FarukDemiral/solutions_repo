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

HTML("""
<iframe width="100%" height="600" srcdoc="
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <script src='https://cdn.jsdelivr.net/npm/chart.js'></script>
  <style>
    body { font-family: sans-serif; background: #f4f7fa; padding: 20px; }
    table { border-collapse: collapse; width: 100%; margin-top: 20px; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
    th { background-color: #e2eafc; }
  </style>
</head>
<body>
  <h2 style='text-align:center;'>Escape & Cosmic Velocities</h2>
  <canvas id='velocityChart' width='700' height='350'></canvas>
  <table>
    <thead>
      <tr>
        <th>Planet</th>
        <th>1st Cosmic (km/s)</th>
        <th>2nd Cosmic (km/s)</th>
        <th>3rd Cosmic (km/s)</th>
      </tr>
    </thead>
    <tbody id='velocityTable'></tbody>
  </table>

  <script>
    const G = 6.67430e-11;
    const solarVelocity = 42.1;

    const bodies = [
      { name: 'Earth', mass: 5.972e24, radius: 6371000 },
      { name: 'Mars', mass: 6.417e23, radius: 3389500 },
      { name: 'Jupiter', mass: 1.898e27, radius: 69911000 }
    ];

    const table = document.getElementById('velocityTable');
    const labels = [];
    const v1Data = [], v2Data = [], v3Data = [];

    bodies.forEach(body => {
      const v1 = Math.sqrt(G * body.mass / body.radius) / 1000;
      const v2 = Math.sqrt(2) * v1;
      const v3 = v2 + solarVelocity;

      labels.push(body.name);
      v1Data.push(v1);
      v2Data.push(v2);
      v3Data.push(v3);

      table.innerHTML += '<tr><td>' + body.name + '</td><td>' +
        v1.toFixed(2) + '</td><td>' +
        v2.toFixed(2) + '</td><td>' +
        v3.toFixed(2) + '</td></tr>';
    });

    new Chart(document.getElementById('velocityChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: '1st Cosmic', data: v1Data, backgroundColor: '#4c6ef5' },
          { label: '2nd Cosmic', data: v2Data, backgroundColor: '#82c91e' },
          { label: '3rd Cosmic', data: v3Data, backgroundColor: '#f59f00' }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Escape & Cosmic Velocities (km/s)'
          }
        },
        scales: {
          y: {
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
">
</iframe>
""")

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
