import { useState } from 'react';
import './App.css'

type TPoint = {
  x: number,
  y: number
}

function App() {
  const [points, setPoints] = useState<TPoint[]>([]);
  const [removedPoints, setRemovedPoints] = useState<TPoint[]>([])

  function handlePlaceCircle(e: React.MouseEvent){
    //console.log(`${e.clientX} ${e.clientY}`);
    const {clientX, clientY} = e;
    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY
      }
    ])
  }

  function handleUndo(e: React.MouseEvent){
    //console.log(e)
    e.stopPropagation()
    if(Array.isArray(points) && points.length) {
      const newPoints: TPoint[] = [...points]
      //const removedPoint: TPoint = newPoints.pop()
      setRemovedPoints([...removedPoints, newPoints.pop()!])
      setPoints(newPoints)
    }
  }

  function handleRedo(e: React.MouseEvent){
    e.stopPropagation()
    if(Array.isArray(removedPoints) && removedPoints.length) {
      const newRemovedPoints = [...removedPoints]
      setPoints([...points, newRemovedPoints.pop()!])
      setRemovedPoints([...newRemovedPoints])
    }
    
  }

  return (
    <div className='App' onClick={handlePlaceCircle}>
      <div className='buttons'>
        <button onClick={(e) => handleUndo(e)} disabled={points.length === 0}>Undo</button>
        <button onClick={(e) => handleRedo(e)} disabled={removedPoints.length === 0}>Redo</button>
      </div>
      <div>
        {points.map((point, index) => (<div key={index} className='point' style={{
            left: point.x -5,
            top: point.y -5,
          }}></div>))}
      </div>
    </div>
  )
}

export default App
