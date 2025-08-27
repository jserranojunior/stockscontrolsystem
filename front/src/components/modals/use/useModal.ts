import { store } from './storeModal'

export const useModal = () => {
  async function addModal(data: { nome: string; show: boolean }) {
    const nome = data.nome
    store.modals[nome] = data
  }

  function togleShowModal(data: { nome: any }) {
    const nome = data.nome
    store.modals[nome].show = !store.modals[nome].show
  }

  function togleShowModalFixed(data: { nome: string; show: boolean }) {
    const nome = data.nome
    store.modals[nome] = data
  }

  return {
    ...store,
    addModal,
    togleShowModal,
    togleShowModalFixed,
  }
}
