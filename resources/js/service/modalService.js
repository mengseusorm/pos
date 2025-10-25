import { ref } from 'vue'

export const useModal = () => {
   const isVisible = ref(false)

   const show = () => {
       isVisible.value = true
   }

   const hide = () => {
       isVisible.value = false
   }

   return {
       isVisible,
       show,
       hide
   }
}
