# Problem 3 - Trajectories of a Freely Released Payload Near Earth

## 1. Motivation

When a payload is released from a moving rocket near Earth, its motion is governed by Newton’s Law of Gravitation. The object’s trajectory—whether **elliptical**, **parabolic**, or **hyperbolic**—depends on its **initial speed**, **direction**, and **altitude**.

This simulation demonstrates how different initial conditions affect the path of a released object. This is key in **satellite launches**, **orbital missions**, and **planetary escape**.

---

## 2. Theoretical Background

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

## 3. Interactive Simulation

🎯 Test different **initial velocities** and **angles** to explore:
- 🌍 Orbital insertion
- 🚀 Escape
- 🌠 Reentry

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payload Trajectory near Earth</title>
  <style>
    body { font-family: sans-serif; background: #f0f4f8; text-align: center; }
    canvas { border: 1px solid #ccc; background: #000; display: block; margin: auto; }
    input, button { margin: 10px; padding: 6px; font-size: 16px; }
  </style>
</head>
<body>
  <h2>Payload Trajectory near Earth</h2>
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
        let r = Math.sqrt(x*x + y*y);
        let a = G * M / (r * r);
        let ax = -a * x / r;
        let ay = -a * y / r;

        vx += ax * dt;
        vy += ay * dt;
        x += vx * dt;
        y += vy * dt;

        path.push([x, y]);

        // draw
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

        // payload
        ctx.fillStyle = "#f59f00";
        ctx.beginPath();
        ctx.arc(300 + x/200000, 300 - y/200000, 4, 0, 2*Math.PI);
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
</body>
</html>


## 4. Real World Examples

| Scenario              | Trajectory       | Mission Example        |
|----------------------|------------------|------------------------|
| Satellite Deployment | Elliptical Orbit | Starlink, ISS          |
| Moon Travel          | Parabolic Arc    | Apollo Missions        |
| Interplanetary Probe | Hyperbolic Path  | Voyager 1, Voyager 2   |

---

## 5. How It Works (Numerical Model)

We simulate motion using a basic **Euler Integration** scheme:
- Position update:  
  $$ \vec{r}_{\text{new}} = \vec{r}_{\text{old}} + \vec{v} \cdot \Delta t $$
- Velocity update:  
  $$ \vec{v}_{\text{new}} = \vec{v}_{\text{old}} + \vec{a} \cdot \Delta t $$
- Acceleration from gravity:  
  $$ \vec{a} = -\frac{GM}{r^2} \cdot \hat{r} $$

---



## 7. Conclusion

This project helps you visualize how gravitational physics works in real missions, and how trajectory decisions affect the fate of a payload. It combines **physics**, **programming**, and **space engineering**.

---
