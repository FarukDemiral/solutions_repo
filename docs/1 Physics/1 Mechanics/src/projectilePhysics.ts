export interface ProjectileParameters {
    v0: number;
    angle: number;
    g: number;
    dt: number;
    tMax: number;
  }
  
  export interface ProjectilePoint {
    t: number;
    x: number;
    y: number;
  }
  
  export function solveProjectile(params: ProjectileParameters): ProjectilePoint[] {
    const { v0, angle, g, dt, tMax } = params;
    const theta = angle * Math.PI / 180;
    const v0x = v0 * Math.cos(theta);
    const v0y = v0 * Math.sin(theta);
  
    let t = 0;
    const points: ProjectilePoint[] = [];
  
    while (t <= tMax) {
      const x = v0x * t;
      const y = v0y * t - 0.5 * g * t * t;
      if (y < 0) break;
      points.push({ t, x, y });
      t += dt;
    }
  
    return points;
  }
  
  export const defaultProjectileParams: ProjectileParameters = {
    v0: 20,
    angle: 45,
    g: 9.81,
    dt: 0.02,
    tMax: 10
  };
  