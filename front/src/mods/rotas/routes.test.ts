import { store } from "./storeRoutes";
import { it, expect } from "vitest";

it("itando se existe rota", () => {
  expect(store.routes[0]).toBeTruthy();
});

it("itando se existe rota /", () => {
  expect(store.routes[1].path == "/").toBeTruthy();
});
