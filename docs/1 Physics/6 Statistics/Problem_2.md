# Problem 2
# Simulating the Effects of the Lorentz Force

## Introduction

Charged particles moving in electric and magnetic fields experience a force described by the Lorentz equation:

$$
\mathbf{F} = q\mathbf{E} + q\mathbf{v} \times \mathbf{B}
$$

This fundamental equation governs how particles like electrons and ions behave in devices such as particle accelerators, plasma confinement systems, and mass spectrometers. This project explores the effect of different field configurations and parameters on particle trajectories using real-time simulation.


## Simulation Setup

To simulate the motion of a particle under the Lorentz force, we consider a 2D plane (x-y) where:

* The **magnetic field** is applied in the z-direction (\$B\_z\$).
* The **electric field** is applied in the y-direction (\$E\_y\$).
* The particle starts with an initial velocity in the x-direction (\$v\_x\$).

We numerically solve the equations of motion using a basic Euler method.


## Interactive Simulation

```html
<!-- Load Plotly.js -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<h3>Lorentz Force Simulation (2D)</h3>
<div>
  <label>Magnetic Field Bz (T): <input type="range" id="Bz" min="-5" max="5" value="1" step="0.1"> <span id="BzVal">1</span></label><br>
  <label>Electric Field Ey (V/m): <input type="range" id="Ey" min="-10" max="10" value="0" step="0.5"> <span id="EyVal">0</span></label><br>
  <label>Initial Velocity vx (m/s): <input type="range" id="vx" min="-10" max="10" value="5" step="0.5"> <span id="vxVal">5</span></label>
</div>
<div id="plot" style="width:100%;height:500px;"></div>

<script>
const q = 1;
const m = 1;
let dt = 0.05, tMax = 20;

function simulate(Bz, Ey, vx0) {
  let x = 0, y = 0, vx = vx0, vy = 0;
  let xData = [], yData = [];

  for (let t = 0; t < tMax; t += dt) {
    let Fx = q * (vy * Bz);
    let Fy = q * (Ey - vx * Bz);
    vx += Fx / m * dt;
    vy += Fy / m * dt;
    x += vx * dt;
    y += vy * dt;
    xData.push(x);
    yData.push(y);
  }

  Plotly.newPlot('plot', [{
    x: xData,
    y: yData,
    mode: 'lines',
    line: { width: 3 },
    name: 'Trajectory'
  }], {
    title: 'Charged Particle Trajectory in E and B Fields',
    xaxis: { title: 'x (m)' },
    yaxis: { title: 'y (m)' }
  });
}

function updateSim() {
  let Bz = parseFloat(document.getElementById('Bz').value);
  let Ey = parseFloat(document.getElementById('Ey').value);
  let vx = parseFloat(document.getElementById('vx').value);
  document.getElementById('BzVal').innerText = Bz;
  document.getElementById('EyVal').innerText = Ey;
  document.getElementById('vxVal').innerText = vx;
  simulate(Bz, Ey, vx);
}

['Bz', 'Ey', 'vx'].forEach(id => {
  document.getElementById(id).addEventListener('input', updateSim);
});

updateSim();
</script>
```


## Observations

* **Circular Motion**: When only \$\mathbf{B}\$ is present, the particle follows a circular path.
* **Drift Motion**: When both \$\mathbf{E}\$ and \$\mathbf{B}\$ are present and perpendicular, the particle drifts in a straight line ($\mathbf{E} \times \mathbf{B}$ drift).
* **Acceleration**: An electric field in the direction of motion results in acceleration, changing the radius and shape of the trajectory.

## Physical Insight

This simulation helps us visualize and understand important physical phenomena:

* **Larmor Radius**: The radius of the circular trajectory in a magnetic field.
* **Cyclotron Motion**: Periodic motion of charged particles in a uniform magnetic field.
* **Crossed Fields Drift**: A constant drift velocity arises perpendicular to both \$\mathbf{E}\$ and \$\mathbf{B}\$ fields.

## Conclusion

This interactive tool provides a real-time understanding of how charged particles behave under electric and magnetic fields. By adjusting physical parameters, users can observe and analyze realistic behaviors, preparing them for deeper study in electrodynamics and plasma physics.
