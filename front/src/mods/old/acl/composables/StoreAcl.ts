import { reactive } from "vue";

interface Route {
  ID: number;
  Name: string;
  Routes: number[];
}

interface StoreState {
  rotasEnableServidor: number[];
  publicRoutes: Route[];
  userAcl: Route[];
  loggedRoutes: Route[];
}

class StoreAcl {
  private readonly store: StoreState = reactive({
    rotasEnableServidor: [],
    publicRoutes: [
      {
        ID: 0,
        Name: "Public",
        Routes: [0, 1, 2, 3, 4, 5, 6, 7],
      },
    ],
    loggedRoutes: [
      {
        ID: 1,
        Name: "Logged",
        Routes: [0, 1],
      },
    ],
    userAcl: [],
  });

  setRotasEnableServidor(value: number[]): void {
    this.store.rotasEnableServidor = value;
  }

  setPublicRoutes(value: Route[]): void {
    this.store.publicRoutes = value;
  }

  setUserAcl(value: Route[]): void {
    this.store.userAcl = value;
  }

  getRotasEnableServidor(): number[] {
    return this.store.rotasEnableServidor;
  }

  getLoggedRoutes(): Route[] {
    return this.store.loggedRoutes;
  }

  getPublicRoutes(): Route[] {
    return this.store.publicRoutes;
  }

  getUserAcl(): Route[] {
    return this.store.userAcl;
  }
}

export default new StoreAcl();
