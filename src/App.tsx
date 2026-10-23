import { useState } from 'react';
import { minutesUntilApocalypse } from './minutesUntilApocalypse.js';

function App() {
  const [grid, setGrid] = useState([[0]]);
  const [dimensions, setDimensions] = useState({height: 1, width: 1});
  const [minutes, setMinutes] = useState<number | null>(null);

  const cycleFunc = (n: number) => (n+1) % 3;

  const onClickElement = (rowIdx: number, colIdx: number) => {
    return () => {
      const copy = [...grid];
      const row = copy[rowIdx];
      const value = row?.[colIdx];
      if (row === undefined || value === undefined) return;

      const updatedRow = [...row];
      updatedRow[colIdx] = cycleFunc(value);
      copy[rowIdx] = updatedRow;
      setGrid(copy);
    }
  };

  return (
  <main className="min-h-screen">
    <label htmlFor="height">Height:</label>
    <input id="height" type="number" value={dimensions.height} onChange={(e) => {
      const height = parseInt(e.target.value);
      if (isNaN(height) || height < 1) return;
      setDimensions({ ...dimensions, height });
      const newGrid = [...grid];
      while (newGrid.length < height) {
        newGrid.push(new Array(dimensions.width).fill(0));
      }
      while(newGrid.length > height) {
        newGrid.pop();
      }
      setGrid(newGrid);
      setMinutes(null);
    }} />
    <label htmlFor="width">Width:</label>
    <input id="width" type="number" value={dimensions.width} onChange={(e) => {
      const width = parseInt(e.target.value);
      if (isNaN(width) || width < 1) return;
      setDimensions({ ...dimensions, width });
      const newGrid = [...grid];
      newGrid.forEach((row) => {
        if (dimensions.width > width) {
          row.length = width;
        } else {
          while (row.length < width) {
            row.push(0);
          }
        }
      });
      setGrid(newGrid);
      setMinutes(null);
    }} />
    <button className="bg-green-300 hover:bg-green-400 m-2 p-2 text-blue-500" onClick={() => {
      const newGrid = grid.map(row => row.map(() => 0));
      setGrid(newGrid);
      setMinutes(null);
    }}>
      Clear Grid
    </button>
    <br/>
    <table className="inline-block p-6 bg-green-700">
      {grid.map((row, rowIndex) => { 
        return <tr key={rowIndex}>
          {row.map((item, colIndex) => {
            return <td key={colIndex} className=""><button className="bg-green-300 hover:bg-green-400 m-2 p-2 text-blue-500" onClick={onClickElement(rowIndex, colIndex)}>{item}</button></td>;
          })}
        </tr> 
      })}
    </table>
    <br/>
    <button className="bg-blue-400 hover:bg-blue-500 m-2 p-2 text-white" onClick={() => {
      try {
        const minutes = minutesUntilApocalypse(grid);
        setMinutes(minutes);
      } catch (e) {
        alert(e);
      }
    }}>
      Calculate Minutes Until Apocalypse
    </button>
    {minutes !== null && <div>Minutes until apocalypse: {minutes}</div>}
    <br />
  </main>
  );
}

export default App;
