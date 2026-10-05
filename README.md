# cassidoo-2026-10-04

This is a solution to the interview problem sent in [the October 4th, 2026 issue of the rendezvous with cassidoo newsletter](https://buttondown.com/cassidoo/archive/u1f3a4-to-be-different-is-great-you-dont-want-to/) using TypeScript.

# Problem statement

On Halloween night, a town is represented by a grid where 0 is an empty lot, 1 is a living person, and 2 is an infected zombie. Every minute, infection spreads to any living person directly above, below, left, or right of an infected zombie. Return the minimum number of minutes until no living people remain, or -1 if some people can never be reached.

## Example:

```
> minutesUntilApocalypse([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1]
])
> 4

> minutesUntilApocalypse([
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1]
])
> -1
```

# Solution

-