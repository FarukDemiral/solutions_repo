# Problem 1
# Simulating the Effects of the Lorentz Force

## Theoretical Background

The Lorentz force describes the force on a charged particle moving in electric and magnetic fields. The general formula is:

$$
\mathbf{F} = q (\mathbf{E} + \mathbf{v} \times \mathbf{B})
$$

where:
- \( \mathbf{F} \): Force on the particle
- \( q \): Charge of the particle
- \( \mathbf{E} \): Electric field
- \( \mathbf{v} \): Particle velocity
- \( \mathbf{B} \): Magnetic field

In this simulation, we focus on **uniform magnetic field** (\( \mathbf{E} = 0 \)):

$$
\mathbf{F} = q (\mathbf{v} \times \mathbf{B})
$$

---

## Simulation Setup

- Uniform magnetic field: \( \mathbf{B} = [0, 0, B_z] \)
- Initial particle velocity: adjustable
- Parameters: charge \( q \), mass \( m \), magnetic field strength \( B_z \)

---

## Interactive Simulation

<canvas id="simulationCanvas" width="600" height="400" style="border:1px solid #ccc;"></canvas>
<div style="margin-top: 10px;">
  <label>Initial velocity X (m/s): <input type="number" id="vx" value="1e6"></label>
  <label>Initial velocity Y (m/s): <input type="number" id="vy" value="0"></label>
  <label>Initial velocity Z (m/s): <input type="number" id="vz" value="1e6"></label>
  <label>Magnetic field Bz (T): <input type="number" id="bz" value="1"></label>
  <button onclick="startSimulation()">Start Simulation</button>
</div>

<script>
// Lorentz Force Simulation in a Uniform Magnetic Field
let ctx = document.getElementById('simulationCanvas').getContext('2d');
let animationId;

function startSimulation() {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, 600, 400);

    const q = 1.6e-19;           // Charge (C)
    const m = 9.11e-31;          // Mass (kg)
    const Bz = parseFloat(document.getElementById('bz').value); // Magnetic field (T)
    const v = [parseFloat(document.getElementById('vx').value),
               parseFloat(document.getElementById('vy').value),
               parseFloat(document.getElementById('vz').value)];
    let r = [300, 200, 0];       // Initial position (center of canvas)
    
    const dt = 1e-11;            // Time step

    function draw() {
        // Lorentz force: F = q (v x B)
        let force = [
            q * (v[1] * Bz - v[2] * 0),
            q * (-v[0] * Bz),
            0
        ];

        // Acceleration: a = F / m
        let a = [force[0] / m, force[1] / m, force[2] / m];

        // Update velocity and position
        v[0] += a[0] * dt;
        v[1] += a[1] * dt;
        v[2] += a[2] * dt;
        r[0] += v[0] * dt * 1e9; // Scaled for visualization
        r[1] += v[1] * dt * 1e9;

        // Draw particle
        ctx.fillStyle = "blue";
        ctx.fillRect(r[0], r[1], 2, 2);

        // Repeat
        animationId = requestAnimationFrame(draw);
    }

    draw();
}
</script>

---

## Visualization Explanation

- The blue dot represents the charged particle.
- The path shows the **circular or helical trajectory** due to the magnetic field.
- By adjusting the initial velocity and magnetic field strength, you can observe:
  - **Circular motion** (perpendicular velocity)
  - **Helical motion** (velocity has a parallel component)

---

## Physical Phenomena

- **Larmor Radius**:

  $$
  r_L = \frac{m v_\perp}{q B}
  $$

- **Cyclotron Frequency**:

  $$
  \omega_c = \frac{q B}{m}
  $$

---

## Further Suggestions for Extension

- Add **electric field \( \mathbf{E} \)** and explore combined fields.
- Implement **non-uniform magnetic fields**.
- Add **sliders** for real-time parameter changes using `range` inputs.
- Compute and display **Larmor radius** on the simulation dynamically.

---

> *Prepared for Problem 1: Simulating the Effects of the Lorentz Force.*
