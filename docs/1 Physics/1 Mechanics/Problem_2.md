# Problem 2  
## Forced Damped Pendulum Simulation and Analysis

### 🧮 Differential Equation

The forced damped pendulum is governed by the nonlinear second-order differential equation:

$$
\frac{d^2\theta}{dt^2} + \gamma \frac{d\theta}{dt} + \omega_0^2 \sin(\theta) = A \cos(\omega t)
$$

Where:

- \( \theta \): angular displacement  
- \( \gamma \): damping coefficient  
- \( \omega_0 \): natural frequency  
- \( A \): driving amplitude  
- \( \omega \): driving frequency  

---

### ⚙️ Parameters

$$
\begin{align*}
\gamma &= 0.5 \quad \text{(Damping coefficient)} \\
A &= 1.2 \quad \text{(Driving amplitude)} \\
\omega &= \frac{2}{3} \quad \text{(Driving frequency)} \\
\omega_0 &= 1.5 \quad \text{(Natural frequency)} \\
\theta(0) &= 0.2 \quad \text{(Initial angle)} \\
\dot{\theta}(0) &= 0.0 \quad \text{(Initial angular velocity)} \\
t_{max} &= 100 \quad \text{(Simulation time)} \\
\Delta t &= 0.01 \quad \text{(Time step)} \\
\end{align*}
$$

---

### 🧠 Python Simulation Code

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# Parameters
gamma = 0.5
A = 1.2
omega = 2 / 3
omega_0 = 1.5
theta0 = 0.2
theta_dot0 = 0.0
t_max = 100
dt = 0.01

# Differential equation
def pendulum(t, y):
    theta, theta_dot = y
    dtheta_dt = theta_dot
    dtheta_dot_dt = -gamma * theta_dot - omega_0**2 * np.sin(theta) + A * np.cos(omega * t)
    return [dtheta_dt, dtheta_dot_dt]

# Solve ODE
t_span = (0, t_max)
t_eval = np.arange(0, t_max, dt)
y0 = [theta0, theta_dot0]
sol = solve_ivp(pendulum, t_span, y0, t_eval=t_eval, method='RK45')

theta = sol.y[0]
theta_dot = sol.y[1]
time = sol.t

# Plot 1: Angular Displacement
plt.figure(figsize=(10, 4))
plt.plot(time, theta, label='θ(t)')
plt.title("Forced Damped Pendulum - Angular Displacement")
plt.xlabel("Time (s)")
plt.ylabel("Angle θ (radians)")
plt.grid()
plt.legend()
plt.tight_layout()
plt.show()

# Plot 2: Phase Space
plt.figure(figsize=(6, 6))
plt.plot(theta, theta_dot, lw=0.7)
plt.title("Phase Space (θ vs θ̇)")
plt.xlabel("θ (radians)")
plt.ylabel("θ̇ (radians/s)")
plt.grid()
plt.tight_layout()
plt.show()

# Plot 3: Poincaré Section
T_drive = 2 * np.pi / omega
indices = np.where(np.abs(np.mod(time, T_drive)) < dt)[0]
poincare_theta = theta[indices]
poincare_theta_dot = theta_dot[indices]

plt.figure(figsize=(6, 6))
plt.scatter(poincare_theta, poincare_theta_dot, s=10, c='red')
plt.title("Poincaré Section")
plt.xlabel("θ (radians)")
plt.ylabel("θ̇ (radians/s)")
plt.grid()
plt.tight_layout()
plt.show()
