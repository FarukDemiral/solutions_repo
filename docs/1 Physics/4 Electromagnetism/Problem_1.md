# Problem 1
# Waves - Problem 1: Interference Patterns on a Water Surface

## Problem Statement

The aim of this study is to analyze interference patterns created by circular waves emitted from point sources located at the vertices of a regular polygon. The waves interfere constructively and destructively, leading to visually observable patterns.

## Theoretical Foundation

The displacement of a circular wave on the water surface, emanating from a point source located at \( (x_0, y_0) \), is described by the **Single Disturbance Equation**:

$$
\eta(x, y, t) = \frac{A}{\sqrt{r}} \cos(kr - \omega t + \phi)
$$

Where:
- \( \eta(x, y, t) \): Displacement at point \( (x, y) \) and time \( t \)
- \( A \): Amplitude of the wave
- \( k = \frac{2\pi}{\lambda} \): Wave number
- \( \omega = 2\pi f \): Angular frequency
- \( r = \sqrt{(x - x_0)^2 + (y - y_0)^2} \): Distance from source to the point \( (x, y) \)
- \( \phi \): Initial phase

---

## Superposition Principle

The total displacement on the water surface due to multiple sources is given by:

$$
\eta_{\text{sum}}(x, y, t) = \sum_{i=1}^{N} \eta_i(x, y, t)
$$

where \( N \) is the number of wave sources (vertices of the polygon).

---

## Simulation Method

### 1. Real-Valued Model (Cosine-Based Approach)
The real-valued model computes the sum of cosine wave disturbances from each source. The amplitude at each point decays with distance.

### 2. Complex Exponential Model (Phasor Approach)
The complex model uses phasor representation, summing complex wave contributions from each source and then taking the real part:

$$
\eta_i(x, y, t) = \frac{A}{\sqrt{r_i}} e^{j(kr_i - \omega t + \phi_i)}
$$

$$
\eta_{\text{total}}(x, y, t) = \Re \left\{ \sum_{i=1}^{N} \eta_i(x, y, t) \right\}
$$

---

## Visualization and Analysis

- **Constructive Interference:** Occurs when wave crests meet, amplifying the displacement.
- **Destructive Interference:** Occurs when crests and troughs meet, canceling each other out.

The interactive simulation allows the adjustment of:
- Amplitude
- Wavelength
- Number of sources (polygon selection)
- Source radius

Both real and complex models are visualized on separate canvases for comparison.

---

## Conclusions

This project demonstrates how the superposition of wave disturbances can lead to complex interference patterns. The approach provides insights into wave behavior and phase interactions using both real and complex wave models.

