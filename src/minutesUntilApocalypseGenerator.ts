type Coordinate = {
  row: number,
  col: number
};
type Cell = 0 | 1 | 2;
type Result = {
  grid: Cell[][],
  time: number
}

/**
 * Returns minimum number of minutes until no living people remain.
 * @param grid - grid representing a town.
 * @returns A number of minutes
 */
export function *minutesUntilApocalypseGenerator(grid: Cell[][]): Generator<number> {
  const firstRow = grid[0];
  if (grid.length === 0 || !firstRow || firstRow.length === 0) {
    throw new Error("invalid input");
  }
  let height = grid.length, width = firstRow.length;
  // first look if we have any zombies and save their coordinates.
  let zombies: Coordinate[] = [];
  for(let row = 0; row < height; ++row) {
    const currentRow = grid[row];
    if (!currentRow) {
      throw new Error("null array in grid");
    }
    for(let col = 0; col < width; ++col) {
      if (currentRow[col] === 2) {
        zombies.push({ row, col });
      }
    }
  }
  if (zombies.length === 0) {
    // No zombies!
    return -1;
  }
  // now each zombie transforms any humans next to it
  let zombieAdded = false, time = 0;
  do {
    zombieAdded = false;
    let newZombies: Coordinate[] = [];
    zombies.forEach(zombie => {
      let adjacents: Coordinate[] = [];
      if (zombie.col > 0)
      {
        adjacents.push({ col: zombie.col - 1, row: zombie.row });
      }
      if (zombie.col < width - 1)
      {
        adjacents.push({ col: zombie.col + 1, row: zombie.row });
      }
      if (zombie.row > 0)
      {
        adjacents.push({ col: zombie.col, row: zombie.row - 1});
      }
      if (zombie.row < height - 1)
      {
        adjacents.push({ col: zombie.col, row: zombie.row + 1 });
      }
      adjacents.forEach(c => {
        const adjacentRow = grid[c.row];
        if (!adjacentRow) {
          throw new Error("null array in grid");
        }
        if (adjacentRow[c.col] === 1) {
          adjacentRow[c.col] = 2;
          zombieAdded = true;
          newZombies.push(c);
        }
      });
    });
    zombies = newZombies;
    if (zombieAdded) {
      ++time;
    }
    yield time;
  } 
  while(zombieAdded);
  // now let's check that all humans are gone
   for(let row = 0; row < height; ++row) {
    const currentRow = grid[row];
    if (!currentRow) {
      throw new Error("null array in grid");
    }
    for(let col = 0; col < width; ++col) {
      if (currentRow[col] === 1) {
        return -1;
      }
    }
  }
  return time;
}
