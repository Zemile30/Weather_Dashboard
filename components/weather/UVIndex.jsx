import Card from "@/components/ui/Card";

const CX = 60;
const CY = 60;
const R = 50;
const ARC = "M 10 60 A 50 50 0 0 1 110 60";

function tickPosition(value, max) {
  const angle = (value / max) * Math.PI;
  const r = R - 20;
  return {
    x: CX - r * Math.cos(angle),
    y: CY - r * Math.sin(angle),
  };
}

export default function UVIndex({ data }) {
  const { value, max, ticks } = data;
  const percent = (value / max) * 100;

  return (
    <Card title="UV Index">
      <div className="flex flex-1 flex-col items-center justify-center">
        <svg viewBox="0 0 120 64" className="w-32">
          <path
            d={ARC}
            pathLength="100"
            fill="none"
            strokeWidth="8"
            className="stroke-card-light"
          />
          <path
            d={ARC}
            pathLength="100"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${percent} 100`}
            className="stroke-accent"
          />
          {ticks.map((t) => {
            const { x, y } = tickPosition(t, max);
            return (
              <text
                key={t}
                x={x}
                y={y}
                fontSize="10"
                textAnchor="middle"
                className="fill-muted"
              >
                {t}
              </text>
            );
          })}
        </svg>

        <p className="mt-12">
          <span className="text-xl font-medium">{value.toFixed(2)}</span>{" "}
          <span className="text-lg text-muted">UV</span>
        </p>
      </div>
    </Card>
  );
}