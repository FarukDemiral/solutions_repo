# Problem 1
# Simulating the Effects of the Lorentz Force

## Theoretical Foundation

The Lorentz force is a fundamental concept in electromagnetism that governs the dynamics of charged particles in the presence of electric and magnetic fields. It is expressed as:

$$
\mathbf{F} = q\mathbf{E} + q\mathbf{v} \times \mathbf{B}
$$

where:
- \(\mathbf{F}\) is the total electromagnetic force acting on the particle (in newtons),
- \(q\) is the electric charge of the particle (in coulombs),
- \(\mathbf{E}\) is the electric field vector (in volts per meter),
- \(\mathbf{v}\) is the velocity vector of the particle (in meters per second),
- \(\mathbf{B}\) is the magnetic field vector (in teslas),
- \(\times\) denotes the vector cross product.

This equation describes how a charged particle experiences a force due to both the electric and magnetic components of an electromagnetic field. The electric field exerts a force in the direction of the field (if the charge is positive), while the magnetic force depends on the direction and magnitude of the particle's velocity as well as the magnetic field.

The cross product \(\mathbf{v} \times \mathbf{B}\) results in a force perpendicular to both the velocity of the particle and the direction of the magnetic field, leading to curved paths such as circular or helical motion. The magnitude of the magnetic part of the force is given by:

$$
F_B = qvB \sin(\theta)
$$

where \(\theta\) is the angle between \(\mathbf{v}\) and \(\mathbf{B}\).

### Key Consequences:
- In a **uniform magnetic field**, particles move in circular or helical paths depending on their initial velocity direction.
- In a **crossed electric and magnetic field**, the particle can exhibit drift motion (e.g., \(\mathbf{E} \times \mathbf{B}\) drift).
- The **radius of circular motion** (Larmor radius) is given by:

$$
r_L = \frac{mv_\perp}{qB}
$$

where \(v_\perp\) is the velocity component perpendicular to \(\mathbf{B}\).

---

## Simulation Setup and Implementation (JavaScript)

Below is a JavaScript simulation of a charged particle's motion under a uniform magnetic field. The script uses a simple Euler method to numerically integrate the equations of motion and visualizes the particle's trajectory using an HTML5 Canvas.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorentz Force Simulation</title>
    <style>
        canvas { border: 1px solid #ccc; display: block; margin: auto; }
        body { font-family: sans-serif; background-color: #f4f4f4; text-align: center; }
    </style>
</head>
<body>
<h2>Charged Particle in a Uniform Magnetic Field</h2>
<canvas id="simulationCanvas" width="800" height="600"></canvas>

<script>
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Constants
const q = 1.6e-19;
const m = 9.1e-31;
const dt = 1e-11;
const steps = 10000;

// Initial state
let r = {x: 400, y: 300};
let v = {x: 1e6, y: 0};

// Fields
const E = {x: 0, y: 0};
const B = 0.1;

function lorentzForce(v, E, B, q) {
    return {
        x: q * (E.x + v.y * B),
        y: q * (E.y - v.x * B)
    };
}

function runSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);

    for (let i = 0; i < steps; i++) {
        const a = lorentzForce(v, E, B, q);
        v.x += (a.x / m) * dt;
        v.y += (a.y / m) * dt;
        r.x += v.x * dt * 1e-5;
        r.y += v.y * dt * 1e-5;
        ctx.lineTo(r.x, r.y);
    }

    ctx.strokeStyle = '#007BFF';
    ctx.stroke();
}

runSimulation();
</script>
</body>
</html>
```

---

## Practical Applications

### 1. Cyclotrons and Synchrotrons
Particles accelerated in circular paths using strong magnetic fields. Lorentz force determines curvature.

### 2. Mass Spectrometry
Separation of ions by their mass-to-charge ratio by deflection in a magnetic field.

### 3. Plasma Confinement in Fusion Reactors
Charged particles are trapped using magnetic fields, forming helical trajectories to confine hot plasma.

---

## Future Improvements and Extensions
- Simulate **non-uniform magnetic fields**.
- Add **relativistic velocity corrections**.
- Implement **Runge-Kutta integration** for improved numerical accuracy.
- Allow user-controlled inputs for field strength, velocity, and particle mass/charge.

This extended formulation provides a rigorous theoretical base and professional-quality visualization to demonstrate Lorentz force dynamics in educational or research-based contexts.

