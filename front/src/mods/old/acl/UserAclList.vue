<template>
  <div>
    <div class="context">
      <div class="flex items-center justify-center my-4">
        <div class="px-auto my-auto w-2/3">
          <div class="card w-full shadow-xl mt-4">
            <div class="card-body bg-base-300">
              <h2 class="card-title">Níveis de acesso</h2>
              <div class="overflow-x-auto">
                <table class="table w-full table-compact border border-gray-800">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>E-mail</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr v-for="user in users.users" :key="user.ID" @click="selectUser(user.ID)" class="cursor-pointer">
                    <td>
                      {{user.ID}}
                    </td>
                     <td>
                      {{user.name}}
                    </td>
                    <td>
                      {{user.phonenumber}}
                    </td>
                    <td>
                      {{user.email}}
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useStore from "../../helpers/stores/store"
import { onMounted } from 'vue';
let {users} = useStore()
defineProps({
  selectUser: {
    default:()=>{},
    required:true,
    type: Function
  }
})
onMounted(async()=>{
 await  users.getAllUsers()
})

</script>
