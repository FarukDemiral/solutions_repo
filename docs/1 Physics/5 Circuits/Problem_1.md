# Problem 1
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