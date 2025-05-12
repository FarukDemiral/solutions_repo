# Problem 1
# Measuring Earth's Gravitational Acceleration with a Pendulum

## Introduction

The acceleration $g$ due to gravity is a fundamental constant crucial for understanding gravitational phenomena, structural design, and various physical experiments. This project uses a simple pendulum to determine the value of $g$, emphasizing precise measurement techniques and uncertainty analysis.

## Task

Measure the gravitational acceleration $g$ using a pendulum and analyze the uncertainties involved in the measurement process.

---

## Procedure

### Materials

* String (1–1.5 meters long)
* Small weight (e.g., coins, keychain)
* Stopwatch or smartphone timer
* Ruler or measuring tape

### Experimental Setup

1. Attach the weight to one end of the string and fix the other end firmly to a support.
2. Measure the pendulum's length $L$ from the suspension point to the center of the mass. Record the resolution of your ruler/tape measure and calculate uncertainty as:

$$
\Delta L = \frac{\text{Ruler Resolution}}{2}
$$

### Data Collection

1. Displace the pendulum slightly (< 15°) and release it.
2. Measure the time for 10 full oscillations ($T_{10}$). Repeat 10 times.
3. Calculate the mean oscillation time ($\overline{T_{10}}$) and standard deviation ($\sigma_T$).
4. Determine uncertainty in mean oscillation time:

$$
\Delta T_{10} = \frac{\sigma_T}{\sqrt{n}}, \quad n=10
$$

---

## Calculations

### Calculate the Period

$$
T = \frac{\overline{T_{10}}}{10}, \quad \Delta T = \frac{\Delta T_{10}}{10}
$$

### Determine $g$

$$
g = \frac{4\pi^2 L}{T^2}
$$

### Propagate Uncertainties

$$
\Delta g = g \sqrt{\left(\frac{\Delta L}{L}\right)^2 + \left(2\frac{\Delta T}{T}\right)^2}
$$

---

## Analysis

### Comparison

* Compare your calculated $g$ with the standard value (9.81 m/s²).

### Discussion

* Impact of measurement resolution on $\Delta L$.
* Variability and impact of timing measurements on $\Delta T$.
* Discuss assumptions and experimental limitations.

---

## Deliverables

### Markdown Table of Results

| $L$ (m) | $\Delta L$ (m) | $\overline{T_{10}}$ (s) | $\sigma_T$ (s) | $\Delta T$ (s) | $g$ (m/s²) | $\Delta g$ (m/s²) |
| ------- | -------------- | ----------------------- | -------------- | -------------- | ---------- | ----------------- |
|         |                |                         |                |                |            |                   |

*Fill this table with your experimental data.*

### Discussion

Provide a detailed analysis on the uncertainty sources and their impacts.
