# Problem 1
<!DOCTYPE html>
<html>
<head>
<title>Charged Particle Simulation</title>
<style>
  body { margin: 0; }
  canvas { display: block; }
</style>
</head>
<body>
<canvas id="simulationCanvas"></canvas>
<script>
  const canvas = document.getElementById('simulationCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Constants (units are arbitrary)
  const q = 1;     // Charge of the particle
  const m = 1;     // Mass of the particle
  const B0 = 0.001; // Magnetic field strength (in the z-direction)
  const E = { x: 0, y: 0 }; // Electric field

  // Initial state of the particle
  let particle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 50,
    vy: 0,
    radius: 5,
    color: 'red',
    path: [] // Array to store the trajectory points
  };

  // Function to update the particle's state
  function updateParticle() {
    // Calculate the Lorentz force (F = q(E + v x B))
    const Fx = q * (E.x + particle.vy * B0);
    const Fy = q * (E.y - particle.vx * B0);

    // Calculate the acceleration (a = F / m)
    const ax = Fx / m;
    const ay = Fy / m;

    // Update the velocity (using Euler's method)
    particle.vx += ax;
    particle.vy += ay;

    // Update the position
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Store the current position in the path
    particle.path.push({ x: particle.x, y: particle.y });
    if (particle.path.length > 100) { // Limit the length of the trajectory
      particle.path.shift();
    }

    // Simple boundary collision (reflection)
    if (particle.x + particle.radius > canvas.width || particle.x - particle.radius < 0) {
      particle.vx *= -1;
    }
    if (particle.y + particle.radius > canvas.height || particle.y - particle.radius < 0) {
      particle.vy *= -1;
    }
  }

  // Function to draw on the canvas
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;
    for (let i = 0; i < particle.path.length - 1; i++) {
      ctx.moveTo(particle.path[i].x, particle.path[i].y);
      ctx.lineTo(particle.path[i + 1].x, particle.path[i + 1].y);
    }
    ctx.stroke();

    // Draw the particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  }

  // Animation loop
  function loop() {
    updateParticle();
    draw();
    requestAnimationFrame(loop);
  }

  // Start the animation
  loop();
</script>
</body>
</html>