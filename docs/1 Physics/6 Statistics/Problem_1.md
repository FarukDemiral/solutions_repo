# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Visual Equivalent Resistance Simulator</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #f5f5f5; }
    input, button { padding: 10px; font-size: 16px; margin-top: 10px; width: 100%; max-width: 500px; }
    canvas { background: white; border: 1px solid #ccc; margin-top: 20px; }
    .result { font-weight: bold; margin-top: 15px; font-size: 18px; }
  </style>
</head>
<body>
  <h2>Visual Equivalent Resistance Simulator</h2>
  <p>Enter connections like: <code>A-B:5, B-C:10, A-C:15</code></p>
  <input id="input" placeholder="A-B:5, B-C:10, A-C:15">
  <button onclick="calculate()">Calculate & Draw</button>
  <div class="result" id="output"></div>
  <canvas id="circuit" width="600" height="400"></canvas>

  <!--  SVG Diagram Below Canvas -->
  <div style="text-align:center; margin: 40px 0 20px 0;">
    <h3>Visual Equivalent Resistance Simulator</h3>
    <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
      <!-- Nodes -->
      <circle cx="50" cy="100" r="10" fill="#000" />
      <circle cx="200" cy="100" r="10" fill="#000" />
      <circle cx="350" cy="100" r="10" fill="#000" />

      <!-- Labels -->
      <text x="40" y="90" font-size="14">A</text>
      <text x="195" y="90" font-size="14">B</text>
      <text x="340" y="90" font-size="14">C</text>

      <!-- Resistor A-B -->
      <line x1="60" y1="100" x2="190" y2="100" stroke="#444" stroke-width="3"/>
      <text x="110" y="90" font-size="14" fill="red">2Ω</text>

      <!-- Resistor B-C -->
      <line x1="210" y1="100" x2="340" y2="100" stroke="#444" stroke-width="3"/>
      <text x="265" y="90" font-size="14" fill="red">6Ω</text>

      <!-- Parallel Resistor A-C -->
      <line x1="60" y1="100" x2="200" y2="50" stroke="#444" stroke-width="3"/>
      <line x1="200" y1="50" x2="340" y2="100" stroke="#444" stroke-width="3"/>
      <text x="190" y="40" font-size="14" fill="red">3Ω</text>
    </svg>
  </div>

  <script>
    const canvas = document.getElementById('circuit');
    const ctx = canvas.getContext('2d');

    function parseInput(str) {
      let edges = [];
      let parts = str.split(',');
      for (let part of parts) {
        let [nodes, r] = part.trim().split(':');
        if (!nodes || !r) continue;
        let [u, v] = nodes.trim().split('-');
        edges.push({ u, v, r: parseFloat(r) });
      }
      return edges;
    }

    function calculate() {
      const inputStr = document.getElementById('input').value;
      const edges = parseInput(inputStr);
      const map = new Map();
      const nodes = new Set();

      edges.forEach(({ u, v, r }) => {
        const key = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(r);
        nodes.add(u);
        nodes.add(v);
      });

      let total = 0;
      for (let resList of map.values()) {
        if (resList.length === 1) {
          total += resList[0];
        } else {
          const invSum = resList.reduce((acc, r) => acc + 1/r, 0);
          total += 1 / invSum;
        }
      }
      document.getElementById('output').innerText = `Equivalent Resistance: ${total.toFixed(3)} Ω`;
      drawGraph(edges, Array.from(nodes));
    }

    function drawGraph(edges, nodes) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pos = {};
      const angleStep = (2 * Math.PI) / nodes.length;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = 140;

      nodes.forEach((node, i) => {
        const angle = i * angleStep;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        pos[node] = { x, y };

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#000';
        ctx.fillText(node, x - 5, y + 5);
      });

      edges.forEach(({ u, v, r }) => {
        const x1 = pos[u].x;
        const y1 = pos[u].y;
        const x2 = pos[v].x;
        const y2 = pos[v].y;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#333';
        ctx.stroke();

        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        ctx.fillStyle = '#cc0000';
        ctx.fillText(`${r}Ω`, mx + 5, my - 5);
      });
    }
  </script>
</body>
</html>
