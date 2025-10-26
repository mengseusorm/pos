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
              :error-messages="errors?.name[0]"
            ></VTextField>  

            <VRadioGroup v-model="formData.status" row class="mb-3">
              <VRadio 
                :key="StatusEnum.ACTIVE"
                :label="$t(`label.active`)"
                :value="StatusEnum.ACTIVE"
              ></VRadio>
              <VRadio
                :key="StatusEnum.INACTIVE"
                :label="$t(`label.inactive`)"
                :value="StatusEnum.INACTIVE"
              ></VRadio>
            </VRadioGroup>
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
import { StatusEnum } from '@/Enums/StatusEnum'
import { api } from '@/plugins/router/store/authStore.js'
import { ref } from 'vue'     
import alertService from '@/service/alertService';
  
const props = defineProps({
  translationKey: {
    type: String,
    default: ''
  }
})
 
const emit = defineEmits(['created']) 
const dialog = ref(false) 
const form = ref(null)
const errors = ref(null)

const formData = ref({
  name: '',
  status: StatusEnum.ACTIVE,
  description: ''
})
  
const reset = () => {
  formData.value = {
    name: "",
    status: StatusEnum.ACTIVE,
    description: ""
  }
  errors.value = null
  dialog.value = false 
  alertService.success('Success', 'Item category created successfully')
  // toast.success('Item category created successfully')
  // showSuccessAlert('Success', 'Item category created successfully')
}  

const save = async () => {   
    const response = await api.post('/admin/item-categories', formData.value).then((res) => {
      console.log(res)
      if(res.status === 201){ 
        
        emit('created') 
        reset() 
      }
    }).catch((err) => { 
      errors.value = err.response.data.errors
    })  
}
</script>
