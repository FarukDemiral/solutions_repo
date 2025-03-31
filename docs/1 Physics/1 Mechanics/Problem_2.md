# Problem 2
# Forced Damped Pendulum Simulation and Analysis
# ==============================================
# Differential Equation:
# $$ d²θ/dt² + γ dθ/dt + ω₀² sin(θ) = A cos(ω t) $$

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

# ----------------------------
# 1. PARAMETERS
# ----------------------------
gamma = $$ 0.5 $$       # Damping coefficient (γ)
A = $$ 1.2 $$           # Driving force amplitude (A)
omega = $$ 2/3 $$      # Driving frequency (ω)
omega_0 = $$ 1.5 $$     # Natural frequency (ω₀), related to gravity and length
theta0 = $$ 0.2 $$     # Initial angle θ(0)
theta_dot0 = $$ 0.0 $$ # Initial angular velocity θ'(0)
t_max = $$ 100 $$       # Total simulation time in seconds
dt = $$ 0.01 $$         # Time step

# ----------------------------
# 2. DIFFERENTIAL EQUATION
# ----------------------------
def pendulum(t, y):
    theta, theta_dot = y
    dtheta_dt = theta_dot
    dtheta_dot_dt = -gamma * theta_dot - omega_0**2 * np.sin(theta) + A * np.cos(omega * t)
    return [dtheta_dt, dtheta_dot_dt]

# ----------------------------
# 3. SOLVE THE SYSTEM
# ----------------------------
t_span = (0, t_max)
t_eval = np.arange(0, t_max, dt)
y0 = [theta0, theta_dot0]

sol = solve_ivp(pendulum, t_span, y0, t_eval=t_eval, method='RK45')

theta = sol.y[0]
theta_dot = sol.y[1]
time = sol.t

# ----------------------------
# 4. PLOT: ANGULAR DISPLACEMENT OVER TIME
# ----------------------------
plt.figure(figsize=(10, 4))
plt.plot(time, theta, label='θ(t)')
plt.title("Forced Damped Pendulum - Angular Displacement")
plt.xlabel("Time (s)")
plt.ylabel("Angle θ (radians)")
plt.grid()
plt.legend()
plt.tight_layout()
plt.show()

# ----------------------------
# 5. PLOT: PHASE SPACE (θ vs θ̇)
# ----------------------------
plt.figure(figsize=(6, 6))
plt.plot(theta, theta_dot, lw=0.7)
plt.title("Phase Space (θ vs θ̇)")
plt.xlabel("θ (radians)")
plt.ylabel("θ̇ (radians/s)")
plt.grid()
plt.tight_layout()
plt.show()

# ----------------------------
# 6. PLOT: POINCARÉ SECTION
# ----------------------------
T_drive = 2 * np.pi / omega  # Driving period
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
