import { useRegister } from "./useRegister";
import { it, expect } from "vitest";

const {
  setStoreError,
  checkFieldsIsValid,
  setStateFields,
  confirmPassword,
  checkSamePassword,
  fields,
  erro,
  Register,
  phoneCode,
  joinCodeAndProne,
} = useRegister();

it("joinCodeAndProne", () => {
  phoneCode.value = "+55";
  fields.value.cellphone = "(11)94643-9695";
  joinCodeAndProne();
  expect(fields.value.cellphone == "+55(11)94643-9695").toBeTruthy();
});

it("Register return false ite confirmFields", async () => {
  fields.value.name = "";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

it("Register return false ite ConfirmPassword", async () => {
  fields.value.name = "Jorge";
  fields.value.password = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

it("Register return false same email", async () => {
  fields.value.name = "Jorge";
  fields.value.email = "jorgeserranojunior@gmail.com";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeFalsy();
});

/* it("Register return true", async () => {
  fields.value.name = "ite";
  fields.value.email = "ite@gmail.com";
  fields.value.password = "123";
  confirmPassword.value = "123";
  const register = await Register();
  expect(register).toBeTruthy();
}); */

it("setStoreError check set erro", () => {
  setStoreError("Falha ao conectar");
  expect(erro.value).toBe("Falha ao conectar");
});
it("checkFieldsIsValid  false", () => {
  setStateFields({
    email: "",
    password: "",
    name: "",
  });
  expect(checkFieldsIsValid()).toBe(false);
});
it("setStateFields to be true", () => {
  setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
    name: "Jorge",
  });
  expect(
    fields.value.email == "jorgeserranojunior@gmail.com" &&
      fields.value.password == "123" &&
      fields.value.name == "Jorge"
  ).toBeTruthy();
});
it("checkFieldsIsValid  true", () => {
  setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
    name: "Jorge",
  });
  confirmPassword.value = "one";
  expect(checkFieldsIsValid()).toBeTruthy();
});

it("checkSamePassword return false", () => {
  fields.value.password = "123";
  confirmPassword.value = "12";
  expect(checkSamePassword()).toBeFalsy();
});

it("checkSamePassword return true", () => {
  fields.value.password = "123";
  confirmPassword.value = "123";
  expect(checkSamePassword()).toBeTruthy();
});

it("checkFieldsIsValid return true", () => {
  fields.value.name = "";
  fields.value.password = "123";
  confirmPassword.value = "123";
  expect(checkFieldsIsValid()).toBeFalsy();
});
