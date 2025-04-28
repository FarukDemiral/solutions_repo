# Problem 1
## Lorentz Force Simulation (Java)

This document contains a Java program that simulates the motion of a charged particle under the influence of the Lorentz force in various electromagnetic field configurations.

### 1. Exploration of Applications

The Lorentz force plays a crucial role in many physical systems:

* **Particle accelerators:** These devices use electric and magnetic fields to accelerate charged particles to very high speeds. The Lorentz force is essential for bending and focusing the particle beams.
* **Mass spectrometers:** These instruments measure the mass-to-charge ratio of ions. Magnetic fields are used to deflect ions, and the Lorentz force determines the radius of their trajectory.
* **Plasma confinement (e.g., Tokamaks):** In fusion research, Tokamaks use strong magnetic fields to confine hot plasma. The Lorentz force prevents the charged particles in the plasma from escaping.

In these applications, electric fields accelerate charged particles, while magnetic fields control their direction of motion.

### 2. Simulating Particle Motion

```java
import org.apache.commons.math3.geometry.euclidean.ThreedVector;
import org.apache.commons.math3.ode.FirstOrderDifferentialEquations;
import org.apache.commons.math3.ode.nonstiff.ClassicalRungeKuttaIntegrator;
import org.apache.commons.math3.ode.FirstOrderIntegrator;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class LorentzForceSimulation {

    // Class to represent 3D vectors, using Apache Commons Math
    public static class Vector3D implements ThreedVector {
        private final double x;
        private final double y;
        private final double z;

        public Vector3D(double x, double y, double z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public double getX() {
            return x;
        }

        public double getY() {
            return y;
        }

        public double getZ() {
            return z;
        }

        @Override
        public double getNorm1() {
            return Math.abs(x) + Math.abs(y) + Math.abs(z);
        }

        @Override
        public double getNorm() {
            return Math.sqrt(x * x + y * y + z * z);
        }

        @Override
        public double getNormSq() {
            return x * x + y * y + z * z;
        }

        @Override
        public double getDistance(ThreedVector p) {
            return this.subtract(p).getNorm();
        }

        @Override
        public Vector3D add(double a, ThreedVector p) {
            return new Vector3D(x + a * p.getX(), y + a * p.getY(), z + a * p.getZ());
        }

        @Override
        public Vector3D add(ThreedVector p) {
            return new Vector3D(x + p.getX(), y + p.getY(), z + p.getZ());
        }

        @Override
        public Vector3D subtract(ThreedVector p) {
            return new Vector3D(x - p.getX(), y - p.getY(), z - p.getZ());
        }

        @Override
        public Vector3D multiply(double a) {
            return new Vector3D(a * x, a * y, a * z);
        }

        @Override
        public Vector3D negate() {
            return new Vector3D(-x, -y, -z);
        }

        @Override
        public Vector3D normalize() {
          double norm = getNorm();
          if (norm == 0) {
            return new Vector3D(0,0,0);
          }
            return new Vector3D(x / norm, y / norm, z / norm);
        }

        @Override
        public double dotProduct(ThreedVector p) {
            return x * p.getX() + y * p.getY() + z * p.getZ();
        }

        @Override
        public Vector3D crossProduct(ThreedVector p) {
            return new Vector3D(y * p.getZ() - z * p.getY(),
                              z * p.getX() - x * p.getZ(),
                              x * p.getY() - y * p.getX());
        }

        @Override
        public double getAlpha() {
            return Math.atan2(y, x);
        }

        @Override
        public double getDelta() {
            return Math.asin(z / getNorm());
        }

        @Override
        public String toString() {
            return String.format(Locale.US, "(%.3f, %.3f, %.3f)", x, y, z);
        }
    }

    // Class to represent the Lorentz force calculation as a set of differential equations
    public static class LorentzEquations implements FirstOrderDifferentialEquations {
        private final double q; // Charge
        private final double m; // Mass
        private final Vector3D E; // Electric field
        private final Vector3D B; // Magnetic field

        public LorentzEquations(double q, double m, Vector3D E, Vector3D B) {
            this.q = q;
            this.m = m;
            this.E = E;
            this.B = B;
        }

        @Override
        public int getDimension() {
            return 6; // We have 6 variables: [x, y, z, vx, vy, vz]
        }

        @Override
        public void computeDerivatives(double t, double[] y, double[] yDot) {
            // y[0] = x, y[1] = y, y[2] = z
            // y[3] = vx, y[4] = vy, y[5] = vz

            Vector3D r = new Vector3D(y[0], y[1], y[2]);
            Vector3D v = new Vector3D(y[3], y[4], y[5]);
            Vector3D F = lorentzForce(q, E, v, B);

            // dv/dt = F/m
            yDot[3] = F.getX() / m;
            yDot[4] = F.getY() / m;
            yDot[5] = F.getZ() / m;

            // dr/dt = v
            yDot[0] = v.getX();
            yDot[1] = v.getY();
            yDot[2] = v.getZ();
        }
    }

    /**
     * Calculates the Lorentz force on a charged particle.
     *
     * @param q The charge of the particle (scalar).
     * @param E The electric field vector (3D vector).
     * @param v The velocity vector of the particle (3D vector).
     * @param B The magnetic field vector (3D vector).
     * @return The force vector (3D vector).
     */
    public static Vector3D lorentzForce(double q, Vector3D E, Vector3D v, Vector3D B) {
        return E.multiply(q).add(v.crossProduct(B).multiply(q));
    }

    /**
     * Simulates the motion of a charged particle in electromagnetic fields using the Runge-Kutta 4th order method.
     *
     * @param q     The charge of the particle (scalar).
     * @param m     The mass of the particle (scalar).
     * @param E     The electric field vector (3D vector).
     * @param B     The magnetic field vector (3D vector).
     * @param v0    The initial velocity vector (3D vector).
     * @param r0    The initial position vector (3D vector).
     * @param tMax  The maximum simulation time (scalar).
     * @param dt    The time step (scalar).
     * @return A list of Vector3D representing the trajectory.
     * @throws Exception if the simulation fails.
     */
    public static List<Vector3D> simulateMotion(double q, double m, Vector3D E, Vector3D B, Vector3D v0, Vector3D r0, double tMax, double dt) throws Exception {
        FirstOrderIntegrator integrator = new ClassicalRungeKuttaIntegrator(dt);
        LorentzEquations equations = new LorentzEquations(q, m, E, B);
        double[] y0 = {r0.getX(), r0.getY(), r0.getZ(), v0.getX(), v0.getY(), v0.getZ()};
        double[] y = new double[y0.length];
        System.arraycopy(y0, 0, y, 0, y0.length);  //copy initial state

        List<Vector3D> trajectory = new ArrayList<>();
        trajectory.add(r0); // Add the initial position

        double t = 0;
        while (t < tMax) {
            integrator.integrate(equations, t, y, t + dt, y);
            t += dt;
            trajectory.add(new Vector3D(y[0], y[1], y[2])); //add new position to list
        }
        return trajectory;
    }

    /**
     * Saves the trajectory to a CSV file.
     *
     * @param trajectory The list of position vectors.
     * @param filename   The name of the CSV file.
     * @throws IOException if an error occurs during file writing.
     */
    public static void saveTrajectoryToCSV(List<Vector3D> trajectory, String filename) throws IOException {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filename))) {
            writer.println("x,y,z"); // CSV header
            for (Vector3D point : trajectory) {
                writer.printf(Locale.US, "%.6f,%.6f,%.6f%n", point.getX(), point.getY(), point.getZ());
            }
        }
    }

    /**
     * Main method to run the simulation and save the results.
     *
     * @param args Command line arguments (not used).
     */
    public static void main(String[] args) {
        try {
            // Parameters
            double q = 1.6e-19; // Charge of proton (C)
            double m = 1.67e-27; // Mass of proton (kg)
            double dt = 1e-9;    // Time step (s)
            double tMax = 1e-6;  // Maximum simulation time (s)

            // Initial conditions
            Vector3D r0 = new Vector3D(0, 0, 0);       // Initial position (m)
            Vector3D v0 = new Vector3D(100, 0, 0);     // Initial velocity (m/s)

            // 1. Uniform magnetic field
            Vector3D E = new Vector3D(0, 0, 0);
            Vector3D B = new Vector3D(0, 0, 0.5); // Magnetic field in Z direction (T)
            List<Vector3D> trajectory1 = simulateMotion(q, m, E, B, v0, r0, tMax, dt);
            saveTrajectoryToCSV(trajectory1, "uniform_magnetic_field.csv");
            System.out.println("Uniform Magnetic Field simulation complete. Results saved to uniform_magnetic_field.csv");

            // Larmor radius and cyclotron frequency
            double vMag = v0.getNorm();
            double larmorRadius = (m * vMag) / (q * B.getNorm());  // исправлено
            double cyclotronFrequency = (q * B.getNorm()) / m;
            System.out.printf(Locale.US, "Larmor radius: %.2e m%n", larmorRadius);
            System.out.printf(Locale.US, "Cyclotron frequency: %.2e rad/s%n", cyclotronFrequency);

            // 2. Combined uniform electric and magnetic fields
            E = new Vector3D(10, 0, 0); // Electric field in X direction (V/m)
            B = new Vector3D(0, 5, 0); // Magnetic field in Y direction (T)
            List<Vector3D> trajectory2 = simulateMotion(q, m, E, B, v0, r0, tMax, dt);
            saveTrajectoryToCSV(trajectory2, "combined_fields.csv");
            System.out.println("Combined Fields simulation complete. Results saved to combined_fields.csv");

            // 3. Crossed electric and magnetic fields
            E = new Vector3D(100, 0, 0);
            B = new Vector3D(0, 0, 0.5);
            List<Vector3D> trajectory3 = simulateMotion(q, m, E, B, v0, r0, tMax, dt);
            saveTrajectoryToCSV(trajectory3, "crossed_fields.csv");
            System.out.println("Crossed Fields simulation complete. Results saved to crossed_fields.csv");

            // Drift velocity
            Vector3D driftVelocity = E.crossProduct(B).multiply(1.0 / B.getNormSq());
            System.out.printf(Locale.US, "Drift velocity: (%.2f, %.2f, %.2f) m/s%n", driftVelocity.getX(),driftVelocity.getY(),driftVelocity.getZ());

        } catch (Exception e) {
            System.err.println("An error occurred: " + e.getMessage());
            e.printStackTrace(); // print stack trace for detailed error info.
        }
    }
}
