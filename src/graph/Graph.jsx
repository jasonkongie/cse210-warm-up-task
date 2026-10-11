import { scale, ticks } from './scale.js'

const WIDTH = 500
const HEIGHT = 300
const MARGIN = { top: 20, right: 20, bottom: 40, left: 50 }

const round = (v) => Math.round(v * 10) / 10

// Draws `points` ([{ x, y }, ...]) as a scatter or line plot.
export default function Graph({ points, type = 'scatter' }) {
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xMin = Math.min(...xs)
  const xMax = Math.max(...xs)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)

  const left = MARGIN.left
  const right = WIDTH - MARGIN.right
  const top = MARGIN.top
  const bottom = HEIGHT - MARGIN.bottom

  const toX = scale(xMin, xMax, left, right)
  // SVG's y-axis points down, so larger values map to smaller pixel positions.
  const toY = scale(yMin, yMax, bottom, top)

  const sorted = [...points].sort((a, b) => a.x - b.x)
  const linePath = sorted
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.x)},${toY(p.y)}`)
    .join(' ')

  return (
    <svg
      className="graph"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={`${type} plot of ${points.length} points`}
    >
      <line className="axis" x1={left} y1={bottom} x2={right} y2={bottom} />
      <line className="axis" x1={left} y1={top} x2={left} y2={bottom} />

      {ticks(xMin, xMax).map((v, i) => (
        <g key={`x${i}`}>
          <line className="axis" x1={toX(v)} y1={bottom} x2={toX(v)} y2={bottom + 5} />
          <text className="label" x={toX(v)} y={bottom + 20} textAnchor="middle">
            {round(v)}
          </text>
        </g>
      ))}

      {ticks(yMin, yMax).map((v, i) => (
        <g key={`y${i}`}>
          <line className="axis" x1={left - 5} y1={toY(v)} x2={left} y2={toY(v)} />
          <text className="label" x={left - 10} y={toY(v) + 4} textAnchor="end">
            {round(v)}
          </text>
        </g>
      ))}

      {type === 'line' ? (
        <path className="line" d={linePath} />
      ) : (
        points.map((p, i) => (
          <circle key={i} className="point" cx={toX(p.x)} cy={toY(p.y)} r={5} />
        ))
      )}
    </svg>
  )
}
