import UseAcl from "../UseAcl";
import { it, expect } from "vitest";
import ClassUseMockApiConnect from "./mockApiConnect";
const MockApiConnect = new ClassUseMockApiConnect();

it("getReactiveStoreAcl", () => {
  expect(UseAcl.store.getUserAcl()).toStrictEqual([]);
});


it("joinAclPublic", () => {
  UseAcl.joinAclPublic();
  expect(UseAcl.store.getUserAcl()).toStrictEqual([
    {
      ID: 0,
      Name: "Public",
      Routes: [0, 1, 2, 3],
    },
  ]);
});

it("checkIncludeRoute Public notFound", () => {
  UseAcl.generateRoutesEnableWithUserAcls();
  expect(UseAcl.checkIncludeRoute(0)).toBe(true);
});

it("fetchUserAclFromApi", () => {
  UseAcl.fetchUserAclFromApi(MockApiConnect).then(async () => {
    expect(UseAcl.store.getUserAcl()).toStrictEqual([
      {
        ID: 3,
        Name: "Administrador",
        Routes: [1, 2, 3, 4, 5],
      },
      {
        ID: 2,
        Name: "Logged",
        Routes: [4],
      },
    ]);
  });
});

it("clearRoutesEnableWithUserAcls", async () => {
  await UseAcl.fetchUserAclFromApi(MockApiConnect).then(() => {
    UseAcl.clearRoutesEnableWithUserAcls();
    expect(UseAcl.store.getRotasEnableServidor()).toStrictEqual([0, 1, 2, 3]);
  });
});

it("generateRoutesEnableWithUserAcls", async () => {
  await UseAcl.fetchUserAclFromApi(MockApiConnect).then(() => {
    UseAcl.generateRoutesEnableWithUserAcls();
    expect(UseAcl.store.getRotasEnableServidor()).toStrictEqual([
      0, 1, 2, 3, 4, 5,
    ]);
  });
});