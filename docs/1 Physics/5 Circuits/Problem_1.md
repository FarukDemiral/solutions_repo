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

###  Example 1: Simple Series
- Circuit: A $$ 5Ω $$ B $$ 10Ω $$ C
- Expected Output: $$ 15Ω $$

###  Example 2: Parallel
- Circuit: A $$ 6Ω $$ B AND A $$ 3Ω $$ B
- Expected Output: $$ 2Ω $$

###  Example 3: Nested
- Circuit: A $$ 2Ω $$ B $$ 6Ω $$ C and A $$ 3Ω $$ C (parallel to series)
- Expected Output: $$ 1.5Ω $$


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
- Add **user-friendly DSL input** for circuits like: `A-5-B, B-10-C, A-3-C`

#  Equivalent Resistance Using Graph Theory

This project implements an algorithm to calculate the **equivalent resistance** of an electrical circuit using **graph theory**. It detects and reduces **series and parallel connections** using **graph traversal** techniques (DFS) and tools like **NetworkX** in Python. The approach is designed to handle even complex circuit configurations, including **nested combinations** and **cyclic connections**.

Additionally, a **JavaScript-based simulation** is included below to allow live interaction on GitHub Pages.

---

##  Features
- Full support for **series** and **parallel** resistor detection
- Handles **nested resistor configurations**
- Works on graphs with **cycles and multiple paths**
- Built using **NetworkX** for offline analysis
- **Live JavaScript simulation** embedded for GitHub

---

##  Simulation 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Equivalent Resistance Simulator</title>
  <style>
    body { font-family: Arial; padding: 20px; background: #f9f9f9; }
    input, button { padding: 8px; font-size: 16px; }
    .result { margin-top: 15px; font-weight: bold; }
  </style>
</head>
<body>
  <h2> Equivalent Resistance Simulator (Series & Parallel)</h2>
  <p>Enter connections like: <code>A-B:5, B-C:10, A-C:15</code></p>
  <input id="input" size="60" placeholder="Enter resistor network">
  <button onclick="calculate()">Calculate Resistance</button>
  <div class="result" id="output"></div>
  <script>
    function parseInput(str) {
      let edges = [];
      let parts = str.split(',');
      for (let part of parts) {
        let [nodes, r] = part.trim().split(':');
        if (!nodes || !r) continue;
        let [u, v] = nodes.split('-');
        edges.push({ u, v, r: parseFloat(r) });
      }
      return edges;
    }

    function calculate() {
      let input = document.getElementById('input').value;
      let edges = parseInput(input);
      let map = new Map();

      for (let { u, v, r } of edges) {
        let key = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(r);
      }

      let total = 0;
      for (let resList of map.values()) {
        if (resList.length === 1) {
          total += resList[0];
        } else {
          let invSum = resList.reduce((acc, r) => acc + 1/r, 0);
          total += 1 / invSum;
        }
      }

      document.getElementById('output').innerText = `Equivalent Resistance: ${total.toFixed(3)} Ω`;
    }
  </script>

  <p><strong>Examples:</strong></p>
  <ul>
    <li><a href="#" onclick="input.value='A-B:5, B-C:10'; calculate(); return false;">A-B:5, B-C:10 (Series)</a></li>
    <li><a href="#" onclick="input.value='A-B:3, A-B:6'; calculate(); return false;">A-B:3, A-B:6 (Parallel)</a></li>
    <li><a href="#" onclick="input.value='A-B:2, B-C:6, A-C:3'; calculate(); return false;">A-B:2, B-C:6, A-C:3 (Nested)</a></li>
  </ul>
</body>
</html>
```

##  References
- NetworkX Documentation: https://networkx.org
- Resistor Combination Rules: Physics and Engineering Textbooks




