# Problem 1
# ⚡ Lorentz Force Simulation in Electromagnetic Fields

## 🎯 Project Goal
This project aims to simulate and visualize the behavior of charged particles under the influence of electric \( \vec{E} \) and magnetic \( \vec{B} \) fields, using the Lorentz force law:

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques.

---

## 🚀 Advanced Simulations Index
Below are advanced and visually impressive Lorentz force simulations:

1. **Helical Motion** (3D-like spiral)
2. **Multiple Particles Simulation** (Particle cloud effect)
3. **Dynamic Vector Field Visualization** (E and B vectors on screen)
4. **Interactive Parameter Simulation** (Sliders to adjust E, B, velocity)
5. **Magnetic Mirror Effect** (Non-uniform B field, particle reflects)

---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Helical Motion Simulation</title>
  <style>
    body { background: #f4f4f4; text-align: center; font-family: Arial; }
    canvas { border: 1px solid #ccc; background: white; margin-top: 20px; }
  </style>
</head>
<body>

  <h2>Simulation 4: Helical Motion (Spiral View)</h2>
  <canvas id="helixCanvas" width="740" height="600"></canvas>

  <script>
    window.onload = function () {
      const canvas = document.getElementById("helixCanvas");
      const ctx = canvas.getContext("2d");

      // Initial position and velocity
      let x = 0, y = 0, z = 0;
      let vx = 2, vy = 2, vz = 1;

      const Bz = 1;       // Magnetic field in z-direction
      const dt = 0.1;     // Time step
      const steps = 2000; // Total steps
      const scale = 5;    // Scaling factor for visualization

      ctx.beginPath();
      ctx.moveTo(400 + x * scale, 200 + z * scale); // center x on canvas

      for (let i = 0; i < steps; i++) {
        // Magnetic force in x-y plane (circular motion)
        const ax = vy * Bz;
        const ay = -vx * Bz;

        vx += ax * dt;
        vy += ay * dt;

        x += vx * dt;
        y += vy * dt;
        z += vz * dt; // uniform motion in z-direction (straight)

        ctx.lineTo(400 + x * scale, 200 + z * scale);
      }

      ctx.strokeStyle = '#6f42c1';
      ctx.lineWidth = 2;
      ctx.stroke();
    };
  </script>

</body>
</html>


---

## 📌 How to Use This Simulation
- This simulates a charged particle with velocity components in both \( \vec{v}_\perp \) and \( \vec{v}_\parallel \) directions in a constant \( \vec{B} \) field.
- The result is a **helical trajectory**, which visually mimics 3D spiral motion on a 2D canvas.

---

✅ Next simulations (Multiple Particles, Field Visualization, Interactive, Magnetic Mirror) will follow individually on request.

