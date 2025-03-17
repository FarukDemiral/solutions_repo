import numpy as np
import matplotlib.pyplot as plt

# Constants
G = 9.81  # Gravity (m/s^2)
V0 = 20   # Initial velocity (m/s)

# Angle range from 0 to 90 degrees
angles = np.linspace(0, 90, 100) # 100 evenly spaced angles from 0 to 90 degrees

# Projectile motion range formula: R = (V0^2 * sin(2θ)) / g
ranges = (V0 ** 2 * np.sin(2 * np.radians(angles))) / g

# Plotting
plt.figure(figsize=(8, 5)) # Set figure size
plt.plot(angles, ranges, label="Projectile Range")
plt.xlabel(r"Angle of Projection (degrees)")
plt.ylabel(r"Range (meters)")
plt.title(r"Projectile Range vs. Angle of Projection")
plt.legend()
plt.grid(True)  # Enable grid for better readability
plt.show()
