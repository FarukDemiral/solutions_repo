# Problem 1
# Lorentz Force Simulation in Electromagnetic Fields

## Project Goal
This project aims to simulate and visualize the behavior of charged particles under the influence of electric \( \vec{E} \) and magnetic \( \vec{B} \) fields, using the Lorentz force law:

$$
\vec{F} = q\vec{E} + q\vec{v} \times \vec{B}
$$

We'll explore real-world applications such as cyclotrons, magnetic traps, and plasma confinement devices by modeling particle trajectories using numerical techniques.

---

## Advanced Simulations Index
Below are advanced and visually impressive Lorentz force simulations:

1. **Helical Motion** (3D-like spiral)
2. **Multiple Particles Simulation** (Particle cloud effect)
3. **Dynamic Vector Field Visualization** (E and B vectors on screen)
4. **Interactive Parameter Simulation** (Sliders to adjust E, B, velocity)
5. **Magnetic Mirror Effect** (Non-uniform B field, particle reflects)

---

## Simulation 4: Helical Motion (3D-like Spiral)
```html
<canvas id="helixCanvas" width="800" height="400"></canvas>
<script>
  const helix = document.getElementById("helixCanvas");
  const hctx = helix.getContext("2d");

  let pos = { x: 0, y: 200, z: 0 }, vel = { x: 2, y: 0, z: 1 };
  const Bz = 1, dt = 0.2, steps = 2000;
  const scale = 10;

  hctx.beginPath();
  hctx.moveTo(400 + pos.x * scale, pos.z * scale);

  for (let i = 0; i < steps; i++) {
    const ax = vel.y * Bz;
    const ay = -vel.x * Bz;
    vel.x += ax * dt;
    vel.y += ay * dt;
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.z += vel.z * dt;
    hctx.lineTo(400 + pos.x * scale, pos.z * scale);
  }

  hctx.strokeStyle = '#6f42c1';
  hctx.stroke();
</script>
```

---

