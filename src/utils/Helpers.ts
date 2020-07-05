export const range = (initial: number, end: number): number[] =>
  initial === end ? [initial] : [initial, ...range(initial + 1, end)]
