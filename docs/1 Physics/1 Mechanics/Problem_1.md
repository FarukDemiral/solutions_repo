# Problem 
Let's start with the **theoretical foundation** and derive the governing equations of projectile motion step by step.

---

### **1. Derivation of Governing Equations**
Projectile motion follows Newton’s second law. We assume:
- No air resistance.
- Motion happens in a uniform gravitational field \( g \).
- The projectile is launched from the ground with an initial velocity \( v_0 \) at an angle \( \theta \).

The motion is broken into two independent components:

#### **Horizontal Motion** (constant velocity)
\[
x = v_0 \cos\theta \cdot t
\]

#### **Vertical Motion** (constant acceleration due to gravity)
Using kinematic equations:
\[
y = v_0 \sin\theta \cdot t - \frac{1}{2} g t^2
\]

To find the **time of flight**, we set \( y = 0 \) (when the projectile lands):

\[
t_f = \frac{2 v_0 \sin\theta}{g}
\]

Now, the **range** (horizontal distance when \( y = 0 \)) is:

\[
R = v_0 \cos\theta \cdot t_f
\]

\[
R = v_0 \cos\theta \cdot \frac{2 v_0 \sin\theta}{g}
\]

Using the identity \( 2\sin\theta\cos\theta = \sin2\theta \):

\[
R = \frac{v_0^2}{g} \sin2\theta
\]

This equation shows that:
- The range is **maximized when \( \theta = 45^\circ \)**.
- **Doubling \( v_0 \) quadruples the range**.
- A higher gravity value reduces the range.

---

### **2. Analyzing the Range**
To better understand how the range changes:
- If \( v_0 \) increases, \( R \) increases quadratically.
- If \( g \) increases, \( R \) decreases.
- If \( \theta \) changes, \( R \) follows a **sinusoidal pattern** due to \( \sin 2\theta \).

---

### **3. Real-World Applications**
- **Sports**: Optimizing a soccer ball’s kick angle for maximum distance.
- **Engineering**: Missile and rocket trajectory planning.
- **Environment**: Studying the effect of different gravities on planets.

---

### **4. Python Simulation**
Now, let's code a Python simulation that plots the **range as a function of launch angle**. I'll generate a graph showing how the range changes with different angles.

This Python script generates a graph showing how the range of a projectile changes with the launch angle. You can modify \( v_0 \) to see how different initial velocities affect the range. Let me know if you need any modifications or explanations! 🚀