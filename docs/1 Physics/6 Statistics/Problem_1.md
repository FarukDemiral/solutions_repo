# Problem 1
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Equivalent Resistance Simulator</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f7f7f7;
    }
    h2 {
      color: #333;
    }
    input, button {
      padding: 10px;
      font-size: 16px;
      margin-top: 5px;
      width: 100%;
      max-width: 500px;
    }
    .result {
      margin-top: 15px;
      font-weight: bold;
      font-size: 18px;
    }
    .examples {
      margin-top: 20px;
    }
    .examples a {
      color: #663399;
      text-decoration: none;
      display: block;
      margin-bottom: 8px;
    }
  </style>
</head>
<body>

  <h2>🔌 Equivalent Resistance Simulator (Series & Parallel)</h2>

  <p>Enter connections like: <code>A-B:5, B-C:10, A-C:15</code></p>
  <input id="input" placeholder="A-B:5, B-C:10, A-C:15">
  <button onclick="calculate()">Calculate Resistance</button>
  <div class="result" id="output"></div>

  <div class="examples">
    <p><strong>Examples:</strong></p>
    <a href="#" onclick="input.value='A-B:5, B-C:10'; calculate(); return false;">A-B:5, B-C:10 (Series)</a>
    <a href="#" onclick="input.value='A-B:3, A-B:6'; calculate(); return false;">A-B:3, A-B:6 (Parallel)</a>
    <a href="#" onclick="input.value='A-B:2, B-C:6, A-C:3'; calculate(); return false;">A-B:2, B-C:6, A-C:3 (Nested)</a>
  </div>

  <script>
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
      let inputStr = document.getElementById('input').value;
      let edges = parseInput(inputStr);
      let map = new Map();

      for (let { u, v, r } of edges) {
        let key = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(r);
      }

      let total = 0;
      for (let resistors of map.values()) {
        if (resistors.length === 1) {
          total += resistors[0];
        } else {
          let invSum = resistors.reduce((sum, r) => sum + 1 / r, 0);
          total += 1 / invSum;
        }
      }

      document.getElementById('output').innerText = `Equivalent Resistance: ${total.toFixed(3)} Ω`;
    }
  </script>

</body>
</html>
