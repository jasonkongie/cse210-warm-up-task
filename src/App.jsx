import { useState } from 'react'
import Graph from './graph/Graph.jsx'
import './App.css'

const SAMPLE = `1, 2
2, 5
3, 3
4, 8
5, 6
6, 9`

// Turns "x, y" lines into points, skipping any line that isn't two numbers.
function parsePoints(text) {
  return text
    .split('\n')
    .map((line) => line.split(',').map(parseFloat))
    .filter((nums) => nums.length === 2 && nums.every(Number.isFinite))
    .map(([x, y]) => ({ x, y }))
}

function App() {
  const [text, setText] = useState(SAMPLE)
  const [type, setType] = useState('scatter')
  const points = parsePoints(text)

  return (
    <main className="app">
      <h1>Graphing tool</h1>
      <div className="layout">
        <div className="controls">
          <label htmlFor="points">Points (x, y)</label>
          <textarea
            id="points"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="toggle">
            <button
              type="button"
              aria-pressed={type === 'scatter'}
              onClick={() => setType('scatter')}
            >
              Scatter
            </button>
            <button
              type="button"
              aria-pressed={type === 'line'}
              onClick={() => setType('line')}
            >
              Line
            </button>
          </div>
        </div>
        {points.length >= 2 ? (
          <Graph points={points} type={type} />
        ) : (
          <p className="message">Enter at least two points, like 1, 2</p>
        )}
      </div>
    </main>
  )
}

export default App
