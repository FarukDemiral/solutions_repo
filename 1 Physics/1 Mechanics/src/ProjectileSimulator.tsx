import { useState, useEffect, useCallback } from "react";
import { solveProjectile, defaultProjectileParams, ProjectileParameters, ProjectilePoint } from "./projectilePhysics";
import SimulationControls from "./SimulationControls";
import TrajectoryChart from "./TrajectoryChart";

export default function ProjectileSimulator() {
  const [parameters, setParameters] = useState<ProjectileParameters>(defaultProjectileParams);
  const [points, setPoints] = useState<ProjectilePoint[]>([]);
  
  const runSimulation = useCallback(() => {
    const result = solveProjectile(parameters);
    setPoints(result);
  }, [parameters]);

  useEffect(() => {
    runSimulation();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Projectile Motion Simulator</h1>
      <SimulationControls onChange={setParameters} />
      <TrajectoryChart points={points} />
    </div>
  );
}
