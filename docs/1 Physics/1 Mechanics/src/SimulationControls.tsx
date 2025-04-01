import { defaultProjectileParams, ProjectileParameters } from "./projectilePhysics";

interface Props {
  onChange: (params: ProjectileParameters) => void;
}

export default function SimulationControls({ onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {["v0", "angle", "g", "dt", "tMax"].map(param => (
        <div key={param}>
          <label className="block mb-1 font-medium capitalize">{param}</label>
          <input
            type="number"
            name={param}
            defaultValue={defaultProjectileParams[param as keyof ProjectileParameters]}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
      ))}
    </div>
  );
}
