import { expect } from "chai";
import { minutesUntilApocalypse } from "../src/minutesUntilApocalypse.js";

describe("minutesUntilApocalypse", () => {
  it("handles email example #1", () => {
    expect(minutesUntilApocalypse([
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1]
    ])).to.equal(4);
  });

  it("handles email example #2", () => {
    expect(minutesUntilApocalypse([
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1]
    ])).to.equal(-1);
  });

  it("handles single-space grids", () => {
    expect(minutesUntilApocalypse([[0]])).to.equal(-1);
    expect(minutesUntilApocalypse([[1]])).to.equal(-1);
    expect(minutesUntilApocalypse([[2]])).to.equal(0);
  });

  it("handles trivial zombie-person scenario", () => {
    expect(minutesUntilApocalypse([[1, 2]])).to.equal(1);
    expect(minutesUntilApocalypse([[2], [1]])).to.equal(1);
  });

  it("handles long zig-zag", () => {
    expect(minutesUntilApocalypse([
      [2, 1, 1, 0, 0],
      [0, 0, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [0, 0, 1, 1, 1]
    ])).to.equal(14);
  });

  it("handles a cluster of people not touching zombies", () => {
    expect(minutesUntilApocalypse([
      [2, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 1, 1, 1]
    ])).to.equal(-1);
  });
});
