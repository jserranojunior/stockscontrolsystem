/* const MockApiConnect = new ClassUseMockApiConnect();
 */import { it, expect } from "vitest";
import ClassUseMockApiConnect from "../__mock__/mockApiConnect";
import StoreAuth from "../StoreAuth";
import Auth from "../Auth";
const MockApiConnect = new ClassUseMockApiConnect();



it("postWithoutToken return false", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "12",
  });

  const erro = {
    response:{
      data:{
        message: 
          "Usuario incorreto!"
      }
    }
  }
  
  await MockApiConnect.postWithoutToken("/login", StoreAuth.store.fields).then((res:any)=>{
    expect(res).toEqual(erro);
   })
});

it("postWithoutToken return token", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });
  const data = { "data": {
    "token": "tokenvalido"
}} 
  await MockApiConnect.postWithoutToken("/login", StoreAuth.store.fields).then((res:any)=>{
    expect(res).toEqual(data);
   })
});



it("checkFields return true", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  });

  const data = {
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  }

 const res = MockApiConnect.checkFields(data)
    expect(res).toBeTruthy();
   
});

it("checkFields return false", async () => {
  Auth.setStateFields({
    email: "jorgeserranojunior@gmail.com",
    password: "1false3",
  });

  const data = {
    email: "jorgeserranojunior@gmail.com",
    password: "123",
  }

 const res = MockApiConnect.checkFields(data)
    expect(res).toBeFalsy();
   
});

