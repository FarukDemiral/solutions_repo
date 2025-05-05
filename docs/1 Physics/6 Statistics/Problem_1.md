# Problem 1
# Simulating the Effects of the Lorentz Force

## Motivation

The Lorentz force, expressed mathematically as:

$$
\mathbf{F} = q\mathbf{E} + q\mathbf{v} \times \mathbf{B}
$$

governs the motion of charged particles in electric and magnetic fields. It is foundational in fields such as plasma physics, particle accelerators, and astrophysics. By focusing on simulations, we can explore practical applications and visualize the complex trajectories resulting from this force.


## Objectives

* **Visualize Particle Trajectories:** Illustrate how charged particles move under various combinations of electric and magnetic fields.
* **Interactive Simulation:** Allow users to adjust parameters like charge, mass, electric and magnetic fields, and initial velocity.
* **Analyze Motion:** Examine specific scenarios like uniform magnetic fields, crossed electric and magnetic fields, and the resulting drifts and circular motions.


## Task

### 1 Exploration of Applications

* Identify systems where the Lorentz force plays a key role (e.g., particle accelerators, mass spectrometers, plasma confinement).
* Discuss the relevance of electric (\$\mathbf{E}\$) and magnetic (\$\mathbf{B}\$) fields in controlling the motion of charged particles.

### 2 Simulating Particle Motion

* Implement a simulation to compute and visualize the trajectory of a charged particle under:

  * A uniform magnetic field.
  * Combined uniform electric and magnetic fields.
  * Crossed electric and magnetic fields.
* Simulate the particle’s circular, helical, or drift motion based on initial conditions and field configurations.

### 3 Parameter Exploration

* Allow variations in:

  * Field strengths (\$E, B\$).
  * Initial particle velocity (\$\mathbf{v}\$).
  * Charge and mass of the particle (\$q, m\$).
* Observe how these parameters influence the trajectory.

### 4 Visualization

* Create clear, labeled plots showing the particle’s path in 2D and 3D for different scenarios.
* Highlight physical phenomena such as the Larmor radius and drift velocity.


## Implementation

The simulation will be implemented using HTML, CSS, and JavaScript for interactivity. Visualizations will utilize Plotly.js for dynamic, responsive, and clear representations of particle trajectories.


## Interactive Simulation (2D)

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


## Hints and Resources

* Use numerical methods like the Euler or Runge-Kutta method to solve the equations of motion.
* Employ Python libraries such as NumPy for calculations and Matplotlib for visualizations.
* Start with simple cases (e.g., uniform magnetic field) and gradually add complexity (e.g., crossed fields).

This task focuses on applying the Lorentz force concept through simulations, enabling an intuitive understanding of its effects in real-world scenarios.


## Deliverables

1. A Markdown document with Python script or notebook implementing the simulations.
2. Visualizations of particle trajectories for the specified field configurations.
3. A discussion on how the results relate to practical systems, such as cyclotrons or magnetic traps.
4. Suggestions for extending the simulation to more complex scenarios, such as non-uniform fields.


## Expected Results

* Clear visualization and interpretation of particle paths under Lorentz force.
* Insights into practical applications such as magnetic confinement in fusion reactors and behavior in cyclotrons and astrophysical plasmas.


## Future Extensions

* Exploration of non-uniform fields
* Incorporation of relativistic effects
* Simulation of complex plasma phenomena


## References

* Griffiths, D. J. "Introduction to Electrodynamics"
* Chen, F. F. "Introduction to Plasma Physics and Controlled Fusion"
