import { toRefs } from 'vue'
import { store } from './storeToast'
export const useToast = () => {
  function addNotification(data: {
    type: string
    title: string
    body: string
  }) {
    if (data.type) {
      store.notifications.push(data)
      let lastElement = store.notifications[store.notifications.length - 1]
      timerToRemove(lastElement)
    }
  }
  function timerToRemove(data: any) {
    setTimeout(() => {
      store.notifications.splice(data, 1)
    }, 5000)
  }
  function removeNotification(data: any) {
    store.notifications.splice(data, 1)
  }
  function removeAllNotification() {
    store.notifications = []
  }

  return {
    ...toRefs(store),
    addNotification,
    removeNotification,
    removeAllNotification,
  }
}
