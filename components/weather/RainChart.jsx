const HEIGHT = 260;
const BAR_BOTTOM = 210;
const MAX_BAR = 190;
const TRACK_EXTRA = 23;
const FIRST_X = 61;
const STEP = 43.4;
const LEVEL_Y = [10, 77, 144];

function buildCurve(points) {
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        const midX = (prev.x + cur.x) / 2;
        d += ` C ${midX} ${prev.y}, ${midX} ${cur.y}, ${cur.x} ${cur.y}`;
    }

    return d;
}
export default function RainChart({ data, levels }) {
    const bars = data.map((item, i) => {
        const height = (item.value / 100) * MAX_BAR;
        return {
            ...item,
            x: FIRST_X + i * STEP,
            top: BAR_BOTTOM - height,
        };
    });

    const curve = buildCurve(bars.map((b) => ({ x: b.x, y: b.top })));

    return (
        <section className="h-[226px]">
            <svg
                viewBox="0 0 300 226"
                className="block h-full w-full"
            >
                {levels.map((level, i) => (
                    <g key={level}>
                        <text x="0" y={LEVEL_Y[i] + 5} className="fill-white text-[15px]">
                            {level}
                        </text>
                        <line
                            x1="50"
                            x2="300"
                            y1={LEVEL_Y[i]}
                            y2={LEVEL_Y[i]}
                            className="stroke-soft"
                            strokeDasharray="3 3"
                        />
                    </g>
                ))}

                {bars.map((b) => (
                    <g key={b.hour}>
                        <rect
                            x={b.x - 3}
                            y={b.top - TRACK_EXTRA}
                            width="6"
                            height={BAR_BOTTOM - b.top + TRACK_EXTRA}
                            rx="3"
                            className="fill-card"
                        />
                        <rect
                            x={b.x - 3}
                            y={b.top}
                            width="6"
                            height={BAR_BOTTOM - b.top}
                            rx="3"
                            className="fill-card-light"
                        />
                    </g>
                ))}

                <path d={curve} fill="none" className="stroke-accent" strokeWidth="1" />

                {bars.map((b) => (
                    <circle key={b.hour} cx={b.x} cy={b.top} r="4" className="fill-accent" />
                ))}

                {bars.map((b) => (
                    <text
                        key={b.hour}
                        x={b.x}
                        y="223"
                        textAnchor="middle"
                        className="fill-white text-[13px]"
                    >
                        {b.hour}
                    </text>
                ))}
            </svg>
        </section>
    );
}