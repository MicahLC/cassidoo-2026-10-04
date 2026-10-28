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
      setMinutes(null);
    }
  };

  const gridItemTransform = (item: Cell) => {
    switch(item) {
      case 2: return <img src="img/zombie.svg" width="32px" height="32px"></img>
      case 1: return <img src="img/woman.svg" width="32px" height="32px"></img>;
      case 0: return <img src="img/house.svg" width="32px" height="32px"></img>;
    }
  }
  const maxSize = 25;

  return (
  <main className="min-h-screen bg-green-200 text-center">
    <h1 className="text-3xl font-bold text-center">Zombie Apocalypse!</h1>
    <h3 className="text-lg font-semibold text-center">Ahhhhhhhh</h3>
    <h2><b>Directions:</b> Click any square in the grid to change it. Once you're ready, click the "Run Simulation" button to watch the zombies try to take over the town. Every minute, a zombie will turn every human adjacent to it into a zombie. The simulation will run until the zombies can't turn any more humans into zombies.</h2>
    <div className="mt-2">
      <h3>There's a max height and width of {maxSize}.</h3>
      <label htmlFor="height">Grid Height: </label>
      <input id="height" type="number" inputMode="numeric" value={dimensions.height} min="1" max={maxSize} onChange={(e) => {
        let height = parseInt(e.target.value);
        if (isNaN(height) || height < 1) return;
        if(height > maxSize) {
          height = maxSize;
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
      <label htmlFor="width">Grid Width: </label>
      <input id="width" type="number" inputMode="numeric" value={dimensions.width} min="1" max={maxSize} onChange={(e) => {
        let width = parseInt(e.target.value);
        if (isNaN(width) || width < 1) return;
        if(width > maxSize) {
          // alert("Width cannot be greater than 25");
          width = maxSize;
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
    </div>
    <div className="inline-grid grid-cols-1 justify-items-center p-2">
      <table className="inline-grid p-4 bg-green-700">
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
      <button className="bg-blue-400 hover:bg-blue-500 m-top-1 p-2 text-white justify-self-center
" onClick={() => {
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
        Run Simulation
      </button>
    </div>
    <br/>
    {minutes !== null && ((minutes >= 0) ? 
      <div>Minutes until apocalypse: {minutes}</div> : 
      <div>The humans survive!</div>)}
    <button className="bg-green-300 hover:bg-green-400 m-2 p-2 text-blue-500" onClick={() => {
      const newGrid = grid.map(row => row.map(() => 0 as Cell));
      setGrid(newGrid);
      setMinutes(null);
    }}>
      Clear Grid
    </button>
    <br/>
    <h3>Simulation parameters:</h3>
    <input type="number" inputMode="numeric" min="1" max="2500" value={stepSize} onChange={(e) => {
      let newStepSize = parseInt(e.target.value);
      if (isNaN(newStepSize) || newStepSize < 1) return;
      if (newStepSize > 2500) {
        newStepSize = 2500;
      }
      setStepSize(newStepSize);
    }} />
    <label htmlFor="stepSize">Step Size (ms)</label>
    <br/>
  </main>
  );
}

export default App;
