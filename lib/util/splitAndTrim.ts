import { map, compose, trim, split } from "ramda";

export const splitAndTrim = compose(
  map((tag) => trim(tag)),
  split(",")
);
