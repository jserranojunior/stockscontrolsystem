import StoreAuth from "../StoreAuth";



class apiConnect {
  checkFields(fields:any){
    if(
    StoreAuth.getFields().email == fields.email &&
    StoreAuth.getFields().password == fields.password)
  {
    return true
  }else{
    return false
  }
  }

  async postWithoutToken(urlApi:string, dataPassada:any) {
    const valorTrue = { 
      email: "jorgeserranojunior@gmail.com", password: "123"
    }
   const dados = { data: {
        token: "tokenvalido"
    }} 

    const erro = {
      response:{
        data:{
          message: 
            "Usuario incorreto!"
          
        }
      }
    }

    if (this.checkFields(valorTrue)) {
    
      return dados
    }else{
      return erro
    }
  }
}
export default apiConnect;


