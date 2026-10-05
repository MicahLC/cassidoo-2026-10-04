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
});
