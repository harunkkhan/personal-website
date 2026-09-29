import { useEffect, useRef, useState } from "react";

type Day = { date: string; weekday: number; count: number; level: number };
type Contributions = { total: number; days: Day[] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FILLS = ["#eeeeee", "#c8c8c8", "#999999", "#5c5c5c", "#111111"];
const WEEKDAYS: [number, string][] = [
  [1, "Mon"],
  [3, "Wed"],
  [5, "Fri"],
];

let contributions: Promise<Contributions> | undefined;
let loaded: Contributions | null = null;

export function loadContributions() {
  contributions ??= fetch("/api/contributions")
    .then((res) => {
      if (!res.ok) throw new Error(`contributions request failed: ${res.status}`);
      return res.json() as Promise<Contributions>;
    })
    .then((data) => (loaded = data));
  return contributions;
}

function toWeeks(days: Day[]) {
  const weeks: Day[][] = [];
  for (const day of days) {
    if (day.weekday === 0 || !weeks.length) weeks.push([]);
    weeks[weeks.length - 1].push(day);
  }
  return weeks;
}

function monthLabels(weeks: Day[][]) {
  const labels: { col: number; month: number }[] = [];
  weeks.forEach((week, col) => {
    const month = Number(week[0].date.slice(5, 7)) - 1;
    if (labels.at(-1)?.month !== month) labels.push({ col, month });
  });
  if (labels.length > 1 && labels[1].col <= 2) labels.shift();
  return labels;
}

function describe({ date, count }: Day) {
  const [y, m, d] = date.split("-").map(Number);
  return `${count || "No"} ${count === 1 ? "contribution" : "contributions"} on ${MONTHS[m - 1]} ${d}, ${y}`;
}

export default function ContributionGraph() {
  const [data, setData] = useState(loaded);
  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<{ day: Day; col: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!data) loadContributions().then(setData);
  }, [data]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [data]);

  if (!data) return null;

  const all = toWeeks(data.days);
  const cols = Math.max(0, Math.min(Math.floor((width - 27 + 2) / 12), all.length));
  const weeks = all.slice(all.length - cols);

  return (
    <span ref={ref} className="contributions">
      <span className="contributionsTotal">{data.total.toLocaleString()} contributions in the last year</span>
      {cols > 0 && (
        <span className="contributionsGrid">
          <svg
            width={27 + 12 * cols - 2}
            height={102}
            role="img"
            aria-label={`${data.total} contributions in the last year`}
            onMouseLeave={() => setHover(null)}
          >
            {monthLabels(weeks).map(({ col, month }) => (
              <text key={col} x={27 + 12 * col} y={10} fontSize={10}>
                {MONTHS[month]}
              </text>
            ))}
            {WEEKDAYS.map(([wday, label]) => (
              <text key={label} x={0} y={12 * wday + 28 + (wday > 3 ? 1 : 0)} fontSize={9}>
                {label}
              </text>
            ))}
            {weeks.map((week, col) =>
              week.map((day) => (
                <rect
                  key={day.date}
                  x={27 + 12 * col}
                  y={20 + 12 * day.weekday}
                  width={10}
                  height={10}
                  rx={2}
                  fill={FILLS[day.level]}
                  onPointerEnter={() => setHover({ day, col })}
                />
              )),
            )}
          </svg>
          {hover && (
            <span
              className="contributionsTip"
              style={{
                left: 27 + 12 * hover.col + 5,
                top: 20 + 12 * hover.day.weekday - 4,
                transform: `translate(${cols > 1 ? (-100 * hover.col) / (cols - 1) : -50}%, -100%)`,
              }}
            >
              {describe(hover.day)}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
