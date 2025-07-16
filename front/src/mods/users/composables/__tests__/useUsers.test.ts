import { useUsers } from "../useUsers";
let { users, getAllUsers } = useUsers();
import { httpUsers } from "./MockHttpUsers";
import { it, expect } from "vitest";

it("users", () => {
  expect(users.value).toEqual([
    {
      ID: -0,
      name: "",
      phonenumber: "",
      email: "",
    },
  ]);
});

it("getAllUsers", async () => {
  await getAllUsers(httpUsers).then(() => {
    expect(users.value).toEqual([
      {
        ID: 1,
        name: "Jorge Serrano Junior",
        phonenumber: "+55(11)94643-9695",
        email: "jorgeserranojunior@gmail.com",
      },
      {
        ID: 2,
        name: "Contato Alvitre",
        phonenumber: "+55(11)94819-4643",
        email: "contatoalvitre@gmail.com",
      },
    ]);
  });
});
