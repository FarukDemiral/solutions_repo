# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields

## Project Goal
This project aims to simulate and visualize the behavior of charged particles under the influence of electric \( \vec{E} \) and magnetic \( \vec{B} \) fields, using the Lorentz force law:

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques.

---

## Theoretical Foundation
The Lorentz force determines how charged particles move through electromagnetic fields. Its effects depend on:
- The magnitude and direction of the electric field \( \vec{E} \)
- The direction and strength of the magnetic field \( \vec{B} \)
- The particle's velocity \( \vec{v} \), charge \( q \), and mass \( m \)

Key motion behaviors:
- **Circular or helical motion** in uniform \( \vec{B} \) fields
- **Drift motion** in crossed \( \vec{E} \) and \( \vec{B} \) fields

---

##  Task Breakdown

### Exploration of Applications
- Identify real-world systems using Lorentz force:
  - Particle accelerators (cyclotrons, synchrotrons)
  - Plasma confinement (tokamaks)
  - Mass spectrometers
- Discuss how \( \vec{E} \) and \( \vec{B} \) fields influence motion

### Simulating Particle Motion
- Compute and visualize trajectories under:
  - A uniform magnetic field
  - Combined uniform electric and magnetic fields
  - Crossed \( \vec{E} \) and \( \vec{B} \) fields
- Simulate circular, helical, and drift motion

### Parameter Exploration
- Allow variation of:
  - Field strengths (\( \vec{E}, \vec{B} \))
  - Initial velocity \( \vec{v} \)
  - Particle properties (\( q, m \))
- Observe how parameters affect motion

###  Visualization
- Create clear 2D plots of particle trajectories
- Highlight Larmor radius and \( \vec{E} \times \vec{B} \) drift

---

##  Interactive Simulation 

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorentz Force Simulator</title>
  <style>
    body { font-family: Arial; background: #f4f4f4; text-align: center; }
    canvas { border: 1px solid #aaa; background: white; }
  </style>
</head>
<body>
  <h2> Lorentz Force Particle Trajectory</h2>
  <canvas id="canvas" width="800" height="600"></canvas>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const dt = 0.05;         // Time step (arbitrary unit)
    const steps = 2000;      // Number of steps

    const q = 1;             // Charge (scaled)
    const m = 1;             // Mass (scaled)

    const scale = 1;         // Position scaling

    let pos = { x: 400, y: 300 };       // Start in middle of canvas
    let vel = { x: 2, y: 0 };           // Initial velocity

    const E = { x: 0, y: 0 };           // Electric field (can test with values like {x: 0.5, y: 0})
    const B = 1;                        // Magnetic field (perpendicular to plane)

    function lorentzForce(v, E, B, q) {
      return {
        x: q * (E.x + v.y * B),
        y: q * (E.y - v.x * B)
      };
    }

    function simulate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);

      for (let i = 0; i < steps; i++) {
        const a = lorentzForce(vel, E, B, q);
        vel.x += (a.x / m) * dt;
        vel.y += (a.y / m) * dt;
        pos.x += vel.x * dt * scale;
        pos.y += vel.y * dt * scale;

        // Keep drawing the trajectory
        ctx.lineTo(pos.x, pos.y);
      }

      ctx.strokeStyle = '#007bff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    simulate();
  </script>
</body>
</html>


##  Observations & Analysis
- In uniform \( \vec{B} \): Circular motion (Larmor orbits)
- In \( \vec{E} \times \vec{B} \) fields: Particle drifts
- Increasing \( v \) or \( B \): Tighter orbits

### Example: Larmor Radius
$$
 r_L = \frac{mv_\perp}{qB} 
$$

---

##  Suggestions for Extension
- Non-uniform magnetic fields (simulate magnetic mirrors)
- Vary electric field strength for E-field acceleration
- Relativistic effects (\( \gamma = \frac{1}{\sqrt{1 - v^2/c^2}} \))
- Interactive sliders for real-time parameter tuning

---



