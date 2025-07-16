import { store } from "./storeUsers";
import { toRefs } from "vue";
import { httpUsers } from "./httpUsers";

export const useUsers = () => {
  async function getAllUsers(FuncHttpUsers = httpUsers) {
    let useHttpUsers = await FuncHttpUsers().getAll();
    store.users = useHttpUsers.data;
  }

  return { ...toRefs(store), getAllUsers };
};
