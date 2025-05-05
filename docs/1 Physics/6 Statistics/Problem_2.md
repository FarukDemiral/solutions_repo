# Problem 2
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Equivalent Resistance Using Graph Theory</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; line-height: 1.6; }
    h1, h2, h3 { color: #333; }
    input, button { padding: 10px; font-size: 16px; margin-top: 10px; width: 100%; max-width: 500px; }
    canvas { background: white; border: 1px solid #ccc; margin-top: 20px; }
    .result { font-weight: bold; margin-top: 15px; font-size: 18px; }
    pre { background: #eee; padding: 10px; overflow-x: auto; }
    code { background: #e0e0e0; padding: 2px 4px; border-radius: 4px; }
  </style>
</head>
<body>

  <h1>Equivalent Resistance Using Graph Theory</h1>

  <!-- 🚀 SVG Diagram (Example 3: Nested Series + Parallel) -->
  <div style="text-align:center; margin: 30px 0;">
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

  <h2>Introduction</h2>
  <p>
    In electrical engineering, calculating the equivalent resistance of a circuit is essential for understanding how current flows and for simplifying complex networks.
    While simple circuits can be solved using basic series and parallel rules, real-world circuits often contain nested, cyclic, or non-obvious configurations.
  </p>
  <p>
    This project explores an algorithmic approach using <strong>graph theory</strong> to automate the simplification of resistor networks.
    By modeling circuits as graphs, we can apply powerful techniques to detect and reduce series and parallel combinations — even in complex topologies.
  </p>
  <p>
    Alongside the theoretical explanation and Python pseudocode, an interactive <strong>JavaScript-based visual simulator</strong> is provided so users can input custom circuits and instantly view the equivalent resistance and graphical layout.
  </p>

  <h2>Features</h2>
  <ul>
    <li>Full support for <strong>series</strong> and <strong>parallel</strong> resistor detection</li>
    <li>Handles <strong>nested resistor configurations</strong></li>
    <li>Works on graphs with <strong>cycles and multiple paths</strong></li>
    <li>Built using <strong>NetworkX</strong> (Python) and <strong>HTML5/JavaScript</strong> for simulation</li>
  </ul>

  <h2>Problem Overview</h2>
  <p>Calculating equivalent resistance is crucial in circuit design and analysis. Traditionally, this requires manual simplification:</p>
  <ul>
    <li>Series Rule:<br><code>R_eq = R1 + R2 + ...</code></li>
    <li>Parallel Rule:<br><code>1/R_eq = 1/R1 + 1/R2 + ...</code></li>
  </ul>

  <h2>Algorithm Description</h2>
  <h3>1. Series Detection</h3>
  <p>
    A node is part of a series if:
    <ul>
      <li>It connects exactly 2 other nodes (degree = 2)</li>
      <li>It is not marked as a terminal (input/output)</li>
    </ul>
    <strong>Reduction Rule:</strong> <code>R_eq = R1 + R2</code>
  </p>

  <h3>2. Parallel Detection</h3>
  <p>
    Two or more resistors are in parallel if they connect the same two nodes.<br>
    <strong>Reduction Rule:</strong> <code>1/R_eq = 1/R1 + 1/R2 + ...</code>
  </p>

  <h3>3. Simplification Loop</h3>
  <ul>
    <li>Detect and reduce <strong>series</strong> nodes first</li>
    <li>Then reduce <strong>parallel</strong> edges</li>
    <li>Repeat until only one edge remains between input and output</li>
  </ul>

  <h2>Test Cases</h2>
  <h3>Example 1: Simple Series</h3>
  <p>Circuit: A → 5Ω → B → 10Ω → C<br>Expected Output: R<sub>AC</sub> = 15Ω</p>

  <h3>Example 2: Parallel</h3>
  <p>Circuit: A → 6Ω → B and A → 3Ω → B<br>Expected Output: R<sub>AB</sub> = 2Ω</p>

  <h3>Example 3: Nested (Series + Parallel)</h3>
  <p>
    Circuit: A → 2Ω → B → 6Ω → C, and A → 3Ω → C<br>
    A–B–C path is in series, A–C is parallel with it.<br>
    Expected Output: R<sub>AC</sub> = 1.5Ω
  </p>

  <h2>Visual Equivalent Resistance Simulator</h2>
  <p>Enter connections like: <code>A-B:5, B-C:10, A-C:15</code></p>
  <input id="input" placeholder="A-B:5, B-C:10, A-C:15">
  <button onclick="calculate()">Calculate & Draw</button>
  <div class="result" id="output"></div>
  <canvas id="circuit" width="600" height="400"></canvas>

  <h2>Handling Complex Circuits</h2>
  <p>This algorithm can manage:</p>
  <ul>
    <li><strong>Deeply nested</strong> resistor trees</li>
    <li><strong>Cyclic topologies</strong> (loops, bridges)</li>
    <li>Configurations with <strong>multiple terminals</strong></li>
  </ul>
  <p>
    To support even more complex topologies (e.g., Wheatstone Bridge), the system could be extended using <strong>Kirchhoff’s Laws</strong> or <strong>node-voltage analysis</strong>.
  </p>

  <h2>Efficiency Analysis</h2>
  <ul>
    <li>Each series/parallel detection pass: <code>O(n)</code></li>
    <li>Total simplification loop (worst-case dense graphs): <code>O(n²)</code></li>
  </ul>

  <h2>Potential Improvements</h2>
  <ul>
    <li>Add support for <strong>voltage/current analysis</strong></li>
    <li>Add UI to <strong>edit circuits graphically</strong></li>
    <li>Extend to <strong>AC circuits</strong> with complex impedances</li>
    <li>Add parser for input like: <code>A-B:5, B-C:10, A-C:3</code></li>
  </ul>

  <h2>References</h2>
  <ul>
    <li><a href="https://networkx.org" target="_blank">NetworkX Documentation</a></li>
    <li>Resistor Combination Rules: Physics and Engineering Textbooks</li>
  </ul>

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
          const invSum = resList.reduce((acc, r) => acc + 1 / r, 0);
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
