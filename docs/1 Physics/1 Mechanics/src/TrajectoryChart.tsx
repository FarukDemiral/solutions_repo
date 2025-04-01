import { useEffect, useRef } from "react";
import { ProjectilePoint } from "./projectilePhysics";
import { Chart, registerables } from "chart.js";

// Chart.js bileşenlerini kaydet
Chart.register(...registerables);

interface Props {
  points: ProjectilePoint[];
}

export default function TrajectoryChart({ points }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Eski grafik varsa yok et
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Yeni grafik oluştur
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: points.map(p => p.x.toFixed(2)),
        datasets: [{
          label: "Projectile Trajectory",
          data: points.map(p => ({ x: p.x, y: p.y })),
          borderColor: "blue",
          backgroundColor: "rgba(0,0,255,0.2)",
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "X (meters)"
            }
          },
          y: {
            title: {
              display: true,
              text: "Y (meters)"
            }
          }
        }
      }
    });

    // Temizlik
    return () => chartInstance.current?.destroy();
  }, [points]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-3">Trajectory</h2>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
