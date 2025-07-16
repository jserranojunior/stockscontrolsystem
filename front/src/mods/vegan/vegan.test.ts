import { it, expect } from "vitest";
import { useVegan } from "./useVegan";

let { calculateBois } = useVegan();

it("calculate boi", () => {
  const daysVegan = 2079;
  expect(calculateBois(daysVegan)).toStrictEqual(1037);
});
