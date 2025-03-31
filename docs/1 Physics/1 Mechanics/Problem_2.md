# Problem 2 
1. pendulumPhysics.ts
/**
 * Forced Damped Pendulum Physics Module
 * 
 * This module implements the physics for a forced damped pendulum, which is a 
 * non-linear system that can exhibit chaotic behavior under certain conditions.
 * 
 * The pendulum is described by the differential equation:
 * d²θ/dt² + γ·dθ/dt + ω₀²·sin(θ) = A·cos(ω·t)
 * 
 * Where:
 * - θ is the angular displacement
 * - γ is the damping coefficient
 * - ω₀ is the natural frequency
 * - A is the driving amplitude
 * - ω is the driving frequency
 */
export interface PendulumPoint {
  t: number;  // time
  theta: number;  // angle
  thetaDot: number;  // angular velocity
}
export interface PendulumResult {
  points: PendulumPoint[];
  poincarePoints: PendulumPoint[];
  params: PendulumParameters;
}
export interface PendulumParameters {
  gamma: number;     // damping coefficient
  A: number;         // driving amplitude
  omega: number;     // driving frequency
  omega0: number;    // natural frequency
  theta0: number;    // initial angle
  thetaDot0: number; // initial angular velocity
  tMax: number;      // simulation time
  dt: number;        // time step
}
export const defaultParams: PendulumParameters = {
  gamma: 0.5,
  A: 1.2,
  omega: 0.67,
  omega0: 1.0,
  theta0: 0.2,
  thetaDot0: 0.0,
  tMax: 100,
  dt: 0.05
};
/**
 * The pendulum ODE function.
 * 
 * Given the current state and parameters, computes the derivatives.
 * Returns [dθ/dt, d²θ/dt²]
 */
function pendulumODE(t: number, y: [number, number], params: PendulumParameters): [number, number] {
  const [theta, thetaDot] = y;
  const { gamma, A, omega, omega0 } = params;
  
  // d²θ/dt² = -γ·dθ/dt - ω₀²·sin(θ) + A·cos(ωt)
  const thetaDotDot = -gamma * thetaDot - omega0 * omega0 * Math.sin(theta) + A * Math.cos(omega * t);
  
  return [thetaDot, thetaDotDot];
}
/**
 * Runge-Kutta 4th order method for solving the pendulum ODE.
 * 
 * This is a numerical method for solving ordinary differential equations.
 */
