import numpy as np
import matplotlib.pyplot as plt

# Constants
g = 9.81  # Gravity (m/s^2)
v0 = 20   # Initial velocity (m/s)

# Angle range from 0 to 90 degrees
angles = np.linspace(0, 90, 100)
ranges = (v0**2 * np.sin(2 * np.radians(angles))) / g

# Plotting
plt.figure(figsize=(8, 5))
plt.plot(angles, ranges, label="Projectile Range")
plt.xlabel("Angle of Projection (degrees)")
plt.ylabel("Range (meters)")
plt.title("Projectile Range vs. Angle of Projection")
plt.legend()
plt.grid()
plt.show()
