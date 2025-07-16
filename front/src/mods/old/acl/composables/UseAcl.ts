import { toRefs } from "vue";
import StoreAcl from "./StoreAcl";
import ClassUseApiConnect from "../../../helpers/http/useApiConnect";
const ApiConnect = new ClassUseApiConnect();

class UseAcl {
  public store = StoreAcl;
  checkIncludeRoute(rotaID: any) {
    return StoreAcl.getRotasEnableServidor().includes(rotaID);
  }

  joinAclPublic() {
    const userAcl = StoreAcl.getUserAcl();
    if (userAcl && userAcl[0]) {
      userAcl.unshift(StoreAcl.getPublicRoutes()[0]);
    } else {
      StoreAcl.setUserAcl(StoreAcl.getPublicRoutes());
    }
  
  }
  joinAclLogged() {
    const userAcl = StoreAcl.getUserAcl();
    if (userAcl && userAcl[0]) {
      userAcl.unshift(StoreAcl.getLoggedRoutes()[0]);
    } else {
      StoreAcl.setUserAcl(StoreAcl.getLoggedRoutes());
    }
  }
    


  async fetchUserAclFromApi(apiConnect:any = ApiConnect) {
    try {
      await apiConnect.get("/useracl").then((response:any)=>{
        if (response && response.data) {
          const userAcl = response.data;
          StoreAcl.setUserAcl(userAcl);
        }
      })
         
      }
        catch (error) {
          console.error(error);
        }
  }

  clearRoutesEnableWithUserAcls() {
    
    StoreAcl.setUserAcl([]);
    this.generateRoutesEnableWithUserAcls(false);

  }

  generateRoutesEnableWithUserAcls(logged:boolean) {
    if(logged){
      this.joinAclLogged()
    }else{
      this.joinAclPublic();
    }
   
    const userAcl = StoreAcl.getUserAcl();

    userAcl.forEach((acl) => {
      acl.Routes.forEach((rota) => {
        const rotasEnableServidor = StoreAcl.getRotasEnableServidor();
        if (!rotasEnableServidor.includes(rota)) {
          rotasEnableServidor.push(rota);
        }
      });
    });
  }

  getReactiveStoreAcl() {
    return toRefs(StoreAcl);
  }
}

export default new UseAcl();
