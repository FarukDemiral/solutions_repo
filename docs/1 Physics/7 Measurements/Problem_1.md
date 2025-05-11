# Problem 1
# Measuring Earth's Gravitational Acceleration with a Pendulum

## Motivation

The acceleration $g$ due to gravity is a fundamental constant that influences a wide range of physical phenomena. Measuring $g$ accurately is crucial for understanding gravitational interactions, designing structures, and conducting experiments in various fields.

One classic method for determining $g$ is through the oscillations of a simple pendulum, where the period of oscillation depends on the local gravitational field.

---

## Task

Measure the acceleration $g$ due to gravity using a pendulum, and in detail analyze the uncertainties in the measurements.

This experiment emphasizes:
- Rigorous measurement practices
- Uncertainty analysis
- Understanding the role of experimental physics in verifying physical constants

---

## Procedure

### 1. Materials

- String (1–1.5 meters)
- Small weight (e.g., keychain, sugar bag, coins)
- Stopwatch (or smartphone timer)
- Ruler or measuring tape

### 2. Setup

- Attach the weight to the string and fix the other end to a sturdy support.
- Measure the length of the pendulum, $L$, from the suspension point to the center of mass of the weight.
- Estimate the resolution of the measuring tool and compute:
  
  $$
  \Delta L = \frac{\text{Ruler Resolution}}{2}
  $$

---

### 3. Data Collection

- Displace the pendulum slightly ($<15^\circ$) and release it.
- Measure the time for 10 full oscillations, denoted $T_{10}$, and repeat 10 times.
- Record all 10 measurements.
- Calculate:
  - Mean time for 10 oscillations: $\overline{T_{10}}$
  - Standard deviation: $\sigma_T$
  - Uncertainty in the mean time:
  
    $$
    \Delta T_{10} = \frac{\sigma_T}{\sqrt{n}}, \quad n = 10
    $$

---

## Calculations

### 1. Calculate the Period:

$$
T = \frac{T_{10}}{10}, \quad \Delta T = \frac{\Delta T_{10}}{10}
$$

### 2. Determine $g$:

$$
g = \frac{4\pi^2 L}{T^2}
$$

### 3. Propagate Uncertainties:

$$
\Delta g = g \sqrt{\left( \frac{\Delta L}{L} \right)^2 + \left( 2 \cdot \frac{\Delta T}{T} \right)^2}
$$

---

## Analysis

1. Compare your measured $g$ with the standard value: **9.81 m/s²**.

2. Discuss:
- The effect of measurement resolution on $\Delta L$
- Timing variability and its influence on $\Delta T$
- Experimental limitations or assumptions

---

## Deliverables

1. Markdown Table with:
   - $L$, $\Delta L$, $T_{10}$ measurements, $\overline{T_{10}}$, $\sigma_T$, $\Delta T$
   - Calculated $g$ and $\Delta g$

2. Written discussion on uncertainty sources and how they affected your results.

---

## Optional Markdown Table Template

```markdown
| Trial | $T_{10}$ (s) |
|-------|--------------|
| 1     |              |
| 2     |              |
| ...   |              |
| 10    |              |
| **Mean** | $\overline{T_{10}}$ |
| **Std Dev** | $\sigma_T$ |
| **ΔT** | $\Delta T$ |
