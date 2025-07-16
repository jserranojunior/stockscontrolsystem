<template>
  <div>
    <div class="fixed top-0 right-0 mr-4 mt-4 z-20">
      <div
        v-for="(notification, key) in notifications"
        :key="key"
        :class="
          'border-' +
          notification.type +
          ' border-l-4 shadow-lg  bg-white mx-auto rounded-lg mb-1  mr-2 notification-box'
        "
      >
        <div class="flex flex-wrap justify-between">
          <div class="text-sm p-3 cursor-pointer">
            <span class="text-left font-bold">{{ notification.title }}</span>
            <div class="toast-body-tail">
              <div class="text-gray-600 tracking-tight">
                {{ notification.body }}
              </div>
            </div>
          </div>
          <div
            class="flex flex-wrap border-l px-1 cursor-pointer btn-pwa-close"
            @click="removeNotification(key)"
          >
            <div class="text-center my-auto w-full">
              <div>
                <Icon
                  icon="zondicons:close-solid"
                  width="35"
                  class="text-red-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { inject, watch } from 'vue'
  export default {
    name: 'Toast',
    setup() {
      const useToast: any = inject('toast')
      let { notifications, removeNotification } = useToast
      watch(notifications, () => {
        console.log(notifications[0])
      })
      return { notifications, removeNotification }
    },
  }
</script>
