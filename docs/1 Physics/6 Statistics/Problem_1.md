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
  <h2>🔌 Visual Equivalent Resistance Simulator</h2>
  <p>Enter connections like: <code>A-B:5, B-C:10, A-C:15</code></p>
  <input id="input" placeholder="A-B:5, B-C:10, A-C:15">
  <button onclick="calculate()">Calculate & Draw</button>
  <div class="result" id="output"></div>
  <canvas id="circuit" width="600" height="400"></canvas>

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

      // Place nodes in a circle
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

      // Draw edges
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

        // Draw resistance label
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        ctx.fillStyle = '#cc0000';
        ctx.fillText(`${r}Ω`, mx + 5, my - 5);
      });
    }
  </script>
</body>
</html>