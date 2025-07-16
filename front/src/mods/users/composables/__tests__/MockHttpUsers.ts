export const httpUsers = () => {
  async function getAll() {
    return {
      data: [
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
      ],
    };
  }
  return { getAll };
};
