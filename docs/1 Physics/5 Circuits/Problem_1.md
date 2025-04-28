# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lorentz Force Simulation</title>
    <style>
        canvas { border: 1px solid #ccc; }
    </style>
</head>
<body>
<canvas id="simulationCanvas" width="800" height="600"></canvas>

<script>
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Constants
const q = 1.6e-19;  // Coulombs
const m = 9.1e-31;  // kg
const dt = 1e-11;   // s
const steps = 800;

// Initial conditions
let r = {x: 400, y: 300};
let v = {x: 1e6, y: 0};

// Fields
const E = {x: 0, y: 0};
const B = 0.1;  // Tesla, perpendicular to plane

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
        r.x += v.x * dt * 1e-5; // scaled for visualization
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