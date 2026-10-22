import { useState } from 'react';

function App() {
  const [grid, setGrid] = useState([[0, 0]]);
  const [single, setSingle] = useState(0);
  const [dimensions, setDimensions] = useState({height: 1, width: 1});

  const cycleFunc = (n: number) => (n+1) % 3;

  const onClickElement = (rowIdx: number, colIdx: number) => {
    return () => {
      const copy = [...grid];
      copy[rowIdx][colIdx] = cycleFunc(grid[rowIdx][colIdx]);
      setGrid(copy);
    }
  };

  return (
  <main className="min-h-screen">
    <table className="flex p-6 bg-green-700">
      {grid.map((row, rowIndex) => { 
        return <tr key={rowIndex}>
          {row.map((item, colIndex) => {
            return <td key={colIndex} className=""><button className="bg-green-300 hover:bg-green-400 m-3 p-3 text-blue-500" onClick={onClickElement(rowIndex, colIndex)}>{item}</button></td>;
          })}
        </tr> 
      })}
    </table>
  </main>
  );
}

export default App;
