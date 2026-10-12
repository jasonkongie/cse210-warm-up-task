import { useState } from 'react'
import Graph from './graph/Graph.jsx'
import './App.css'

const SAMPLE = `1, 2
2, 5
3, 3
4, 8
5, 6
6, 9`

const SCATTER_SAMPLE = `1920, 1080, 4820
1366, 768, 2150
1536, 864, 1730
1440, 900, 960
2560, 1440, 410
1280, 720, 180
390, 844, 3890
360, 800, 2640
414, 896, 1120
768, 1024, 340`

// Turns "x, y" lines into points, skipping any line that isn't two numbers.
function parsePoints(text) {
  return text
    .split('\n')
    .map((line) => line.split(',').map(parseFloat))
    .filter(
      (nums) =>
        nums.length >= 2 &&
        nums.length <= 3 &&
        nums.every(Number.isFinite)
    )
    .map(([x, y, z]) => (z === undefined ? { x, y } : { x, y, z }))
}

function App() {
  const [text, setText] = useState(SAMPLE)
  const [scatter_text, setScatterText] = useState(SCATTER_SAMPLE)
  const [type, setType] = useState('scatter')
  const points = parsePoints(text)
  const scatter_points = parsePoints(scatter_text)

  return (
    <main className="app">
      <h1>Graphing tool</h1>
      <br/>
      <br/>
      <div className="layout">

        <div className="controls">
          <label htmlFor="points">Points (x, y)</label>
          <textarea
            id="points"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
          {points.length >= 2 ? (
          <Graph 
            points={points} 
            type={type} 
            labels={{
              title: 'My Growing Smitski Collection',
              subtitle: 'Ts is definitely not an addiction...',
              x_axis_label: 'Time (months)',
              y_axis_label: '# Smitskis Owned',
              legend: 'Smitskis',
            }}
          />
        ) : (
          <p className="message">Enter at least two points, like 1, 2</p>
        )}
      </div>



      <div className="layout">
        <div className="controls">
          <label htmlFor="scatter_points">Points (x, y, size)</label>
          <textarea
            id="scatter_points"
            rows={10}
            value={scatter_text}
            onChange={(e) => setScatterText(e.target.value)}
          />
        </div>
          {scatter_points.length >= 2 ? (
          <Graph 
            points={scatter_points} 
            type={type} 
            labels={{
              title: 'Page Visits by Screen Resolution',
              subtitle: 'Dot area is proportional to visit count',
              x_axis_label: 'Resolution Width',
              y_axis_label: 'Resolution Height',
            }}
          />
        ) : (
          <p className="message">Enter at least two points, like 1, 2</p>
        )}
      </div>


      
    </main>
  )
}

export default App
