# Problem 2

## Projectile Motion Analysis

### 1. Theoretical Foundation

Projectile motion is a form of motion experienced by an object that is launched into the air and influenced only by gravity.

We split the motion into two components:

- **Horizontal motion:** constant velocity  
  $$ x(t) = v_0 \cos(\theta) \cdot t $$

- **Vertical motion:** uniformly accelerated motion  
  $$ y(t) = v_0 \sin(\theta) \cdot t - \frac{1}{2} g t^2 $$

---

### 2. Simulation Example

Initial conditions:

- Initial velocity: $$ v_0 = 20\, \text{m/s} $$
- Angle: $$ \theta = 45^\circ $$
- Gravity: $$ g = 9.81\, \text{m/s}^2 $$

#### Trajectory Table

| Time (s) | X (m) | Y (m) |
|----------|-------|-------|
| 0.0      | 0.00  | 0.00  |
| 0.5      | 7.07  | 6.02  |
| 1.0      | 14.14 | 9.82  |
| 1.5      | 21.21 | 11.39 |
| 2.0      | 28.28 | 10.73 |
| 2.5      | 35.35 | 7.85  |
| 3.0      | 42.42 | 2.74  |

---

### 3. Optional: Interactive Simulation

> 🔗 If you want to explore this simulation dynamically, visit:  
[Open Projectile Simulator](http://localhost:3000/)  
(*Make sure your simulator is running*)

---

### 4. Conclusion

Projectile motion can be analyzed easily using basic trigonometry and kinematic equations. This problem demonstrates the use of physics formulas to predict real-world behavior.
