import { useState } from 'react';
import { Cell, minutesUntilApocalypseGenerator } from './minutesUntilApocalypseGenerator.js';

function App() {
  const [grid, setGrid] = useState([[0,0], [0,0]] as Cell[][]);
  const [dimensions, setDimensions] = useState({height: 2, width: 2});
  const [minutes, setMinutes] = useState<number | null>(null);
  const [stepSize, setStepSize] = useState(500);
  // todo: add disable state to buttons while generator is running, and add a cancel button to stop the generator.

  const cycleFunc = (n: Cell) => (n+1) % 3 as Cell;

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

  const gridItemTransform = (item: Cell) => {
    switch(item) {
      case 2: return <img src="img/zombie.svg" width="32px" height="32px"></img>
      case 1: return <img src="img/woman.svg" width="32px" height="32px"></img>;
      case 0: return <img src="img/house.svg" width="32px" height="32px"></img>;
    }
  }

  return (
  <main className="min-h-screen bg-green-200">
    <h1>Zombie Apocalypse!</h1>
    <h2>Ahhhhhhhh</h2>
    <h3>Directions: click an object to change it. Once they're set the way you want, click the "Initiate..." button to watch the zombies try to take over the town. Every minute, a zombie will turn every person adjacent to it into a zombie.</h3>
    <div className="border-5 border-black">
      <table className="inline-block p-4 bg-green-700">
        {grid.map((row, rowIndex) => { 
          return <tr key={rowIndex}>
            {row.map((item, colIndex) => {
              return <td key={colIndex} className="">
                <button className="bg-green-300 hover:bg-green-400 m-1 p-1" onClick={onClickElement(rowIndex, colIndex)}>
                  {gridItemTransform(item)}
                </button>
                </td>;
            })}
          </tr> 
        })}
      </table>
      <br/>
      <button className="bg-blue-400 hover:bg-blue-500 m-top-1 p-2 text-white" onClick={() => {
        try {
          const generator = minutesUntilApocalypseGenerator(grid);
          const generatorStep = () => {
            const result = generator.next();
            setGrid([...grid]);
            if (result.done) {
              setMinutes(result.value);
            } else {
              setTimeout(generatorStep, stepSize);
            }
          }
          generatorStep();
        } catch (e) {
          alert(e);
        }
      }}>
        Initiate Apocalypse Calculations
      </button>
    </div>
    <br/>
    <label htmlFor="height">Height:</label>
    <input id="height" type="number" value={dimensions.height} min="1" max="25" onChange={(e) => {
      const height = parseInt(e.target.value);
      if (isNaN(height) || height < 1) return;
      if(height > 25) {
        alert("Height cannot be greater than 25");
        e.target.value = "25";
        return;
      }
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
    <input id="width" type="number" value={dimensions.width} min="1" max="25" onChange={(e) => {
      const width = parseInt(e.target.value);
      if (isNaN(width) || width < 1) return;
      if(width > 25) {
        alert("Width cannot be greater than 25");
        e.target.value = "25";
        return;
      }
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
      const newGrid = grid.map(row => row.map(() => 0 as Cell));
      setGrid(newGrid);
      setMinutes(null);
    }}>
      Clear Grid
    </button>
    <br/>
    <input type="number" value={stepSize} onChange={(e) => {
      const newStepSize = parseInt(e.target.value);
      if (isNaN(newStepSize) || newStepSize < 1) return;
      setStepSize(newStepSize);
    }} />
    <label htmlFor="stepSize">Step Size (ms)</label>
    <br/>
    {minutes !== null && <div>Minutes until apocalypse: {minutes}</div>}
    <br />
  </main>
  );
}

export default App;
