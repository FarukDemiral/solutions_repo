# Problem 2

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Forced Damped Pendulum</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      margin: 0;
      padding: 1rem;
      text-align: center;
    }
    canvas {
      background: white;
      border: 1px solid #ccc;
    }
    h1 {
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <h1>Forced Damped Pendulum</h1>
  <canvas id="canvas" width="800" height="400"></canvas>
  <script>
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let gamma = 0.5, A = 1.2, omega = 0.67, omega0 = 1.0;
    let theta = 0.2, thetaDot = 0.0, t = 0, dt = 0.05;
    let points = [];

    function rk4(t, y, dt) {
      const f = (t, y) => {
        const [theta, thetaDot] = y;
        const dtheta = thetaDot;
        const dthetaDot = -gamma * thetaDot - omega0**2 * Math.sin(theta) + A * Math.cos(omega * t);
        return [dtheta, dthetaDot];
      };
      const k1 = f(t, y);
      const k2 = f(t + dt/2, y.map((v,i) => v + dt*k1[i]/2));
      const k3 = f(t + dt/2, y.map((v,i) => v + dt*k2[i]/2));
      const k4 = f(t + dt, y.map((v,i) => v + dt*k3[i]));
      return y.map((v,i) => v + dt/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]));
    }

    function step() {
      [theta, thetaDot] = rk4(t, [theta, thetaDot], dt);
      t += dt;
      points.push([t, theta]);
      if (points.length > canvas.width) points.shift();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      points.forEach(([_, y], i) => {
        const x = i;
        const yCoord = canvas.height / 2 - y * 100;
        if (i === 0) ctx.moveTo(x, yCoord);
        else ctx.lineTo(x, yCoord);
      });
      ctx.strokeStyle = "blue";
      ctx.stroke();
    }

    function loop() {
      step();
      draw();
      requestAnimationFrame(loop);
    }

    loop();
  </script>
</body>
</html>
