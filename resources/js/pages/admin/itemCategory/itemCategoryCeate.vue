<template>
  <VBtn class="variant"> 
    <VIcon icon="bx-plus-circle" start size="20"/>
    {{ $t(translationKey) }}  
    <v-dialog v-model="dialog" activator="parent" max-width="500">
      <VForm @submit.prevent="save" ref="form"> 
        <v-card rounded="lg">
          <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
              {{ $t('label.add_item_category') }}
            </div> 
            <VBtn
              icon="mdi-close"
              variant="text"
              @click="reset"
            ></VBtn>
          </v-card-title>

          <v-divider class="mb-4"></v-divider>

          <v-card-text>
            <VTextField
              v-model="formData.name"
              :label="$t('label.name')" 
              required
              variant="outlined"
              class="mb-3"
            ></VTextField>

            <VTextarea
              v-model="formData.description"
              :label="$t('label.description')"
              :counter="300"
              rows="3"
              variant="outlined"
              persistent-counter
            ></VTextarea>  
          </v-card-text>

          <v-divider class="mt-2"></v-divider>

          <v-card-actions class="my-2 d-flex justify-end">
            <VBtn
              class="text-none"
              rounded="xl"
              :text="$t('label.cancel')"
              @click="reset"
            ></VBtn>

            <VBtn
              class="text-none"
              color="primary"
              rounded="xl"
              :text="$t('label.submit')" 
              variant="flat"
              type="submit"
            ></VBtn>
          </v-card-actions>
        </v-card>
      </VForm>
    </v-dialog>
  </VBtn>   
</template>

<script setup>  
import { api } from '@/plugins/router/store/authStore.js'
import { ref } from 'vue'

const props = defineProps({
  translationKey: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['created']) 
const dialog = ref(false) 
const form = ref(null)

const formData = ref({
  name: '',
  description: ''
})
  
const reset = () => {
  formData.value = {
    name: "",
    description: ""
  }
  dialog.value = false
}  

const save = async () => { 
  try {
    const response = await api.post('/admin/item-categories', formData.value) 
    // emit('created', response.data) 
  } catch (error) { 
    console.log(error)
  } 
}
</script>