function rk4Step(t: number, y: [number, number], dt: number, params: PendulumParameters): [number, number] {
  const k1 = pendulumODE(t, y, params);
  
  const y2: [number, number] = [
    y[0] + k1[0] * dt / 2,
    y[1] + k1[1] * dt / 2
  ];
  const k2 = pendulumODE(t + dt / 2, y2, params);
  
  const y3: [number, number] = [
    y[0] + k2[0] * dt / 2,
    y[1] + k2[1] * dt / 2
  ];
  const k3 = pendulumODE(t + dt / 2, y3, params);
  
  const y4: [number, number] = [
    y[0] + k3[0] * dt,
    y[1] + k3[1] * dt
  ];
  const k4 = pendulumODE(t + dt, y4, params);
  
  return [
    y[0] + (dt / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
    y[1] + (dt / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
  ];
}
/**
 * Solve the pendulum differential equation and return the result.
 * 
 * This function generates both the full trajectory and the Poincaré section,
 * which samples the phase space at intervals of the driving period.
 */
export function solvePendulum(params: PendulumParameters): PendulumResult {
  const { theta0, thetaDot0, tMax, dt, omega } = params;
  
  // Initialize state
  let t = 0;
  let theta = theta0;
  let thetaDot = thetaDot0;
  
  const points: PendulumPoint[] = [];
  const poincarePoints: PendulumPoint[] = [];
  
  // The driving period
  const T = 2 * Math.PI / omega;
  
  // Time for next Poincaré section
  let nextPoincareTime = T;
  
  // Add initial point
  points.push({ t, theta, thetaDot });
  
  // Main integration loop
  while (t < tMax) {
    // Calculate next state using RK4
    const [newTheta, newThetaDot] = rk4Step(t, [theta, thetaDot], dt, params);
    
    // Update time
    t += dt;
    
    // Normalize theta to [-π, π]
    theta = ((newTheta + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
    thetaDot = newThetaDot;
    
    // Add point to trajectory
    points.push({ t, theta, thetaDot });
    
    // Check if we should add a point to the Poincaré section
    if (t >= nextPoincareTime) {
      poincarePoints.push({ t, theta, thetaDot });
      nextPoincareTime += T;
    }
  }
  
  return { 
    points, 
    poincarePoints,
    params 
  };
}
2. PendulumSimulator.tsx
import { useState, useCallback, useEffect } from "react";
import SimulationControls from "./SimulationControls";
import AngularDisplacementChart from "./AngularDisplacementChart";
import PhaseSpaceChart from "./PhaseSpaceChart";
import PoincareChart from "./PoincareChart";
import { solvePendulum, PendulumParameters, PendulumResult, defaultParams } from "./pendulumPhysics";
export default function PendulumSimulator() {
  // State for simulation parameters and results
  const [parameters, setParameters] = useState<PendulumParameters>(defaultParams);
  const [simulationData, setSimulationData] = useState<PendulumResult | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Handle parameter changes from controls
  const handleParametersChange = useCallback((newParams: PendulumParameters) => {
    setParameters(newParams);
  }, []);
  
  // Run simulation with current parameters
  const runSimulation = useCallback(() => {
    setLoading(true);
    
    // Use setTimeout to prevent UI freezing during computation
    setTimeout(() => {
      try {
        const result = solvePendulum(parameters);
        setSimulationData(result);
      } catch (error) {
        console.error("Simulation error:", error);
        alert("An error occurred during simulation.");
      } finally {
        setLoading(false);
      }
    }, 10);
  }, [parameters]);
  
  // Run initial simulation on mount
  useEffect(() => {
    runSimulation();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Forced Damped Pendulum Simulation</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Interactive simulation of a forced damped pendulum described by the differential equation:
          <span className="block my-2 font-mono bg-gray-100 p-2 rounded">
            d²θ/dt² + γ·dθ/dt + ω₀²·sin(θ) = A·cos(ω·t)
          </span>
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Control Panel */}
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Simulation Parameters</h2>
            <SimulationControls
              onParametersChange={handleParametersChange}
              onSimulate={runSimulation}
            />
          </div>
        </div>
        
        {/* Charts */}
        <div className="md:w-2/3 space-y-6">
          {loading ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
              <p className="text-lg">Calculating simulation... This may take a moment</p>
            </div>
          ) : (
            <>
              <AngularDisplacementChart simulationData={simulationData} />
              
              <div className="grid md:grid-cols-2 gap-6">
                <PhaseSpaceChart simulationData={simulationData} />
                <PoincareChart simulationData={simulationData} />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-3">Equations & Theory</h2>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Differential Equation:</strong>
                    <span className="block font-mono my-1">d²θ/dt² + γ·dθ/dt + ω₀²·sin(θ) = A·cos(ω·t)</span>
                  </p>
                  <div>
                    <strong>Parameters:</strong>
                    <ul className="ml-5 list-disc">
                      <li>γ (gamma): Damping coefficient</li>
                      <li>ω₀ (omega0): Natural frequency</li>
                      <li>A: Driving amplitude</li>
                      <li>ω (omega): Driving frequency</li>
                    </ul>
                  </div>
                  <p>
                    <strong>Phase Space:</strong> Shows the relationship between angle (θ) and angular velocity (θ̇).
                    The trajectory in phase space can reveal patterns in the pendulum's behavior.
                  </p>
                  <p>
                    <strong>Poincaré Section:</strong> Samples the phase space at regular intervals synchronized 
                    with the driving force, revealing the long-term behavior and potential chaos.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
3. SimulationControls.tsx
import { useState, useEffect } from 'react';
import { PendulumParameters, defaultParams } from './pendulumPhysics';
interface SimulationControlsProps {
  onParametersChange: (params: PendulumParameters) => void;
  onSimulate: () => void;
}
export default function SimulationControls({ 
  onParametersChange, 
  onSimulate 
}: SimulationControlsProps) {
  const [params, setParams] = useState<PendulumParameters>({...defaultParams});
  useEffect(() => {
    onParametersChange(params);
  }, [params, onParametersChange]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      setParams(prevParams => ({
        ...prevParams,
        [name]: numValue
      }));
    }
  };
  const handleSliderChange = (name: keyof PendulumParameters, value: number) => {
    setParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };
  return (
    <div className="space-y-6">
      {/* Damping Coefficient (gamma) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="gamma">Damping Coefficient (γ)</label>
          <span>{params.gamma.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="gamma"
          min={0}
          max={2}
          step={0.01}
          value={params.gamma}
          onChange={(e) => handleSliderChange("gamma", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="gamma"
          value={params.gamma}
          onChange={handleInputChange}
          className="w-full"
          step="0.01"
        />
      </div>
      {/* Driving Amplitude (A) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="A">Driving Amplitude (A)</label>
          <span>{params.A.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="A"
          min={0}
          max={5}
          step={0.1}
          value={params.A}
          onChange={(e) => handleSliderChange("A", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="A"
          value={params.A}
          onChange={handleInputChange}
          className="w-full"
          step="0.1"
        />
      </div>
      {/* Driving Frequency (omega) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="omega">Driving Frequency (ω)</label>
          <span>{params.omega.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="omega"
          min={0.1}
          max={3}
          step={0.01}
          value={params.omega}
          onChange={(e) => handleSliderChange("omega", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="omega"
          value={params.omega}
          onChange={handleInputChange}
          className="w-full"
          step="0.01"
        />
      </div>
      {/* Natural Frequency (omega0) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="omega0">Natural Frequency (ω₀)</label>
          <span>{params.omega0.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="omega0"
          min={0.1}
          max={3}
          step={0.01}
          value={params.omega0}
          onChange={(e) => handleSliderChange("omega0", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="omega0"
          value={params.omega0}
          onChange={handleInputChange}
          className="w-full"
          step="0.01"
        />
      </div>
      {/* Initial Angle (theta0) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="theta0">Initial Angle (θ₀)</label>
          <span>{params.theta0.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="theta0"
          min={-3.14}
          max={3.14}
          step={0.01}
          value={params.theta0}
          onChange={(e) => handleSliderChange("theta0", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="theta0"
          value={params.theta0}
          onChange={handleInputChange}
          className="w-full"
          step="0.01"
        />
      </div>
      {/* Initial Angular Velocity (thetaDot0) */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="thetaDot0">Initial Angular Velocity (θ̇₀)</label>
          <span>{params.thetaDot0.toFixed(2)}</span>
        </div>
        <input
          type="range"
          id="thetaDot0"
          min={-3}
          max={3}
          step={0.1}
          value={params.thetaDot0}
          onChange={(e) => handleSliderChange("thetaDot0", parseFloat(e.target.value))}
          className="w-full"
        />
        <input
          type="number"
          name="thetaDot0"
          value={params.thetaDot0}
          onChange={handleInputChange}
          className="w-full"
          step="0.1"
        />
      </div>
      {/* Run Simulation Button */}
      <button 
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={onSimulate}
      >
        Run Simulation
      </button>
    </div>
  );
}
4. AngularDisplacementChart.tsx
import { useEffect, useRef } from 'react';
import { PendulumResult } from './pendulumPhysics';
import { Chart, registerables } from 'chart.js';
// Register Chart.js components
Chart.register(...registerables);
interface AngularDisplacementChartProps {
  simulationData: PendulumResult | null;
}
export default function AngularDisplacementChart({ simulationData }: AngularDisplacementChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!simulationData || !chartRef.current) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Get every nth point to avoid too many points
    const stride = Math.max(1, Math.floor(simulationData.points.length / 500));
    const filteredPoints = simulationData.points.filter((_, i) => i % stride === 0);
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: filteredPoints.map(p => p.t.toFixed(1)),
        datasets: [{
          label: 'Angular Displacement (θ)',
          data: filteredPoints.map(p => p.theta),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Angular Displacement Over Time',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time (s)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Angle (rad)'
            }
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [simulationData]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Angular Displacement Over Time</h2>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
5. PhaseSpaceChart.tsx
import { useEffect, useRef } from 'react';
import { PendulumResult } from './pendulumPhysics';
import { Chart, registerables } from 'chart.js';
// Register Chart.js components
Chart.register(...registerables);
interface PhaseSpaceChartProps {
  simulationData: PendulumResult | null;
}
export default function PhaseSpaceChart({ simulationData }: PhaseSpaceChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!simulationData || !chartRef.current) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Sample points to avoid overcrowding
    const stride = Math.max(1, Math.floor(simulationData.points.length / 200));
    const filteredPoints = simulationData.points.filter((_, i) => i % stride === 0);
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Phase Space',
          data: filteredPoints.map(p => ({
            x: p.theta,  // angle
            y: p.thetaDot  // angular velocity
          })),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          pointRadius: 2,
          showLine: true,
          borderColor: 'rgba(255, 99, 132, 0.8)',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Angle θ (rad)'
            },
            min: -Math.PI,
            max: Math.PI
          },
          y: {
            title: {
              display: true,
              text: 'Angular Velocity θ̇ (rad/s)'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const point = context.raw;
                return `θ: ${point.x.toFixed(2)}, θ̇: ${point.y.toFixed(2)}`;
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [simulationData]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Phase Space</h2>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Plots angular velocity (θ̇) vs. angle (θ), showing system dynamics
      </p>
    </div>
  );
}
6. PoincareChart.tsx
import { useEffect, useRef } from 'react';
import { PendulumResult } from './pendulumPhysics';
import { Chart, registerables } from 'chart.js';
// Register Chart.js components
Chart.register(...registerables);
interface PoincareChartProps {
  simulationData: PendulumResult | null;
}
export default function PoincareChart({ simulationData }: PoincareChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (!simulationData || !chartRef.current || !simulationData.poincarePoints.length) return;
    
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
    
    chartInstance.current = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Poincaré Section',
          data: simulationData.poincarePoints.map(p => ({
            x: p.theta,
            y: p.thetaDot
          })),
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
          pointRadius: 3,
          pointHoverRadius: 5,
          showLine: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Angle θ (rad)'
            },
            min: -Math.PI,
            max: Math.PI
          },
          y: {
            title: {
              display: true,
              text: 'Angular Velocity θ̇ (rad/s)'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const point = context.raw;
                return `θ: ${point.x.toFixed(2)}, θ̇: ${point.y.toFixed(2)}`;
              }
            }
          },
          legend: {
            display: false
          }
        }
      }
    });
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [simulationData]);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Poincaré Section</h2>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Sample points at driving period intervals reveal chaotic or periodic behavior
      </p>
    </div>
  );
}