import { poisson } from "./poisson.ts";

export const avg = (count: number, length: number) =>
  Number((count / length).toFixed(2));

export const getAttackRating = (arg1: number, arg2: number, arg3: number) =>
  Number(Number(arg1) * Number(arg2) * Number(arg3)).toFixed(2);

export const getProbabilities = (arg1: number, arg2: number, arg3: number) => {
  const rating = getAttackRating(arg1, arg2, arg3);

  const events = [0, 1, 2, 3, 4];
  return events.map((item) =>
    parseInt((poisson(1, item, rating) * 100).toFixed(2)),
  );
};
