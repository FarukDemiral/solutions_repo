# Problem 2
# Estimating $\pi$ using Monte Carlo Methods

Monte Carlo simulations provide an intuitive and visual way to estimate mathematical constants like \( \pi \). This project implements two classic Monte Carlo techniques:

- **Estimating $\pi$ using a Unit Circle**
- **Estimating $\pi$ using Buffon’s Needle**

---

## Part 1: Estimating $\pi$ using a Unit Circle

### 1. Theoretical Foundation
The probability of a randomly chosen point falling inside a unit circle inscribed in a square of side length 2 is equal to the ratio of the circle’s area to the square’s area.

$\text{Area of circle} = \pi r^2 = \pi \ (r = 1) \quad \text{Area of square} = 4 \Rightarrow \frac{\pi}{4} \approx \frac{\text{points inside circle}}{\text{total points}}$

$\Rightarrow \pi \approx 4 \cdot \frac{\text{points inside circle}}{\text{total points}}$

---

### 1. Visualization 

<h3>Circle-based π Estimation</h3>
<input type="number" id="numPoints" placeholder="Enter number of points" value="10000" />
<button onclick="simulatePi()">Estimate π</button>
<p id="piEstimate"></p>
<canvas id="circleCanvas" width="400" height="400" style="border:1px solid #ccc;"></canvas>

<script>
function simulatePi() {
  const canvas = document.getElementById('circleCanvas');
  const ctx = canvas.getContext('2d');
  const N = parseInt(document.getElementById('numPoints').value);
  let inside = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < N; i++) {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const cx = 200 + x * 200;
    const cy = 200 + y * 200;
    const color = (x*x + y*y <= 1) ? 'blue' : 'red';
    if (color === 'blue') inside++;

    ctx.fillStyle = color;
    ctx.fillRect(cx, cy, 1, 1);
  }

  const piEstimate = 4 * inside / N;
  document.getElementById('piEstimate').innerText = `Estimated π: ${piEstimate.toFixed(6)}`;
}
</script>


---

### 3. Analysis

- Accuracy improves as $N \to \infty$ .
- This method has a convergence rate of \( \mathcal{O}(1/\sqrt{N}) \).
- Good for visual understanding, but not the fastest convergence for precision.

---

## Part 2: Estimating $\pi$ using Buffon's Needle

### 1. Theoretical Foundation
If we drop a needle of length $l$ on a floor with parallel lines spaced $d$ apart $l \leq d$ , the probability $P$  that the needle crosses a line is:

$$ P = \frac{2l}{\pi d} \Rightarrow \pi \approx \frac{2l \cdot N}{d \cdot C} $$

Where:
- $N$ : total throws
- $C$ : number of crossings

---

### 2. Visualization 

<h3>Buffon's Needle Simulation</h3>
<input type="number" id="needleCount" placeholder="Number of throws" value="5000">
<button onclick="simulateNeedles()">Estimate π</button>
<p id="buffonResult"></p>
<canvas id="buffonCanvas" width="400" height="400" style="border:1px solid #ccc;"></canvas>

<script>
function simulateNeedles() {
  const canvas = document.getElementById('buffonCanvas');
  const ctx = canvas.getContext('2d');
  const N = parseInt(document.getElementById('needleCount').value);
  const l = 40; // Needle length
  const d = 50; // Distance between lines
  const lineSpacing = d;
  let crosses = 0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw horizontal lines
  for (let y = 0; y <= canvas.height; y += lineSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.strokeStyle = '#aaa';
    ctx.stroke();
  }

  for (let i = 0; i < N; i++) {
    const xMid = Math.random() * canvas.width;
    const yMid = Math.random() * canvas.height;
    const theta = Math.random() * Math.PI;
    const dx = (l / 2) * Math.cos(theta);
    const dy = (l / 2) * Math.sin(theta);

    const x1 = xMid - dx;
    const y1 = yMid - dy;
    const x2 = xMid + dx;
    const y2 = yMid + dy;

    let cross = false;
    const yLines = Array.from({length: Math.floor(canvas.height / lineSpacing) + 1}, (_, k) => k * lineSpacing);
    for (const yLine of yLines) {
      if ((y1 < yLine && y2 > yLine) || (y2 < yLine && y1 > yLine)) {
        crosses++;
        cross = true;
        break;
      }
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = cross ? 'green' : 'orange';
    ctx.stroke();
  }

  const piEstimate = (2 * l * N) / (d * crosses);
  document.getElementById('buffonResult').innerText = `Estimated π: ${piEstimate.toFixed(6)}`;
}
</script>

---

### 3. Analysis
- Typically slower convergence than circle method.
- Gives insight into geometric probability.
- Useful for experimental mathematics and probability classes.

---


## References
- Monte Carlo Methods in JS - Canvas and Math
- Buffon’s Needle: https://en.wikipedia.org/wiki/Buffon%27s_needle
- Statistical Computing with Web Simulations
