# Problem 2  
## Forced Damped Pendulum Simulation and Analysis

### 🧮 Differential Equation

The forced damped pendulum is governed by the nonlinear second-order differential equation:

$$
\frac{d^2\theta}{dt^2} + \gamma \frac{d\theta}{dt} + \omega_0^2 \sin(\theta) = A \cos(\omega t)
$$

Where:

- \( \theta \): angular displacement  
- \( \gamma \): damping coefficient  
- \( \omega_0 \): natural frequency  
- \( A \): driving amplitude  
- \( \omega \): driving frequency  

---

### ⚙️ Parameters

$$
\begin{align*}
\gamma &= 0.5 \quad \text{(Damping coefficient)} \\
A &= 1.2 \quad \text{(Driving amplitude)} \\
\omega &= \frac{2}{3} \quad \text{(Driving frequency)} \\
\omega_0 &= 1.5 \quad \text{(Natural frequency)} \\
\theta(0) &= 0.2 \quad \text{(Initial angle)} \\
\dot{\theta}(0) &= 0.0 \quad \text{(Initial angular velocity)} \\
t_{max} &= 100 \quad \text{(Simulation time)} \\
\Delta t &= 0.01 \quad \text{(Time step)} \\
\end{align*}
$$

---

### 🧠 Simulation Code

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js"></script>
    <title>Forced Damped Pendulum</title>
  </head>
  <body>
    <script>
      let theta = Math.PI / 6;
      let omega = 0;
      let damping = 0.01;
      let drivingForce = 0.5;
      let drivingFreq = 2 / 3;
      let time = 0;
      let g = 1;
      let length = 150;

      function setup() {
        createCanvas(400, 400);
      }

      function draw() {
        background(240);
        translate(width / 2, height / 4);

        // Physics calculations
        let alpha = -g * sin(theta) - damping * omega + drivingForce * cos(drivingFreq * time);
        omega += alpha * 0.05;
        theta += omega * 0.05;
        time += 0.05;

        // Draw pendulum
        let x = length * sin(theta);
        let y = length * cos(theta);

        stroke(0);
        strokeWeight(2);
        line(0, 0, x, y);
        fill(50, 100, 200);
        ellipse(x, y, 20);
      }
    </script>
  </body>
</html>
