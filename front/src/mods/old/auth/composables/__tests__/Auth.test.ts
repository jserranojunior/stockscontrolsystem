import Auth from "../Auth";
import { it, expect } from "vitest";
import ClassUseMockApiConnect from "../__mock__/mockApiConnect";
import Token from "../token/Token";
const MockApiConnect = new ClassUseMockApiConnect();

it("setStateAuthError check set erro", () => {
  Auth.setStateAuthError("Falha ao conectar");
  expect(Auth.store.auth.erro).toBe("Falha ao conectar");
});

it("Logout", () => {
  Auth.Logout();
  expect(Auth.store.auth.erro).toBe("");
  expect(Auth.store.auth.token).toBe("");
});

it("checkFieldsIsValid  false", () => {
  expect(Auth.checkFieldsIsValid()).toBe(false);
});
it("setStateFields", () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });
  expect(
    Auth.store.fields.email == "jorgeserranojunior@gmail.com" &&
      Auth.store.fields.password == "123"
  ).toBe(true);
});
it("checkFieldsIsValid  true", () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });
  expect(Auth.checkFieldsIsValid()).toBe(true);
});

it("Login false", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "12",
  });
  const login = await Auth.Login(MockApiConnect);
  expect(login).toBe(false);
});

it("Login true", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });
  const login = await Auth.Login(MockApiConnect);
  expect(login).toBe(true);
});

it("Login altera token", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });
  await Auth.Login(MockApiConnect).then(() => {
    expect(Token.store.token.token).toBeTruthy();
  });
});

it("apiLoginGetToken Token", async () => {
  Auth.setStateFields({
      email: "jorgeserranojunior@gmail.com",
      password: "123",
    });
  await Auth.apiLoginGetToken(MockApiConnect).then((res)=>{
   
    const data = { "data": {
      "token": "tokenvalido"
  }} 

  expect(res).toEqual(data);
  });
 
});


it("Logar return campos vazio", async () => {
  Auth.setStateFields({
      email: "jorgeserranojunior@gmail.com",
      password: "",
    });

  await Auth.Logar(MockApiConnect).then((res)=>{
    expect(Auth.store.auth.erro).toBe("Campos Vazios");
    expect(res).toBeFalsy()
  });
 
});

it("Logar return campos vazio", async () => {
  Auth.setStateFields({
      email: "jorgeserranojunior@gmail.com",
      password: "12",
    });

  await Auth.Logar(MockApiConnect).then((res)=>{
    expect(Auth.store.auth.erro).toBe("Usuario incorreto!");
    expect(res).toBeFalsy()
  });
});

it("Logar return campos vazio", async () => {
  Auth.setStateFields({
      email: "jorgeserranojunior@gmail.com",
      password: "123",
    });

  await Auth.Logar(MockApiConnect).then((res)=>{
    expect(Auth.store.auth.erro).toBe("");
    expect(res).toBeTruthy()
  });
});