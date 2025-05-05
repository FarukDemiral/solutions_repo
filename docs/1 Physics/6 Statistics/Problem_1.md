# Problem 1
<!-- Insert this directly below the main title -->
<h1>Equivalent Resistance Using Graph Theory</h1>

<!--  SVG Circuit Diagram for Example 3 -->
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
    <line x1="60" y1="100" x2="340" y2="100" stroke="none" />
    <line x1="60" y1="100" x2="200" y2="50" stroke="#444" stroke-width="3"/>
    <line x1="200" y1="50" x2="340" y2="100" stroke="#444" stroke-width="3"/>
    <text x="190" y="40" font-size="14" fill="red">3Ω</text>
  </svg>
</div>
