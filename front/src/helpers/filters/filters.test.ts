import { money } from "./filters";
import { it, expect } from "vitest";

it("Se o valor for zero retorno em REAL", () => {
  expect(money(0)).toBe("0,00");
});

it("Se o valor for 1 retorno em REAL", () => {
  expect(money(1)).toBe("1,00");
});
