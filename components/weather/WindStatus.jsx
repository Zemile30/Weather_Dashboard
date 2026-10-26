import Card from "@/components/ui/Card";

export default function WindStatus({ data }) {
  const { speed, unit, time, bars } = data;

  return (
    <Card title="Wind Status">
      <div className="flex flex-1 items-center">
        <div className="flex h-[76px] w-full items-end justify-between">
          {bars.map((value, i) => (
            <span
              key={i}
              className="w-[3px] rounded-full bg-linear-to-t from-transparent to-white"
              style={{ height: `${value}%` }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p>
          <span className="text-base font-medium">{speed.toFixed(2)}</span>{" "}
          <span className="text-sm text-muted">{unit}</span>
        </p>
        <span className="text-sm text-muted">{time}</span>
      </div>
    </Card>
  );
}