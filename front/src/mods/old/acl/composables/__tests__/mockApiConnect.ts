class apiConnect {
  async get(url:string) {
    
    const data = {
      data: [
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
      ],
    };
    return data;
  }
}
export default apiConnect;
