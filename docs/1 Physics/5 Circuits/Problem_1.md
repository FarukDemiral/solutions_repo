# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multiple Lorentz Simulations</title>
  <style>
    body { font-family: Arial, background: #f4f4f4; text-align: center; }
    canvas { border: 1px solid #aaa; margin: 20px; background: white; }
  </style>
</head>
<body>
  <h2>Simulation 1: Circular Motion (Uniform B Field)</h2>
  <canvas id="canvas1" width="800" height="300"></canvas>

  <h2>Simulation 2: E × B Drift</h2>
  <canvas id="canvas2" width="800" height="300"></canvas>

  <h2>Simulation 3: Pure Electric Field Acceleration</h2>
  <canvas id="canvas3" width="800" height="300"></canvas>

  <script>
    // ----------- SIMULATION 1 -----------
    const ctx1 = document.getElementById("canvas1").getContext("2d");
    let pos1 = { x: 400, y: 150 }, vel1 = { x: 2, y: 0 };
    const B1 = 1, E1 = { x: 0, y: 0 }, dt1 = 0.1, steps = 2000;

    function simulate1() {
      ctx1.beginPath(); ctx1.moveTo(pos1.x, pos1.y);
      for (let i = 0; i < steps; i++) {
        const ax = vel1.y * B1, ay = -vel1.x * B1;
        vel1.x += ax * dt1; vel1.y += ay * dt1;
        pos1.x += vel1.x * dt1; pos1.y += vel1.y * dt1;
        ctx1.lineTo(pos1.x, pos1.y);
      }
      ctx1.strokeStyle = '#007bff'; ctx1.stroke();
    }

    // ----------- SIMULATION 2 -----------
    const ctx2 = document.getElementById("canvas2").getContext("2d");
    let pos2 = { x: 400, y: 150 }, vel2 = { x: 0, y: 0 };
    const E2 = { x: 1, y: 0 }, B2 = 1, dt2 = 0.1;

    function simulate2() {
      ctx2.beginPath(); ctx2.moveTo(pos2.x, pos2.y);
      for (let i = 0; i < steps; i++) {
        const ax = E2.x + vel2.y * B2, ay = E2.y - vel2.x * B2;
        vel2.x += ax * dt2; vel2.y += ay * dt2;
        pos2.x += vel2.x * dt2; pos2.y += vel2.y * dt2;
        ctx2.lineTo(pos2.x, pos2.y);
      }
      ctx2.strokeStyle = '#FF5733'; ctx2.stroke();
    }

    // ----------- SIMULATION 3 -----------
    const ctx3 = document.getElementById("canvas3").getContext("2d");
    let pos3 = { x: 100, y: 150 }, vel3 = { x: 0, y: 0 };
    const E3 = { x: 0.5, y: 0 }, dt3 = 0.1;

    function simulate3() {
      ctx3.beginPath(); ctx3.moveTo(pos3.x, pos3.y);
      for (let i = 0; i < steps; i++) {
        vel3.x += E3.x * dt3; vel3.y += E3.y * dt3;
        pos3.x += vel3.x * dt3; pos3.y += vel3.y * dt3;
        ctx3.lineTo(pos3.x, pos3.y);
      }
      ctx3.strokeStyle = '#28a745'; ctx3.stroke();
    }

    // Run all simulations
    simulate1();
    simulate2();
    simulate3();
  </script>
</body>
</html>
