# Problem 1
# 📘 Simulating the Effects of the Lorentz Force

## 1. Introduction
The Lorentz force describes how electric and magnetic fields influence the motion of charged particles. The force is defined as:

$$ \vec{F} = q (\vec{E} + \vec{v} \times \vec{B}) $$

Where:
- \( q \): charge of the particle
- \( \vec{E} \): electric field
- \( \vec{B} \): magnetic field
- \( \vec{v} \): velocity of the particle

This simulation focuses on visualizing how different field configurations affect the trajectory of a charged particle.

---

## 2. JavaScript Simulation Code for GitHub Pages

Since this project is intended to run on GitHub Pages, the following code implements the Lorentz force simulation in **JavaScript** using the HTML5 `<canvas>` element. This allows users to run the simulation directly in the browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorentz Force Simulator</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #f5f5f5; }
    canvas { border: 1px solid #ccc; background: white; }
    input, label { margin-top: 10px; display: block; }
  </style>
</head>
<body>
  <h2>Lorentz Force Simulator (JavaScript)</h2>
  <canvas id="simCanvas" width="600" height="400"></canvas>

  <label>Charge (q, C): <input type="number" id="charge" value="1.6e-19" step="1e-21"></label>
  <label>Mass (m, kg): <input type="number" id="mass" value="9.11e-31" step="1e-33"></label>
  <label>Electric Field (E<sub>x</sub>, E<sub>y</sub>, E<sub>z</sub>):
    <input type="number" id="Ex" value="0" step="1e3">
    <input type="number" id="Ey" value="0" step="1e3">
    <input type="number" id="Ez" value="0" step="1e3">
  </label>
  <label>Magnetic Field (B<sub>x</sub>, B<sub>y</sub>, B<sub>z</sub>):
    <input type="number" id="Bx" value="0" step="0.1">
    <input type="number" id="By" value="0" step="0.1">
    <input type="number" id="Bz" value="1" step="0.1">
  </label>
  <label>Initial Velocity (v<sub>x</sub>, v<sub>y</sub>, v<sub>z</sub>):
    <input type="number" id="vx" value="1e5" step="1e4">
    <input type="number" id="vy" value="0" step="1e4">
    <input type="number" id="vz" value="0" step="1e4">
  </label>

  <script>
    const canvas = document.getElementById('simCanvas');
    const ctx = canvas.getContext('2d');

    // Constants
    let q = parseFloat(document.getElementById('charge').value);
let m = parseFloat(document.getElementById('mass').value);
let E = [
  parseFloat(document.getElementById('Ex').value),
  parseFloat(document.getElementById('Ey').value),
  parseFloat(document.getElementById('Ez').value)
];
let B = [
  parseFloat(document.getElementById('Bx').value),
  parseFloat(document.getElementById('By').value),
  parseFloat(document.getElementById('Bz').value)
];
let dt = 1e-9;       // Time step (s)

    // Initial Conditions
    let pos = [300, 200, 0];
let vel = [
  parseFloat(document.getElementById('vx').value),
  parseFloat(document.getElementById('vy').value),
  parseFloat(document.getElementById('vz').value)
];                // Initial velocity (m/s)
    let trail = [];

    function cross(a, b) {
      return [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
      ];
    }

    function update() {
      const vxB = cross(vel, B);
      const F = [
        q * (E[0] + vxB[0]),
        q * (E[1] + vxB[1]),
        q * (E[2] + vxB[2])
      ];
      const a = [F[0]/m, F[1]/m, F[2]/m];
      vel[0] += a[0] * dt;
      vel[1] += a[1] * dt;
      vel[2] += a[2] * dt;
      pos[0] += vel[0] * dt;
      pos[1] += vel[1] * dt;
      trail.push([pos[0], pos[1]]);
      if (trail.length > 300) trail.shift();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      trail.forEach((p, i) => {
        ctx.lineTo(p[0], p[1]);
      });
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }

    function loop() {
      update();
      draw();
      requestAnimationFrame(loop);
    }

    loop();
  </script>
</body>
</html>
```

---

## 3. Visualization Summary
The simulation displays a charged particle under a **uniform magnetic field** in the z-direction. The particle exhibits **circular motion** due to the magnetic Lorentz force acting perpendicular to its velocity.

Modify the `E` and `B` vectors to simulate:
- Helical trajectories
- E×B drift
- Linear acceleration in electric fields

---

## 4. Practical Applications

### Cyclotrons
- Accelerate charged particles in a spiral path using magnetic fields.
- The circular motion in this simulation reflects the principle of cyclotron operation.

### Magnetic Traps
- Particles are confined using a combination of electric and magnetic fields.
- Visualization of confinement mechanisms in simplified 2D space.

### Plasma Physics
- Simulates motion of charged particles in magnetically confined plasma.
- Basis for understanding particle drift and confinement in fusion reactors.

---

## 5. Future Work
- Add UI controls to adjust \( q, m, \vec{E}, \vec{B}, \vec{v} \)
- Include advanced integration methods (e.g. **Runge-Kutta**)
- Simulate **non-uniform fields** (field gradients or varying fields)
- Visualize **Larmor radius** and **gyrofrequency**
- Include plots of energy vs. time or phase space
- Extend to full 3D visualization using WebGL or Plotly.js
