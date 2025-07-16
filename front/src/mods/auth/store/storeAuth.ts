import { reactive } from 'vue'

export const store = reactive({
  ola: 'Ola',
  fields: { email: '', password: '' },
  auth: { erro: '', token: '', data: '' },
  erro: null,
  loginInputs: { email: '', password: '' },
  registerInputs: {
    type: '',
    email: '',
    password: '',
    cpf: '',
    birth_date: '',
    dtBirth: '',
  },
  admin: false,
  logged: false,
  userLogged: null as any,
  btnLogin: true,
  routesEnabled: [] as any,
  notification: [] as any,
  resetLink: import.meta.env.VITE_GOLANG_RESET_URL,
})
