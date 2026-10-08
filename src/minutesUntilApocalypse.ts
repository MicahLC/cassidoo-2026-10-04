/**
 * Returns minimum number of minutes until no living people remain.
 * @param grid - grid representing a town.
 * @returns A number of minutes
 */
export function minutesUntilApocalypse(grid: number[][]): number {
  if (grid.length === 0 || grid[0]?.length === 0) {
    throw new Error("invalid input");
  }
  for(let i = 0; i < grid.length; ++i) {
    if (!grid[i]) {
      throw new Error("null array in grid");
    }
  }
  let height = grid.length, width = grid[0].length;
  // first look if we have any zombies and save their coordinates.
  type Coordinate = {
    row: number,
    col: number
  };
  let zombies: Coordinate[] = [];
  for(let row = 0; row < height; ++row) {
    for(let col = 0; col < width; ++col) {
      if (grid[row][col] === 2) {
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
        if (grid[c.row][c.col] === 1) {
          grid[c.row][c.col] = 2;
          zombieAdded = true;
          newZombies.push(c);
        }
      });
    });
    zombies = newZombies;
    if (zombieAdded) {
      ++time;
    }
  } 
  while(zombieAdded);
  // now let's check that all humans are gone
   for(let row = 0; row < height; ++row) {
    for(let col = 0; col < width; ++col) {
      if (grid[row][col] === 1) {
        return -1;
      }
    }
  }
  return time;
}
