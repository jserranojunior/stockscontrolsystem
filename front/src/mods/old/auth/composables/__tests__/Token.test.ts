import Token from "../token/Token";
import { it, expect } from "vitest";


it("setStateToken set state token", () => {
  Token.setStateToken("tokensetstring");
  expect(Token.store.token.token).toBe("tokensetstring");
});

it("checkTokenIsEmpty return false", () => {
  expect(Token.checkTokenIsEmpty("")).toBeFalsy();
});

it("checkTokenIsEmpty return true", () => {
  expect(Token.checkTokenIsEmpty("valido")).toBeTruthy();
});

it("checkOnBrowser check is browser", () => {
  expect(Token.checkOnBrowser()).toBe(false);
});
it("setLocalStorageToken empty", () => {
  expect(Token.setLocalStorageToken("")).toBe(undefined);
});
it("checkLocalstorageToken", () => {
  expect(Token.checkLocalstorageToken()).toBe(false);
});



it("setToken", () => {
  Token.setToken("abc");
  expect(Token.store.token.token).toBe("abc");
});










