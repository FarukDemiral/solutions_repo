# Problem 
import numpy as np
import matplotlib.pyplot as plt

# Constants
g = 9.81  # Gravitational acceleration (m/s^2)
v0 = 20   # Initial velocity (m/s)
theta = np.radians(45)  # Angle (converted to radians)

# Time interval
t_flight = (2 * v0 * np.sin(theta)) / g  # Total flight time
t = np.linspace(0, t_flight, num=100)  # Time points

# Motion equations
x = v0 * np.cos(theta) * t  # Horizontal distance
y = v0 * np.sin(theta) * t - 0.5 * g * t**2  # Vertical distance

# Plot
plt.figure(figsize=(8, 5))
plt.plot(x, y, label=r"$y = v_0 \sin(\theta) t - \frac{1}{2} g t^2$")

# Labels
plt.xlabel(r"Horizontal Distance (m)", fontsize=12)
plt.ylabel(r"Vertical Distance (m)", fontsize=12)

# Title and grid
plt.title(r"Projectile Motion: $y = v_0 \sin(\theta) t - \frac{1}{2} g t^2$", fontsize=14)
plt.legend()
plt.grid()

# Show plot
plt.show()
