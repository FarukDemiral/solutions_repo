# Problem 
import numpy as np
import matplotlib.pyplot as plt

# Define constants
g = 9.81  # Acceleration due to gravity (m/s^2)

# Function to compute projectile motion
def projectile_motion(v0, theta, t_max=10, dt=0.01):
    """
    Simulates projectile motion.
    :param v0: Initial velocity (m/s)
    :param theta: Launch angle (degrees)
    :param t_max: Maximum simulation time (s)
    :param dt: Time step (s)
    :return: Arrays of x and y positions
    """
    theta_rad = np.radians(theta)
    t = np.arange(0, t_max, dt)
    x = v0 * np.cos(theta_rad) * t
    y = v0 * np.sin(theta_rad) * t - 0.5 * g * t**2
    
    # Keep only points where y >= 0
    valid_indices = y >= 0
    return x[valid_indices], y[valid_indices]

# Plot projectile motion for different angles
angles = [30, 45, 60]  # Degrees
v0 = 20  # Initial velocity (m/s)

plt.figure(figsize=(10, 5))
for theta in angles:
    x, y = projectile_motion(v0, theta)
    plt.plot(x, y, label=f"{theta} degrees")

plt.xlabel("Horizontal Distance (m)")
plt.ylabel("Vertical Distance (m)")
plt.title("Projectile Motion for Different Angles")
plt.legend()
plt.grid()
plt.show()
