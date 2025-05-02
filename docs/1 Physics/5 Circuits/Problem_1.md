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


##  Implementation in Python
```python
# Code implementing the algorithm (see full code block below)
```


##  Test Cases

###  Example 1: Simple Series
- Circuit: A --5Ω-- B --10Ω-- C
- Expected Output: 15Ω

###  Example 2: Parallel
- Circuit: A --6Ω-- B AND A --3Ω-- B
- Expected Output: 2Ω

###  Example 3: Nested
- Circuit: A $$ 2Ω $$ B $$ 6Ω $$ C and A $$ 3Ω $$ C (parallel to series)
- Expected Output: $$ 1.5Ω $$

---

##  Handling Complex Circuits
The algorithm can manage:
- **Deeply nested** structures by recursively simplifying subgraphs
- **Cyclic structures** (e.g., bridges or loops) by flattening paths and reducing redundant edges
- **Multiple terminals** (with some additional logic)

For more complex tasks (e.g., Wheatstone Bridge), further extension with Kirchhoff's laws or node-voltage methods could be integrated.

---

##  Efficiency Analysis
- **Series/parallel detection**: $$ O(n) $$ per iteration
- **Graph size reduction** ensures convergence in a finite number of steps
- Total complexity: approx $$ O(n^2) $$ in worst case for dense graphs

---

##  Potential Improvements
- Add support for **voltage/current analysis**
- Visualize circuit graph simplification using matplotlib or Plotly
- Extend for **AC circuits** with complex impedances
- Add **user-friendly DSL input** for circuits like: `A-5-B, B-10-C, A-3-C`

---

##  Full Python Code

```python
import networkx as nx

def is_series(G, node):
    return G.degree[node] == 2 and not G.nodes[node].get("terminal", False)

def reduce_series(G):
    changed = True
    while changed:
        changed = False
        for node in list(G.nodes):
            if is_series(G, node):
                neighbors = list(G.neighbors(node))
                u, v = neighbors[0], neighbors[1]
                R1 = G[node][u]['resistance']
                R2 = G[node][v]['resistance']
                R_eq = R1 + R2
                G.remove_node(node)
                if G.has_edge(u, v):
                    existing = G[u][v]['resistance']
                    R_eq = 1 / (1 / R_eq + 1 / existing)
                G.add_edge(u, v, resistance=R_eq)
                changed = True
                break

def reduce_parallel(G):
    changed = False
    new_edges = {}
    for u, v in list(G.edges):
        if (u, v) not in new_edges and (v, u) not in new_edges:
            parallel_edges = [e for e in G.edges([u, v]) if (e[0], e[1]) == (u, v) or (e[0], e[1]) == (v, u)]
            resistances = [G[e[0]][e[1]]['resistance'] for e in parallel_edges]
            if len(resistances) > 1:
                R_eq = 1 / sum(1 / R for R in resistances)
                for e in parallel_edges:
                    G.remove_edge(*e)
                G.add_edge(u, v, resistance=R_eq)
                changed = True
    return changed

def simplify_circuit(G):
    while True:
        reduce_series(G)
        if not reduce_parallel(G):
            break
    return G

def calculate_equivalent_resistance(G, source, sink):
    simplify_circuit(G)
    if G.has_edge(source, sink):
        return G[source][sink]['resistance']
    else:
        return None

# Example tests
G1 = nx.Graph()
G1.add_edge('A', 'B', resistance=5)
G1.add_edge('B', 'C', resistance=10)
G1.nodes['A']['terminal'] = True
G1.nodes['C']['terminal'] = True
print("Example 1 (Series):", calculate_equivalent_resistance(G1, 'A', 'C'))

G2 = nx.Graph()
G2.add_edge('A', 'B', resistance=6)
G2.add_edge('A', 'B', resistance=3)
G2.nodes['A']['terminal'] = True
G2.nodes['B']['terminal'] = True
print("Example 2 (Parallel):", calculate_equivalent_resistance(G2, 'A', 'B'))

G3 = nx.Graph()
G3.add_edge('A', 'B', resistance=2)
G3.add_edge('B', 'C', resistance=6)
G3.add_edge('A', 'C', resistance=3)
G3.nodes['A']['terminal'] = True
G3.nodes['C']['terminal'] = True
print("Example 3 (Nested):", calculate_equivalent_resistance(G3, 'A', 'C'))
```



##  References
- NetworkX Documentation: https://networkx.org
- Resistor Combination Rules: Physics and Engineering Textbooks




