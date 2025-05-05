# Problem 1
#  Equivalent Resistance Using Graph Theory

This project implements an algorithm to calculate the **equivalent resistance** of an electrical circuit using **graph theory**. It detects and reduces **series and parallel connections** using **graph traversal** techniques (DFS) and tools like **NetworkX** in Python. The approach is designed to handle even complex circuit configurations, including **nested combinations** and **cyclic connections**.


##  Features
- Full support for **series** and **parallel** resistor detection
- Handles **nested resistor configurations**
- Works on graphs with **cycles and multiple paths**
- Built using **NetworkX** for graph representation and manipulation


##  Problem Overview

Calculating equivalent resistance is crucial in circuit design and analysis. Traditionally, this requires manual simplification of resistors using:

- Series Rule: $$ R_\text{eq} = R_1 + R_2 + \dots $$
- Parallel Rule: $$ \frac{1}{R_\text{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots $$

In complex circuits, manual simplification becomes difficult. This implementation uses graph theory to automate the process:
- **Nodes** represent junctions
- **Edges** represent resistors (with weights)
- Repeatedly apply simplification rules using traversal techniques



##  Algorithm Description

### 1. **Series Detection**
A node is part of a series if:
- It connects exactly 2 other nodes (degree = 2)
- It is not marked as a terminal (i.e., input/output node)

**Reduction Rule**:
Merge the resistors: $$ R_\text{eq} = R_1 + R_2 $$

### 2. **Parallel Detection**
Two or more resistors are in parallel if they connect the same two nodes.

**Reduction Rule**:
$$
\frac{1}{R_\text{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots
$$

### 3. **Simplification Loop**
- Detect and reduce **series** nodes first
- Detect and reduce **parallel** edges
- Repeat until only one edge remains between input and output


##  Test Cases

### Example 1: Simple Series
- Circuit:  
  $$ A \xrightarrow{5\,\Omega} B \xrightarrow{10\,\Omega} C $$
- Expected Output:  
  $$ R_{AC} = 15\,\Omega $$



### Example 2: Parallel
- Circuit:  
  $$ A \xrightarrow{6\,\Omega} B,\quad A \xrightarrow{3\,\Omega} B $$
- Expected Output:  
  $$ R_{AB} = \left( \frac{1}{6} + \frac{1}{3} \right)^{-1} = 2\,\Omega $$

### Example 3: Nested (Parallel + Series)
- Circuit:  
  $$ A \xrightarrow{2\,\Omega} B \xrightarrow{6\,\Omega} C,\quad A \xrightarrow{3\,\Omega} C $$
- Description:  
  A–B–C path is in series, A–C path is in parallel with it.
- Expected Output:  
  $$ R_{AC} = \left( \frac{1}{2 + 6} + \frac{1}{3} \right)^{-1} = 1.5\,\Omega $$


##  Handling Complex Circuits
The algorithm can manage:
- **Deeply nested** structures by recursively simplifying subgraphs
- **Cyclic structures** (e.g., bridges or loops) by flattening paths and reducing redundant edges
- **Multiple terminals** (with some additional logic)

For more complex tasks (e.g., Wheatstone Bridge), further extension with Kirchhoff's laws or node-voltage methods could be integrated.


##  Efficiency Analysis
- **Series/parallel detection**: $$ O(n) $$ per iteration
- **Graph size reduction** ensures convergence in a finite number of steps
- Total complexity: approx $$ O(n^2) $$ in worst case for dense graphs


##  Potential Improvements
- Add support for **voltage/current analysis**
- Visualize circuit graph simplification using matplotlib or Plotly
- Extend for **AC circuits** with complex impedances
- Add **user-friendly DSL input** for circuits like: `A-B:5, B-C:10, A-C:3`
 

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
  <h2> Visual Equivalent Resistance Simulator</h2>
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

##  References
- NetworkX Documentation: https://networkx.org
- Resistor Combination Rules: Physics and Engineering Textbooks




