import { describe, it, expect } from "vitest";

describe("suit", () => {
  it("Env Import Existe", () => {
    const publicEnvVar = import.meta.env.VITE_TEST_STR;
    expect(publicEnvVar).toBe("global");
  });
});
