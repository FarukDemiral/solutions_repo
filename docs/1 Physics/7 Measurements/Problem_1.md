# Problem 1
# Measuring Earth's Gravitational Acceleration with a Pendulum

## Introduction

The acceleration $g$ due to gravity is a fundamental physical constant essential for many scientific and engineering applications, including space exploration, structural engineering, and geophysical studies. This project employs a classical method using a simple pendulum to precisely measure gravitational acceleration, focusing on careful experimentation, detailed uncertainty analysis, and engaging visualizations.

---

## Objectives

* Measure Earth's gravitational acceleration ($g$) using a pendulum.
* Conduct rigorous uncertainty analysis.
* Visualize the concept interactively through a JavaScript-based simulation.

---

## Theory and Background

A simple pendulum consists of a mass (pendulum bob) attached by a string to a fixed pivot point. The motion of the pendulum under gravity exhibits periodic oscillations, and its period $T$ is determined by the gravitational acceleration $g$ and the length $L$ of the pendulum:

$$
T = 2\pi \sqrt{\frac{L}{g}}
$$

Rearranging, we solve for gravitational acceleration:

$$
g = \frac{4\pi^2 L}{T^2}
$$

---

## Procedure

### Required Materials

* String (1–1.5 meters long)
* Small weight (coins, keychain, or similar)
* Stopwatch or smartphone timer
* Measuring tape or ruler
* Sturdy support for suspension

### Experimental Setup

1. Securely attach the weight to one end of the string and the opposite end to a sturdy support.
2. Measure the pendulum length $L$ from the pivot point to the center of mass, noting the resolution of the measuring device. Compute uncertainty as:

$$
\Delta L = \frac{\text{Resolution of Measuring Tape}}{2}
$$

### Conducting the Experiment

1. Slightly displace the pendulum (< 15°) and release gently without pushing.
2. Use the stopwatch to record the time for 10 full oscillations. Repeat 10 times for accuracy.
3. Calculate the mean ($\overline{T_{10}}$) and standard deviation ($\sigma_T$) of your recorded times.
4. Compute uncertainty in the mean oscillation time:

$$
\Delta T_{10} = \frac{\sigma_T}{\sqrt{n}}, \quad n=10
$$

---

## Calculations

### Period of Oscillation

$$
T = \frac{\overline{T_{10}}}{10}, \quad \Delta T = \frac{\Delta T_{10}}{10}
$$

### Gravitational Acceleration $g$

$$
g = \frac{4\pi^2 L}{T^2}
$$

### Uncertainty Propagation

$$
\Delta g = g \sqrt{\left(\frac{\Delta L}{L}\right)^2 + \left(2\frac{\Delta T}{T}\right)^2}
$$

---

## Interactive Simulation

Experience the pendulum dynamics interactively:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Pendulum Simulation and Visualization</title>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <style>
    canvas {
      border: 1px solid #ddd;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h2>Pendulum Simulation</h2>
  <canvas id="pendulumCanvas" width="500" height="400"></canvas>

  <h2>Visualization: g vs. Pendulum Length</h2>
  <div id="chart" style="width: 600px; height: 400px;"></div>

  <script>
    // Pendulum Simulation
    const canvas = document.getElementById('pendulumCanvas');
    const ctx = canvas.getContext('2d');

    let angle = Math.PI / 4;
    let angleVelocity = 0;
    let angleAcceleration = 0;
    const gravity = 9.81;
    const length = 150;
    const originX = canvas.width / 2;
    const originY = 0;

    function drawPendulum() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bobX = originX + length * Math.sin(angle);
      const bobY = originY + length * Math.cos(angle);

      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'steelblue';
      ctx.fill();

      angleAcceleration = (-gravity / length) * Math.sin(angle);
      angleVelocity += angleAcceleration;
      angle += angleVelocity;
      angleVelocity *= 0.995; // damping

      requestAnimationFrame(drawPendulum);
    }

    drawPendulum();
  </script>

  <script>
    // Visualization: g vs. L
    const lengths = [0.5, 0.75, 1.0, 1.25, 1.5];
    const periods = lengths.map(L => 2 * Math.PI * Math.sqrt(L / 9.81));
    const g_values = lengths.map((L, i) => 4 * Math.PI * Math.PI * L / (periods[i] * periods[i]));

    const data = [
      {
        x: lengths,
        y: g_values,
        mode: 'lines+markers',
        name: 'Measured g'
      },
      {
        x: lengths,
        y: Array(lengths.length).fill(9.81),
        mode: 'lines',
        name: 'Standard g',
        line: { dash: 'dot' }
      }
    ];

    const layout = {
      title: 'Gravitational Acceleration (g) vs. Pendulum Length (L)',
      xaxis: { title: 'Length (m)' },
      yaxis: { title: 'g (m/s²)' }
    };

    Plotly.newPlot('chart', data, layout);
  </script>
</body>
</html>

---

## Detailed Analysis

### Comparison with Standard Value

* Evaluate your calculated $g$ against the established standard value of 9.81 m/s².

### Uncertainty and Errors

* Discuss the influence of measurement precision ($\Delta L$).
* Analyze the timing uncertainties ($\Delta T$).
* Address experimental assumptions and limitations that could affect accuracy.

---

## Conclusion

Summarize key findings, reflect on the accuracy of the method, and suggest improvements for future experiments.
